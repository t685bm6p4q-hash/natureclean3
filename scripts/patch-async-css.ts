/**
 * Post-build — CSS non bloquant sur les index.html (LCP/FCP accueil).
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function listIndexHtmlFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...listIndexHtmlFiles(full));
    else if (name === 'index.html') out.push(full);
  }
  return out;
}

const STYLESHEET_RE =
  /<link rel="stylesheet"[^>]*\shref="(\/assets\/[^"]+\.css)"[^>]*>/gi;

const ENTRY_MODULE_RE =
  /<script type="module" crossorigin src="(\/assets\/index-[^"]+\.js)"><\/script>/;

export function patchDistHtmlAsyncCss(distDir: string): void {
  const files = listIndexHtmlFiles(distDir);
  if (files.length === 0) return;

  for (const file of files) {
    let html = readFileSync(file, 'utf8');
    let changed = false;

    html = html.replace(STYLESHEET_RE, (match, href: string) => {
      if (html.includes(`as="style"`) && html.includes(href)) return match;
      changed = true;
      return [
        `<link rel="preload" href="${href}" as="style" crossorigin onload="this.onload=null;this.rel='stylesheet'">`,
        `<noscript><link rel="stylesheet" crossorigin href="${href}"></noscript>`,
      ].join('\n    ');
    });

    const entry = html.match(ENTRY_MODULE_RE);
    if (entry && !html.includes(`rel="modulepreload" href="${entry[1]}"`)) {
      changed = true;
      html = html.replace(
        ENTRY_MODULE_RE,
        `<link rel="modulepreload" crossorigin href="${entry[1]}">\n    ${entry[0]}`,
      );
    }

    if (changed) writeFileSync(file, html, 'utf8');
  }

  console.log(`✓ CSS async + modulepreload — ${files.length} fichier(s) HTML`);
}
