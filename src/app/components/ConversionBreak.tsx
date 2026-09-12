import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Link } from 'react-router';
import { ArrowRight, Phone, Clock, Shield } from 'lucide-react';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { cldSrcSet } from '@/app/utils/images';

interface ConversionBreakProps {
  image: string;
  imageAlt: string;
  title: string;
  subtitle?: string;
  urgencyText?: string;
  /** Objectif "object-top" pour watermark crop */
  objectPosition?: string;
  /** Lien du bouton devis (défaut : /devis). Passer ?service=xxx pour le formulaire intelligent. */
  devisLink?: string;
}

/**
 * Mid-page conversion break — CTA immersif avec photo de fond.
 * Positionné entre les sections texte pour capter les visiteurs
 * qui scrollent sans atteindre le bas de page.
 */
export function ConversionBreak({
  image,
  imageAlt,
  title,
  subtitle,
  urgencyText = 'Réponse garantie sous 2h',
  objectPosition,
  devisLink = '/devis',
}: ConversionBreakProps) {
  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <ImageWithFallback
        src={image}
        srcSet={cldSrcSet(image, [400, 850, 1200, 1920])}
        sizes="100vw"
        alt={imageAlt}
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover ${objectPosition || ''}`}
        loading="lazy"
        decoding="async"
        width={1920}
        height={600}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/80 to-gray-900/70" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          {/* Trust chips */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-flex items-center gap-1.5 bg-green-500/20 text-green-200 px-3 py-1 rounded-full text-xs font-bold border border-green-500/30">
              <Clock className="w-3 h-3" aria-hidden="true" />
              {urgencyText}
            </span>
            <span className="inline-flex items-center gap-1.5 bg-white/10 text-white/90 px-3 py-1 rounded-full text-xs font-bold border border-white/20">
              <Shield className="w-3 h-3" aria-hidden="true" />
              Sans engagement
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-gray-300 mb-8 max-w-2xl">{subtitle}</p>
          )}

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-green-500 hover:bg-green-400 text-gray-900 font-black shadow-lg shadow-green-500/20"
            >
              <Link to={devisLink}>
                Demander un devis gratuit
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 font-bold"
            >
              <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}