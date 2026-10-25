/**
 * Post-prerender — accueil : hints LCP + réglage #ncm-lcp-hero (HTML SSG = React prerender).
 */

import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  buildBootstrapHeroImgTag,
  buildBootstrapPreloadLink,
  LCP_CRITICAL_CSS,
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

function replaceInlineCriticalCss(html: string): string {
  const block = `<style>${LCP_CRITICAL_CSS}</style>`;
  if (/<style>[\s\S]*?html,body\{background:#111827[\s\S]*?<\/style>/.test(html)) {
    return html.replace(/<style>[\s\S]*?html,body\{background:#111827[\s\S]*?<\/style>/, block);
  }
  return html.replace('</head>', `    ${block}\n  </head>`);
}

function replacePreloadLink(html: string): string {
  const link = buildBootstrapPreloadLink();
  if (html.includes('id="ncm-lcp-preload"')) {
    return html.replace(/<link[\s\S]*?id="ncm-lcp-preload"[\s\S]*?\/>/i, link);
  }
  return html.replace('</head>', `    ${link}\n  </head>`);
}

/** Hero React prerender — priorité haute, visible (pas opacity-0). */
function tuneLcpHeroImg(html: string): string {
  html = html.replace(/<img[^>]*\sid="ncm-hero-react"[^>]*>\s*/gi, '');

  return html.replace(/<img([^>]*\sid="ncm-lcp-hero"[^>]*)>/gi, (_full, attrs: string) => {
    let next = attrs
      .replace(/\bfetchpriority="low"/gi, '')
      .replace(/\bopacity-0\b/g, '')
      .replace(/\bclass="([^"]*)"/, (_m, cls: string) => {
        const cleaned = cls.replace(/\bopacity-0\b/g, '').trim();
        return cleaned ? ` class="${cleaned}"` : '';
      });
    if (!/\bfetchpriority="/i.test(next)) {
      next += ' fetchpriority="high"';
    }
    if (!/\bloading="/i.test(next)) {
      next += ' loading="eager"';
    }
    if (!/\bdecoding="/i.test(next)) {
      next += ' decoding="sync"';
    }
    return `<img${next}>`;
  });
}

function ensureLcpHeroInSection(html: string): string {
  if (html.includes('id="ncm-lcp-hero"')) {
    return tuneLcpHeroImg(html);
  }
  if (!HERO_SECTION_RE.test(html)) {
    console.warn('⚠ inject LCP — section .ncm-home-hero introuvable');
    return html;
  }
  return html.replace(
    HERO_SECTION_RE,
    `$1\n        ${buildBootstrapHeroImgTag().replace(/\n/g, '\n        ')}\n`,
  );
}

export function injectLcpBootstrapIntoHome(distDir: string): void {
  const homePath = join(distDir, 'index.html');
  if (!existsSync(homePath)) {
    console.warn('⏭  inject LCP — pas de dist/index.html');
    return;
  }

  let html = readFileSync(homePath, 'utf8');
  html = replaceInlineCriticalCss(html);
  html = replacePreloadLink(html);
  html = ensureLcpHeroInSection(html);
  html = dedupeCloudinaryHints(html);
  html = dedupePreloadById(html, 'ncm-lcp-preload');

  writeFileSync(homePath, html, 'utf8');
  console.log('✓ inject LCP — #ncm-lcp-hero aligné prerender + hints');
}
