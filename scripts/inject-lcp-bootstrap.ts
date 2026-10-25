/**
 * Post-prerender — LCP mobile accueil : bootstrap hero + allègement du doublon React.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  BOOTSTRAP_HERO_CSS,
  BOOTSTRAP_HERO_SCRIPT,
  buildBootstrapHeroImgTag,
  buildBootstrapPreloadLink,
} from './lcp-hero-bootstrap-html';

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

function deferReactHeroInStaticHtml(html: string): string {
  return html.replace(/<img([^>]*\sid="ncm-hero-react"[^>]*)>/gi, (_full, attrs: string) => {
    let next = attrs.replace(/\bfetchpriority="low"/gi, 'fetchpriority="high"');
    next = next.replace(/\bopacity-100\b/g, '');
    if (!/\bclass="/.test(next)) {
      next += ' class="opacity-0"';
    } else if (!next.includes('opacity-0')) {
      next = next.replace(/\bclass="/, 'class="opacity-0 ');
    }
    return `<img${next}>`;
  });
}

function stripExistingBootstrap(html: string): string {
  return html
    .replace(/<img[^>]*\sid="ncm-lcp-hero"[^>]*>\s*/gi, '')
    .replace(/<script>\s*\(function \(\) \{\s*var path = location\.pathname;[\s\S]*?ncm-lcp-preload[\s\S]*?\}\)\(\);\s*<\/script>\s*/gi, '');
}

function ensureBootstrapBeforeRoot(html: string): string {
  const rootOpen = html.match(/<div id="root"[^>]*>/);
  if (!rootOpen) {
    console.warn('⚠ inject LCP — #root introuvable');
    return html;
  }

  html = stripExistingBootstrap(html);
  const injection = `    ${buildBootstrapHeroImgTag()}\n    ${BOOTSTRAP_HERO_SCRIPT}\n    ${rootOpen[0]}`;
  return html.replace(rootOpen[0], injection);
}

function ensureHeadHints(html: string): string {
  if (!html.includes('id="ncm-lcp-preload"')) {
    html = html.replace('</head>', `    ${buildBootstrapPreloadLink()}\n  </head>`);
  }

  if (!html.includes('#ncm-lcp-hero{')) {
    if (html.includes('html,body{background:#111827}')) {
      html = html.replace(
        'html,body{background:#111827}',
        `html,body{background:#111827}${BOOTSTRAP_HERO_CSS}`,
      );
    } else if (html.includes('</head>')) {
      html = html.replace(
        '</head>',
        `    <style>${BOOTSTRAP_HERO_CSS}#root{position:relative;min-height:100vh}</style>\n  </head>`,
      );
    }
  }

  return html;
}

export function injectLcpBootstrapIntoHome(distDir: string): void {
  const homePath = join(distDir, 'index.html');
  if (!existsSync(homePath)) {
    console.warn('⏭  inject LCP — pas de dist/index.html');
    return;
  }

  let html = readFileSync(homePath, 'utf8');

  html = ensureHeadHints(html);
  html = ensureBootstrapBeforeRoot(html);
  html = dedupeCloudinaryHints(html);
  html = dedupePreloadById(html, 'ncm-lcp-preload');
  html = deferReactHeroInStaticHtml(html);

  writeFileSync(homePath, html, 'utf8');
  console.log('✓ inject LCP — bootstrap HTML + hero React différé (dist/index.html)');
}
