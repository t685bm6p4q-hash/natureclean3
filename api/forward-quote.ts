/**
 * Vercel Serverless Function — PROXY DEVIS (QuotePage)
 *
 * NCM-042 : Remplace l'appel direct Make.com depuis le navigateur.
 *   → L'URL Make.com n'est plus jamais exposée dans le bundle JS
 *   → Validation Zod serveur identique à send-quote.ts
 *   → Rate limiting Redis (Sliding Window, 5 req/min/IP)
 *   → Alerte WhatsApp déclenchée côté serveur
 *   → Forward vers Make.com via process.env.MAKE_WEBHOOK_URL
 *
 * Endpoint : POST /api/forward-quote
 * Body     : { nom, email, telephone, adresse, secteur, typeSurfaceGraffiti?,
 *             frequence, surface, description? }
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { sanitize, maskEmail, maskPhone } from './_utils/sanitize';
import { sendWhatsApp } from './_utils/whatsapp';
import { checkRateLimit } from './_utils/ratelimit';

// ─── CORS ────────────────────────────────────────────────────────────────────

const ALLOWED_ORIGINS = ['https://natureclean.fr', 'https://www.natureclean.fr'];

// ─── VALIDATION ZOD (miroir du schéma client) ────────────────────────────────

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const PHONE_REGEX = /^[0-9\s.+()-]{10,20}$/;

const forwardQuoteSchema = z.object({
  nom: z.string().min(2).max(200).transform(sanitize),
  email: z.string().max(254).regex(EMAIL_REGEX).transform((v: string) => v.toLowerCase().trim()),
  telephone: z.string().max(20).regex(PHONE_REGEX),
  adresse: z.string().min(5).max(500).transform(sanitize),
  secteur: z.string().min(1).max(100).transform(sanitize),
  typeSurfaceGraffiti: z.string().max(100).default('').transform(sanitize),
  frequence: z.string().min(1).max(100).transform(sanitize),
  surface: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .pipe(z.number().positive().max(100_000)),
  description: z.string().max(2000).default('').transform(sanitize),
});

type ForwardQuotePayload = z.infer<typeof forwardQuoteSchema>;

// ─── RATE LIMIT CONFIG ───────────────────────────────────────────────────────

const RATE_FORWARD = { max: 5, windowSeconds: 60, keyPrefix: 'rl:fq' } as const;

// ─── FORMATTER WHATSAPP ──────────────────────────────────────────────────────

function buildWhatsAppMessage(data: ForwardQuotePayload): string {
  const isUrgent = data.frequence === 'Intervention Unique';
  const tag = isUrgent ? '🚨 *URGENT*' : '📋 *DEVIS*';
  const surface =
    data.secteur === 'Graffitis' && data.typeSurfaceGraffiti
      ? `${data.surface}m² — ${data.typeSurfaceGraffiti}`
      : `${data.surface}m²`;

  const lines = [
    `${tag} — Nature Clean (QuotePage)`,
    ``,
    `👤 *${data.nom}*`,
    `📱 ${data.telephone}`,
    `📧 ${maskEmail(data.email)}`,
    `📍 ${data.adresse}`,
    ``,
    `🏢 Secteur : *${data.secteur}*`,
    `📐 Surface : ${surface}`,
    `📅 Fréquence : ${data.frequence}`,
    data.description ? `💬 ${data.description.slice(0, 300)}` : '',
    ``,
    `⏱️ ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}`,
  ].filter((l) => l !== undefined);
  return lines.join('\n');
}

// ─── FORWARD MAKE.COM ────────────────────────────────────────────────────────

async function forwardToMakeCom(data: ForwardQuotePayload): Promise<boolean> {
  const webhookUrl = process.env.MAKE_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn('[forward-quote] MAKE_WEBHOOK_URL non configuré — envoi Make.com ignoré');
    return false;
  }
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        source: 'QuotePage',
        timestamp: new Date().toISOString(),
      }),
    });
    if (!response.ok) {
      console.warn(`[forward-quote] Make.com HTTP ${response.status}`);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('[forward-quote] Erreur Make.com:', err);
    return false;
  }
}

// ─── HANDLER ─────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  const origin = req.headers.origin || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (process.env.NODE_ENV !== 'production') {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  // Extraction IP
  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  // Rate limiting (même algo Redis que send-quote.ts)
  const rateResult = await checkRateLimit(clientIp, RATE_FORWARD);
  if (rateResult.limited) {
    return res.status(429).json({
      error: 'Trop de demandes. Réessayez dans une minute.',
      retryAfter: rateResult.retryAfter,
    });
  }

  // Validation Zod server-side
  const parseResult = forwardQuoteSchema.safeParse(req.body);
  if (!parseResult.success) {
    console.warn('[forward-quote] Payload invalide:', parseResult.error.issues);
    return res.status(400).json({
      error: 'Données invalides',
      issues: parseResult.error.issues.map((i) => ({
        field: i.path.join('.'),
        message: i.message,
      })),
    });
  }

  const data = parseResult.data;

  // Log pseudonymisé (SEC-009)
  console.log(
    '[FORWARD-QUOTE]',
    JSON.stringify({
      emailMasked: maskEmail(data.email),
      telMasked: maskPhone(data.telephone),
      secteur: data.secteur,
      surface: data.surface,
      frequence: data.frequence,
      timestamp: new Date().toISOString(),
    }),
  );

  // Notifications en parallèle — échec non bloquant
  const [waResult, makeComResult] = await Promise.allSettled([
    sendWhatsApp(buildWhatsAppMessage(data)),
    forwardToMakeCom(data),
  ]);

  const whatsappSent = waResult.status === 'fulfilled' && waResult.value;
  const makeComSent = makeComResult.status === 'fulfilled' && makeComResult.value;

  return res.status(200).json({
    success: true,
    message: 'Votre demande de devis a bien été envoyée.',
    whatsappNotified: whatsappSent,
    makeComNotified: makeComSent,
    ref: `NCM-${Date.now().toString(36).toUpperCase()}`,
  });
}
