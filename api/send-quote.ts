/**
 * Vercel Serverless Function — SOUMISSION DE DEVIS
 * ✅ FICHIER AUTO-SUFFISANT — aucun import depuis _utils/
 *
 * Variables d'environnement Vercel requises :
 *   RESEND_API_KEY     → clé API Resend  (re_xxxxxxxxxxxx)
 *   RESEND_FROM_EMAIL  → expéditeur vérifié (ex: Devis Nature Clean <devis@natureclean.fr>)
 *   CONTACT_EMAIL      → destinataire des devis (ex: contact@natureclean.fr)
 */

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { z } from 'zod';

// ═══════════════════════════════════════════════════════════════
// UTILITAIRES INLINÉS (ex-_utils/sanitize)
// ═══════════════════════════════════════════════════════════════

function sanitize(input: string): string {
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/&[#\w]+;/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/(['";\\\x00])/g, '')
    .replace(/(--)|(\*\/)/g, '')
    .replace(/\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION|ALTER|EXEC|EXECUTE)\b/gi, '')
    .trim();
}

function maskEmail(email: string): string {
  return email.replace(/^(.).+(@.+\.)(.{2,})$/, '$1***$2***');
}

function maskPhone(phone: string): string {
  return '••' + phone.replace(/\D/g, '').slice(-4);
}

// ═══════════════════════════════════════════════════════════════
// RATE LIMITER IN-MEMORY INLINÉ (ex-_utils/ratelimit)
// ═══════════════════════════════════════════════════════════════

const _rlMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string, max: number, windowMs: number): { limited: boolean; retryAfter?: number } {
  const now = Date.now();
  const entry = _rlMap.get(ip);
  if (!entry || now > entry.resetAt) {
    _rlMap.set(ip, { count: 1, resetAt: now + windowMs });
    return { limited: false };
  }
  entry.count += 1;
  if (entry.count > max) {
    return { limited: true, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }
  return { limited: false };
}

// ═══════════════════════════════════════════════════════════════
// SCHÉMA ZOD — accepte les deux formulaires (QuoteForm + QuotePage)
// ═══════════════════════════════════════════════════════════════

const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
// Permissif côté serveur : la validation stricte est déjà faite côté client
const PHONE_REGEX = /^[\d\s().+\-/.]{7,30}$/;

const quotePayloadSchema = z.object({
  nom:                 z.string().min(1).max(200).transform(sanitize),
  prenom:              z.string().max(100).default('').transform(sanitize),
  email:               z.string().max(254).regex(EMAIL_REGEX).transform((v) => v.toLowerCase().trim()),
  telephone:           z.string().max(30).regex(PHONE_REGEX),
  codePostal:          z.string().max(10).default(''),
  adresse:             z.string().max(500).default('').transform(sanitize),
  typeNettoyage:       z.string().max(100).default('').transform(sanitize),
  typeSurfaceGraffiti: z.string().max(100).default('').transform(sanitize),
  surface:             z.string().max(20).default(''),
  frequence:           z.string().max(100).default('').transform(sanitize),
  message:             z.string().max(2000).default('').transform(sanitize),
  source:              z.string().max(200).default('Site web Nature Clean'),
  sourcePage:          z.string().max(200).default('/devis'),
  referrer:            z.string().max(500).default(''),
  journey:             z.string().max(2000).default(''),
  timestamp:           z.string().max(50).default(''),
});

type ValidatedQuotePayload = z.infer<typeof quotePayloadSchema>;

// ═══════════════════════════════════════════════════════════════
// LABELS LISIBLES POUR L'EMAIL
// ═══════════════════════════════════════════════════════════════

const SURFACE_LABELS: Record<string, string> = {
  'moins-50': 'Moins de 50 m²', '50-100': '50 – 100 m²',
  '100-300': '100 – 300 m²',    'plus-300': 'Plus de 300 m²',
};
const FREQUENCE_LABELS: Record<string, string> = {
  ponctuel: 'Ponctuel', hebdomadaire: 'Hebdomadaire', quotidien: 'Quotidien',
  'Intervention Unique': 'Intervention Unique ⚡', Hebdomadaire: 'Hebdomadaire', Quotidien: 'Quotidien',
};
const TYPE_LABELS: Record<string, string> = {
  bureaux: 'Entretien bureaux', coproprietes: 'Nettoyage copropriétés',
  'fin-chantier': 'Fin de chantier', particuliers: 'Ménage particuliers',
  Bureaux: 'Bureaux', Particuliers: 'Particuliers', Copros: 'Copropriétés',
  Chantier: 'Fin de chantier', 'Festival/Événement': 'Festival / Événement',
  Graffitis: 'Dégraffitage', 'Centre commercial': 'Centre commercial',
  Diogène: 'Syndrome de Diogène', Autres: 'Autres',
};

const labelSurface   = (r: string) => SURFACE_LABELS[r]   || (r ? `${r} m²` : 'Non précisé');
const labelFrequence = (r: string) => FREQUENCE_LABELS[r] || r || 'Non précisé';
const labelType      = (r: string) => TYPE_LABELS[r]      || r || 'Non précisé';
const labelDate      = (r: string) => {
  if (!r) return new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });
  try { return new Date(r).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' }); } catch { return r; }
};

