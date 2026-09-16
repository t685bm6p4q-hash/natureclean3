/**
 * NCM-044 — Génération automatique du sitemap.xml
 *
 * Source unique des URLs : PRERENDER_ROUTES (pages indexables).
 * URLs absolues vers https://natureclean.fr (domaine canonique, sans www).
 *
 * Exécuté au build Vercel : npm run build:sitemap && npm run build
 */

import { writeFileSync } from 'fs';
import { resolve } from 'path';
import { PRERENDER_ROUTES } from '../src/app/config/prerender-routes';
import { BASE_URL } from '../src/app/utils/constants';

const TODAY = new Date().toISOString().slice(0, 10);

function metaFor(path: string): { changefreq: string; priority: string } {
  if (path === '/') return { changefreq: 'weekly', priority: '1.0' };
  if (path === '/devis' || path === '/contact' || path === '/services') {
    return { changefreq: 'monthly', priority: '0.9' };
  }
  if (path.startsWith('/services/')) return { changefreq: 'monthly', priority: '0.9' };
  if (path.startsWith('/nettoyage-bureaux-marseille') || path.startsWith('/nettoyage-fin-chantier')) {
    return { changefreq: 'monthly', priority: '0.9' };
  }
  if (path.startsWith('/blog')) return { changefreq: 'weekly', priority: path === '/blog' ? '0.7' : '0.6' };
  if (path === '/politique-de-confidentialite' || path === '/mentions-legales') {
    return { changefreq: 'yearly', priority: '0.3' };
  }
  return { changefreq: 'monthly', priority: '0.8' };
}

const xml = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
  ``,
  `  <!-- ═══ Généré automatiquement le ${TODAY} par scripts/generate-sitemap.ts ═══ -->`,
  `  <!-- ═══ ${PRERENDER_ROUTES.length} URLs — ${BASE_URL} ═══ -->`,
  ``,
  ...PRERENDER_ROUTES.map((path) => {
    const loc = path === '/' ? `${BASE_URL}/` : `${BASE_URL}${path}`;
    const { changefreq, priority } = metaFor(path);
    return [
      `  <url>`,
      `    <loc>${loc}</loc>`,
      `    <lastmod>${TODAY}</lastmod>`,
      `    <changefreq>${changefreq}</changefreq>`,
      `    <priority>${priority}</priority>`,
      `  </url>`,
    ].join('\n');
  }),
  ``,
  `</urlset>`,
].join('\n');

const outputPath = resolve(process.cwd(), 'public/sitemap.xml');
writeFileSync(outputPath, xml, 'utf-8');

console.log(`✅ Sitemap généré : public/sitemap.xml`);
console.log(`   → ${PRERENDER_ROUTES.length} URLs | ${BASE_URL} | ${TODAY}`);
