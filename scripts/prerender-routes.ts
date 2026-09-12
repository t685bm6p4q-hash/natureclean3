/**
 * CLI standalone — relance le prerender sans rebuild complet.
 * Usage : npm run prerender
 */

import { resolve } from 'node:path';
import { runPrerender } from './prerender-engine';

if (process.env.PRERENDER_SKIP === '1') {
  console.log('⏭  Prerender ignoré (PRERENDER_SKIP=1)');
  process.exit(0);
}

runPrerender({ distDir: resolve(process.cwd(), 'dist') }).catch((error: unknown) => {
  console.error('❌ Erreur prerender :', error);
  process.exit(1);
});
