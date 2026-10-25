/**
 * HTML bootstrap LCP — même URLs que src/app/constants/lcpHero.ts (+ Home.tsx).
 */

import {
  homeHeroLcpSrc,
  homeHeroLcpSrcSet,
  LCP_HERO,
} from '../src/app/constants/lcpHero';

export function buildBootstrapPreloadLink(): string {
  return `<link
      id="ncm-lcp-preload"
      rel="preload"
      as="image"
      fetchpriority="high"
      href="${homeHeroLcpSrc()}"
      crossorigin="anonymous"
      imagesrcset="${homeHeroLcpSrcSet()}"
      imagesizes="100vw"
    />`;
}

export function buildBootstrapHeroImgTag(): string {
  return `<img
      id="ncm-lcp-hero"
      src="${homeHeroLcpSrc()}"
      srcset="${homeHeroLcpSrcSet()}"
      sizes="100vw"
      width="${LCP_HERO.intrinsicWidth}"
      height="${LCP_HERO.intrinsicHeight}"
      fetchpriority="high"
      loading="eager"
      decoding="async"
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

/** CSS critique hero accueil — doublon volontaire des utilitaires Tailwind above-the-fold (FCP avant bundle CSS). */
export const HOME_HERO_CRITICAL_CSS =
  '.ncm-home-hero{position:relative;min-height:max(420px,58vh);overflow:hidden;background-color:transparent;color:#fff}' +
  '@media (min-width:768px){.ncm-home-hero{min-height:36rem;padding-bottom:6rem}}' +
  '.ncm-home-hero #ncm-lcp-hero{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 30%;z-index:0;pointer-events:none}' +
  '@media (min-width:768px){.ncm-home-hero #ncm-lcp-hero{object-position:center}}' +
  '#ncm-hero-react{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 30%;z-index:0}' +
  '@media (min-width:768px){#ncm-hero-react{object-position:center}}';

/** Dev (index.html) : fixed fallback avant hydratation React. Prod : img dans .ncm-home-hero (inject). */
export const BOOTSTRAP_HERO_CSS =
  '#ncm-lcp-hero{position:fixed;top:0;left:0;width:100%;height:max(420px,58vh);object-fit:cover;object-position:center 30%;z-index:1;pointer-events:none}' +
  HOME_HERO_CRITICAL_CSS;
