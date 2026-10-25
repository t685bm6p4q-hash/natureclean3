import { cldSrcSet, getOptimizedCldUrl } from '../utils/cloudinaryHelper';
import { IMAGES } from '../utils/images';

/** Accueil — hero LCP (bootstrap HTML + React). URLs régénérées au build (inject). */
export const LCP_HERO = {
  /** Mobile PSI (412×DPR2) → 600w max en pratique */
  widths: [400, 600, 850, 1200, 1920] as const,
  quality: 20,
  format: 'webp' as const,
  defaultWidth: 600,
  intrinsicWidth: 600,
  intrinsicHeight: 337,
  sizes: '(max-width:768px) 100vw, 100vw',
} as const;

export function homeHeroLcpSrc(width = LCP_HERO.defaultWidth): string {
  return getOptimizedCldUrl(IMAGES.heroHome, width, LCP_HERO.quality, LCP_HERO.format);
}

export function homeHeroLcpSrcSet(): string {
  return cldSrcSet(IMAGES.heroHome, [...LCP_HERO.widths], LCP_HERO.quality, LCP_HERO.format);
}
