/**
 * HTML bootstrap LCP — même URLs que src/app/constants/lcpHero.ts (+ Home.tsx).
 */

import {
  homeHeroLcpSrc,
  homeHeroLcpSrcSet,
  LCP_HERO,
} from '../src/app/constants/lcpHero';

/** CSS critique above-the-fold (sans position:fixed — le hero reste dans .ncm-home-hero, sous le header). */
export const HOME_HERO_CRITICAL_CSS =
  '.ncm-home-hero{position:relative;min-height:max(420px,58vh);overflow:hidden;background-color:transparent;color:#fff}' +
  '@media (min-width:768px){.ncm-home-hero{min-height:36rem;padding-bottom:6rem}}' +
  '.ncm-home-hero #ncm-lcp-hero{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 30%;z-index:0;pointer-events:none}' +
  '@media (min-width:768px){.ncm-home-hero #ncm-lcp-hero{object-position:center}}' +
  '.ncm-home-hero .ncm-hero-overlay,.ncm-home-hero .ncm-hero-content{position:relative;z-index:1}';

export const LCP_CRITICAL_CSS =
  'html,body{background:#111827}' +
  '.min-h-screen.bg-white{background:#fff}' +
  'header.sticky{position:sticky;top:0;z-index:50;width:100%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.06)}' +
  '#root{position:relative;min-height:100vh}' +
  HOME_HERO_CRITICAL_CSS;

/** @deprecated alias inject — plus de règle fixed */
export const BOOTSTRAP_HERO_CSS = LCP_CRITICAL_CSS;

export function buildBootstrapPreloadLink(): string {
  return `<link
      id="ncm-lcp-preload"
      rel="preload"
      as="image"
      fetchpriority="high"
      href="${homeHeroLcpSrc()}"
      crossorigin="anonymous"
      imagesrcset="${homeHeroLcpSrcSet()}"
      imagesizes="${LCP_HERO.sizes}"
    />`;
}

export function buildBootstrapHeroImgTag(): string {
  return `<img
      id="ncm-lcp-hero"
      src="${homeHeroLcpSrc()}"
      srcset="${homeHeroLcpSrcSet()}"
      sizes="${LCP_HERO.sizes}"
      width="${LCP_HERO.intrinsicWidth}"
      height="${LCP_HERO.intrinsicHeight}"
      fetchpriority="high"
      loading="eager"
      decoding="sync"
      alt=""
      aria-hidden="true"
    />`;
}

export const BOOTSTRAP_HERO_SCRIPT = `<script>
      (function () {
        var path = location.pathname;
        var isHome = path === '/' || path === '';
        var hero = document.getElementById('ncm-lcp-hero');
        var preload = document.getElementById('ncm-lcp-preload');
        if (!isHome) {
          if (hero) hero.remove();
          if (preload) preload.remove();
        }
      })();
    </script>`;
