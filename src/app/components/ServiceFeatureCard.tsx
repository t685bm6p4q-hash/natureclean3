import type { LucideIcon } from 'lucide-react';
import { CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export interface ServiceFeatureCardItem {
  bold: string;
  text: string;
}

interface ServiceFeatureCardProps {
  title: string;
  image: string;
  imagePosition?: string;
  icon: LucideIcon;
  items?: readonly ServiceFeatureCardItem[];
  imageHeightClass?: string;
  description?: string;
}

interface ServiceShowcaseCardProps {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

/** Grande vignette — photo entière + texte sous l'image. */
export function ServiceShowcaseCard({ src, alt, title, subtitle }: ServiceShowcaseCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 bg-gray-900 h-full">
      <div className="relative aspect-[16/10] bg-gray-900">
        <ImageWithFallback
          src={src}
          alt={alt}
          className="w-full h-full object-contain"
          loading="lazy"
          decoding="async"
          width={800}
          height={500}
        />
      </div>
      <div className="p-4 bg-white">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}

/** Carte prestation — photo visible en entier, titre blanc sur l'image. */
export function ServiceFeatureCard({
  title,
  image,
  imagePosition,
  icon: Icon,
  items,
  imageHeightClass = 'aspect-[16/10]',
  description,
}: ServiceFeatureCardProps) {
  return (
    <div className="relative bg-white rounded-2xl border border-gray-200 hover:border-green-200 transition-colors h-full overflow-hidden">
      <div className={`relative ${imageHeightClass} bg-gray-900`}>
        <ImageWithFallback
          src={image}
          alt={title}
          className="w-full h-full object-contain"
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
          loading="lazy"
          decoding="async"
          width={800}
          height={500}
        />
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent pt-16 pb-4 px-5">
          <div className="flex items-center gap-2.5">
            <span className="w-10 h-10 bg-white/15 rounded-lg flex items-center justify-center border border-white/25">
              <Icon className="w-5 h-5 text-white" aria-hidden="true" />
            </span>
            <h3 className="font-black text-white text-lg leading-tight drop-shadow-md">{title}</h3>
          </div>
        </div>
      </div>
      {(description || (items && items.length > 0)) && (
        <div className="p-5">
          {description && <p className="text-sm text-gray-600 mb-3 leading-relaxed">{description}</p>}
          {items && items.length > 0 && (
            <ul className="space-y-2">
              {items.map((item) => (
                <li key={item.bold} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    <strong>{item.bold}</strong> {item.text}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
