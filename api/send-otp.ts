/**
 * Vercel Serverless Function — GÉNÉRATION ET ENVOI OTP
 * ✅ FICHIER AUTO-SUFFISANT — aucun import depuis _utils/
 *
 * Variables d'environnement requises :
 *   OTP_SECRET       — secret HMAC pour TOTP
 *   CALLMEBOT_PHONE  — numéro admin WhatsApp
 *   CALLMEBOT_APIKEY — clé CallMeBot
 *   WHAPI_TOKEN / WHAPI_PHONE — fallback Whapi
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as crypto from 'crypto';

// ═══════════════════════════════════════════════════════════════
// UTILITAIRES OTP INLINÉS (ex-_utils/auth → generateTOTP)
// ═══════════════════════════════════════════════════════════════

const OTP_WINDOW_MS = 5 * 60 * 1000;

function getSecret(envKey: string, fallback: string): string {
  const val = process.env[envKey];
  if (val && val.length >= 16) return val;
  if (process.env.NODE_ENV !== 'production') return fallback;
  throw new Error(`[NCM Auth] Variable manquante : ${envKey}`);
}

function generateTOTP(): string {
  const secret = getSecret('OTP_SECRET', 'dev-otp-secret-nature-clean-ncm');
  const window = Math.floor(Date.now() / OTP_WINDOW_MS);
  const h      = crypto.createHmac('sha256', secret).update(String(window)).digest('hex');
  const code   = parseInt(h.slice(-8), 16) % 1_000_000;
  return code.toString().padStart(6, '0');
}

// ═══════════════════════════════════════════════════════════════
// RATE LIMITER IN-MEMORY (max 3 demandes / 5 min / IP)
// ═══════════════════════════════════════════════════════════════

const _otpMap = new Map<string, { count: number; resetAt: number }>();

function isOtpRateLimited(ip: string): boolean {
  const now   = Date.now();
  const entry = _otpMap.get(ip);
  if (!entry || now > entry.resetAt) {
    _otpMap.set(ip, { count: 1, resetAt: now + 5 * 60_000 });
    return false;
  }
  entry.count += 1;
  return entry.count > 3;
}

// ═══════════════════════════════════════════════════════════════
// ENVOI WHATSAPP (CallMeBot → Whapi fallback)
// ═══════════════════════════════════════════════════════════════

async function sendOtpViaWhatsApp(otp: string): Promise<boolean> {
  const msg = `🔐 *Nature Clean Admin*\n\nVotre code de connexion : *${otp}*\n\nValide 5 minutes. Ne le partagez jamais.`;

  const CALLMEBOT_PHONE  = process.env.CALLMEBOT_PHONE  || '';
  const CALLMEBOT_APIKEY = process.env.CALLMEBOT_APIKEY || '';
  const WHAPI_TOKEN      = process.env.WHAPI_TOKEN      || '';
  const WHAPI_PHONE      = process.env.WHAPI_PHONE      || '';

  if (CALLMEBOT_PHONE && CALLMEBOT_APIKEY) {
    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(CALLMEBOT_PHONE)}&text=${encodeURIComponent(msg)}&apikey=${encodeURIComponent(CALLMEBOT_APIKEY)}`;
      const r = await fetch(url);
      if (r.ok) return true;
    } catch { /* fallback */ }
  }

  if (WHAPI_TOKEN && WHAPI_PHONE) {
    try {
      const r = await fetch('https://gate.whapi.cloud/messages/text', {
        method: 'POST',
        headers: { Authorization: `Bearer ${WHAPI_TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ to: WHAPI_PHONE, body: msg }),
      });
      if (r.ok) return true;
    } catch { /* silencieux */ }
  }

  return false;
}

// ═══════════════════════════════════════════════════════════════
// HANDLER
// ═══════════════════════════════════════════════════════════════

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const allowed = ['https://natureclean.fr', 'https://www.natureclean.fr'];
  const origin  = req.headers.origin || '';
  if (allowed.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else if (process.env.NODE_ENV !== 'production') {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')    return res.status(405).json({ error: 'Method Not Allowed' });

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 'unknown';
  if (isOtpRateLimited(ip)) {
    return res.status(429).json({ error: 'Trop de demandes. Attendez 5 minutes.', retryAfter: 300 });
  }

  const otp  = generateTOTP();
  const sent = await sendOtpViaWhatsApp(otp);

  if (!sent && process.env.NODE_ENV !== 'production') {
    console.log(`[DEV] OTP (WhatsApp non configuré) : ${otp}`);
  }

  return res.status(200).json({
    success: true,
    sent,
    ...(process.env.NODE_ENV !== 'production' && !sent ? { devOtp: otp } : {}),
  });
}
