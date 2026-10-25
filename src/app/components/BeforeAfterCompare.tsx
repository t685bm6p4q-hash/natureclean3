import { useCallback, useId, useRef, useState } from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

type BeforeAfterCompareProps = {
  beforeSrc: string;
  afterSrc: string;
  beforeSrcSet?: string;
  afterSrcSet?: string;
  sizes?: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
};

export function BeforeAfterCompare({
  beforeSrc,
  afterSrc,
  beforeSrcSet,
  afterSrcSet,
  sizes = '100vw',
  beforeAlt,
  afterAlt,
  className = '',
}: BeforeAfterCompareProps) {
  const id = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState(0.5);
  const [dragging, setDragging] = useState(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = trackRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setRatio(x / rect.width);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setDragging(true);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  };

  const pct = `${ratio * 100}%`;

  return (
    <figure
      ref={trackRef}
      className={`relative min-h-[280px] w-full overflow-hidden select-none touch-none lg:min-h-[420px] ${className}`}
      aria-label={`Comparaison avant et après : ${beforeAlt} — ${afterAlt}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <ImageWithFallback
        src={afterSrc}
        srcSet={afterSrcSet}
        sizes={sizes}
        alt={afterAlt}
        width={900}
        height={600}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />

      <div
        className="absolute inset-0 overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - ratio * 100}% 0 0)` }}
        aria-hidden="true"
      >
        <ImageWithFallback
          src={beforeSrc}
          srcSet={beforeSrcSet}
          sizes={sizes}
          alt=""
          width={900}
          height={600}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_12px_rgba(0,0,0,0.45)]"
        style={{ left: pct }}
        aria-hidden="true"
      />

      <button
        type="button"
        className="absolute top-1/2 z-20 flex h-12 w-12 min-h-[48px] min-w-[48px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-green-600 text-white shadow-lg transition-transform active:scale-95"
        style={{ left: pct, pointerEvents: 'auto' }}
        aria-controls={id}
        aria-valuenow={Math.round(ratio * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Glisser pour comparer avant et après"
        onPointerDown={(e) => {
          e.stopPropagation();
          onPointerDown(e);
        }}
      >
        <span className="flex gap-0.5" aria-hidden="true">
          <span className="h-3 w-0.5 rounded-full bg-white/90" />
          <span className="h-3 w-0.5 rounded-full bg-white/90" />
        </span>
      </button>

      <span className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
        Avant
      </span>
      <span className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-green-700/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
        Après
      </span>

      <span id={id} className="sr-only">
        Image après intervention à droite ; faites glisser le curseur pour révéler la façade taguée avant
        nettoyage.
      </span>
    </figure>
  );
}
