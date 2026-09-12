/**
 * Vercel Edge Function — VÉRIFICATION DE SESSION
 * ✅ Edge Runtime — Web Crypto API, zéro Node.js, ~0ms cold start
 *
 * Endpoint : GET /api/check-session
 * Réponse  : 200 { authenticated: true } ou 401 { authenticated: false }
 */

export const config = { runtime: 'edge' };

// ═══════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════

interface SessionPayload { u: string; exp: number; iat: number; }

// ═══════════════════════════════════════════════════════════════
// UTILITAIRES
// ═══════════════════════════════════════════════════════════════

function getSecret(envKey: string, fallback: string): string {
  const val = (process.env as Record<string, string | undefined>)[envKey];
  if (val && val.length >= 16) return val;
  if (process.env.NODE_ENV !== 'production') return fallback;
  throw new Error(`[NCM Auth] Variable d'environnement manquante : ${envKey}`);
}

/** HMAC-SHA256 via Web Crypto → hex string */
async function hmacHex(secret: string, data: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const sig = await crypto.subtle.sign('HMAC', key, enc.encode(data));
  return Array.from(new Uint8Array(sig))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Comparaison en temps constant (protection timing-attack) */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const enc = new TextEncoder();
  const aB = enc.encode(a);
  const bB = enc.encode(b);
  let diff = 0;
  for (let i = 0; i < aB.length; i++) diff |= aB[i] ^ bB[i];
  return diff === 0;
}

/** Base64url → UTF-8 string (sans Buffer) */
function fromBase64url(input: string): string {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
  return atob(padded);
}

function parseCookies(header: string | null): Record<string, string> {
  if (!header) return {};
  return Object.fromEntries(
    header.split(';').map((c) => {
      const [k, ...v] = c.trim().split('=');
      return [k.trim(), decodeURIComponent(v.join('=').trim())];
    }),
  );
}

async function verifySessionToken(token: string): Promise<SessionPayload | null> {
  if (!token || typeof token !== 'string') return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [encoded, sig] = parts;
  try {
    const secret = getSecret('SESSION_SECRET', 'dev-session-secret-nature-clean-ncm');
    const expectedSig = await hmacHex(secret, encoded);
    if (!timingSafeEqual(sig, expectedSig)) return null;
    const payload: SessionPayload = JSON.parse(fromBase64url(encoded));
    if (Date.now() > payload.exp || !payload.u) return null;
    return payload;
  } catch {
    return null;
  }
}

function json(body: object, status: number, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...extra },
  });
}

// ═══════════════════════════════════════════════════════════════
// HANDLER
// ═══════════════════════════════════════════════════════════════

const COOKIE_NAME = 'nc_adm';
const ALLOWED_ORIGINS = ['https://natureclean.fr', 'https://www.natureclean.fr'];

export default async function handler(request: Request): Promise<Response> {
  const origin = request.headers.get('origin') ?? '';

  const corsHeaders: Record<string, string> = {
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Credentials': 'true',
  };

  if (ALLOWED_ORIGINS.includes(origin)) {
    corsHeaders['Access-Control-Allow-Origin'] = origin;
  } else if (process.env.NODE_ENV !== 'production') {
    corsHeaders['Access-Control-Allow-Origin'] = 'http://localhost:5173';
  }

  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  if (request.method !== 'GET') {
    return json({ error: 'Method Not Allowed' }, 405, corsHeaders);
  }

  const cookies = parseCookies(request.headers.get('cookie'));
  const token = cookies[COOKIE_NAME];

  if (!token) {
    return json({ authenticated: false }, 401, corsHeaders);
  }

  const session = await verifySessionToken(token);
  if (!session) {
    return json({ authenticated: false }, 401, corsHeaders);
  }

  return json({ authenticated: true, expiresAt: session.exp }, 200, corsHeaders);
}
