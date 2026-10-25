/**
 * Post-prerender — LCP accueil : #ncm-lcp-hero dans .ncm-home-hero (visible sans React).
 * Retire #ncm-hero-react du HTML statique pour que Lighthouse ne lie pas le LCP à l’hydratation.
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  BOOTSTRAP_HERO_CSS,
  buildBootstrapHeroImgTag,
  buildBootstrapPreloadLink,
} from './lcp-hero-bootstrap-html';

const HERO_SECTION_RE = /(<section[^>]*\bncm-home-hero\b[^>]*>)/i;

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

function stripAllLcpHeroNodes(html: string): string {
  return html
    .replace(/<img[^>]*\sid="ncm-lcp-hero"[^>]*>\s*/gi, '')
    .replace(/<img[^>]*\sid="ncm-hero-react"[^>]*>\s*/gi, '');
}

function injectBootstrapInsideHeroSection(html: string): string {
  if (!HERO_SECTION_RE.test(html)) {
    console.warn('⚠ inject LCP — section .ncm-home-hero introuvable');
    return html;
  }

  html = stripAllLcpHeroNodes(html);

  return html.replace(
    HERO_SECTION_RE,
    `$1\n        ${buildBootstrapHeroImgTag().replace(/\n/g, '\n        ')}\n`,
  );
}

function ensureHeadHints(html: string): string {
  if (!html.includes('id="ncm-lcp-preload"')) {
    html = html.replace('</head>', `    ${buildBootstrapPreloadLink()}\n  </head>`);
  }

  if (!html.includes('.ncm-home-hero #ncm-lcp-hero{')) {
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

/** Retire le bootstrap fixed du template Vite (invisible sous bg-white du layout). */
function stripDevBootstrapBeforeRoot(html: string): string {
  return html
    .replace(/<img[^>]*\sid="ncm-lcp-hero"[^>]*>\s*/gi, '')
    .replace(
      /<script>\s*\(function \(\) \{\s*var path = location\.pathname;[\s\S]*?ncm-lcp-preload[\s\S]*?\}\)\(\);\s*<\/script>\s*/gi,
      '',
    );
}

export function injectLcpBootstrapIntoHome(distDir: string): void {
  const homePath = join(distDir, 'index.html');
  if (!existsSync(homePath)) {
    console.warn('⏭  inject LCP — pas de dist/index.html');
    return;
  }

  let html = readFileSync(homePath, 'utf8');

  html = stripDevBootstrapBeforeRoot(html);
  html = ensureHeadHints(html);
  html = injectBootstrapInsideHeroSection(html);
  html = dedupeCloudinaryHints(html);
  html = dedupePreloadById(html, 'ncm-lcp-preload');

  writeFileSync(homePath, html, 'utf8');
  console.log('✓ inject LCP — #ncm-lcp-hero in-section, sans #ncm-hero-react statique');
}
