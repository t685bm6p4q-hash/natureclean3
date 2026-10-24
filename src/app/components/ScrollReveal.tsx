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
  /** Pas d’animation ni de lecture layout — contenu visible dès le premier paint (perf mobile). */
  eager?: boolean;
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
  eager = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (eager) return;

    const el = ref.current;
    if (!el) return;

    registerObserverCallback(el, () => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });

    return () => unregisterObserverCallback(el);
  }, [eager]);

  const style: CSSProperties = eager
    ? {}
    : {
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
