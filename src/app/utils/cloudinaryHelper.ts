/**
 * cloudinaryHelper.ts — Nature Clean Marseille
 * =============================================
 * Source unique de vérité pour l'optimisation des URLs Cloudinary.
 *
 * 3 règles immuables :
 *   1. f_auto,q_auto,c_limit ne s'écrivent JAMAIS manuellement dans les composants
 *   2. c_limit uniquement — jamais c_fill pour les images de contenu (évite le CLS)
 *   3. Idempotent : appelable sur une URL déjà transformée sans doublon
 *
 * ─── GUIDE RAPIDE ───────────────────────────────────────────────────────────
 *
 *  URL simple        → getOptimizedCldUrl(IMAGES.xxx)
 *  URL avec largeur  → getOptimizedCldUrl(IMAGES.xxx, 600)
 *  srcSet responsive → getResponsiveSrcSet(IMAGES.xxx)          ← 600w + 1200w
 *  srcSet custom     → getResponsiveSrcSet(IMAGES.xxx, [400, 800, 1200])
 *  Props <img> complets → cldImgAttrs(IMAGES.xxx, 'content')
 *
 * ────────────────────────────────────────────────────────────────────────────
 */

// ─────────────────────────────────────────────────────────────
// CONFIGURATION — modifier ici uniquement en cas de migration CDN
// ─────────────────────────────────────────────────────────────
const CLD_ACCOUNT   = 'dc9xmxpvv';
const CLD_BASE      = `https://res.cloudinary.com/${CLD_ACCOUNT}/image/upload`;
const DEFAULT_WIDTH = 1200;              // largeur par défaut — couvre desktop HD

// ─────────────────────────────────────────────────────────────
// INTERNAL HELPERS (non exportés)
// ─────────────────────────────────────────────────────────────

/**
 * Extrait le "clean path" depuis n'importe quelle entrée :
 *   — URL complète  : "https://res.cloudinary.com/.../f_auto,q_auto,w_1200.../v1773.../image.jpg"
 *   — Path brut     : "v1773950694/image.jpg"
 * Renvoie toujours le segment v{version}/... sans transforms.
 */
