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
    <section className="relative bg-gray-900 text-white py-24 md:py-32 overflow-hidden">
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
          decoding="sync"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/70 via-gray-900/45 to-green-900/30" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="ncm-hero-fade-in">
          {/* Breadcrumb */}
          {breadcrumbs?.length > 0 && (
            <nav className="text-sm mb-6 text-gray-300" aria-label="Fil d'ariane">
              {breadcrumbs.map((crumb, i) => (
                <span key={i}>
                  {i > 0 && <span className="mx-1.5 text-gray-500">/</span>}
                  {crumb.to ? (
                    <Link to={crumb.to} className="hover:text-white transition-colors underline decoration-gray-500 underline-offset-2">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-white">{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          {/* Badge optionnel */}
          {badge && (
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 text-green-200 px-4 py-1.5 rounded-full text-sm mb-5">
              {badgeIcon}
              {badge}
            </div>
          )}

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 tracking-tight leading-[1.1] max-w-4xl">
            {title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
            {subtitle}
          </p>

          {/* CTAs — affichés seulement si devisLink est fourni */}
          {devisLink && (
            <div className="flex flex-wrap gap-3 mt-8">
              <Link
                to={devisLink}
                className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-400 text-gray-900 font-black px-6 py-3 rounded-full shadow-lg shadow-green-500/20 transition-colors"
              >
                Devis gratuit
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <a
                href={PHONE_HREF}
                aria-label={ARIA_PHONE}
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold px-6 py-3 rounded-full transition-colors"
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