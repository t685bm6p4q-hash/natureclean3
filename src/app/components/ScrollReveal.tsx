/**
 * ScrollReveal — IntersectionObserver + classes CSS (zéro attribut style → hydrate-safe SSG).
 */

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
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
  eager?: boolean;
}

const DIRECTION_CLASS: Record<string, string> = {
  up: 'ncm-sr--up',
  left: 'ncm-sr--left',
  right: 'ncm-sr--right',
  none: 'ncm-sr--none',
};

function isPrerenderCapture(): boolean {
  return typeof window !== 'undefined' && window.__NC_PRERENDER === true;
}

/** Délai arrondi au 50 ms → classe stable entre prerender et hydratation. */
function delayClass(delay: number): string {
  if (delay <= 0) return '';
  const ms = Math.round((delay * 1000) / 50) * 50;
  return `ncm-sr-d-${ms}`;
}

function durationClass(duration: number): string {
  if (duration === 0.5) return '';
  const ms = Math.round(duration * 1000);
  return `ncm-sr-t-${ms}`;
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

  const classes = [
    'ncm-sr',
    DIRECTION_CLASS[direction] ?? DIRECTION_CLASS.up,
    delayClass(delay),
    durationClass(duration),
    visible ? 'ncm-sr--visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}