const isHighPriority = (d: ValidatedQuotePayload) =>
  ['fin-chantier','bureaux','coproprietes','Chantier','Bureaux','Copros'].includes(d.typeNettoyage)
  || d.frequence === 'Intervention Unique';

// ═══════════════════════════════════════════════════════════════
// TEMPLATE EMAIL HTML
// ═══════════════════════════════════════════════════════════════

function buildEmailHtml(data: ValidatedQuotePayload): string {
  const urgent      = isHighPriority(data);
  const color       = urgent ? '#dc2626' : '#16a34a';
  const badge       = urgent ? '🚨 PRIORITÉ HAUTE' : '🟢 STANDARD';
  const clientName  = [data.prenom, data.nom].filter(Boolean).join(' ');
  const rs          = 'margin-bottom:8px;color:#374151;';
  const ls          = 'font-weight:600;color:#111827;';
  const sec = (t: string) =>
    `<h2 style="color:#111827;border-bottom:2px solid #e5e7eb;padding-bottom:8px;margin:24px 0 12px;">${t}</h2>`;
  const row = (label: string, val: string, link?: 'tel' | 'mail') => {
    if (!val) return '';
    const d = link === 'tel'  ? `<a href="tel:${val}" style="color:${color};font-weight:bold;">${val}</a>`
            : link === 'mail' ? `<a href="mailto:${val}" style="color:${color};">${val}</a>`
            : val;
    return `<p style="${rs}"><span style="${ls}">${label} :</span> ${d}</p>`;
  };

  return `<div style="font-family:Arial,sans-serif;max-width:620px;margin:0 auto;border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">
    <div style="background:${color};color:white;padding:24px;text-align:center;">
      <h1 style="margin:0;font-size:22px;">🌿 NOUVEAU DEVIS — NATURE CLEAN</h1>
      <p style="margin:6px 0 0;font-size:14px;opacity:.9;">${badge} · Reçu le ${labelDate(data.timestamp)}</p>
    </div>
    <div style="padding:24px;background:#f9fafb;">
      ${sec('👤 Coordonnées du client')}
      ${row('Nom', clientName)}
      ${row('Téléphone', data.telephone, 'tel')}
      ${row('Email', data.email, 'mail')}
      ${data.adresse ? row("Adresse d'intervention", data.adresse) : ''}
      ${data.codePostal && !data.adresse ? row('Code postal', data.codePostal) : ''}
      ${sec('🏢 Détails de la prestation')}
      ${row('Type de prestation', labelType(data.typeNettoyage))}
      ${data.typeSurfaceGraffiti ? row('Surface graffiti', data.typeSurfaceGraffiti) : ''}
      ${row('Surface', labelSurface(data.surface))}
      ${row('Fréquence', labelFrequence(data.frequence))}
      ${sec('💬 Message complémentaire')}
      <div style="background:white;padding:14px 18px;border-radius:8px;border-left:4px solid ${color};color:#374151;font-style:italic;">
        ${data.message || 'Aucun message laissé par le client.'}
      </div>
      ${sec("📊 Parcours d'acquisition")}
      ${row('Source', data.source)}
      ${row('Page de provenance', data.sourcePage)}
      ${data.referrer ? row('Referrer', data.referrer) : ''}
    </div>
    <div style="background:#f3f4f6;padding:14px 24px;text-align:center;font-size:12px;color:#6b7280;">
      Nature Clean Marseille · Répondez directement à cet email pour joindre le client.
    </div>
  </div>`;
}

// ═══════════════════════════════════════════════════════════════
// ENVOI EMAIL VIA RESEND
// ═══════════════════════════════════════════════════════════════

