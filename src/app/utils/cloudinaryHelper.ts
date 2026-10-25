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
 *  srcSet responsive → cldSrcSet(IMAGES.xxx)                    ← 600w + 1200w
 *  srcSet custom     → cldSrcSet(IMAGES.xxx, [400, 800, 1200])
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
function getResponsiveSrcSet(url: string, widths: number[] = [600, 1200], quality: string | number = 'auto', format: string = 'auto'): string {
  if (!url) return '';
  const path = extractCloudinaryPath(url);
  if (!path) return '';

  return widths
    .map(w => `${CLD_BASE}/f_${format},q_${quality},w_${w},c_limit/${path} ${w}w`)
    .join(', ');
}

// ─────────────────────────────────────────────────────────────
// ALIASES — Rétrocompatibilité avec l'API précédente
// ─────────────────────────────────────────────────────────────

/** @alias getOptimizedCldUrl — maintenu pour rétrocompatibilité */
export const cldResize  = getOptimizedCldUrl;

/** @alias getResponsiveSrcSet — maintenu pour rétrocompatibilité */
export const cldSrcSet  = getResponsiveSrcSet;