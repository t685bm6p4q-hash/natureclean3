/**
 * NATURE CLEAN — UTILITAIRE WHATSAPP PARTAGÉ (fichier privé)
 *
 * SEC-012 : Élimine la duplication entre send-quote.ts, send-whatsapp-alert.ts
 *           et log-crisis.ts — une seule source de vérité pour l'envoi WhatsApp.
 *
 * Variables d'environnement requises :
 *   CALLMEBOT_PHONE    — Numéro WhatsApp admin
 *   CALLMEBOT_APIKEY   — Clé CallMeBot
 *   WHAPI_TOKEN        — Token Whapi (fallback)
 *   WHAPI_PHONE        — Numéro Whapi (fallback)
 */

// ─── MAPPING LABELS ──────────────────────────────────────────────────────────

export const PAGE_LABELS: Record<string, string> = {
  '/': "Page d'accueil",
  '/services': 'Page services (catalogue)',
  '/services/entretien-bureaux': 'Entretien BUREAUX',
  '/services/nettoyage-commerces': 'Nettoyage COMMERCES',
  '/services/nettoyage-coproprietes': 'Nettoyage COPROPRIETES',
  '/services/nettoyage-chantiers': 'Nettoyage FIN DE CHANTIER',
  '/services/nettoyage-evenementiel': 'Nettoyage EVENEMENTIEL',
  '/services/remise-etat-sols': 'Remise en etat SOLS',
  '/services/nettoyage-vitre': 'Nettoyage VITRES',
  '/nettoyage-particuliers': 'Menage PARTICULIERS',
  '/devis': 'Page devis directe',
  '/contact': 'Page contact',
  '/realisations': 'Page realisations',
  '/blog': 'Blog',
};

export const SERVICE_LABELS: Record<string, string> = {
  bureaux: 'Entretien bureaux',
  coproprietes: 'Nettoyage coproprietes',
  'fin-chantier': 'Nettoyage fin de chantier',
  particuliers: 'Menage particuliers',
};

export const SURFACE_LABELS: Record<string, string> = {
  'moins-50': 'Moins de 50m²',
  '50-100': '50-100m²',
  '100-300': '100-300m²',
  'plus-300': 'Plus de 300m²',
};

export const FREQUENCE_LABELS: Record<string, string> = {
  ponctuel: 'Ponctuel',
  hebdomadaire: 'Hebdomadaire',
  quotidien: 'Quotidien',
};

// ─── PRIORITÉ BUSINESS ───────────────────────────────────────────────────────

export function getPriorityTag(sourcePage: string, service = ''): string {
  const highValuePages = [
    '/services/nettoyage-chantiers',
    '/services/entretien-bureaux',
    '/services/nettoyage-coproprietes',
  ];
  const highValueServices = ['fin-chantier', 'bureaux', 'coproprietes'];

  if (highValuePages.includes(sourcePage) || highValueServices.includes(service)) {
    return '🔴 PRIORITE HAUTE';
  }

  const medPages = [
    '/services/nettoyage-commerces',
    '/services/nettoyage-evenementiel',
    '/services/remise-etat-sols',
  ];
  if (medPages.includes(sourcePage)) return '🟠 PRIORITE MOYENNE';

  return '🟢 STANDARD';
}

// ─── FORMATAGE DES MESSAGES ───────────────────────────────────────────────────

export interface DevisData {
  nom?: string;
  prenom?: string;
  email?: string;
  telephone?: string;
  codePostal?: string;
  typeNettoyage?: string;
  surface?: string;
  frequence?: string;
  message?: string;
  source?: string;
  sourcePage?: string;
  referrer?: string;
  journey?: string;
  timestamp?: string;
}

