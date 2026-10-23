import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import { Store, ArrowRight, CheckCircle2, Clock, Sparkles, Square } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ServiceFeatureCard, ServiceShowcaseCard } from '@/app/components/ServiceFeatureCard';
import { IMAGES } from '@/app/utils/images';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { GoogleReviews } from '@/app/components/GoogleReviews';
import { NATURE_CLEAN_PROVIDER } from '@/app/utils/cleaning-service-jsonld';
import { FOUNDING_YEAR } from '@/app/utils/constants';

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Pouvez-vous nettoyer avant l\'ouverture du commerce ?',
    answer:
      'Oui. C\'est le créneau le plus demandé à Marseille : avant l\'ouverture ou après la fermeture, dans une plage 6 h–22 h. Sols, vitrines, sanitaires : vos équipes retrouvent le magasin propre. Le standard, lui, répond du lundi au samedi, 8 h–18 h.',
  },
  {
    question: 'Le nettoyage des vitrines est-il inclus dans le contrat ?',
    answer:
      'Oui, si on le met dans le cahier des charges — en récurrent ou en prestation à part. En centre-ville, calcaire et projections de rue marquent vite les vitrages : on lave à l\'eau déminéralisée. Hauteur, voirie et façades : voir le nettoyage de vitres à Marseille. La fréquence se décide à la visite.',
  },
  {
    question: 'Nettoyez-vous aussi les restaurants et espaces alimentaires ?',
    answer:
      'On entretient la salle, les sanitaires, les vitrines et la terrasse. On ne promet pas le dégraissage de hottes ni le nettoyage technique d\'une cuisine professionnelle : ce n\'est pas le même métier.',
  },
  {
    question: 'Quel est le tarif pour l\'entretien d\'un commerce de 100 m² ?',
    answer:
      'Le prix dépend de la fréquence, de la surface et des surfaces à traiter (sols, vitrines, sanitaires, réserve). Pas de grille affichée : devis gratuit sous 24 h après votre demande.',
  },
  {
    question: 'Intervenez-vous aussi pour les rideaux métalliques et façades ?',
    answer:
      'Oui, lavage des rideaux et des façades accessibles, en prestation ponctuelle ou dans le contrat. Un tag relève plutôt de la fiche graffitis.',
  },
  {
    question: 'Et après un saccage ou une dégradation ?',
    answer:
      'Oui, c\'est un autre rythme : débarras, nettoyage intensif, réouverture. Le détail est sur la page dédiée, pas ici — cette fiche reste l\'entretien régulier.',
  },
];

