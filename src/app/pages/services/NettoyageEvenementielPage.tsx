import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE, FOUNDING_YEAR } from '@/app/utils/constants';
import { Button } from '@/app/components/ui/button';
import { Phone, Calendar, Music, Users, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ServiceFeatureCard } from '@/app/components/ServiceFeatureCard';
import { IMAGES } from '@/app/utils/images';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { GoogleReviews } from '@/app/components/GoogleReviews';
import { NATURE_CLEAN_PROVIDER } from '@/app/utils/cleaning-service-jsonld';

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Quels types d\'événements prenez-vous en charge ?',
    answer:
      'Séminaires, salons professionnels, congrès, concerts, inaugurations et réceptions en salle ou en extérieur. On travaille surtout avec des gérants de lieux, des organisateurs et des entreprises — pas le ménage à domicile pour une fête privée.',
  },
  {
    question: 'Intervenez-vous pendant l\'événement ?',
    answer:
      'Oui, si c\'est prévu au devis : sanitaires, espaces communs, vidage des corbeilles, passages discrets en coulisses. On ne remplace pas une équipe de sécurité ni un service traiteur.',
  },
  {
    question: 'Quel préavis est nécessaire pour réserver ?',
    answer:
      'Pour un gros congrès, comptez plutôt 2 à 4 semaines pour caler les équipes et le matériel. Pour une salle plus modeste, une semaine peut suffire. En urgence, appelez : on regarde le planning au 04 84 89 68 75.',
  },
  {
    question: 'Fournissez-vous le matériel et les produits ?',
    answer:
      'Oui, matériel et produits professionnels sont inclus. Environ 50 % de produits éco-labellisés. Vous n\'avez rien à fournir côté matériel d\'entretien.',
  },
  {
    question: 'Intervenez-vous aussi en dehors de Marseille pour les événements ?',
    answer:
      'Oui, dans les Bouches-du-Rhône : Aix-en-Provence, Aubagne, La Ciotat, Marignane, Vitrolles, Istres, Martigues, Salon-de-Provence. Le devis précise le déplacement et les créneaux.',
  },
];