export function formatDevisMessage(data: DevisData): string {
  const {
    nom = 'N/A',
    prenom = 'N/A',
    email = 'N/A',
    telephone = 'N/A',
    codePostal = 'N/A',
    typeNettoyage = '',
    surface = '',
    frequence = '',
    message = 'Aucun message',
    source = 'Site web Nature Clean',
    sourcePage = '/devis',
    referrer = '',
    journey = '',
    timestamp = '',
  } = data;

  const pageLabel = PAGE_LABELS[sourcePage] || sourcePage;
  const serviceLabel = SERVICE_LABELS[typeNettoyage] || typeNettoyage || 'Non précisé';
  const surfaceLabel = SURFACE_LABELS[surface] || surface || 'Non précisé';
  const frequenceLabel = FREQUENCE_LABELS[frequence] || frequence || 'Non précisé';
  const priority = getPriorityTag(sourcePage, typeNettoyage);

  const referrerInfo =
    referrer && !referrer.includes('natureclean.fr')
      ? `\n*Vient de:* ${referrer}`
      : '';

  const journeyInfo = journey ? `\n*Parcours:* ${journey}` : '';

  const dateStr = timestamp
    ? new Date(timestamp).toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })
    : new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' });

  return `${priority}
*NOUVEAU DEVIS NATURE CLEAN*

*Client:*
${prenom} ${nom}
Email: ${email}
Tel: ${telephone}
CP: ${codePostal}

*Demande:*
Service: ${serviceLabel}
Surface: ${surfaceLabel}
Frequence: ${frequenceLabel}

*Message:*
${message}

*Source:* ${source}
*Page visitee:* ${pageLabel}${referrerInfo}${journeyInfo}
*Recu le:* ${dateStr}

---
*Action:* ${priority.includes('HAUTE') ? "APPELER DANS L'HEURE ! Gros contrat potentiel." : 'Appeler sous 2h pour conversion maximale !'}`;
}

export interface SecurityEventData {
  level: string;
  message: string;
  data?: Record<string, unknown>;
  url: string;
  timestamp: string;
  userAgent: string;
}

export function formatSecurityAlert(event: SecurityEventData, site: string): string {
  const dataStr = event.data
    ? Object.entries(event.data)
        .map(([k, v]) => `  ${k}: ${String(v)}`)
        .join('\n')
    : 'Aucune donnée supplémentaire';

  return `🚨 *ALERTE SÉCURITÉ — ${site}*

*Message:* ${event.message}

*Détails:*
${dataStr}

*URL:* ${event.url}
*Date:* ${event.timestamp}
*User-Agent:* ${event.userAgent.substring(0, 100)}

---
*Action:* Vérifier immédiatement si une attaque est en cours.`;
}

export function formatErrorSummary(
  events: SecurityEventData[],
  site: string,
): string {
  const errorCount = events.filter((e) => e.level === 'error').length;
  const warnCount = events.filter((e) => e.level === 'warn').length;

  const topErrors = events
    .filter((e) => e.level === 'error')
    .slice(0, 3)
    .map((e) => `  - ${e.message.substring(0, 80)}`)
    .join('\n');

  return `⚠️ *ALERTE ERREURS — ${site}*

*Résumé:* ${errorCount} erreur(s), ${warnCount} avertissement(s)

*Erreurs principales:*
${topErrors || '  (aucune erreur critique)'}

*Date:* ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}`;
}

// ─── ENVOI WHATSAPP ───────────────────────────────────────────────────────────

/**
 * Envoie un message WhatsApp via CallMeBot, avec fallback Whapi.
 * Lit la configuration depuis les variables d'environnement Vercel.
 */
export async function sendWhatsApp(message: string): Promise<boolean> {
  const CALLMEBOT_PHONE = process.env.CALLMEBOT_PHONE || '';
  const CALLMEBOT_APIKEY = process.env.CALLMEBOT_APIKEY || '';
  const WHAPI_TOKEN = process.env.WHAPI_TOKEN || '';
  const WHAPI_PHONE = process.env.WHAPI_PHONE || '';

  // ── CallMeBot (prioritaire — gratuit illimité) ──
  if (CALLMEBOT_PHONE && CALLMEBOT_APIKEY) {
    try {
      const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(CALLMEBOT_PHONE)}&text=${encodeURIComponent(message)}&apikey=${encodeURIComponent(CALLMEBOT_APIKEY)}`;
      const res = await fetch(url);
      if (res.ok) {
        console.log('[WhatsApp] Envoyé via CallMeBot');
        return true;
      }
    } catch {
      console.warn('[WhatsApp] Échec CallMeBot, tentative Whapi...');
    }
  }

  // ── Whapi (fallback — 5000 msg/mois gratuits) ──
  if (WHAPI_TOKEN && WHAPI_PHONE) {
    try {
      const res = await fetch('https://gate.whapi.cloud/messages/text', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${WHAPI_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ to: WHAPI_PHONE, body: message }),
      });
      if (res.ok) {
        console.log('[WhatsApp] Envoyé via Whapi');
        return true;
      }
    } catch {
      console.error('[WhatsApp] Échec Whapi également');
    }
  }

  console.warn('[WhatsApp] Aucun service configuré (CALLMEBOT_PHONE ou WHAPI_TOKEN manquant)');
  return false;
}
