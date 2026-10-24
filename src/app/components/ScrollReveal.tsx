/**
 * ScrollReveal — Animation au scroll SANS motion library
 * IntersectionObserver singleton + transitions CSS via style React (jamais el.style).
 *
 * Hydratation SSG : le HTML prerender doit coller au 1er render client (opacity 0).
 * Puppeteer définit window.__NC_PRERENDER pour ne pas révéler les blocs avant snapshot.
 * Mode `eager` : visible via style React dès le 1er render (hero Home).
 */

import { useEffect, useRef, useState } from 'react';
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
  /** Contenu visible dès le premier paint — style React explicite (hydrate-safe). */
  eager?: boolean;
}

const transforms: Record<string, string> = {
  up: 'translateY(30px)',
  left: 'translateX(-30px)',
  right: 'translateX(30px)',
  none: 'none',
};

function isPrerenderCapture(): boolean {
  return typeof window !== 'undefined' && window.__NC_PRERENDER === true;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  className = '',
  eager = false,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (eager || isPrerenderCapture()) return;

    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setRevealed(true);
      return;
    }

    registerObserverCallback(el, () => setRevealed(true));
    return () => unregisterObserverCallback(el);
  }, [eager]);

  const visible = eager || revealed;

  const style: CSSProperties = visible
    ? { opacity: 1, transform: 'none' }
    : {
        opacity: 0,
        transform: transforms[direction],
        transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
      };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
