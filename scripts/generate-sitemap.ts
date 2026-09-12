/**
 * NCM-044 — Génération automatique du sitemap.xml
 *
 * Génère public/sitemap.xml avec des lastmod précis par page.
 * Exécuté automatiquement lors du build Vercel via :
 *   buildCommand: "npm run build:sitemap && npm run build"
 *
 * Usage manuel : npm run build:sitemap
 */

import { writeFileSync } from 'fs';
import { resolve } from 'path';

const TODAY = new Date().toISOString().slice(0, 10);
const BASE_URL = 'https://natureclean.fr';

interface SitemapEntry {
  path: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
  lastmod?: string;
}

const ENTRIES: SitemapEntry[] = [
  // ── Pages principales ──
  { path: '/', changefreq: 'weekly', priority: '1.0', lastmod: '2026-09-12' },
  { path: '/services', changefreq: 'monthly', priority: '0.9', lastmod: '2026-09-12' },
  { path: '/devis', changefreq: 'monthly', priority: '0.9', lastmod: '2026-09-12' },
  { path: '/contact', changefreq: 'monthly', priority: '0.8', lastmod: '2026-09-12' },
  { path: '/a-propos', changefreq: 'monthly', priority: '0.6', lastmod: '2026-09-12' },
  { path: '/realisations', changefreq: 'weekly', priority: '0.7', lastmod: '2026-09-12' },
  { path: '/actualites', changefreq: 'weekly', priority: '0.6', lastmod: '2026-09-12' },
  { path: '/zones-intervention', changefreq: 'monthly', priority: '0.8', lastmod: '2026-09-12' },
  { path: '/politique-de-confidentialite', changefreq: 'yearly', priority: '0.3', lastmod: '2026-04-29' },

  // ── 7 services clés + autres prestations ──
  { path: '/services/entretien-bureaux', changefreq: 'monthly', priority: '0.9', lastmod: '2026-09-12' },
  { path: '/services/nettoyage-commerces', changefreq: 'monthly', priority: '0.9', lastmod: '2026-09-12' },
  { path: '/services/nettoyage-coproprietes', changefreq: 'monthly', priority: '0.9', lastmod: '2026-09-12' },
  { path: '/services/nettoyage-chantiers', changefreq: 'monthly', priority: '0.9', lastmod: '2026-09-12' },
  { path: '/services/remise-etat-sols', changefreq: 'monthly', priority: '0.8', lastmod: '2026-09-12' },
  { path: '/services/nettoyage-graffitis', changefreq: 'monthly', priority: '0.8', lastmod: '2026-09-12' },
  { path: '/services/nettoyage-diogene', changefreq: 'monthly', priority: '0.8', lastmod: '2026-09-12' },
  { path: '/services/nettoyage-evenementiel', changefreq: 'monthly', priority: '0.7', lastmod: '2026-05-10' },
  { path: '/services/nettoyage-vitre', changefreq: 'monthly', priority: '0.7', lastmod: '2026-05-10' },
  { path: '/services/nettoyage-gros-chantiers', changefreq: 'monthly', priority: '0.7', lastmod: '2026-04-29' },
  { path: '/nettoyage-particuliers', changefreq: 'monthly', priority: '0.8', lastmod: '2026-05-10' },

  // ── Blog (9 articles + index) ──
  { path: '/blog', changefreq: 'weekly', priority: '0.7', lastmod: '2026-05-08' },
  { path: '/blog/etat-des-lieux-sortie-marseille', changefreq: 'monthly', priority: '0.6', lastmod: '2026-03-19' },
  { path: '/blog/nettoyage-apres-sinistre', changefreq: 'monthly', priority: '0.6', lastmod: '2026-03-19' },
  { path: '/blog/nettoyage-ecologique-produits-bio-entreprise', changefreq: 'monthly', priority: '0.6', lastmod: '2026-03-19' },
  { path: '/blog/faq-nettoyage-terrasse-marseille', changefreq: 'monthly', priority: '0.7', lastmod: '2026-05-08' },
  { path: '/blog/normes-nettoyage-chantier-2025', changefreq: 'monthly', priority: '0.7', lastmod: '2026-05-08' },
  { path: '/blog/checklist-nettoyage-copropriete-syndic', changefreq: 'monthly', priority: '0.7', lastmod: '2026-05-08' },
  { path: '/blog/budget-nettoyage-bureaux-marseille-2026', changefreq: 'monthly', priority: '0.7', lastmod: '2026-05-08' },
  { path: '/blog/nettoyage-graffitis-carrefour-marseille', changefreq: 'monthly', priority: '0.6', lastmod: '2026-05-08' },
  { path: '/blog/nettoyage-galerie-art-marseille', changefreq: 'monthly', priority: '0.6', lastmod: '2026-05-08' },

  // ── Landing pages géo conservées (Marseille, Aix, Aubagne, La Ciotat) ──
  { path: '/nettoyage-bureaux-marseille', changefreq: 'monthly', priority: '0.9', lastmod: '2026-09-12' },
  { path: '/nettoyage-fin-chantier-marseille', changefreq: 'monthly', priority: '0.9', lastmod: '2026-09-12' },
  { path: '/nettoyage-industriel-marseille', changefreq: 'monthly', priority: '0.8', lastmod: '2026-09-12' },
  { path: '/nettoyage-medical-marseille', changefreq: 'monthly', priority: '0.8', lastmod: '2026-09-12' },
  { path: '/nettoyage-bureaux-aix-en-provence', changefreq: 'monthly', priority: '0.7', lastmod: '2026-05-08' },
  { path: '/nettoyage-coproprietes-aubagne', changefreq: 'monthly', priority: '0.7', lastmod: '2026-05-08' },
  { path: '/nettoyage-coproprietes-la-ciotat', changefreq: 'monthly', priority: '0.7', lastmod: '2026-05-08' },
];

function buildUrl(entry: SitemapEntry): string {
  const lastmod = entry.lastmod ?? TODAY;
  return [
    `  <url>`,
    `    <loc>${BASE_URL}${entry.path}</loc>`,
    `    <lastmod>${lastmod}</lastmod>`,
    `    <changefreq>${entry.changefreq}</changefreq>`,
    `    <priority>${entry.priority}</priority>`,
    `  </url>`,
  ].join('\n');
}

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ``,
  `  <!-- ═══ Généré automatiquement le ${TODAY} par scripts/generate-sitemap.ts ═══ -->`,
  `  <!-- ═══ ${ENTRIES.length} URLs indexées — Zone : Marseille, Aix, Aubagne, La Ciotat ═══ -->`,
  ``,
  ...ENTRIES.map(buildUrl),
  ``,
  `</urlset>`,
].join('\n');

const outputPath = resolve(process.cwd(), 'public/sitemap.xml');
writeFileSync(outputPath, xml, 'utf-8');

console.log(`✅ Sitemap généré : public/sitemap.xml`);
console.log(`   → ${ENTRIES.length} URLs | build date : ${TODAY}`);
