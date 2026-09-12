/**
 * 🎯 SKIP TO CONTENT - Accessibilité A11Y
 * 
 * Lien "Passer au contenu" pour navigation clavier.
 * Invisible visuellement mais accessible au focus.
 * Requis pour WCAG 2.1 niveau AA et Lighthouse 100/100.
 */

export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-6 focus:py-3 focus:bg-green-700 focus:text-white focus:rounded-lg focus:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300 transition-all"
      tabIndex={0}
    >
      Passer au contenu principal
    </a>
  );
}