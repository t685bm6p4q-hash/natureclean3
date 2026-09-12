/**
 * Vercel Serverless Function — VÉRIFICATION OTP + SESSION COOKIE
 * ✅ FICHIER AUTO-SUFFISANT — aucun import depuis _utils/
 *
 * Endpoint : POST /api/verify-otp  —  Body : { otp: string }
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import * as crypto from 'crypto';

// ═══════════════════════════════════════════════════════════════
// UTILITAIRES AUTH INLINÉS (ex-_utils/auth)
// ═══════════════════════════════════════════════════════════════

const COOKIE_NAME         = 'nc_adm';
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000;
const OTP_WINDOW_MS       = 5 * 60 * 1000;

function getSecret(envKey: string, fallback: string): string {
  const val = process.env[envKey];
  if (val && val.length >= 16) return val;
  if (process.env.NODE_ENV !== 'production') return fallback;
  throw new Error(`[NCM Auth] Variable manquante : ${envKey}`);
}

function hmac(secret: string, data: string): string {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

function base64url(input: string): string {
  return Buffer.from(input).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function verifyTOTP(inputCode: string): boolean {
  if (!/^\d{6}$/.test(inputCode)) return false;
  const secret = getSecret('OTP_SECRET', 'dev-otp-secret-nature-clean-ncm');
  const now    = Math.floor(Date.now() / OTP_WINDOW_MS);
  for (const offset of [0, -1]) {
    const h        = hmac(secret, String(now + offset));
    const expected = (parseInt(h.slice(-8), 16) % 1_000_000).toString().padStart(6, '0');
    if (crypto.timingSafeEqual(Buffer.from(inputCode), Buffer.from(expected))) return true;
  }
  return false;
}

interface SessionPayload { u: string; exp: number; iat: number; }

function createSessionToken(userId = 'admin'): string {
  const secret  = getSecret('SESSION_SECRET', 'dev-session-secret-nature-clean-ncm');
  const payload: SessionPayload = { u: userId, exp: Date.now() + SESSION_DURATION_MS, iat: Date.now() };
  const encoded = base64url(JSON.stringify(payload));
  return `${encoded}.${hmac(secret, encoded)}`;
}

function buildSessionCookie(token: string): string {
  const maxAge = Math.floor(SESSION_DURATION_MS / 1000);
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE_NAME}=${token}; HttpOnly; SameSite=Strict${secure}; Max-Age=${maxAge}; Path=/api/`;
}

// ═══════════════════════════════════════════════════════════════
// RATE LIMITER IN-MEMORY (5 tentatives / 15 min / IP)
// ═══════════════════════════════════════════════════════════════

const _rlMap = new Map<string, { count: number; resetAt: number }>();
const OTP_RL_MAX    = 5;
const OTP_RL_WINDOW = 15 * 60_000;

function checkOtpRateLimit(ip: string): { limited: boolean; count: number; retryAfter?: number } {
  const now   = Date.now();
  const entry = _rlMap.get(ip);
  if (!entry || now > entry.resetAt) {
    _rlMap.set(ip, { count: 1, resetAt: now + OTP_RL_WINDOW });
    return { limited: false, count: 1 };
  }
  entry.count += 1;
  if (entry.count > OTP_RL_MAX) {
    return { limited: true, count: entry.count, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { limited: false, count: entry.count };
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
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST')    return res.status(405).json({ error: 'Method Not Allowed' });

  const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 'unknown';
  const rl = checkOtpRateLimit(ip);
  if (rl.limited) {
    console.warn(`[SEC-006] IP bloquée — ${ip} (${rl.count} tentatives)`);
    return res.status(429).json({
      error: 'Compte temporairement verrouillé. Réessayez dans quelques minutes.',
      retryAfter: rl.retryAfter,
    });
  }

  const attemptsRemaining = Math.max(0, OTP_RL_MAX - rl.count);

  const body = req.body || {};
  const otp  = typeof body.otp === 'string' ? body.otp.trim() : '';

  if (!otp || !/^\d{6}$/.test(otp)) {
    return res.status(400).json({ error: 'Format OTP invalide (6 chiffres requis)' });
  }

  if (!verifyTOTP(otp)) {
    console.warn(`[SEC-006] Échec OTP — IP: ${ip} — restantes: ${attemptsRemaining}`);
    return res.status(401).json({ error: 'Code incorrect ou expiré.', attemptsRemaining });
  }

  const token  = createSessionToken('admin');
  const cookie = buildSessionCookie(token);
  res.setHeader('Set-Cookie', cookie);
  console.log(`[AUTH] Connexion admin réussie — IP: ${ip}`);
  return res.status(200).json({ success: true });
}
