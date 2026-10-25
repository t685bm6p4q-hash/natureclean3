import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { BulletList } from '@/app/components/BulletList';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

interface ServiceFeatureCardItem {
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
  footer?: ReactNode;
}

interface ServiceShowcaseCardProps {
  src: string;
  alt: string;
  title: string;
  /** Ligne unique (legacy) — préférer `bullets` pour une liste à puces serrées */
  subtitle?: string;
  bullets?: readonly string[];
}

/** Grande vignette — photo entière + texte sous l'image. */
export function ServiceShowcaseCard({ src, alt, title, subtitle, bullets }: ServiceShowcaseCardProps) {
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
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        {bullets && bullets.length > 0 ? (
          <BulletList lines={bullets} />
        ) : (
          subtitle && <p className="text-sm text-gray-600 leading-snug">{subtitle}</p>
        )}
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
  footer,
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
      {(description || (items && items.length > 0) || footer) && (
        <div className="p-5">
          {description && (
            <p className="text-sm text-gray-600 leading-snug mb-3">{description}</p>
          )}
          {items && items.length > 0 && <BulletList lines={items} />}
          {footer && <div className="mt-3 pt-3 border-t border-gray-100 text-sm">{footer}</div>}
        </div>
      )}
    </div>
  );
}