export function NettoyageCommercesPage() {
  return (
    <>
      <SEO_Guardian currentSection="nettoyage-commerces" faqItems={FAQ_ITEMS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Nettoyage de commerces à Marseille',
            description:
              'Entretien régulier de commerces à Marseille depuis 2021 : avant ouverture, vitrines, sols, sanitaires. Réponse sous 2 h, devis sous 24 h.',
            provider: NATURE_CLEAN_PROVIDER,
            areaServed: { '@type': 'City', name: 'Marseille' },
            serviceType: 'Entretien de commerces et magasins',
            url: 'https://natureclean.fr/services/nettoyage-commerces',
          }),
        }}
      />

      <ServicePageHero
        title="Nettoyage de commerces à Marseille"
        subtitle="Entretien régulier, avant ouverture, sans fermer la boutique"
        badge="Contrats récurrents"
        badgeIcon={<Store className="w-4 h-4" />}
        imageSrc={IMAGES.jdSportMarseilleFloor}
        imageAlt="Sols d'un magasin de sport à Marseille, lavés avant l'ouverture"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Nettoyage de commerces' },
        ]}
        devisLink="/devis?service=commerces"
      />

      <section className="relative py-16 bg-white overflow-hidden">
        <ImageWithFallback
          src={IMAGES.boutiqueVide}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] hidden md:block"
          loading="lazy"
          decoding="async"
          width={800}
          height={450}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              Un sol propre, des rayons tenus et une vitrine sans traces : c&apos;est ce que voit un
              client avant de pousser la porte. Nature Clean entretient des commerces à Marseille
              depuis {FOUNDING_YEAR}, depuis le 8e.
            </p>
            <p>
              On intervient avant l&apos;ouverture ou après la fermeture — Vieux-Port, Canebière, La
              Valentine (11e), Plan-de-Campagne, Aubagne. Produits et matériel fournis, environ 50 %
              éco-labellisés. Zone : Marseille et les Bouches-du-Rhône.
            </p>
            <p className="font-semibold text-green-700 text-center py-2">
              Réponse sous 2 h, devis sous 24 h — horaires décalés 6 h–22 h
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
                Ce qu&apos;on fait dans un commerce
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                Surface de vente, vitrines, sanitaires. Sans chiffres inventés.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {(
                [
                  {
                    icon: Store,
                    title: 'Surface de vente',
                    image: IMAGES.vitrineBoutiqueLuxe,
                    desc: 'Sols, rayonnages, comptoirs. Un client qui hésite devant une vitrine grasse ne revient pas. La façade, c\'est la première prise de parole.',
                  },
                  {
                    icon: Clock,
                    title: 'Avant ouverture',
                    image: IMAGES.boutiqueVide,
                    desc: 'Passage calé sur vos horaires : le sol est praticable quand les équipes arrivent. Pas besoin de fermer pour un entretien courant.',
                  },
                  {
                    icon: Square,
                    title: 'Vitrines',
                    image: IMAGES.lavageVitrine,
                    desc: 'Eau déminéralisée contre le calcaire marseillais. En rue passante, la fréquence se décide à la visite, pas sur une grille nationale.',
                  },
                ] as const
              ).map((card, i) => (
                <ScrollReveal key={card.title} delay={i * 0.08}>
                  <ServiceFeatureCard
                    title={card.title}
                    image={card.image}
                    icon={card.icon}
                    description={card.desc}
                    imageHeightClass="h-32"
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ConversionBreak
        image={IMAGES.whatsappCommerce}
        imageAlt="Intérieur d'un commerce marseillais après un passage d'entretien"
        title="Un contrat calé sur vos horaires d'ouverture"
        subtitle="Avant 8 h ou après la fermeture. Produits fournis, interlocuteur dédié."
        devisLink="/devis?service=commerces"
        objectPosition="object-center"
      />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
                Boutiques, cafés, galeries
              </h2>
              <p className="text-center text-gray-500 mb-12 text-lg">
                L&apos;entretien suit le type de commerce, pas un protocole unique.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6">
              <ScrollReveal delay={0.08}>
                <ServiceShowcaseCard
                  src={IMAGES.entretienMagasin}
                  alt="Rayonnages et allée d'une boutique après entretien"
                  title="Boutiques & magasins"
                  subtitle="Prêt-à-porter, retail, électronique"
                />
              </ScrollReveal>
              <ScrollReveal delay={0.16}>
                <ServiceShowcaseCard
                  src={IMAGES.nettoyageVitresPro}
                  alt="Salle et vitrage d'un café, côté rue"
                  title="Cafés & salles"
                  subtitle="Salle, sanitaires, terrasse — pas les hottes"
                />
              </ScrollReveal>
              <ScrollReveal delay={0.24}>
                <ServiceShowcaseCard
                  src={IMAGES.lavageVitrine}
                  alt="Vitrine de galerie commerciale lavée à l'eau déminéralisée"
                  title="Galeries commerciales"
                  subtitle="Devantures et espaces communs accessibles"
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-white overflow-hidden">
        <ImageWithFallback
          src={IMAGES.lavageVitrine}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] hidden md:block"
          loading="lazy"
          decoding="async"
          width={800}
          height={450}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">
                Un ménage calé sur l&apos;ouverture, pas sur nos habitudes
              </h2>
            </ScrollReveal>

            <div className="space-y-6 text-gray-700 leading-relaxed text-left">
              <p>
                Petite boutique ou grand plateau : on écrit le cahier des charges après la visite.
                Horaires, accès rideau, local poubelles, vitrines — rien n&apos;est improvisé le premier
                lundi.
              </p>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Horaires décalés</h3>
                <p className="mb-4">
                  Avant l&apos;ouverture, après la fermeture, parfois la nuit. Vieux-Port, Canebière,
                  La Valentine, Plan-de-Campagne : chaque site a son créneau.
                </p>
                <p className="font-semibold text-green-700">
                  On est là quand le rideau est baissé.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Entretien courant avant ouverture',
                  'Ménage des espaces administratifs',
                  'Lavage des vitrines et façades accessibles',
                  'Hygiène des sols et sanitaires',
                  'Plan de propreté après visite',
                  '50 % de produits éco-labellisés',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-green-50 border-y border-green-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-start gap-3">
            <Sparkles className="w-6 h-6 text-green-700 flex-shrink-0 mt-1" aria-hidden="true" />
            <div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">
                Magasin dégradé, besoin de réouvrir ?
              </h2>
              <p className="text-gray-700 leading-relaxed">
                L&apos;entretien régulier, c&apos;est cette page. La remise en état après saccage ou
                dégradation — débarras, sols, désinfection — a sa propre fiche, avec le cas d&apos;octobre
                2026.{' '}
                <Link
                  to="/services/remise-etat-urgence-commerce"
                  className="text-green-800 font-semibold underline underline-offset-2 hover:text-green-900"
                >
                  Remise en état d&apos;urgence après dégradation à Marseille
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <GoogleReviews />

      <FAQSection
        items={FAQ_ITEMS}
        title="Questions fréquentes — Nettoyage de commerces"
        subtitle="Horaires, vitrines, tarif et ce qu'on ne fait pas"
      />

      <section className="py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Votre commerce mérite un entretien régulier
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Marseille et Bouches-du-Rhône — réponse sous 2 h, devis sous 24 h
            </p>
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black shadow-lg shadow-green-500/20">
              <Link to="/devis?service=commerces">
                Demander un devis gratuit
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Consultez également :</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/remise-etat-urgence-commerce">Urgence après dégradation</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-vitre">Nettoyage de vitres à Marseille</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/entretien-bureaux">Entretien de bureaux</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-graffitis">Nettoyage de graffitis</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/realisations">Réalisations</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
