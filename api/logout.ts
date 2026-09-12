/**
 * Vercel Serverless Function — DÉCONNEXION ADMIN
 * ✅ FICHIER AUTO-SUFFISANT — aucun import depuis _utils/
 *
 * Endpoint : POST /api/logout
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';

// ═══════════════════════════════════════════════════════════════
// UTILITAIRES INLINÉS (ex-_utils/auth → clearSessionCookie)
// ═══════════════════════════════════════════════════════════════

const COOKIE_NAME = 'nc_adm';

function clearSessionCookie(): string {
  return `${COOKIE_NAME}=; HttpOnly; SameSite=Strict; Secure; Max-Age=0; Path=/api/`;
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

  res.setHeader('Set-Cookie', clearSessionCookie());
  return res.status(200).json({ success: true, message: 'Déconnecté avec succès.' });
}
