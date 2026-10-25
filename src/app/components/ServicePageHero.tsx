/**
 * ServicePageHero — Hero section reutilisable pour les pages service.
 * Accepte imageSrc (URL figma:asset ou Unsplash) pour le fond hero.
 * Animation CSS pure (pas de motion) — chunk plus leger.
 */
import { Link } from 'react-router';
import { cldSrcSet } from '@/app/utils/images';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { ArrowRight, Phone } from 'lucide-react';
import type { ReactNode } from 'react';

interface Breadcrumb {
  label: string;
  to?: string;
}

interface ServicePageHeroProps {
  title: string;
  subtitle: string;
  badge?: string;
  badgeIcon?: ReactNode;
  /** URL directe de l'image (figma:asset, IMAGES.xxx, ou Unsplash) */
  imageSrc: string;
  imageAlt: string;
  breadcrumbs: Breadcrumb[];
  /**
   * Lien du bouton CTA "Devis gratuit" dans le hero.
   * Si fourni, affiche deux boutons CTA (devis + téléphone) en bas du hero.
   * Passez `?service=xxx` pour pré-sélectionner le formulaire intelligent.
   * Ex : "/devis?service=diogene"
   */
  devisLink?: string;
}

/** Dégradé pour lisibilité du texte sans masquer la photo hero. */
const HERO_OVERLAY =
  'absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-950/95 via-gray-900/45 to-gray-900/15 md:bg-gradient-to-r md:from-gray-950/90 md:via-gray-900/50 md:to-transparent';

const HERO_TEXT_SHADOW = 'drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]';

export function ServicePageHero({
  title,
  subtitle,
  badge,
  badgeIcon,
  imageSrc = '',
  imageAlt = '',
  breadcrumbs = [],
  devisLink,
}: ServicePageHeroProps) {
  return (
    <section className="relative bg-gray-900 text-white min-h-[min(72vh,520px)] md:min-h-[min(68vh,560px)] flex items-end overflow-hidden">
      {imageSrc && (
        <img
          src={imageSrc}
          srcSet={cldSrcSet(imageSrc, [400, 850, 1200, 1920])}
          sizes="100vw"
          alt={imageAlt}
          width="1920"
          height="1080"
          // @ts-ignore — fetchpriority: attribut HTML valide, non typé en minuscules dans React 18
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover object-center md:object-[center_35%]"
        />
      )}

      <div className={HERO_OVERLAY} aria-hidden="true" />

      <div className="container mx-auto px-4 relative z-10 w-full pb-10 pt-28 md:pt-32 md:pb-14">
        <div className="ncm-hero-fade-in max-w-lg md:max-w-2xl">
          {breadcrumbs?.length > 0 && (
            <nav
              className={`text-xs md:text-sm mb-4 md:mb-5 text-gray-200 ${HERO_TEXT_SHADOW}`}
              aria-label="Fil d'ariane"
            >
              {breadcrumbs.map((crumb, i) => (
                <span key={i}>
                  {i > 0 && <span className="mx-1.5 text-gray-400">/</span>}
                  {crumb.to ? (
                    <Link
                      to={crumb.to}
                      className="hover:text-white transition-colors underline decoration-gray-400 underline-offset-2"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {badge && (
            <div className="inline-flex items-center gap-2 bg-black/35 backdrop-blur-sm border border-white/20 text-green-100 px-3 py-1 rounded-full text-xs md:text-sm mb-4 md:mb-5">
              {badgeIcon}
              {badge}
            </div>
          )}

          <h1
            className={`ncm-display-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 md:mb-4 ${HERO_TEXT_SHADOW}`}
          >
            {title}
          </h1>
          <p className={`text-base md:text-lg lg:text-xl text-gray-100 leading-relaxed max-w-xl ${HERO_TEXT_SHADOW}`}>
            {subtitle}
          </p>

          {devisLink && (
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6 md:mt-8">
              <Link
                to={devisLink}
                className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-gray-900 font-black px-6 py-3 rounded-full shadow-lg shadow-green-500/25 transition-colors text-sm md:text-base"
              >
                Devis gratuit
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href={PHONE_HREF}
                aria-label={ARIA_PHONE}
                className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white font-bold px-6 py-3 rounded-full transition-colors text-sm md:text-base"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
