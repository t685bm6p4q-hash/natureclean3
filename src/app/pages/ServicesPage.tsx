import { Link } from 'react-router';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { GoogleReviews } from '@/app/components/GoogleReviews';
import { BulletList } from '@/app/components/BulletList';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { Button } from '@/app/components/ui/button';
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  ARIA_PHONE,
  FOUNDING_YEAR,
  GOOGLE_PROFILE_URL,
  ZONE_LABEL,
} from '@/app/utils/constants';
import { ArrowRight, Phone, ExternalLink } from 'lucide-react';

const SERVICE_SECTIONS = [
  {
    id: 'coproprietes',
    title: 'Nettoyage de copropriétés à Marseille',
    href: '/services/nettoyage-coproprietes',
    linkLabel: 'Nettoyage de copropriétés à Marseille',
    intro:
      'Halls, escaliers, ascenseurs, parkings : entretien régulier des parties communes, avec un planning défini avec le syndic.',
    bullets: [
      'Passages réguliers sur contrat',
      'Sols, vitres et parties communes',
      'Référent identifié au contrat quand la taille du site le permet',
    ],
  },
  {
    id: 'chantiers',
    title: 'Nettoyage de fin de chantier à Marseille',
    href: '/services/nettoyage-chantiers',
    linkLabel: 'Nettoyage de fin de chantier à Marseille',
    intro:
      'Voile de ciment, plâtre, colle, vitres : remise en propreté avant la livraison ou l\'emménagement, pour promoteurs, artisans et particuliers.',
    bullets: [
      'Menus gravats et déchets d\'entretien évacués si prévu au devis',
      'Équipe mobilisable en urgence de livraison',
      'Certificat de nettoyage remis sur demande',
    ],
  },
  {
    id: 'bureaux',
    title: 'Entretien de bureaux à Marseille',
    href: '/services/entretien-bureaux',
    linkLabel: 'Entretien de bureaux à Marseille',
    intro:
      'Entretien régulier de bureaux et de locaux tertiaires, en horaires décalés pour ne pas perturber vos équipes.',
    bullets: [
      'Postes de travail, sols, sanitaires',
      'Créneaux possibles de 6 h à 22 h sur contrat',
      'Produits et matériel fournis',
    ],
  },
  {
    id: 'cabinet-medical',
    title: 'Nettoyage de cabinets médicaux à Marseille',
    href: '/services/nettoyage-cabinet-medical-marseille',
    linkLabel: 'Nettoyage de cabinets médicaux à Marseille',
    intro:
      'Salles de consultation, accueil et sanitaires : entretien hors heures de soins, sans stérilisation d\'instruments ni gestion des DASRI.',
    bullets: [
      'Cabinets médicaux et paramédicaux',
      'Désinfection des surfaces de contact',
      'Discrétion et planning adapté au cabinet',
    ],
  },
  {
    id: 'commerces',
    title: 'Nettoyage de commerces à Marseille',
    href: '/services/nettoyage-commerces',
    linkLabel: 'Nettoyage de commerces à Marseille',
    intro:
      'Vitrines, zones de vente, caisses et réserves, avant l\'ouverture ou après la fermeture. Intervention d\'urgence possible après dégradations.',
    bullets: [
      'Entretien courant hors horaires clientèle',
      'Plan de propreté adapté à votre point de vente',
      'Remise en état rapide après sinistre',
    ],
  },
  {
    id: 'diogene',
    title: 'Nettoyage syndrome de Diogène à Marseille',
    href: '/services/nettoyage-diogene',
    linkLabel: 'Nettoyage syndrome de Diogène à Marseille',
    intro:
      'Tri, évacuation, nettoyage et désinfection d\'un logement en situation d\'accumulation, sans jugement. Avec l\'accord de l\'occupant ou de son représentant légal : familles, syndics, bailleurs, mandataires.',
    bullets: [
      'Réponse sous 2 h, devis sous 24 h après visite',
      'Remise en propreté et hygiène — pas de constat d\'insalubrité',
      'Discrétion concrète (véhicule banalisé sur demande)',
    ],
  },
  {
    id: 'graffitis',
    title: 'Enlèvement de graffitis à Marseille',
    href: '/services/nettoyage-graffitis',
    linkLabel: 'Enlèvement de graffitis à Marseille',
    intro:
      'Tags et graffitis sur façades, rideaux métalliques et vitrines, avec une technique choisie selon le support (aérogommage ou traitement chimique), après test préalable.',
    bullets: [
      'Délai annoncé au devis ; appelez-nous en urgence',
      'Protection anti-graffiti en option',
      'Pour syndics, enseignes et gestionnaires de sites',
    ],
  },
  {
    id: 'sols',
    title: 'Remise en état des sols à Marseille',
    href: '/services/remise-etat-sols',
    linkLabel: 'Remise en état des sols à Marseille',
    intro:
      'Décapage, cristallisation et lustrage de marbre, béton ciré, carrelage et autres revêtements, selon l\'état du support.',
    bullets: [
      'Traitement adapté à chaque matériau',
      'Protection après intervention',
      'Devis après visite du revêtement',
    ],
  },
  {
    id: 'vitres',
    title: 'Nettoyage de vitres à Marseille',
    href: '/services/nettoyage-vitre',
    linkLabel: 'Nettoyage de vitres à Marseille',
    intro:
      'Vitrines, baies vitrées, façades vitrées, vérandas, intérieur comme extérieur.',
    bullets: [
      'Perche et eau déminéralisée ; nacelle si la voirie le permet',
      'Pas de pose de vitres (vitrerie)',
      'Retouches si un défaut est constaté à la fin',
    ],
  },
  {
    id: 'evenementiel',
    title: 'Nettoyage événementiel à Marseille',
    href: '/services/nettoyage-evenementiel',
    linkLabel: 'Nettoyage événementiel à Marseille',
    intro:
      'Mise en propreté avant, entretien pendant et remise en état après mariages, séminaires, salons et concerts en salle.',
    bullets: [
      'Équipes disponibles en soirée et le week-end',
      'Intervention discrète',
      'Sortie des déchets d\'entretien selon filières du site',
    ],
  },
] as const;

