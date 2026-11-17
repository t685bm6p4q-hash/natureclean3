import { ConversionBreak } from '@/app/components/ConversionBreak';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE, GOOGLE_PROFILE_URL } from '@/app/utils/constants';
import { NATURE_CLEAN_PROVIDER } from '@/app/utils/cleaning-service-jsonld';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import { Phone, Trash2, Sparkles, Droplets, HardHat, Package, ArrowRight, ClipboardList, CalendarCheck, RotateCcw, Quote } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ServiceFeatureCard } from '@/app/components/ServiceFeatureCard';
import { IMAGES } from '@/app/utils/images';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { GoogleReviews } from '@/app/components/GoogleReviews';
import { ServiceSeoContentSection } from '@/app/components/ServiceSeoContentSection';
import { ZONE_LABEL } from '@/app/utils/constants';

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Quel est le délai d\'intervention pour un nettoyage fin de chantier ?',
    answer:
      'Prise en charge sous 4 h ouvrées aux heures d\'ouverture, devis détaillé après étude. Intervention sous 48 à 72 h. En urgence de livraison (remise des clés, visite de réception), on vise 24 h. La coordination avec les autres corps de métier se règle dès le premier appel.',
  },
  {
    question: 'Évacuez-vous les gravats et déchets de chantier ?',
    answer:
      'On évacue les menus gravats et les déchets de nettoyage : plâtre, voile de ciment, retombées de peinture, cartons. Les gravats volumineux et la benne ne sont pas inclus : si le chantier a déjà une benne, on l\'utilise ; sinon on le dit au devis. Tri des déchets de nettoyage selon la réglementation en vigueur.',
  },
  {
    question: 'Nettoyez-vous après des travaux de rénovation chez un particulier ?',
    answer:
      'Oui. Salle de bain, extension, ravalement : poussière de plâtre, huisseries, sols. On arrive avec le matériel. Pour une fin de bail ou un grand ménage de logement, voir aussi la fiche Gros chantiers.',
  },
  {
    question: 'Combien coûte un nettoyage fin de chantier ?',
    answer:
      'Tout dépend de la surface, de l\'état et de l\'accès. Pas de grille affichée : devis détaillé après étude, visite si le chantier le demande.',
  },
  {
    question: 'Travaillez-vous avec les promoteurs immobiliers ?',
    answer:
      'Oui. On se cale sur la date de réception. Contrôle de fin de chantier avec le responsable sur site, et photos transmises sur demande — pas de « certificat de nettoyage requis par les assureurs ».',
  },
  {
    question: 'Que se passe-t-il s\'il reste des réserves après votre passage ?',
    answer:
      'On revient corriger les points de nettoyage signalés à la réception. C\'est dans la prestation, pas un second devis. Les défauts de travaux (peinture, joints, matériel) restent au corps de métier concerné.',
  },
];

const CHANTIER_PHASES = [
  {
    title: '1. Déblaiement',
    text: 'Évacuation des menus gravats et déchets de nettoyage (plâtre, sciure, cartons). Volumes de benne ou gros gravats : cadre au devis.',
  },
  {
    title: '2. Dépoussiérage',
    text: 'Poussière de gros œuvre et de finition : huisseries, plinthes, radiateurs, luminaires, locaux techniques.',
  },
  {
    title: '3. Finitions et réception',
    text: 'Sols, vitrages, sanitaires et détails livrés. Contrôle avec le responsable sur site et photos transmises sur demande.',
  },
] as const;

const PROCESS_STEPS = [
  {
    icon: Phone,
    title: '1. Demande',
    text: 'Prise en charge sous 4 h ouvrées. On note la date de réception, l\'accès et ce qui reste sur place.',
  },
  {
    icon: ClipboardList,
    title: '2. Visite / état des lieux',
    text: 'Sur place si le chantier le demande : sols, vitres, réserve, local poubelles, stationnement.',
  },
  {
    icon: CalendarCheck,
    title: '3. Devis et créneau',
    text: 'Devis détaillé après étude. Intervention sous 48 à 72 h, 24 h en urgence de livraison.',
  },
  {
    icon: RotateCcw,
    title: '4. Réception et reprise',
    text: 'Check-list, contrôle avec le responsable et photos sur demande. Un oubli de nettoyage : on revient.',
  },
];