async function sendEmailAlert(data: ValidatedQuotePayload): Promise<boolean> {
  const RESEND_API_KEY  = process.env.RESEND_API_KEY  || '';
  const RESEND_FROM     = process.env.RESEND_FROM_EMAIL || 'Devis Nature Clean <devis@natureclean.fr>';
  const CONTACT_EMAIL   = process.env.CONTACT_EMAIL   || '';

  if (!RESEND_API_KEY) {
    console.error('[send-quote][RESEND] ❌ RESEND_API_KEY manquante.');
    return false;
  }
  if (!CONTACT_EMAIL) {
    console.error('[send-quote][RESEND] ❌ CONTACT_EMAIL manquante.');
    return false;
  }

  const urgent  = isHighPriority(data);
  const subject = `${urgent ? '🚨 URGENT — ' : ''}Nouveau devis : ${labelType(data.typeNettoyage)} (${data.sourcePage})`;

  console.log('[send-quote][RESEND] → Envoi', JSON.stringify({
    from: RESEND_FROM, to: CONTACT_EMAIL, subject,
    apiKeyPrefix: RESEND_API_KEY.slice(0, 8) + '…',
  }));

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${RESEND_API_KEY}` },
      body: JSON.stringify({ from: RESEND_FROM, to: [CONTACT_EMAIL], subject, html: buildEmailHtml(data) }),
    });

    const body = await res.text().catch(() => '');

    if (!res.ok) {
      console.error('[send-quote][RESEND] ❌ Rejet HTTP', JSON.stringify({
        status: res.status, statusText: res.statusText,
        from: RESEND_FROM, to: CONTACT_EMAIL,
        apiKeyPrefix: RESEND_API_KEY.slice(0, 8) + '…',
        resendBody: body,
        hint: res.status === 403 ? 'Domaine non vérifié ou clé invalide'
            : res.status === 422 ? 'Payload mal formaté (from/to/subject)'
            : res.status === 401 ? 'RESEND_API_KEY incorrecte ou révoquée'
            : 'Voir resendBody',
      }));
      return false;
    }

    console.log('[send-quote][RESEND] ✅ Email envoyé :', body);
    return true;
  } catch (err) {
    console.error('[send-quote][RESEND] ❌ Erreur réseau :', err);
    return false;
  }
}

// ═══════════════════════════════════════════════════════════════
// HANDLER PRINCIPAL
// ═══════════════════════════════════════════════════════════════

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // ── CORS ──────────────────────────────────────────────────
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

    // ── Rate limiting ─────────────────────────────────────────
    const ip = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() || 'unknown';
    const rl = checkRateLimit(ip, 5, 60_000); // 5 req / 1 min
    if (rl.limited) {
      return res.status(429).json({ error: 'Trop de demandes. Réessayez dans une minute.', retryAfter: rl.retryAfter });
    }

    // ── Validation Zod ────────────────────────────────────────
    const parsed = quotePayloadSchema.safeParse(req.body);
    if (!parsed.success) {
      const issues = parsed.error.issues.map((i) => ({ field: i.path.join('.') || '(racine)', message: i.message, code: i.code }));
      console.warn('[send-quote][ZOD] ❌ Payload invalide :', JSON.stringify(issues));
      return res.status(400).json({ error: 'Données invalides', issues });
    }

    const data = parsed.data;

    // ── Log pseudonymisé ──────────────────────────────────────
    console.log('[send-quote][OK]', JSON.stringify({
      emailMasked: maskEmail(data.email), telMasked: maskPhone(data.telephone),
      typeNettoyage: data.typeNettoyage, surface: data.surface,
      frequence: data.frequence, sourcePage: data.sourcePage,
    }));

    // ── Envoi email ───────────────────────────────────────────
    const emailSent = await sendEmailAlert(data);

    return res.status(200).json({
      success: true,
      message: 'Votre demande de devis a bien été envoyée.',
      emailNotified: emailSent,
      ref: `NCM-${Date.now().toString(36).toUpperCase()}`,
    });

  } catch (err: unknown) {
    console.error('[send-quote][FATAL]', {
      message: err instanceof Error ? err.message : String(err),
      stack:   err instanceof Error ? err.stack   : undefined,
      body:    JSON.stringify(req.body).slice(0, 500),
    });
    return res.status(500).json({ error: 'Erreur interne. Veuillez réessayer.' });
  }
}
