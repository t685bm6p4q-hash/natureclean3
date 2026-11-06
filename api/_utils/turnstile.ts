/**
 * Vérification Cloudflare Turnstile (siteverify).
 * Utilisée par send-quote.ts et forward-quote.ts.
 *
 * Env : TURNSTILE_SECRET_KEY (Vercel uniquement, jamais préfixée VITE_)
 */

export async function verifyTurnstileToken(
  token: string,
  ip: string,
): Promise<{ ok: boolean; skipped: boolean }> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.warn('[turnstile] TURNSTILE_SECRET_KEY absente — jeton non vérifié.');
    return { ok: true, skipped: true };
  }
  if (!token || token.length > 2048) return { ok: false, skipped: false };

  const body = new URLSearchParams();
  body.set('secret', secret);
  body.set('response', token);
  if (ip && ip !== 'unknown') body.set('remoteip', ip);

  const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });
  if (!verifyRes.ok) {
    console.error('[turnstile] siteverify HTTP', verifyRes.status);
    return { ok: false, skipped: false };
  }

  const data = (await verifyRes.json()) as { success?: boolean; 'error-codes'?: string[] };
  if (!data.success) {
    console.warn('[turnstile] rejeté', data['error-codes'] ?? []);
  }
  return { ok: data.success === true, skipped: false };
}