export function NettoyageEvenementielPage() {
  return (
    <>
      <SEO_Guardian currentSection="nettoyage-evenementiel" faqItems={FAQ_ITEMS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Nettoyage événementiel à Marseille',
            description:
              'Nettoyage avant, pendant et après événement à Marseille depuis 2021. Séminaires, salons, concerts. Réponse sous 2 h, devis sous 24 h.',
            provider: NATURE_CLEAN_PROVIDER,
            areaServed: { '@type': 'AdministrativeArea', name: 'Bouches-du-Rhône' },
            serviceType: 'Nettoyage événementiel',
            url: 'https://natureclean.fr/services/nettoyage-evenementiel',
          }),
        }}
      />

      <ServicePageHero
        title="Nettoyage événementiel à Marseille"
        subtitle="Avant, pendant et après — séminaires, salons et concerts dans les Bouches-du-Rhône"
        badge="Avant & après événement"
        badgeIcon={<Calendar className="w-4 h-4" />}
        imageSrc={IMAGES.salleEvenementielle}
        imageAlt="Salle événementielle préparée pour un séminaire à Marseille"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Nettoyage événementiel' },
        ]}
        devisLink="/devis?service=evenementiel"
      />

      <section className="relative py-16 bg-white overflow-hidden">
        <ImageWithFallback
          src={IMAGES.salleEvenementielle}
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
            <ScrollReveal>
              <p className="text-lg">
                Un événement, c&apos;est aussi des sanitaires, des sols et des espaces communs à tenir pendant
                que le public est là. Nature Clean intervient en <strong>nettoyage événementiel</strong> à
                Marseille depuis {FOUNDING_YEAR}, pour des lieux et des organisateurs professionnels.
              </p>
              <p>
                Cette page décrit le protocole avant / pendant / après. L&apos;entretien régulier de bureaux ou
                de commerces reste sur les fiches dédiées.
              </p>
              <p>
                On intervient <strong>avant l&apos;ouverture</strong> pour une salle prête à accueillir, et{' '}
                <strong>après</strong> pour la remise en état — parfois <strong>pendant</strong>, si le
                planning le prévoit au devis.
              </p>
              <p className="font-semibold text-green-700">
                Réponse sous 2 h, devis sous 24 h — 50 % de produits éco-labellisés
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
                Entretien et remise en propreté avant &amp; après votre événement
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                Gérants de salles, organisateurs, traiteurs et entreprises — planning serré, passages discrets
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {(
                [
                  {
                    icon: Building2,
                    title: 'Séminaires & salons professionnels',
                    image: IMAGES.salleConference,
                    items: [
                      { bold: 'Préparation', text: 'de la salle avant les participants' },
                      { bold: 'Sanitaires et espaces communs', text: 'selon le créneau au devis' },
                      { bold: 'Sols et déchets', text: 'corbeilles, sols, traces de passage' },
                      { bold: 'Remise en état', text: 'complète après le salon ou le séminaire' },
                    ],
                  },
                  {
                    icon: Music,
                    title: 'Salles de réception & concerts',
                    image: IMAGES.salleEvenementielle,
                    items: [
                      { bold: 'Avant le public', text: 'salle, sanitaires, accès' },
                      { bold: 'Pendant', text: 'zones VIP, coulisses, sanitaires si prévu' },
                      { bold: 'Après', text: 'remise en état complète' },
                      { bold: 'Extérieurs', text: 'parkings, tribunes, vitres accessibles' },
                    ],
                  },
                ] as const
              ).map((card, i) => (
                <ScrollReveal key={card.title} delay={i * 0.1}>
                  <ServiceFeatureCard
                    title={card.title}
                    image={card.image}
                    icon={card.icon}
                    items={card.items}
                    imageHeightClass="h-36"
                  />
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.15}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                  <Music className="w-8 h-8 text-blue-600 mb-3" aria-hidden="true" />
                  <h3 className="font-black text-gray-900 mb-2">Avant l&apos;événement</h3>
                  <p className="text-sm text-gray-700">
                    Sols, sanitaires, tables et espaces de circulation. On s&apos;aligne sur votre heure
                    d&apos;ouverture et les contraintes d&apos;accès (badge, quai, monte-charge).
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                  <Users className="w-8 h-8 text-green-600 mb-3" aria-hidden="true" />
                  <h3 className="font-black text-gray-900 mb-2">Pendant &amp; après</h3>
                  <p className="text-sm text-gray-700">
                    Passages discrets si le devis le prévoit. Après la manifestation : remise en état des
                    sanitaires, sols, espaces communs et extérieurs accessibles.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ConversionBreak
        image={IMAGES.salleConference}
        imageAlt="Salle de conférence préparée par Nature Clean"
        title="Votre événement mérite un cadre propre"
        subtitle="Congrès, séminaire, concert — vous gérez le programme, on gère la propreté"
        devisLink="/devis?service=evenementiel"
      />

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  Photos terrain
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                  Nature Clean en action
                </h2>
                <p className="text-gray-500">
                  Préparation d&apos;une salle de congrès — photos client, Marseille
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6">
              <ScrollReveal delay={0.08}>
                <div className="group relative rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src={IMAGES.clientEventWide}
                    alt="Salle de congrès préparée par Nature Clean — vue d'ensemble des tables pour un événement professionnel à Marseille"
                    width={1200}
                    height={900}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-xl font-bold mb-1">Congrès — vue d&apos;ensemble</h3>
                    <p className="text-sm opacity-90">Salle nettoyée et mise en place pour l&apos;événement</p>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-500/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Photo client
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.16}>
                <div className="group relative rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src={IMAGES.clientEventAngle}
                    alt="Salle de congrès préparée par Nature Clean — angle latéral, tables et propreté de l'espace"
                    width={700}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white bg-gradient-to-t from-black/80 to-transparent">
                    <h3 className="text-xl font-bold mb-1">Congrès — angle latéral</h3>
                    <p className="text-sm opacity-90">Organisation des tables, sols et accès prêts</p>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-500/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Photo client
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-white overflow-hidden">
        <ImageWithFallback
          src={IMAGES.equipeCamionnette}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] hidden md:block"
          loading="lazy"
          decoding="async"
          width={800}
          height={450}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                On intervient avec des <strong>gérants de salles</strong>, des{' '}
                <strong>organisateurs</strong> et des <strong>entreprises</strong> qui privatent un lieu —
                en intérieur comme en extérieur, dans le 13.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 font-bold shadow-md">
                  <Link to="/devis?service=evenementiel">
                    Demander un devis gratuit
                    <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-green-600 text-green-700 hover:bg-green-50 font-bold"
                >
                  <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                    <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Propreté avant et après la manifestation
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Marseille et Bouches-du-Rhône — réponse sous 2 h, devis sous 24 h
            </p>
            <Button
              asChild
              size="lg"
              className="bg-green-500 hover:bg-green-400 text-gray-900 font-black shadow-lg shadow-green-500/20"
            >
              <Link to="/devis?service=evenementiel">
                Demander un devis gratuit
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <GoogleReviews />

      <FAQSection
        items={FAQ_ITEMS}
        title="Questions fréquentes — Événementiel"
        subtitle="Types d'événements, préavis, zone et matériel"
      />

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Consultez également :</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-commerces">Nettoyage de commerces</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-chantiers">Nettoyage de chantiers</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/remise-etat-sols">Remise en état des sols</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
