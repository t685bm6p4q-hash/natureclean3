/**
 * Plugin Vite natif — prerender SSG post-build (closeBundle).
 *
 * Après `vite build`, lance vite preview + Puppeteer pour capturer
 * le HTML complet (H1, meta, footer, JSON-LD) de chaque route SEO.
 *
 * Vercel sert dist/{route}/index.html avant le fallback SPA.
 *
 * Désactiver : PRERENDER_SKIP=1 vite build
 */

import { resolve } from 'node:path';
import type { Plugin } from 'vite';
import { runPrerender } from './prerender-engine';

export function vitePrerenderPlugin(): Plugin {
  let outDir = 'dist';

  return {
    name: 'vite-plugin-natureclean-prerender',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir;
    },
    async closeBundle() {
      if (process.env.PRERENDER_SKIP === '1') {
        console.log('⏭  Prerender ignoré (PRERENDER_SKIP=1)');
        return;
      }

      await runPrerender({
        distDir: resolve(process.cwd(), outDir),
      });
    },
  };
}
