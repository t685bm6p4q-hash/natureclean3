/**
 * GeoLandingPage — Template SEO local réutilisable.
 * Génère une landing page optimisée pour un combo ville × service.
 * Contenu unique par page grâce aux données de geoData.ts.
 */

import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { FAQSection } from '@/app/components/FAQSection';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Link } from 'react-router';
import { CheckCircle2, ArrowRight, Phone, MapPin, Leaf, Shield } from 'lucide-react';
import type { GeoPageData } from '@/app/utils/geoData';
import { GEO_PAGES } from '@/app/utils/geoData';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';

// ─── Mapping serviceSlug → param ?service= (cohérent avec QuotePage SERVICE_PARAM_MAP) ───
const SERVICE_SLUG_TO_PARAM: Record<string, string> = {
  '/services/entretien-bureaux':        'bureaux',
  '/services/nettoyage-coproprietes':   'coproprietes',
  '/services/nettoyage-chantiers':      'fin-chantier',
  '/services/nettoyage-commerces':      'commerces',
  '/services/nettoyage-evenementiel':   'evenementiel',
  '/services/nettoyage-graffitis':      'graffitis',
  '/services/remise-etat-sols':         'sols',
  '/services/nettoyage-vitre':          'vitres',
  '/nettoyage-particuliers':            'particuliers',
};

// ─── Mapping serviceSlug → label breadcrumb parent ────────────────────────────
const SERVICE_SLUG_TO_BREADCRUMB: Record<string, { label: string; to: string }> = {
  '/nettoyage-particuliers': { label: 'Nettoyage Particuliers', to: '/nettoyage-particuliers' },
};
const DEFAULT_BREADCRUMB_PARENT = { label: 'Services', to: '/services' };

interface GeoLandingPageProps {
  data: GeoPageData;
}

export function GeoLandingPage({ data }: GeoLandingPageProps) {
  const devisParam = SERVICE_SLUG_TO_PARAM[data.serviceSlug] ?? '';
  const devisLink = devisParam ? `/devis?service=${devisParam}` : '/devis';
  const breadcrumbParent = SERVICE_SLUG_TO_BREADCRUMB[data.serviceSlug] ?? DEFAULT_BREADCRUMB_PARENT;

  return (
    <>
      <SEO_Guardian
        currentSection={`geo-${data.slug}`}
        title={data.seo.title}
        description={data.seo.description}
        keywords={data.seo.keywords}
        faqItems={data.faqItems}
        disableReviews={true}
      />

      <ServicePageHero
        title={`${data.service} a ${data.city}`}
        subtitle={`Nature Clean intervient a ${data.city} (${data.postalCode}) et dans tout le departement des ${data.department} pour vos besoins de nettoyage professionnel.`}
        badge={`${data.city} — ${data.postalCode}`}
        badgeIcon={<MapPin className="w-4 h-4" aria-hidden="true" />}
        imageSrc={data.heroImage}
        imageAlt={data.heroAlt}
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          breadcrumbParent,
          { label: `${data.service} a ${data.city}` },
        ]}
      />

      {/* ═══ INTRO TEXTE ═══ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-5 gap-10 items-center">
              <div className="lg:col-span-3">
                <ScrollReveal>
                  <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                    <MapPin className="w-3 h-3" aria-hidden="true" />
                    {data.city} ({data.postalCode})
                  </span>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                    {data.service} professionnel a {data.city}
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {data.intro}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 font-bold shadow-md">
                      <Link to={devisLink}>
                        Devis gratuit
                        <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
                      <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                        <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                        {PHONE_DISPLAY}
                      </a>
                    </Button>
                  </div>
                </ScrollReveal>
              </div>
              <div className="lg:col-span-2">
                <ScrollReveal direction="right">
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src={data.secondaryImage}
                      alt={data.secondaryImageAlt}
                      className="w-full h-64 lg:h-80 object-cover"
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={320}
                    />
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ POINTS FORTS ═══ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
                Pourquoi choisir Nature Clean a {data.city} ?
              </h2>
              <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
                Un service de nettoyage professionnel adapte aux specificites de {data.city} et de sa region.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-4">
              {data.highlights.map((highlight, i) => (
                <ScrollReveal key={highlight} delay={i * 0.06}>
                  <div className="flex items-start gap-3 bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-gray-700">{highlight}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Trust badges */}
            <ScrollReveal delay={0.3}>
              <div className="flex flex-wrap justify-center gap-6 mt-12">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Leaf className="w-4 h-4 text-green-500" aria-hidden="true" />
                  50% produits eco-responsables
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Shield className="w-4 h-4 text-green-500" aria-hidden="true" />
                  Assurance RC Pro
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 text-green-500" aria-hidden="true" />
                  Intervention {data.city} et alentours
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ MID-PAGE CONVERSION BREAK ═══ */}
      <ConversionBreak
        image={data.heroImage}
        imageAlt={data.heroAlt}
        title={data.conversionTitle}
        subtitle={data.conversionSubtitle}
        devisLink={devisLink}
      />

      {/* ═══ FAQ CONTEXTUELLE ═══ */}
      <FAQSection
        items={data.faqItems}
        title={`Questions frequentes — ${data.service} a ${data.city}`}
        subtitle={`Tout savoir sur nos interventions a ${data.city} (${data.postalCode})`}
      />

      {/* ═══ LIENS GEO + SERVICE ═══ */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Consultez egalement :
            </h3>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {/* Lien vers la page service principale */}
              <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
                <Link to={data.serviceSlug}>
                  {data.service} — Tous secteurs
                </Link>
              </Button>
              {/* Liens vers les autres pages geo */}
              {data.relatedGeoPages.map((slug) => {
                const related = GEO_PAGES[slug];
                if (!related) return null;
                return (
                  <Button key={slug} asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
                    <Link to={`/${slug}`}>
                      {related.service} a {related.city}
                    </Link>
                  </Button>
                );
              })}
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {/* Liens vers toutes les pages geo pour le maillage interne */}
              {Object.values(GEO_PAGES)
                .filter((page) => page.slug !== data.slug && !data.relatedGeoPages.includes(page.slug))
                .map((page) => (
                  <Link
                    key={page.slug}
                    to={`/${page.slug}`}
                    className="text-sm text-gray-400 hover:text-green-600 transition-colors"
                  >
                    {page.service} {page.city}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}