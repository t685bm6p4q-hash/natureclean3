/**
 * sharedObserver.ts — Singleton IntersectionObserver partagé
 *
 * Extrait de ScrollReveal.tsx pour respecter la règle Vite Fast Refresh :
 * un fichier .tsx ne doit exporter QUE des composants React.
 * Les fonctions utilitaires vivent ici (fichier .ts pur, sans JSX).
 *
 * Utilisé par : ScrollReveal.tsx, AnimatedCounter.tsx
 */

const callbacks = new Map<Element, () => void>();
let sharedObserver: IntersectionObserver | null = null;

/** Singleton partagé — un seul IntersectionObserver pour toute l'app */
export function getSharedObserver(): IntersectionObserver {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const cb = callbacks.get(entry.target);
            if (cb) {
              cb();
              callbacks.delete(entry.target);
              sharedObserver?.unobserve(entry.target);
            }
          }
        }
      },
      { rootMargin: '-40px', threshold: 0.01 }
    );
  }
  return sharedObserver;
}

/** Enregistre un callback pour un élément observé */
export function registerObserverCallback(el: Element, cb: () => void): void {
  const observer = getSharedObserver();
  callbacks.set(el, cb);
  observer.observe(el);
}

/** Désenregistre un élément */
export function unregisterObserverCallback(el: Element): void {
  callbacks.delete(el);
  getSharedObserver().unobserve(el);
}