function extractCloudinaryPath(input: string): string | null {
  // Cas 1 : path brut déjà propre ("v1773950694/image.jpg")
  if (/^v\d+\//.test(input)) return input;
  // Cas 2 : URL complète — on capture tout depuis v\d+/ jusqu'à la fin
  const match = input.match(/(v\d+\/.+$)/);
  return match ? match[1] : null;
}

function isCloudinaryUrl(url: string): boolean {
  return url.includes('res.cloudinary.com');
}

// ═══════════════════════════════════════════════════════════════════
// FONCTION PRINCIPALE — getOptimizedCldUrl
// ═══════════════════════════════════════════════════════════════════

/**
 * Transforme n'importe quelle URL Cloudinary en URL optimisée.
 *
 * ✅ Accepte une URL complète OU un path brut (v1773.../image.jpg)
 * ✅ Vérifie que c'est bien une URL Cloudinary avant de transformer
 * ✅ Insère/remplace automatiquement f_{format}, q_{quality}, w_{width}, c_limit
 * ✅ width optionnelle — défaut : 1 200 px (couvre 99 % des cas desktop)
 * ✅ Idempotent — aucun risque de doublon de transforms
 * ✅ URL non-Cloudinary retournée intacte
 *
 * @param url     URL Cloudinary complète, path brut, ou URL tierce
 * @param width   Largeur maximale en pixels (défaut : 1200)
 * @param quality Qualité de l'image (défaut : 'auto')
 * @param format  Format image : 'auto' | 'webp' | 'avif' | 'jpg' (défaut : 'auto')
 *
 * @example
 * // Héro LCP mobile — format explicite pour garantir cache-hit
 * getOptimizedCldUrl(IMAGES.heroHome, 1200, 30, 'webp')
 * // → "...f_webp,q_30,w_1200,c_limit/v1773.../image.jpg"
 */
export function getOptimizedCldUrl(url: string, width: number = DEFAULT_WIDTH, quality: string | number = 'auto', format: string = 'auto'): string {
  if (!url) return '';

  // URL complète non-Cloudinary → on ne touche pas
  if (url.startsWith('http') && !isCloudinaryUrl(url)) return url;

  const path = extractCloudinaryPath(url);
  if (!path) return url;

  return `${CLD_BASE}/f_${format},q_${quality},w_${width},c_limit/${path}`;
}

// ═══════════════════════════════════════════════════════════════════
// SRCSET RESPONSIVE — getResponsiveSrcSet
// ═══════════════════════════════════════════════════════════════════

/**
 * Génère un attribut srcSet Cloudinary complet pour le responsive.
 *
 * Chaque entrée du srcSet est une URL optimisée avec f_auto,q_auto,c_limit.
 * Le navigateur sélectionne automatiquement la taille la plus adaptée.
 *
 * @param url    URL Cloudinary complète, path brut, ou constante IMAGES
 * @param widths Breakpoints en pixels — défaut : [600, 1200]
 *               (600 = mobile, 1200 = desktop HD)
 * @param quality Qualité de l'image (défaut : 'auto')
 * @param format  Format image : 'auto' | 'webp' | 'avif' | 'jpg' (défaut : 'auto')
 *
 * @example
 * // Cas standard mobile/desktop
 * getResponsiveSrcSet(IMAGES.heroHome)
 * // → ".../w_600,c_limit/v1773...jpg 600w, .../w_1200,c_limit/v1773...jpg 1200w"
 *
 * // Grille de cartes — 3 breakpoints
 * getResponsiveSrcSet(IMAGES.hallMarbreAscenseurs, [300, 600, 900])
 * // → ".../w_300... 300w, .../w_600... 600w, .../w_900... 900w"
 *
 * // Hero large — 4 breakpoints
 * getResponsiveSrcSet(IMAGES.heroHome, [400, 800, 1200, 1920])
 */
export function getResponsiveSrcSet(url: string, widths: number[] = [600, 1200], quality: string | number = 'auto', format: string = 'auto'): string {
  if (!url) return '';
  const path = extractCloudinaryPath(url);
  if (!path) return '';

  return widths
    .map(w => `${CLD_BASE}/f_${format},q_${quality},w_${w},c_limit/${path} ${w}w`)
    .join(', ');
}

// ═══════════════════════════════════════════════════════════════════
// SYSTÈME DE PRESETS — Contextes d'affichage standards
// ═══════════════════════════════════════════════════════════════════

/**
 * Presets prêts à l'emploi — choisir selon le contexte visuel.
 *
 * | Preset    | src   | srcSet widths    | sizes attr                        |
 * |-----------|-------|------------------|------------------------------------|
 * | 'hero'    | 1200  | 400, 800, 1200   | 100vw                             |
 * | 'content' |  900  | 400, 600, 900    | 100vw mobile / 50vw desktop       |
 * | 'card'    |  600  | 300, 450, 600    | 100vw → 50vw → 33vw               |
 * | 'thumb'   |  200  | 100, 150, 200    | 200px                             |
 * | 'logo'    |  144  | 72, 144          | 72px (2× retina)                  |
 */
export const CLD_PRESETS = {
  hero:    { width: 1200, widths: [400,  800, 1200] as const, sizes: '100vw' },
  content: { width:  900, widths: [400,  600,  900] as const, sizes: '(max-width: 768px) 100vw, 50vw' },
  card:    { width:  600, widths: [300,  450,  600] as const, sizes: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw' },
  thumb:   { width:  200, widths: [100,  150,  200] as const, sizes: '200px' },
  logo:    { width:  144, widths: [ 72,  144]        as const, sizes: '72px' },
} as const;

export type CldPreset = keyof typeof CLD_PRESETS;

/** Props <img> prêts à être spreadés */
export interface CldImgAttrs {
  src: string;
  srcSet: string;
  sizes: string;
}

/**
 * cldImgAttrs — Retourne les 3 props critiques pour le responsive & LCP.
 * Spread directement sur votre <img> — aucun risque d'oubli de srcSet ou sizes.
 *
 * @example
 * // Fin de chantier — bloc contenu (50 % desktop)
 * <img
 *   alt="Fin de chantier Marseille"
 *   width={900} height={600}
 *   loading="lazy" decoding="async"
 *   className="w-full h-full object-cover"
 *   {...cldImgAttrs(IMAGES.finChantierMaison, 'content')}
 * />
 *
 * // Hero LCP — pleine largeur
 * <img
 *   alt="Nettoyage Marseille"
 *   width={1920} height={1080}
 *   // @ts-ignore — fetchpriority: attribut HTML valide, non typé en minuscules dans React 18
 *   fetchpriority="high" decoding="sync"
 *   className="absolute inset-0 w-full h-full object-cover"
 *   {...cldImgAttrs(IMAGES.heroHome, 'hero')}
 * />
 *
 * // Copropriété — carte carousel
 * <img
 *   alt="Entretien copropriété Marseille"
 *   width={600} height={400}
 *   loading="lazy" decoding="async"
 *   {...cldImgAttrs(IMAGES.hallMarbreAscenseurs, 'card')}
 * />
 */
export function cldImgAttrs(url: string, preset: CldPreset, sizesOverride?: string): CldImgAttrs {
  const { width, widths, sizes } = CLD_PRESETS[preset];
  const path = extractCloudinaryPath(url);

  const srcSet = path
    ? (widths as readonly number[])
        .map(w => `${CLD_BASE}/f_auto,q_auto,w_${w},c_limit/${path} ${w}w`)
        .join(', ')
    : '';

  return {
    src:    getOptimizedCldUrl(url, width),
    srcSet,
    sizes:  sizesOverride ?? sizes,
  };
}

// ─────────────────────────────────────────────────────────────
// ALIASES — Rétrocompatibilité avec l'API précédente
// ─────────────────────────────────────────────────────────────

/** @alias getOptimizedCldUrl — maintenu pour rétrocompatibilité */
export const cldResize  = getOptimizedCldUrl;

/** @alias getResponsiveSrcSet — maintenu pour rétrocompatibilité */
export const cldSrcSet  = getResponsiveSrcSet;