const PROFILE_LINKS = [
  {
    label: 'Syndic ou gestionnaire d\'immeuble',
    href: '/services/nettoyage-coproprietes',
    linkText: 'Nettoyage de copropriétés à Marseille',
  },
  {
    label: 'Promoteur, artisan ou chef de chantier',
    href: '/services/nettoyage-chantiers',
    linkText: 'Nettoyage de fin de chantier à Marseille',
  },
  {
    label: 'Responsable de bureaux',
    href: '/services/entretien-bureaux',
    linkText: 'Entretien de bureaux à Marseille',
  },
  {
    label: 'Médecin, dentiste ou paramédical',
    href: '/services/nettoyage-cabinet-medical-marseille',
    linkText: 'Nettoyage de cabinets médicaux à Marseille',
  },
  {
    label: 'Commerçant ou gérant de magasin',
    href: '/services/nettoyage-commerces',
    linkText: 'Nettoyage de commerces à Marseille',
  },
  {
    label: 'Un proche d\'une personne en situation d\'encombrement',
    href: '/services/nettoyage-diogene',
    linkText: 'Nettoyage syndrome de Diogène à Marseille',
  },
] as const;

const FAQ_SERVICES: FAQItem[] = [
  {
    question: 'Combien coûte un nettoyage professionnel à Marseille ?',
    answer:
      'Chaque prestation est chiffrée sur mesure selon la surface, la fréquence et l\'état des locaux. Le devis est gratuit, détaillé et sans frais cachés, remis avant toute intervention.',
  },
  {
    question: 'Quelle est votre zone d\'intervention ?',
    answer:
      'Marseille (13001 à 13016), Aix-en-Provence, Aubagne, La Ciotat, Marignane, Vitrolles, Salon-de-Provence, Istres et Martigues — Bouches-du-Rhône (13).',
  },
  {
    question: 'Fournissez-vous les produits et le matériel ?',
    answer:
      'Oui. Produits professionnels et matériel sont inclus dans chaque prestation. Environ 50 % de nos produits d\'entretien courant sont éco-labellisés.',
  },
  {
    question: 'Intervenez-vous le soir, la nuit ou le week-end ?',
    answer:
      'Oui, sur contrat : créneaux possibles de 6 h à 22 h, y compris le week-end selon le planning. Notre standard administratif est ouvert du lundi au samedi, de 8 h à 18 h.',
  },
  {
    question: 'Êtes-vous assurés ?',
    answer:
      'Oui, Nature Clean est couverte par une assurance responsabilité civile professionnelle (RC Pro).',
  },
  {
    question: 'Proposez-vous des contrats récurrents sans engagement ?',
    answer:
      'Oui, ponctuel ou récurrent, avec un planning défini ensemble. Pas de durée minimale imposée dans le devis type ; le préavis pour arrêter un contrat est écrit au contrat.',
  },
  {
    question: 'Intervenez-vous en urgence ?',
    answer:
      'Oui, selon disponibilité : fin de chantier avant remise des clés, remise en état d\'un commerce, tags à effacer rapidement. Appelez-nous au 04 84 89 68 75.',
  },
];

