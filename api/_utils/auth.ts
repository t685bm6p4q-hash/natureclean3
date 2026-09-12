/**
 * NATURE CLEAN — UTILITAIRES CRYPTO PARTAGÉS (fichier privé, non exposé comme route)
 *
 * SEC-002 : Session via cookie HttpOnly signé HMAC-SHA256
 * SEC-001 : OTP TOTP (time-based, fenêtre de 5 minutes)
 *
 * Variables d'environnement requises :
 *   SESSION_SECRET  — secret HMAC pour signer les tokens de session (min 32 chars)
 *   OTP_SECRET      — secret HMAC pour générer les OTP (min 32 chars)
 */

import * as crypto from 'crypto';

// ─── CONSTANTES ───────────────────────────────────────────────────────────────

export const COOKIE_NAME = 'nc_adm';
export const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 jours
export const OTP_WINDOW_MS = 5 * 60 * 1000; // Fenêtre TOTP de 5 minutes

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function getSecret(envKey: string, fallback: string): string {
  const val = process.env[envKey];
  if (val && val.length >= 16) return val;
  // Fallback sécurisé uniquement en développement
  if (process.env.NODE_ENV !== 'production') return fallback;
  throw new Error(`[NCM Auth] Variable d'environnement manquante : ${envKey}`);
}

function hmac(secret: string, data: string): string {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

function base64url(input: string): string {
  return Buffer.from(input).toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

function fromBase64url(input: string): string {
  const padded = input.replace(/-/g, '+').replace(/_/g, '/');
  return Buffer.from(padded, 'base64').toString('utf-8');
}

// ─── OTP TOTP ─────────────────────────────────────────────────────────────────

/**
 * Génère un OTP à 6 chiffres basé sur la fenêtre de temps actuelle.
 * Algorithme : HMAC-SHA256(OTP_SECRET, floor(now / 5min)) → tronqué 6 chiffres
 */
export function generateTOTP(): string {
  const secret = getSecret('OTP_SECRET', 'dev-otp-secret-nature-clean-ncm');
  const window = Math.floor(Date.now() / OTP_WINDOW_MS);
  const h = hmac(secret, String(window));
  const code = parseInt(h.slice(-8), 16) % 1_000_000;
  return code.toString().padStart(6, '0');
}

/**
 * Vérifie un OTP en testant la fenêtre courante ET la précédente
 * (tolérance pour les codes générés juste avant un changement de fenêtre)
 */
export function verifyTOTP(inputCode: string): boolean {
  if (!/^\d{6}$/.test(inputCode)) return false;

  const secret = getSecret('OTP_SECRET', 'dev-otp-secret-nature-clean-ncm');
  const now = Math.floor(Date.now() / OTP_WINDOW_MS);

  for (const offset of [0, -1]) {
    const h = hmac(secret, String(now + offset));
    const expected = (parseInt(h.slice(-8), 16) % 1_000_000).toString().padStart(6, '0');
    if (crypto.timingSafeEqual(Buffer.from(inputCode), Buffer.from(expected))) {
      return true;
    }
  }
  return false;
}

// ─── SESSION TOKEN ────────────────────────────────────────────────────────────

interface SessionPayload {
  u: string;   // userId
  exp: number; // expiry timestamp
  iat: number; // issued at
}

/**
 * Crée un token de session signé HMAC.
 * Format : base64url(payload).signature
 */
export function createSessionToken(userId: string = 'admin'): string {
  const secret = getSecret('SESSION_SECRET', 'dev-session-secret-nature-clean-ncm');
  const payload: SessionPayload = {
    u: userId,
    exp: Date.now() + SESSION_DURATION_MS,
    iat: Date.now(),
  };
  const encodedPayload = base64url(JSON.stringify(payload));
  const sig = hmac(secret, encodedPayload);
  return `${encodedPayload}.${sig}`;
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

    // Comparaison en temps constant pour éviter timing attacks
    if (!crypto.timingSafeEqual(Buffer.from(providedSig, 'hex'), Buffer.from(expectedSig, 'hex'))) {
      return null;
    }

    const payload: SessionPayload = JSON.parse(fromBase64url(encodedPayload));

    // Vérifier l'expiration
    if (Date.now() > payload.exp) return null;
    if (!payload.u || !payload.exp || !payload.iat) return null;

    return payload;
  } catch {
    return null;
  }
}

// ─── COOKIES ─────────────────────────────────────────────────────────────────

/**
 * Parse l'en-tête Cookie en un objet clé/valeur
 */
export function parseCookies(cookieHeader: string | undefined): Record<string, string> {
  if (!cookieHeader) return {};
  return Object.fromEntries(
    cookieHeader.split(';').map((c) => {
      const [k, ...v] = c.trim().split('=');
      return [k.trim(), decodeURIComponent(v.join('=').trim())];
    })
  );
}

/**
 * Construit la valeur Set-Cookie pour la session admin
 */
export function buildSessionCookie(token: string): string {
  const maxAge = Math.floor(SESSION_DURATION_MS / 1000);
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${COOKIE_NAME}=${token}; HttpOnly; SameSite=Strict${secure}; Max-Age=${maxAge}; Path=/api/`;
}

/**
 * Construit la valeur Set-Cookie pour effacer la session
 */
export function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Max-Age=0; Path=/api/`;
}
