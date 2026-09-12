/**
 * Routes SSG — pré-rendues en HTML statique lors du `vite build`.
 * Source unique : le plugin Vite lit cette liste au closeBundle.
 *
 * Vercel sert dist/{route}/index.html AVANT le rewrite SPA catch-all.
 */

/** Accueil + tous les /services/* + 7 landing pages geo conservées */
export const PRERENDER_ROUTES: readonly string[] = [
  // ── Accueil ──
  '/',

  // ── Toutes les pages services ──
  '/services',
  '/services/entretien-bureaux',
  '/services/nettoyage-commerces',
  '/services/nettoyage-coproprietes',
  '/services/nettoyage-chantiers',
  '/services/nettoyage-evenementiel',
  '/services/remise-etat-sols',
  '/services/nettoyage-graffitis',
  '/services/nettoyage-vitre',
  '/services/nettoyage-diogene',
  '/services/nettoyage-gros-chantiers',

  // ── 7 landing pages geo (Bouches-du-Rhône) ──
  '/nettoyage-bureaux-marseille',
  '/nettoyage-fin-chantier-marseille',
  '/nettoyage-industriel-marseille',
  '/nettoyage-medical-marseille',
  '/nettoyage-bureaux-aix-en-provence',
  '/nettoyage-coproprietes-aubagne',
  '/nettoyage-coproprietes-la-ciotat',
] as const;
