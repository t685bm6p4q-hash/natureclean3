/**
 * ScrollReveal — Animation au scroll SANS motion library, SANS useState
 * Utilise UN SEUL IntersectionObserver partagé (singleton) + CSS transitions pures
 *
 * Pourquoi pas useState ?
 *   → useState déclenche un re-render React quand l'observer fire.
 *   → Figma's FGCmp inspector (preview) ne supporte pas ces re-renders conditionnels
 *     dans React 18.3.x → warning "Expected static flag was missing".
 *   → Solution : mutation directe du style via ref.current — zéro re-render,
 *     même résultat visuel, transition CSS identique.
 *
 * ⚠️  Ce fichier n'exporte QUE le composant ScrollReveal (règle Vite Fast Refresh).
 *     Les utilitaires (getSharedObserver, register/unregister) sont dans sharedObserver.ts.
 */

import { useEffect, useRef } from 'react';
import type { ReactNode, CSSProperties } from 'react';
import {
  registerObserverCallback,
  unregisterObserverCallback,
} from '@/app/components/sharedObserver';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
}

const transforms: Record<string, string> = {
  up: 'translateY(30px)',
  left: 'translateX(-30px)',
  right: 'translateX(30px)',
  none: 'none',
};

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className = '',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // PHASE LECTURE SEULE — getBoundingClientRect sans écriture immédiate.
    // Tous les useEffect ScrollReveal lisent le layout dans le même frame → pas
    // d'invalidation entre lectures → layout calculé une seule fois (O(1) ensuite).
    // Sans ce découplage, chaque écriture style.opacity='1' invalide le layout pour
    // le composant suivant → layout thrashing × N composants → TBT +250 ms.
    const rect = el.getBoundingClientRect();
    const isAboveFold = rect.top < window.innerHeight && rect.bottom > 0;

    if (isAboveFold) {
      // PHASE ÉCRITURE différée — requestAnimationFrame regroupe toutes les écritures
      // en un seul batch après que TOUS les useEffects ont lu le layout.
      const raf = requestAnimationFrame(() => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.transition = 'none';
      });
      return () => cancelAnimationFrame(raf);
    }

    registerObserverCallback(el, () => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });

    return () => unregisterObserverCallback(el);
  }, []);

  // Style initial figé — aucune condition, aucun switch d'objet entre renders.
  // React ne voit jamais ce prop changer → zéro "static flag" mismatch.
  const style: CSSProperties = {
    opacity: 0,
    transform: transforms[direction],
    transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
  };

  return (
    <div
      ref={ref}
      className={className}
      style={style}
    >
      {children}
    </div>
  );
}
