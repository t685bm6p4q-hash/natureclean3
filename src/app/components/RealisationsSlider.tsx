import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { cldSrcSet } from '@/app/utils/images';

interface Realisation {
  title: string;
  category: string;
  image: string;
  location: string;
}

interface RealisationsSliderProps {
  items: Realisation[];
}

export function RealisationsSlider({ items }: RealisationsSliderProps) {
  const [current, setCurrent] = useState(0);
  const total = items.length;

  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);
  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);

  // 3 cartes toujours visibles (wrap circulaire)
  const visible = [0, 1, 2].map((offset) => ({
    data: items[(current + offset) % total],
    key: (current + offset) % total,
  }));

  return (
    <div className="relative max-w-5xl mx-auto">
      {/* Flèche gauche */}
      <button
        onClick={prev}
        aria-label="Réalisation précédente"
        className="absolute -left-5 md:-left-7 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Grille 3 cartes fixes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {visible.map(({ data: real, key }, i) => (
          <article
            key={`${key}-${i}`}
            className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative h-52 overflow-hidden">
              <ImageWithFallback
                src={real.image}
                alt={real.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                srcSet={cldSrcSet(real.image, [320, 480, 640])}
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
        ))}
      </div>

      {/* Flèche droite */}
      <button
        onClick={next}
        aria-label="Réalisation suivante"
        className="absolute -right-5 md:-right-7 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-200 rounded-full shadow-md flex items-center justify-center text-gray-600 hover:bg-green-50 hover:border-green-300 hover:text-green-700 transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Points de navigation */}
      <div className="flex items-center justify-center gap-2 mt-6">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Aller à la réalisation ${i + 1}`}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-6 h-2.5 bg-green-600'
                : 'w-2.5 h-2.5 bg-gray-300 hover:bg-green-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
