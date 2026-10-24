/** Id du conteneur scroll mobile (au-dessus de la barre CTA fixe). */
export const NCM_MOBILE_SCROLL_ID = 'ncm-mobile-scroll';

/** Hauteur CSS de la barre Appeler / Devis (safe-area incluse). */
export const NCM_MOBILE_CTA_HEIGHT = 'var(--ncm-mobile-cta-h)';

export function getMobileScrollRoot(): HTMLElement | null {
  return document.getElementById(NCM_MOBILE_SCROLL_ID);
}

export function scrollLayoutToTop(useMobileScroll: boolean): void {
  if (useMobileScroll && window.matchMedia('(max-width: 767px)').matches) {
    getMobileScrollRoot()?.scrollTo(0, 0);
    return;
  }
  window.scrollTo(0, 0);
}
