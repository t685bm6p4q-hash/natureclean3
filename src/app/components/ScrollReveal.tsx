/**
 * ScrollReveal — IntersectionObserver + classes CSS (zéro style inline → hydrate-safe SSG).
 * Puppeteer : window.__NC_PRERENDER désactive l’IO avant snapshot.
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
  /** Visible dès le 1er render (titres above-the-fold). */
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

function formatCssSeconds(value: number): string {
  const rounded = Math.round(value * 1000) / 1000;
  return `${rounded}s`;
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
    visible ? 'ncm-sr--visible' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  const needsTimingVars = delay !== 0 || duration !== 0.5;
  const style: CSSProperties | undefined = needsTimingVars
    ? ({
        '--ncm-sr-delay': formatCssSeconds(delay),
        '--ncm-sr-duration': formatCssSeconds(duration),
      } as CSSProperties)
    : undefined;

  return (
    <div ref={ref} className={classes} style={style}>
      {children}
    </div>
  );
}
