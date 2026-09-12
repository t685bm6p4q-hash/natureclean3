/**
 * CONSTANTES METIER — Nature Clean Marseille
 * ============================================
 * Source unique de verite (Loi VII : Zero Magic Numbers).
 * Toute valeur business apparaissant dans 2+ fichiers DOIT vivre ici.
 *
 * Impact Lighthouse : 0 (tree-shaked, string inlinee par Vite).
 */

// ─── Coordonnees ────────────────────────────────────────
/** Telephone d'affichage (format humain) */
export const PHONE_DISPLAY = '04 84 89 68 75';

/** Telephone href (sans espaces) */
export const PHONE_HREF = 'tel:0484896875';

/** Telephone WhatsApp (format international) */
export const PHONE_WHATSAPP = '33783952804';

/** Email de contact */
export const EMAIL = 'contact@natureclean.fr';

/** Email href */
export const EMAIL_HREF = `mailto:${EMAIL}`;

// ─── URLs ───────────────────────────────────────────────
/** Domaine canonique (sans trailing slash) */
export const BASE_URL = 'https://natureclean.fr';

/** Logo pour JSON-LD et Open Graph */
export const LOGO_URL = `${BASE_URL}/logo.svg`;

/** Logo PNG pour les articles blog JSON-LD */
export const LOGO_PNG_URL = `${BASE_URL}/logo.png`;

// ─── Identite entreprise ─────��──────────────────────────
export const COMPANY_NAME = 'Nature Clean';
export const COMPANY_FULL_NAME = 'Nature Clean Marseille';
export const FOUNDING_YEAR = '2021';
export const SIRET = '89020726900022';

// ─── Geographie ─────────────────────────────────────────
export const PRIMARY_CITY = 'Marseille';
export const REGION = 'PACA';
export const DEPARTMENTS = ['13', '83', '06'] as const;

// ─── WhatsApp ───────────────────────────────────────────
export const WHATSAPP_DEFAULT_MESSAGE = 'Bonjour, je souhaite obtenir un devis pour vos services de nettoyage a Marseille.';
export const WHATSAPP_URL = `https://wa.me/${PHONE_WHATSAPP}?text=${encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE)}`;

// ─── Aria labels reutilisables ──────────────────────────
export const ARIA_PHONE = `Appeler Nature Clean au ${PHONE_DISPLAY}`;
export const ARIA_EMAIL = `Envoyer un email a ${EMAIL}`;
export const ARIA_WHATSAPP = 'Contactez-nous sur WhatsApp';