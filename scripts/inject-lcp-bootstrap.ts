/**
 * Post-prerender — LCP mobile accueil : bootstrap hero + allègement du doublon React.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

function extractFirst(html: string, re: RegExp): string | null {
  const m = html.match(re);
  return m ? m[0] : null;
}

/** Une seule preconnect Cloudinary (Lighthouse signale les doublons inutilisés). */
function dedupeCloudinaryHints(html: string): string {
  let preconnectKept = false;
  html = html.replace(
    /<link rel="preconnect" href="https:\/\/res.cloudinary.com"[^>]*>\s*/gi,
    () => {
      if (preconnectKept) return '';
      preconnectKept = true;
      return '<link rel="preconnect" href="https://res.cloudinary.com" crossorigin />\n    ';
    },
  );
  html = html.replace(/<link rel="dns-prefetch" href="https:\/\/res.cloudinary.com"[^>]*>\s*/gi, '');
  return html;
}

function dedupePreloadById(html: string, id: string): string {
  let kept = false;
  const re = new RegExp(`<link[\\s\\S]*?id="${id}"[\\s\\S]*?/>\\s*`, 'gi');
  return html.replace(re, (block) => {
    if (kept) return '';
    kept = true;
    return block;
  });
}

/** Le hero React ne doit pas voler le LCP au bootstrap (#ncm-lcp-hero). */
function deferReactHeroInStaticHtml(html: string): string {
  return html.replace(/<img([^>]*\sid="ncm-hero-react"[^>]*)>/gi, (_full, attrs: string) => {
    let next = attrs;
    if (!/\bclass="/.test(next)) {
      next += ' class="opacity-0"';
    } else if (!next.includes('opacity-0')) {
      next = next.replace(/\bclass="/, 'class="opacity-0 ');
    }
    next = next.replace(/\bfetchpriority="high"/i, 'fetchpriority="low"');
    return `<img${next}>`;
  });
}

export function injectLcpBootstrapIntoHome(distDir: string, templateHtmlPath: string): void {
  const homePath = join(distDir, 'index.html');
  if (!existsSync(homePath)) {
    console.warn('⏭  inject LCP — pas de dist/index.html');
    return;
  }

  let html = readFileSync(homePath, 'utf8');
  const template = readFileSync(resolve(templateHtmlPath), 'utf8');

  if (!html.includes('id="ncm-lcp-hero"')) {
    const preload = extractFirst(
      template,
      /<link[\s\S]*?id="ncm-lcp-preload"[\s\S]*?\/>/,
    );
    const heroImg = extractFirst(template, /<img[\s\S]*?id="ncm-lcp-hero"[\s\S]*?\/>/);
    const bootScript = extractFirst(
      template,
      /<script>\s*\(function \(\) \{[\s\S]*?ncm-lcp-hero[\s\S]*?\}\)\(\);\s*<\/script>/,
    );

    if (!heroImg) {
      console.warn('⚠ inject LCP — bloc img introuvable dans index.html template');
      return;
    }

    if (preload && !html.includes('id="ncm-lcp-preload"')) {
      html = html.replace('</head>', `    ${preload}\n  </head>`);
    }

    if (!html.includes('#ncm-lcp-hero{')) {
      const heroCss =
        '#ncm-lcp-hero{position:fixed;top:0;left:0;width:100%;height:max(420px,58vh);object-fit:cover;object-position:center 30%;z-index:0;pointer-events:none}';
      if (html.includes('html,body{background:#111827}')) {
        html = html.replace(
          'html,body{background:#111827}',
          `html,body{background:#111827}${heroCss}`,
        );
      } else if (html.includes('</head>')) {
        html = html.replace(
          '</head>',
          `    <style>${heroCss}#root{position:relative;z-index:1}</style>\n  </head>`,
        );
      }
    }

    const rootOpen = html.match(/<div id="root"[^>]*>/);
    if (!rootOpen) {
      console.warn('⚠ inject LCP — #root introuvable');
      return;
    }

    const injection = bootScript
      ? `    ${heroImg}\n    ${bootScript}\n    ${rootOpen[0]}`
      : `    ${heroImg}\n    ${rootOpen[0]}`;

    html = html.replace(rootOpen[0], injection);
  }

  html = dedupeCloudinaryHints(html);
  html = dedupePreloadById(html, 'ncm-lcp-preload');
  html = deferReactHeroInStaticHtml(html);

  writeFileSync(homePath, html, 'utf8');
  console.log('✓ inject LCP — bootstrap + dédup hints + hero React différé (dist/index.html)');
}
