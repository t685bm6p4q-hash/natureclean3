/**
 * BeforeAfterCarousel — Carrousel interactif avant/apres
 * Slider draggable avec animations CSS pures (0 motion library).
 */
import { useState, useRef } from 'react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { IMAGES, cldSrcSet } from '@/app/utils/images';

interface BeforeAfterItem {
  id: string;
  title: string;
  location: string;
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
}

const items: BeforeAfterItem[] = [
  {
    id: 'ba-1',
    title: 'Remise a neuf boutique — Commerce Marseille',
    location: 'Marseille',
    beforeImage: IMAGES.nettoyageMarseilleEco,
    afterImage: IMAGES.magasinBoutiquePACA,
    beforeAlt: 'Commerce marseillais avant intervention Nature Clean',
    afterAlt: 'Commerce impeccable apres nettoyage professionnel Nature Clean',
  },
];

function BeforeAfterSlider({ item }: { item: BeforeAfterItem }) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  };

  const handlePointerDown = () => {
    isDragging.current = true;
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };
  const handlePointerUp = () => {
    isDragging.current = false;
  };

  return (
    <div className="space-y-3">
      <div
        ref={containerRef}
        className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden cursor-col-resize select-none shadow-xl"
        role="slider"
        aria-label={`Comparaison avant/après : ${item.title}. Faites glisser pour comparer.`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(sliderPos)}
        aria-valuetext={`${Math.round(sliderPos)}% avant, ${Math.round(100 - sliderPos)}% après`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') { setSliderPos((p) => Math.max(0, p - 5)); e.preventDefault(); }
          if (e.key === 'ArrowRight') { setSliderPos((p) => Math.min(100, p + 5)); e.preventDefault(); }
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Image APRES (fond complet) */}
        <ImageWithFallback
          src={item.afterImage}
          srcSet={cldSrcSet(item.afterImage, [400, 850, 1200])}
          sizes="(max-width: 768px) calc(100vw - 32px), 768px"
          alt={item.afterAlt}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
          width={800}
          height={500}
        />

        {/* Image AVANT (clippee) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <ImageWithFallback
            src={item.beforeImage}
            srcSet={cldSrcSet(item.beforeImage, [400, 850, 1200])}
            sizes="(max-width: 768px) calc(100vw - 32px), 768px"
            alt={item.beforeAlt}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
            width={800}
            height={500}
          />
        </div>

        {/* Ligne separatrice + poignee */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-20"
          style={{ left: `${sliderPos}%` }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-xl flex items-center justify-center">
            <ChevronLeft className="w-4 h-4 text-gray-600 -mr-1" aria-hidden="true" />
            <ChevronRight className="w-4 h-4 text-gray-600 -ml-1" aria-hidden="true" />
          </div>
        </div>

        {/* Labels AVANT / APRES */}
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-full">
            AVANT
          </span>
        </div>
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-green-500/90 text-white text-xs font-bold px-3 py-1 rounded-full">
            APRES
          </span>
        </div>
      </div>

      <div className="text-center">
        <h4 className="font-black text-gray-900">{item.title}</h4>
        <p className="text-sm text-gray-500">{item.location}</p>
      </div>
    </div>
  );
}

export function BeforeAfterCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i === 0 ? items.length - 1 : i - 1));
  const next = () => setActiveIndex((i) => (i === items.length - 1 ? 0 : i + 1));

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            Avant / Apres
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900">
            La transformation Nature Clean
          </h2>
          <p className="text-gray-500 mt-2">
            Faites glisser le curseur pour voir le resultat
          </p>
        </div>

        <div className="max-w-3xl mx-auto relative">
          <div
            key={activeIndex}
            className="ncm-carousel-fade-in"
          >
            <BeforeAfterSlider item={items[activeIndex]} />
          </div>

          {/* Navigation fleches */}
          {items.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-14 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-30"
                aria-label="Realisation precedente"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-14 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-30"
                aria-label="Realisation suivante"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </>
          )}

          {/* Dots pagination */}
          <div className="flex justify-center gap-1 mt-6" role="group" aria-label="Navigation des realisations">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className="flex items-center justify-center p-2 min-w-[44px] min-h-[44px]"
                aria-label={`Voir realisation ${i + 1} sur ${items.length}`}
                aria-current={i === activeIndex ? 'true' : undefined}
              >
                <span
                  className={`block rounded-full transition-all ${
                    i === activeIndex
                      ? 'bg-green-600 w-6 h-2.5'
                      : 'bg-gray-300 hover:bg-gray-400 w-2.5 h-2.5'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}