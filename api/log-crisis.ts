/**
 * Vercel Serverless Function — RÉCEPTEUR D'ALERTES CRISE
 *
 * Reçoit les événements du logger client (Couche 4).
 * Les alertes `security` déclenchent une notification WhatsApp immédiate.
 * Les `error` et `warn` sont loggés côté serveur (console Vercel).
 *
 * Le client envoie via `navigator.sendBeacon()` ou `fetch()` :
 *   POST /api/log-crisis
 *   Body: { events: CrisisEvent[], site: string }
 *
 * SEC-003 : CORS restreint à natureclean.fr
 * SEC-010 : Rate limiting Upstash Redis (fallback in-memory)
 * SEC-012 : WhatsApp + sanitization importés depuis _utils/ (no duplication)
 *
 * Endpoint: /api/log-crisis
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { sanitize } from './_utils/sanitize';
import { sendWhatsApp, formatSecurityAlert, formatErrorSummary, SecurityEventData } from './_utils/whatsapp';
import { checkRateLimit, RATE_CONFIGS } from './_utils/ratelimit';

// ═══════════════════════════════════════════
// COUCHE 3 SERVER-SIDE : Validation Zod v4
// ═══════════════════════════════════════════

const MAX_EVENTS_PER_REQUEST = 50;
const MAX_STRING_LENGTH = 2000;

const crisisEventSchema = z.object({
  level: z.enum(['warn', 'error', 'security']),
  message: z.string().max(MAX_STRING_LENGTH).transform(sanitize),
  data: z.record(z.string(), z.unknown()).optional(),
  url: z.string().max(MAX_STRING_LENGTH).transform(sanitize),
  timestamp: z.string().max(50),
  userAgent: z.string().max(500).transform(sanitize),
});

const crisisPayloadSchema = z.object({
  events: z.array(crisisEventSchema).min(1).max(MAX_EVENTS_PER_REQUEST),
  site: z.string().max(100).transform(sanitize),
});

// ═══════════════════════════════════════════
// HANDLER PRINCIPAL
// ═══════════════════════════════════════════

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // ── CORS — restreint aux origines légitimes (SEC-003) ──
  // sendBeacon n'envoie pas de preflight mais on restreint quand même
  const allowedOrigins = ['https://natureclean.fr', 'https://www.natureclean.fr'];
  const origin = req.headers.origin || '';
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (process.env.NODE_ENV !== 'production') {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  // ── Rate limiting (SEC-010 — Upstash Redis + fallback) ──
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  const rateResult = await checkRateLimit(clientIp, RATE_CONFIGS.crisis);
  if (rateResult.limited) {
    return res.status(429).json({ error: 'Too Many Requests' });
  }

  // ── Parse body (sendBeacon peut envoyer en text/plain) ──
  let rawBody: unknown;
  try {
    rawBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  // ── Validation Zod ──
  const parseResult = crisisPayloadSchema.safeParse(rawBody);
  if (!parseResult.success) {
    console.warn('[log-crisis] Payload invalide:', parseResult.error.issues);
    return res.status(400).json({
      error: 'Validation failed',
      issues: parseResult.error.issues.map((i) => i.message),
    });
  }

  const { events, site } = parseResult.data;

  // ── Tri par niveau ──
  const securityEvents = events.filter((e) => e.level === 'security');
  const errorEvents = events.filter((e) => e.level === 'error');
  const warnEvents = events.filter((e) => e.level === 'warn');

  // ── Logs serveur (visible dans Vercel → Functions → Logs) ──
  if (errorEvents.length > 0) {
    console.error(`[CRISIS] ${site} — ${errorEvents.length} erreur(s):`, errorEvents.map((e) => e.message));
  }
  if (warnEvents.length > 0) {
    console.warn(`[CRISIS] ${site} — ${warnEvents.length} avertissement(s):`, warnEvents.map((e) => e.message));
  }

  // ── Alertes WhatsApp ──
  const whatsappPromises: Promise<boolean>[] = [];

  for (const secEvent of securityEvents) {
    console.error(`[SECURITY] ${site} — ${secEvent.message}`, secEvent.data);
    whatsappPromises.push(
      sendWhatsApp(formatSecurityAlert(secEvent as SecurityEventData, site))
    );
  }

  // Résumé si ≥ 5 erreurs simultanées
  if (errorEvents.length >= 5) {
    whatsappPromises.push(
      sendWhatsApp(formatErrorSummary(events as SecurityEventData[], site))
    );
  }

  const results = await Promise.allSettled(whatsappPromises);
  const whatsappSent = results.filter(
    (r) => r.status === 'fulfilled' && r.value === true
  ).length;

  return res.status(200).json({
    received: events.length,
    security: securityEvents.length,
    errors: errorEvents.length,
    warnings: warnEvents.length,
    whatsappAlerts: whatsappSent,
  });
}
