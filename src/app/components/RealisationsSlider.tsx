import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { MobileSnapRail } from '@/app/components/MobileSnapRail';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { cldSrcSet, getOptimizedCldUrl } from '@/app/utils/images';

interface Realisation {
  title: string;
  category: string;
  image: string;
  location: string;
}

interface RealisationsSliderProps {
  items: Realisation[];
  /** Limite le rail mobile (desktop carrousel = toute la liste). */
  mobileItemLimit?: number;
}

function RealisationCard({ real }: { real: Realisation }) {
  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl md:hover:-translate-y-1 transition-all duration-300 h-full">
      <div className="relative h-52 overflow-hidden">
        <ImageWithFallback
          src={getOptimizedCldUrl(real.image, 400, 'auto', 'auto')}
          alt={real.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          srcSet={cldSrcSet(real.image, [320, 400, 480], 'auto', 'auto')}
          sizes="(max-width: 768px) 100vw, 400px"
          width={400}
          height={208}
          loading="lazy"
          decoding="async"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">
            {real.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors leading-snug">
          {real.title}
        </h3>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="w-3 h-3" aria-hidden="true" />
          {real.location}
        </div>
      </div>
    </article>
  );
}

function PaginationDots({
  total,
  current,
  onSelect,
}: {
  total: number;
  current: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-2 mt-6" role="group" aria-label="Pagination des réalisations">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={`Aller à la réalisation ${i + 1}`}
          aria-current={i === current ? 'true' : undefined}
          className="flex min-h-11 min-w-11 items-center justify-center rounded-full cursor-pointer group"
        >
          <span
            className={`block rounded-full transition-all duration-300 ${
              i === current ? 'w-8 h-2.5 bg-green-700' : 'w-2.5 h-2.5 bg-gray-300 group-hover:bg-green-400'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export function RealisationsSlider({ items, mobileItemLimit }: RealisationsSliderProps) {
  const [current, setCurrent] = useState(0);
  const total = items.length;
  const mobileItems =
    mobileItemLimit != null && mobileItemLimit > 0 ? items.slice(0, mobileItemLimit) : items;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  const visible = [0, 1, 2].map((offset) => ({
    data: items[(current + offset) % total],
    key: (current + offset) % total,
  }));

  return (
    <div className="max-w-5xl mx-auto">
      {/* Mobile — swipe horizontal (même pattern que ServiceCarousel) */}
      <div className="md:hidden">
        <MobileSnapRail
          ariaLabel="Aperçu de nos réalisations"
          className="max-w-[100vw]"
          slideClassName="w-[88%] max-w-sm snap-center"
        >
          {mobileItems.map((real) => (
            <RealisationCard key={real.title} real={real} />
          ))}
        </MobileSnapRail>
        <p className="text-center text-xs text-gray-400 mt-2">Glissez pour parcourir les réalisations</p>
      </div>

      {/* Desktop — 3 cartes + flèches (jamais affiché sous md) */}
      <div className="max-md:hidden relative px-10 overflow-x-clip">
        <button
          type="button"
          onClick={prev}
          aria-label="Réalisation précédente"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-3 gap-6">
          {visible.map(({ data: real, key }, i) => (
            <RealisationCard key={`${key}-${i}`} real={real} />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Réalisation suivante"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <PaginationDots total={total} current={current} onSelect={setCurrent} />
      </div>
    </div>
  );
}
