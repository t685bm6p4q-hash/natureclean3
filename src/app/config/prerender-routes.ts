/**
 * Routes SSG — pré-rendues en HTML statique lors du `vite build`.
 * Source unique : le plugin Vite lit cette liste au closeBundle.
 *
 * Vercel sert dist/{route}/index.html AVANT le rewrite SPA (réservé à /admin).
 * Les URLs inconnues tombent sur dist/404.html avec un vrai HTTP 404.
 *
 * Doit rester aligné avec les URLs indexables de scripts/generate-sitemap.ts.
 */

/** Pages indexables du sitemap — HTML complet pour Googlebot, sans dépendre du JS. */
export const PRERENDER_ROUTES: readonly string[] = [
  // ── Accueil ──
  '/',

  // ── Pages principales ──
  '/services',
  '/devis',
  '/contact',
  '/a-propos',
  '/realisations',
  '/zones-intervention',
  '/politique-de-confidentialite',
  '/mentions-legales',
  '/nettoyage-particuliers',

  // ── Toutes les pages services ──
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

  // ── Blog (index + 9 articles) ──
  '/blog',
  '/blog/etat-des-lieux-sortie-marseille',
  '/blog/nettoyage-apres-sinistre',
  '/blog/nettoyage-ecologique-produits-bio-entreprise',
  '/blog/faq-nettoyage-terrasse-marseille',
  '/blog/normes-nettoyage-chantier-2025',
  '/blog/checklist-nettoyage-copropriete-syndic',
  '/blog/budget-nettoyage-bureaux-marseille-2026',
  '/blog/nettoyage-graffitis-carrefour-marseille',
  '/blog/nettoyage-galerie-art-marseille',

  // ── 7 landing pages geo (Bouches-du-Rhône) ──
  '/nettoyage-bureaux-marseille',
  '/nettoyage-fin-chantier-marseille',
  '/nettoyage-industriel-marseille',
  '/nettoyage-medical-marseille',
  '/nettoyage-bureaux-aix-en-provence',
  '/nettoyage-coproprietes-aubagne',
  '/nettoyage-coproprietes-la-ciotat',
] as const;
