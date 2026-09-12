/**
 * Vercel Serverless Function — ALERTE WHATSAPP (endpoint legacy)
 *
 * SEC-012 : Endpoint consolidé — délègue entièrement aux utilitaires partagés
 *           depuis _utils/whatsapp.ts et _utils/ratelimit.ts.
 *           Plus aucune duplication de code avec send-quote.ts ou log-crisis.ts.
 *
 * ⚠️  DÉPRÉCIÉ : Préférer POST /api/send-quote pour les nouveaux devis.
 *     Cet endpoint est maintenu pour la compatibilité avec des intégrations existantes.
 *
 * Endpoint: POST /api/send-whatsapp-alert
 * Body    : Même schéma que send-quote.ts
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';
import { sanitize } from './_utils/sanitize';
import { sendWhatsApp, formatDevisMessage } from './_utils/whatsapp';
import { checkRateLimit, RATE_CONFIGS } from './_utils/ratelimit';

const alertSchema = z.object({
  nom: z.string().min(1).max(100).transform(sanitize),
  prenom: z.string().min(1).max(100).transform(sanitize),
  email: z.string().max(254).regex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i).transform((v: string) => v.toLowerCase().trim()),
  telephone: z.string().max(20).regex(/^[0-9\s.+()-]{10,20}$/),
  codePostal: z.string().regex(/^[0-9]{5}$/),
  typeNettoyage: z.string().max(50).default(''),
  surface: z.string().max(50).default(''),
  frequence: z.string().max(50).default(''),
  message: z.string().max(2000).default('').transform(sanitize),
  source: z.string().max(200).default('Site web Nature Clean'),
  sourcePage: z.string().max(200).default('/devis'),
  referrer: z.string().max(500).default(''),
  journey: z.string().max(2000).default(''),
  timestamp: z.string().max(50).default(''),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const allowedOrigins = ['https://natureclean.fr', 'https://www.natureclean.fr'];
  const origin = req.headers.origin || '';
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (process.env.NODE_ENV !== 'production') {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Deprecation', 'true');
  res.setHeader('Link', '</api/send-quote>; rel="successor-version"');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const clientIp =
    (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';

  const rateResult = await checkRateLimit(clientIp, RATE_CONFIGS.whatsappAlert);
  if (rateResult.limited) {
    return res.status(429).json({ error: 'Too Many Requests', retryAfter: rateResult.retryAfter });
  }

  const parseResult = alertSchema.safeParse(req.body || {});
  if (!parseResult.success) {
    return res.status(400).json({
      error: 'Données invalides',
      issues: parseResult.error.issues.map((i) => i.message),
    });
  }

  const sent = await sendWhatsApp(formatDevisMessage(parseResult.data));

  return res.status(200).json({ success: true, sent });
}
