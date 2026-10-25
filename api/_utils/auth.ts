/**
 * NATURE CLEAN — Session admin (cookie HttpOnly signé HMAC-SHA256)
 * Utilisé par get-stats.ts. OTP / login : verify-otp.ts et send-otp.ts (auto-suffisants).
 *
 * Variables d'environnement :
 *   SESSION_SECRET — secret HMAC (min 32 caractères en production)
 */

import * as crypto from 'crypto';

export const COOKIE_NAME = 'nc_adm';

function getSecret(envKey: string, fallback: string): string {
  const val = process.env[envKey];
  if (val && val.length >= 16) return val;
  if (process.env.NODE_ENV !== 'production') return fallback;
  throw new Error(`[NCM Auth] Variable d'environnement manquante : ${envKey}`);
}

function hmac(secret: string, data: string): string {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

function fromBase64url(input: string): string {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(padded, 'base64').toString('utf-8');
}

interface SessionPayload {
  u: string;
  exp: number;
  iat: number;
}

/**
 * Vérifie et décode un token de session.
 * Retourne le payload si valide, null sinon.
 */
export function verifySessionToken(token: string): SessionPayload | null {
  if (!token || typeof token !== 'string') return null;

  const parts = token.split('.');
  if (parts.length !== 2) return null;

  const [encodedPayload, providedSig] = parts;

  try {
    const secret = getSecret('SESSION_SECRET', 'dev-session-secret-nature-clean-ncm');
    const expectedSig = hmac(secret, encodedPayload);

    if (!crypto.timingSafeEqual(Buffer.from(providedSig, 'hex'), Buffer.from(expectedSig, 'hex'))) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(fromBase64url(encodedPayload));

    if (Date.now() > payload.exp) return null;
    if (!payload.u || !payload.exp || !payload.iat) return null;

    return payload;
  } catch {
    return null;
  }
}

/** Parse l'en-tête Cookie en objet clé/valeur */
export function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  if (!cookieHeader) return {};
  return Object.fromEntries(
    cookieHeader.split(';').map((c) => {
      const [k, ...v] = c.trim().split('=');
      return [k.trim(), decodeURIComponent(v.join('=').trim())];
    }),
  );
}
