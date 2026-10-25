import { cldSrcSet, getOptimizedCldUrl } from '../utils/cloudinaryHelper';
import { IMAGES } from '../utils/images';

/** Accueil — hero LCP (bootstrap HTML + React). URLs aussi dans index.html (dev). */
export const LCP_HERO = {
  widths: [400, 850, 1200, 1920] as const,
  quality: 30,
  format: 'webp' as const,
  defaultWidth: 850,
  intrinsicWidth: 850,
  intrinsicHeight: 478,
} as const;

export function homeHeroLcpSrc(width = LCP_HERO.defaultWidth): string {
  return getOptimizedCldUrl(IMAGES.heroHome, width, LCP_HERO.quality, LCP_HERO.format);
}

export function homeHeroLcpSrcSet(): string {
  return cldSrcSet(IMAGES.heroHome, [...LCP_HERO.widths], LCP_HERO.quality, LCP_HERO.format);
}
