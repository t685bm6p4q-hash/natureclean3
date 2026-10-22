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

/** Grande vignette — photo nette + texte sous l'image (pas d'overlay). */
export function ServiceShowcaseCard({ src, alt, title, subtitle }: ServiceShowcaseCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white h-full">
      <ImageWithFallback
        src={src}
        alt={alt}
        className="w-full h-[280px] object-cover"
        loading="lazy"
        decoding="async"
        width={400}
        height={280}
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{subtitle}</p>
      </div>
    </div>
  );
}

/** Carte prestation — photo nette, sans overlay ni vignette. */
export function ServiceFeatureCard({
  title,
  image,
  imagePosition,
  icon: Icon,
  items,
  imageHeightClass = 'h-32',
  description,
}: ServiceFeatureCardProps) {
  return (
    <div className="relative bg-white rounded-2xl border border-gray-200 hover:border-green-200 transition-colors h-full overflow-hidden">
      <div className={`relative ${imageHeightClass} bg-gray-100`}>
        <ImageWithFallback
          src={image}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={imagePosition ? { objectPosition: imagePosition } : undefined}
          loading="lazy"
          decoding="async"
          width={400}
          height={180}
        />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2.5 mb-3">
          <span className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center border border-green-100">
            <Icon className="w-5 h-5 text-green-600" aria-hidden="true" />
          </span>
          <h3 className="font-black text-gray-900">{title}</h3>
        </div>
        {description && <p className="text-sm text-gray-600 mb-3 -mt-1 leading-relaxed">{description}</p>}
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
    </div>
  );
}