const PROCESS_STEPS = [
  {
    title: 'Vous nous contactez',
    text: 'Réponse sous 2 h en horaires d\'ouverture (lundi–samedi, 8 h–18 h).',
  },
  {
    title: 'Nous évaluons',
    text: 'Visite ou échange de photos, puis devis détaillé, gratuit, sous 24 h.',
  },
  {
    title: 'Nous intervenons',
    text: 'Produits, matériel et équipe fournis, dans le créneau convenu.',
  },
  {
    title: 'Nous contrôlons',
    text: 'Vérification en fin d\'intervention, retouches si besoin.',
  },
] as const;

export function ServicesPage() {
  return (
    <>
      <SEO_Guardian currentSection="services" faqItems={FAQ_SERVICES} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'Services de nettoyage professionnel Nature Clean',
            itemListElement: SERVICE_SECTIONS.map((s, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              name: s.title,
              url: `https://natureclean.fr${s.href}`,
            })),
          }),
        }}
      />

      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 pt-6 pb-10">
          <nav className="text-sm text-gray-500 mb-8" aria-label="Fil d'Ariane">
            <Link to="/" className="hover:text-green-700 underline-offset-2 hover:underline">
              Accueil
            </Link>
            <span className="mx-2 text-gray-400" aria-hidden="true">
              /
            </span>
            <span className="text-gray-900 font-medium">Services</span>
          </nav>

          <ScrollReveal>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-5 max-w-4xl">
              Nos services de nettoyage professionnel à Marseille
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed max-w-3xl mb-8">
              Depuis {FOUNDING_YEAR}, Nature Clean intervient auprès des syndics, entreprises,
              commerçants, promoteurs et familles de {ZONE_LABEL}. Produits et matériel fournis,
              équipes déclarées, assurance RC Pro. Réponse sous 2 h, devis gratuit sous 24 h.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 font-bold">
                <Link to="/devis">
                  Demander un devis gratuit
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-green-600 text-green-700 font-bold">
                <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                  <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6">Vous êtes…</h2>
            <ul className="space-y-4 list-none p-0 m-0">
              {PROFILE_LINKS.map((item) => (
                <li key={item.href} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="font-semibold text-gray-900">{item.label}</span>
                  <span className="hidden sm:inline text-gray-400" aria-hidden="true">
                    →
                  </span>
                  <Link
                    to={item.href}
                    className="text-green-700 font-semibold hover:text-green-800 underline underline-offset-2"
                  >
                    {item.linkText}
                  </Link>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-2xl md:text-3xl font-black text-gray-900 mb-10">Nos services</p>
          <div className="space-y-12">
            {SERVICE_SECTIONS.map((service, i) => (
              <ScrollReveal key={service.id} delay={i * 0.03}>
                <article className="border-b border-gray-100 pb-10 last:border-0">
                  <h2 className="text-xl md:text-2xl font-bold mb-3">
                    <Link
                      to={service.href}
                      className="text-green-800 hover:text-green-900 underline-offset-2 hover:underline"
                    >
                      {service.title}
                    </Link>
                  </h2>
                  <p className="text-gray-700 leading-relaxed mb-4">{service.intro}</p>
                  <BulletList lines={service.bullets} className="mb-5" />
                  <Link
                    to={service.href}
                    className="inline-flex items-center gap-2 text-green-700 font-bold hover:text-green-800 group"
                  >
                    {service.linkLabel}
                    <ArrowRight
                      className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">Comment ça se passe</h2>
            <ol className="space-y-6 list-none p-0 m-0 counter-reset-none">
              {PROCESS_STEPS.map((step, index) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-green-700 text-white font-bold flex items-center justify-center text-sm"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6">Ils nous font confiance</h2>
            <blockquote className="text-lg text-gray-700 italic border-l-4 border-green-600 pl-5 text-left mb-6">
              « Prestation et personnel au top, je recommande vivement. »
              <footer className="text-sm text-gray-500 not-italic mt-3">
                — Christophe Alliey, avis Google, avril 2026
              </footer>
            </blockquote>
            <a
              href={GOOGLE_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 underline underline-offset-2"
            >
              Voir tous nos avis sur Google
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </a>
          </ScrollReveal>
        </div>
      </section>

      <GoogleReviews />

      <FAQSection
        items={FAQ_SERVICES}
        title="Questions fréquentes"
        subtitle="Devis, zones, horaires et contrats"
      />

      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3">Un devis gratuit sous 24 h</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Réponse sous 2 h en horaires d&apos;ouverture. {ZONE_LABEL}.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black">
              <Link to="/devis">
                Demander un devis
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-bold">
              <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
