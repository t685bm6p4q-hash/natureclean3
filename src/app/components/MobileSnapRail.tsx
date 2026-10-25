import { Children, type ReactNode } from 'react';
import { cn } from '@/app/components/ui/utils';

export interface MobileSnapRailProps {
  /** Accessibilité — ex. « Étapes d'une intervention Diogène » */
  ariaLabel: string;
  children: ReactNode;
  /** Classes sur le conteneur (grille desktop via md:grid, etc.) */
  className?: string;
  /** Largeur d'une slide sur mobile */
  slideClassName?: string;
}

/**
 * Rail horizontal scroll-snap (mobile-first, comme ServiceCarousel).
 * Sur desktop, passer md:grid / md:flex-col + md:overflow-visible md:snap-none dans className,
 * ou envelopper le rail dans md:hidden si une variante desktop séparée existe.
 */
export function MobileSnapRail({
  ariaLabel,
  children,
  className,
  slideClassName = 'w-[88%] max-w-sm snap-center',
}: MobileSnapRailProps) {
  const slides = Children.toArray(children);

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      aria-roledescription="carrousel"
      className={cn(
        '-mx-4 px-4 pb-3',
        'flex flex-nowrap overflow-x-auto snap-x snap-mandatory gap-3',
        'overscroll-x-contain scroll-px-4 touch-pan-x',
        '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
        className,
      )}
    >
      {slides.map((slide, index) => (
        <div key={index} className={cn('flex-shrink-0 snap-center', slideClassName)}>
          {slide}
        </div>
      ))}
    </div>
  );
}