export function NettoyageChantiersPage() {
  return (
    <>
      <SEO_Guardian currentSection="nettoyage-chantiers" faqItems={FAQ_ITEMS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Nettoyage de fin de chantier à Marseille',
            description:
              'Nettoyage de fin de chantier à Marseille pour promoteurs, artisans et particuliers : voile de ciment, plâtre, vitres. Matériel fourni, RC Pro, devis détaillé après étude.',
            provider: NATURE_CLEAN_PROVIDER,
            areaServed: { '@type': 'City', name: 'Marseille' },
            serviceType: 'Nettoyage fin de chantier et remise en état après travaux',
            url: 'https://natureclean.fr/services/nettoyage-chantiers',
          }),
        }}
      />

      <ServicePageHero
        title="Nettoyage de fin de chantier à Marseille"
        subtitle="La touche finale avant la remise des clés"
        badge="Interventions ponctuelles"
        badgeIcon={<HardHat className="w-4 h-4" aria-hidden="true" />}
        imageSrc={IMAGES.nettoyageFinChantier}
        imageAlt="Chantier après travaux : sols et menuiseries en cours de lessivage à Marseille"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Nettoyage fin de chantier' },
        ]}
        devisLink="/devis?service=fin-chantier"
      />

      <section className="relative py-16 md:py-20 bg-white overflow-hidden">
        <ImageWithFallback
          src={IMAGES.finChantierMaison}
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
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                <strong>Promoteurs</strong>, <strong>artisans</strong> et <strong>particuliers</strong> :
                un chantier livré propre, c&apos;est la réception qui passe, pas un second passage
                improvisé.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                On intervient après vos travaux. Voile de ciment, laitance, colle époxy, poussière de
                plâtre dans les huisseries : de la poussière de gros œuvre aux finitions. Matériel
                professionnel fourni — autolaveuse, aspirateur, lessivage. On ne fait pas le gros œuvre.
              </p>
              <p className="text-gray-600 text-sm">
                Livraison clés en main promoteur ou artisan : c&apos;est ici. Remise en état lourde
                d&apos;un logement (grand ménage, sortie de bail) :{' '}
                <Link to="/services/nettoyage-gros-chantiers" className="font-semibold text-green-800 underline">
                  fiche gros chantiers
                </Link>
                .
              </p>
              <p className="font-bold text-green-700 text-lg mb-2">
                Prise en charge sous 4 h ouvrées · devis détaillé après étude · intervention sous 48–72 h
                <span className="block text-base font-semibold mt-1">Urgence livraison : 24 h</span>
              </p>
              <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 font-bold shadow-md mt-6">
                <Link to="/devis?service=fin-chantier">
                  Demander un devis gratuit
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
                Processus de réception
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                Visite, check-list, reprise des défauts de nettoyage. Pas de surprise le jour J.
              </p>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {PROCESS_STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <ScrollReveal key={step.title} delay={i * 0.06}>
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm h-full">
                      <Icon className="w-8 h-8 text-green-600 mb-3" aria-hidden="true" />
                      <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{step.text}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            <ScrollReveal>
              <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 text-center mt-14">
                Déroulement en trois phases
              </h2>
              <p className="text-gray-500 text-center mb-8 max-w-2xl mx-auto text-sm">
                Le même chantier peut être découpé selon votre planning : déblaiement, dépoussiérage, puis
                finitions avant la réception.
              </p>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-4">
              {CHANTIER_PHASES.map((phase, i) => (
                <ScrollReveal key={phase.title} delay={i * 0.06}>
                  <div className="bg-white p-5 rounded-xl border border-green-100 shadow-sm h-full">
                    <h3 className="font-bold text-gray-900 mb-2">{phase.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{phase.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
                Remise en propreté après travaux
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                De la poussière de gros œuvre aux finitions : chaque surface a son geste.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {(
                [
                  {
                    icon: Trash2,
                    title: 'Évacuation',
                    image: IMAGES.nettoyageFinChantier,
                    items: [
                      { bold: 'Menus gravats', text: 'et déchets de nettoyage' },
                      { bold: 'Plâtre, sciure, colle', text: '— pas les volumes de benne' },
                      { bold: 'Tri', text: 'selon la réglementation en vigueur' },
                    ],
                  },
                  {
                    icon: Sparkles,
                    title: 'Sols et murs',
                    image: IMAGES.decapageSolEco,
                    items: [
                      { bold: 'Voile de ciment', text: 'et laitance' },
                      { bold: 'Traces', text: 'de peinture et de plâtre' },
                      { bold: 'Lessivage', text: 'adapté à chaque revêtement' },
                    ],
                  },
                  {
                    icon: Droplets,
                    title: 'Vitres',
                    image: IMAGES.lavageVitrine,
                    items: [
                      { bold: 'Vitrages et cadres', text: 'après films de protection' },
                      { bold: 'Autocollants', text: 'de chantier' },
                      { bold: 'Rails et joints', text: 'encrassés' },
                    ],
                  },
                  {
                    icon: Package,
                    title: 'Détails',
                    image: IMAGES.finChantierAppartement,
                    items: [
                      { bold: 'Prises et interrupteurs', text: '' },
                      { bold: 'Radiateurs et luminaires', text: '' },
                      { bold: 'Dépoussiérage', text: 'des pièces livrées' },
                    ],
                  },
                ] as const
              ).map((card, i) => (
                <ScrollReveal key={card.title} delay={i * 0.08}>
                  <ServiceFeatureCard
                    title={card.title}
                    image={card.image}
                    icon={card.icon}
                    items={card.items}
                  />
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={0.2}>
              <div className="bg-green-50 p-8 rounded-lg border-2 border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <HardHat className="w-8 h-8 text-green-600" aria-hidden="true" />
                  <h3 className="text-2xl font-bold text-gray-900">L&apos;engagement Nature Clean</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6 text-gray-700">
                  <div>
                    <p className="font-semibold text-green-700 mb-2">Délais dits clairement</p>
                    <p className="text-sm">
                      Prise en charge 4 h ouvrées, devis détaillé après étude, intervention 48–72 h. Urgence livraison : 24 h.
                      Marseille, Aubagne, La Ciotat — Bouches-du-Rhône.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-700 mb-2">Sécurité chantier</p>
                    <p className="text-sm">
                      EPI, consignes de sécurité chantier, coordination avec les autres corps de
                      métier.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-700 mb-2">Dossier de réception</p>
                    <p className="text-sm">
                      Certificat de nettoyage signé, remis sur demande pour votre dossier de
                      réception.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ConversionBreak
        image={IMAGES.finChantierAppartement}
        imageAlt="Appartement après lessivage de fin de chantier à Marseille"
        title="Livrez un chantier propre le jour de la réception"
        subtitle="Prise en charge sous 4 h ouvrées, devis détaillé après étude — intervention sous 48 à 72 h"
        objectPosition="object-center"
        devisLink="/devis?service=fin-chantier"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
                Cas : appartement à Aubagne après travaux
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                Déjà dans nos réalisations. Pas de surface inventée : ce qu&apos;on a vraiment livré.
              </p>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <ScrollReveal>
                <figure className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                  <ImageWithFallback
                    src={IMAGES.remiseEtatAppartMarseille}
                    alt="Pièces de vie d'un appartement à Aubagne après remise en état"
                    className="w-full h-72 object-cover"
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={450}
                  />
                  <figcaption className="px-4 py-3 text-sm text-gray-600 bg-gray-50">
                    Aubagne — octobre 2026
                  </figcaption>
                </figure>
              </ScrollReveal>
              <ScrollReveal delay={0.08}>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Type :</strong> appartement, après travaux
                  </li>
                  <li>
                    <strong>Lieu :</strong> Aubagne, secteur Est — 15 à 20 min depuis Marseille 8e
                  </li>
                  <li>
                    <strong>Travail :</strong> sols, plinthes, pièces de vie, pour la réception
                  </li>
                  <li>
                    <strong>Ce qu&apos;on n&apos;écrit pas :</strong> pas de m² ni de durée inventés.
                    Le détail est dans les réalisations.
                  </li>
                </ul>
                <p className="mt-6">
                  <Link
                    to="/realisations"
                    className="text-green-800 font-semibold underline underline-offset-2 hover:text-green-900"
                  >
                    Voir les réalisations
                  </Link>
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10 text-center">
                Promoteur ou particulier
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">BTP, promoteurs, artisans</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Date de réception, coordination sur chantier, check-list, certificat sur demande.
                  On se cale sur votre planning de livraison, pas l&apos;inverse.
                </p>
                <Link
                  to="/devis?service=fin-chantier"
                  className="text-green-800 font-semibold underline underline-offset-2"
                >
                  Devis promoteur / artisan
                </Link>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Particuliers</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  Après votre rénovation : poussière, sols, vitres. Pour une fin de bail ou un grand
                  ménage de logement, l&apos;angle est sur{' '}
                  <Link
                    to="/services/nettoyage-gros-chantiers"
                    className="text-green-800 font-semibold underline underline-offset-2"
                  >
                    Gros chantiers
                  </Link>
                  .
                </p>
                <Link
                  to="/devis?service=fin-chantier"
                  className="text-green-800 font-semibold underline underline-offset-2"
                >
                  Devis particulier
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 md:p-8">
            <Quote className="w-8 h-8 text-amber-400 mb-3" aria-hidden="true" />
            <p className="text-gray-800 leading-relaxed mb-4">
              « Sérieux et efficace ! […] J&apos;ai fait appel à cette société pour deux fins de
              chantiers, au top ! Arrangeants, professionnels et efficaces. »
            </p>
            <p className="text-sm text-gray-600">
              Li PO — avis Google, février 2024 ·{' '}
              <a
                href={GOOGLE_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-800 font-semibold underline underline-offset-2"
              >
                Voir la fiche
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 text-center">
                Chantiers livrés
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                Photos de nos interventions. D&apos;autres références sur demande, ou sur la page
                réalisations.
              </p>
            </ScrollReveal>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {(
                [
                  {
                    src: IMAGES.nettoyageFinChantier,
                    alt: 'Intervention de fin de chantier sur un site à Marseille',
                    label: 'Fin de chantier sur site',
                  },
                  {
                    src: IMAGES.remiseEtatAppartMarseille,
                    alt: 'Appartement à Aubagne après travaux',
                    label: 'Appartement — Aubagne',
                  },
                  {
                    src: IMAGES.finChantierMaison,
                    alt: 'Équipe sur un chantier de remise en état',
                    label: 'Équipe sur chantier',
                  },
                  {
                    src: IMAGES.decapageSolEco,
                    alt: 'Sols lessivés après travaux',
                    label: 'Sols après travaux',
                  },
                ] as const
              ).map((photo, i) => (
                <ScrollReveal key={photo.label} delay={i * 0.07}>
                  <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
                    <div className="aspect-[4/3]">
                      <ImageWithFallback
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        width={600}
                        height={450}
                      />
                    </div>
                    <p className="px-3 py-2 text-sm font-semibold text-gray-800 bg-gray-50 border-t border-gray-100">
                      {photo.label}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ServiceSeoContentSection
        title="Entreprise de nettoyage fin de chantier à Marseille"
        lead="Réception promoteur, artisan ou particulier : la propreté se joue après les corps d’état, pas au forceps le jour J."
      >
        <p>
          Le <strong>nettoyage de fin de chantier à Marseille</strong> couvre la livraison d&apos;un logement ou
          d&apos;un local tertiaire une fois les travaux terminés : voile de ciment, retombées de plâtre dans les
          huisseries, traces de peinture, vitrages encore protégés par du film. Nature Clean intervient pour les{' '}
          <strong>promoteurs</strong>, <strong>artisans</strong> et <strong>particuliers</strong> sur{' '}
          {ZONE_LABEL}, avec du matériel professionnel sur place (aspiration fine, lessivage, vitres).
        </p>
        <h3 className="text-xl font-bold text-gray-900 pt-2">Déblaiement, dépoussiérage, finitions</h3>
        <p>
          Nous déroulons en général trois temps : évacuation des menus gravats de nettoyage, dépoussiérage des
          surfaces livrées, puis finitions sols/vitres/détails. Les volumes de benne ou gravats lourds sont cadres
          au devis — nous ne remplaçons pas le corps d&apos;état qui gère le gros œuvre.
        </p>
        <h3 className="text-xl font-bold text-gray-900 pt-2">Réception et dossier</h3>
        <p>
          Contrôle avec le responsable sur site, photos transmises sur demande pour votre dossier de réception — pas
          de « certificat de nettoyage exigé par les assureurs ». En urgence de livraison (remise des clés,
          visite de réception), nous visons une mobilisation rapide si vous nous contactez tôt. Pour une{' '}
          <strong>remise en état lourde</strong> de logement (grand ménage après rénovation, sortie de bail), voir
          la fiche{' '}
          <Link to="/services/nettoyage-gros-chantiers" className="text-green-800 font-semibold underline">
            gros chantiers
          </Link>
          .
        </p>
      </ServiceSeoContentSection>

      <GoogleReviews />

      <section className="py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Propreté pour une livraison de chantier à Marseille
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Marseille et Bouches-du-Rhône — prise en charge sous 4 h ouvrées, devis détaillé après étude
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-white font-black">
                <Link to="/devis?service=fin-chantier">Demander un devis gratuit</Link>
              </Button>
              <Button asChild size="lg" variant="outlineOnDark">
                <a href={PHONE_HREF} className="flex items-center justify-center gap-2" aria-label={ARIA_PHONE}>
                  <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FAQSection
        items={FAQ_ITEMS}
        title="Questions fréquentes — Fin de chantier"
        subtitle="Délais, gravats, tarif et reprise des réserves"
      />

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Consultez également :</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-gros-chantiers">Gros chantiers et fin de bail</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/remise-etat-sols">Remise en état des sols</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/realisations">Réalisations</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/blog/normes-nettoyage-chantier-2025">Check-list chantier (blog)</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
