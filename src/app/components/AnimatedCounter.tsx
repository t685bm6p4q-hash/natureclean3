/**
 * AnimatedCounter — Compteur anime CSS pur.
 * Utilise le SharedIntersectionObserver singleton de ScrollReveal
 * pour economiser un observer supplementaire.
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { registerObserverCallback, unregisterObserverCallback } from '@/app/components/sharedObserver';

interface AnimatedCounterProps {
  target: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function AnimatedCounter({
  target,
  duration = 1800,
  suffix = '',
  prefix = '',
  className = '',
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  const animate = useCallback(() => {
    if (hasAnimated) return;
    setHasAnimated(true);

    const startTime = performance.now();
    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [target, duration, hasAnimated]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    registerObserverCallback(el, animate);
    return () => unregisterObserverCallback(el);
  }, [animate]);

  return (
    <span
      ref={ref}
      className={`inline-block tabular-nums ${className}`}
      style={{ minWidth: `${String(target).length + suffix.length + prefix.length}ch` }}
    >
      {prefix}{count}{suffix}
    </span>
  );
}