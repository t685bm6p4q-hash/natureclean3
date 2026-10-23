import { IMAGES, getOptimizedCldUrl } from '@/app/utils/images';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import {
  Phone,
  Building2,
  DoorOpen,
  ArrowUpDown,
  Trash2,
  Shield,
  Leaf,
  CheckCircle2,
  ArrowRight,
  ClipboardList,
  PhoneCall,
  CalendarCheck,
  UserCheck,
  ExternalLink,
} from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ServiceFeatureCard } from '@/app/components/ServiceFeatureCard';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { GoogleReviews } from '@/app/components/GoogleReviews';
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  ARIA_PHONE,
  FOUNDING_YEAR,
  ZONE_LABEL,
  GOOGLE_PROFILE_URL,
} from '@/app/utils/constants';
import { NATURE_CLEAN_PROVIDER } from '@/app/utils/cleaning-service-jsonld';

const ZONE_COMMUNES =
  'Marseille (13001 à 13016), Aix-en-Provence, Aubagne, La Ciotat, Marignane, Vitrolles, Istres, Martigues et Salon-de-Provence';

const AUDIENCE_PROFILES = [
  {
    label: 'Syndic ou cabinet de gestion',
    text: 'Contrat écrit, pièces RC Pro, devis présentable au conseil syndical.',
  },
  {
    label: 'Conseil syndical',
    text: 'Cahier des charges par zone, fréquences réalistes, reprise des oublis cadrée.',
  },
  {
    label: 'Gestionnaire de résidence',
    text: 'Coordination gardien / prestataire, local poubelles et parkings au planning.',
  },
  {
    label: 'Copropriétaire',
    text: 'Transmettez notre fiche à votre syndic : nous ne contactons pas les résidents sans accord.',
  },
] as const;

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Quelles parties communes nettoyez-vous en copropriété ?',
    answer:
      'Halls, escaliers, paliers, ascenseurs, parkings, local poubelles et caves si elles sont au contrat. Pas d\'entretien paysager (tonte, taille) : au plus balayage ou ramassage de déchets si c\'est écrit au devis. Vitrines de commerces en RDC : fiche commerces ou vitres.',
  },
  {
    question: 'Pouvez-vous externaliser le ménage des parties communes à la place du gardien ?',
    answer:
      'On peut reprendre ou compléter les tâches de propreté des parties communes, avec matériel et produits fournis. Ce n\'est pas un remplacement du gardien au sens social (accueil, sécurité, convention collective) : le périmètre exact se cadre avec le syndic et le conseil syndical.',
  },
  {
    question: 'Comment fonctionne le contrat avec le syndic ?',
    answer:
      'Visite, cahier des charges (zones, fréquences, horaires), devis détaillé sous 24 h. Durée, reconduction et préavis de résiliation sont écrits au contrat — rien n\'est imposé en dehors du document signé.',
  },
  {
    question: 'Le devis peut-il être présenté en assemblée générale ?',
    answer:
      'Oui. Le devis liste zones, fréquences et montants ; vous pouvez le joindre au dossier AG ou au conseil syndical. Sur demande, nous pouvons fournir une synthèse une page pour faciliter la comparaison des offres.',
  },
  {
    question: 'Intervenez-vous sur les grandes résidences ?',
    answer:
      'Oui, de la petite copropriété aux immeubles de plusieurs dizaines de lots. Équipe stable et référent quand la taille du site le permet ; compte-rendu ou registre de passage si c\'est au contrat.',
  },
  {
    question: 'Comment les résidents signalent-ils un problème ?',
    answer:
      'En priorité via le syndic ou le gardien. Si le contrat le prévoit, un e-mail ou un numéro direct pour les remontées urgentes (local poubelles, hall). Reprise d\'un oubli : dans la journée ou au passage suivant selon l\'heure.',
  },
  {
    question: 'Quelles pièces administratives fournissez-vous ?',
    answer:
      'Attestation d\'assurance RC Pro avec le devis ou à la signature. Personnel déclaré. Attestation de vigilance URSSAF : sur demande pour les marchés qui l\'exigent — à préciser avec votre syndic.',
  },
  {
    question: 'Nettoyez-vous les vitres des parties communes ?',
    answer:
      'Oui si c\'est au contrat (hall, cage d\'escalier). Façades vitrées ou hauteur : fiche nettoyage de vitres à Marseille (perche, voirie, calcaire).',
  },
  {
    question: 'Quelle est votre zone d\'intervention pour les copropriétés ?',
    answer: `${ZONE_COMMUNES} — Bouches-du-Rhône (13). Hors département : étude au devis selon distance et type de prestation.`,
  },
];

const CONTRACT_STEPS = [
  {
    icon: PhoneCall,
    title: '1. Demande',
    text: 'Appel ou formulaire. Réponse sous 2 h aux heures d\'ouverture (lun–sam, 8 h–18 h).',
  },
  {
    icon: ClipboardList,
    title: '2. Visite',
    text: 'Accès, badges, local poubelles, fréquence réaliste, contraintes de bruit.',
  },
  {
    icon: CalendarCheck,
    title: '3. Cahier des charges + devis',
    text: 'Zones, passages, créneaux. Devis gratuit sous 24 h, lisible pour le conseil syndical ou l’AG.',
  },
  {
    icon: UserCheck,
    title: '4. Suivi',
    text: 'Référent identifié quand la taille du site le permet. Absence : remplaçant. Oubli : rattrapage.',
  },
] as const;

export function NettoyageCoproprietesPage() {
  return (
    <>
      <SEO_Guardian currentSection="nettoyage-coproprietes" faqItems={FAQ_ITEMS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Nettoyage de copropriétés à Marseille',
            description:
              'Entretien des parties communes à Marseille depuis 2021 : halls, escaliers, parkings. Contrats syndic. RC Pro, devis sous 24 h.',
            provider: NATURE_CLEAN_PROVIDER,
            areaServed: { '@type': 'AdministrativeArea', name: 'Bouches-du-Rhône' },
            serviceType: 'Nettoyage de copropriétés',
            url: 'https://natureclean.fr/services/nettoyage-coproprietes',
          }),
        }}
      />

      <ServicePageHero
        title="Nettoyage de copropriétés à Marseille"
        subtitle="Syndics et gestionnaires : halls, escaliers, parkings et locaux poubelles"
        badge="Syndics & gestionnaires"
        badgeIcon={<Building2 className="w-4 h-4" aria-hidden="true" />}
        imageSrc={IMAGES.hallMarbreAscenseurs}
        imageAlt="Hall de copropriété avec ascenseurs et sol entretenu à Marseille"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Nettoyage de copropriétés' },
        ]}
        devisLink="/devis?service=coproprietes"
      />

      <section className="relative py-16 md:py-20 bg-white overflow-hidden">
        <ImageWithFallback
          src={IMAGES.hallMarbreAscenseurs}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] hidden md:block"
          loading="lazy"
          decoding="async"
          width={800}
          height={450}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  <strong>Syndics</strong>, <strong>conseils syndicaux</strong> et{' '}
                  <strong>gestionnaires</strong> : les parties communes sont la vitrine de
                  l&apos;immeuble — hall poussiéreux ou local poubelles négligé, les résidents le
                  voient tout de suite.
                </p>
                <p>
                  Nature Clean entretient des copropriétés à Marseille depuis {FOUNDING_YEAR}. Zone :{' '}
                  {ZONE_LABEL} ({ZONE_COMMUNES}). Matériel et produits fournis — environ 50 %
                  éco-labellisés sur l&apos;entretien courant.
                </p>
                <p>
                  À Marseille, le parc mélange immeubles anciens sans ascenseur, halls de grande
                  hauteur, cages d&apos;escalier étroites et locaux poubelles exposés au calcaire et
                  aux odeurs : le planning doit en tenir compte, pas un protocole « catalogue ».
                </p>
                <p className="font-semibold text-green-700">
                  Réponse sous 2 h, devis sous 24 h — RC Pro
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 font-bold">
                    <Link to="/devis?service=coproprietes">
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
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="bg-green-50 p-8 rounded-xl border border-green-200">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Ce qu&apos;on cadre au contrat</h2>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    Fréquences par zone (hall, escaliers, parking, poubelles)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    Désinfection des points de contact (poignées, ascenseur) à chaque passage prévu
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    Référent identifié quand la taille du site le permet
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6">Vous êtes…</h2>
            <ul className="space-y-5 list-none p-0 m-0">
              {AUDIENCE_PROFILES.map((item) => (
                <li key={item.label} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                  <span className="font-bold text-gray-900 block mb-1">{item.label}</span>
                  <span className="text-sm text-gray-700 leading-relaxed">{item.text}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
              Parties communes : ce qu&apos;on entretient
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              Un plan de ménage écrit au devis — pas une liste générique identique sur chaque immeuble.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: DoorOpen,
                title: 'Halls & escaliers',
                image: IMAGES.cageEscalier,
                items: [
                  { bold: 'Aspiration', text: 'sols et moquettes' },
                  { bold: 'Lavage', text: 'carrelages et paliers' },
                  { bold: 'Dépoussiérage', text: 'rampes, plinthes, boîtes aux lettres' },
                ],
              },
              {
                icon: ArrowUpDown,
                title: 'Ascenseurs & vitres communes',
                image: IMAGES.hallClassiqueAscenseurs,
                items: [
                  { bold: 'Cabines', text: 'parois, miroirs, boutons' },
                  { bold: 'Vitrages', text: 'hall et cage si au contrat' },
                  { bold: 'Hauteur', text: 'détail sur la fiche vitres' },
                ],
              },
              {
                icon: Building2,
                title: 'Parkings & abords',
                image: IMAGES.parkingSouterrain,
                items: [
                  { bold: 'Balayage', text: 'et lavage des zones prévues' },
                  { bold: 'Caves', text: 'si accessibles et au contrat' },
                  { bold: 'Tags', text: 'renvoi vers enlèvement de graffitis' },
                ],
              },
              {
                icon: Trash2,
                title: 'Locaux poubelles',
                image: IMAGES.hallCoproBoites,
                items: [
                  { bold: 'Lavage', text: 'sol et parois' },
                  { bold: 'Désinfection', text: 'surfaces de contact' },
                  { bold: 'Sortie', text: 'des conteneurs si prévu avec le syndic' },
                ],
              },
            ].map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.08}>
                <ServiceFeatureCard title={card.title} image={card.image} icon={card.icon} items={card.items} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ConversionBreak
        image={IMAGES.hallCoproBoites}
        imageAlt="Hall de copropriété avec boîtes aux lettres à Marseille"
        title="Un contrat syndic clair, pas une promesse floue"
        subtitle="Réponse sous 2 h, devis sous 24 h — Marseille et Bouches-du-Rhône"
        devisLink="/devis?service=coproprietes"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">
              Comment se passe la mise en place
            </h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {CONTRACT_STEPS.map((step) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="flex gap-4 p-5 bg-gray-50 rounded-xl border border-gray-100">
                    <Icon className="w-8 h-8 text-green-600 flex-shrink-0" aria-hidden="true" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">{step.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <ScrollReveal direction="left">
              <div className="grid grid-cols-2 gap-4">
                {[IMAGES.hallMarbreAscenseurs, IMAGES.cageEscalier, IMAGES.hallClassiqueAscenseurs, IMAGES.parkingSouterrain].map(
                  (src, idx) => (
                    <div
                      key={idx}
                      className={`rounded-2xl overflow-hidden shadow-lg ${idx % 2 === 1 ? 'mt-6' : ''}`}
                    >
                      <ImageWithFallback
                        src={getOptimizedCldUrl(src, 400)}
                        alt={
                          idx === 0
                            ? 'Hall de copropriété, sol marbre et portes d’ascenseur'
                            : idx === 1
                              ? 'Cage d’escalier en béton et rampe métallique'
                              : idx === 2
                                ? 'Hall avec deux ascenseurs et carrelage au sol'
                                : 'Parking souterrain, marquage au sol et colonnes'
                        }
                        className="w-full h-[220px] object-cover"
                        loading="lazy"
                        decoding="async"
                        width={400}
                        height={220}
                      />
                    </div>
                  ),
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <h2 className="text-3xl font-black text-gray-900 mb-6">Pourquoi travailler avec nous</h2>
              <div className="space-y-4 mb-8">
                {[
                  {
                    icon: Shield,
                    title: 'Contrat écrit',
                    desc: 'Zones, fréquences, créneaux — pas de « entretien complet » sans liste.',
                  },
                  {
                    icon: CheckCircle2,
                    title: 'Suivi terrain',
                    desc: 'Remplaçant si absence. Remontée résident traitée avec le syndic.',
                  },
                  {
                    icon: Leaf,
                    title: '50 % éco-labellisés',
                    desc: 'Sur l\'entretien courant, lorsque le support le permet.',
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-green-600" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 font-bold">
                <Link to="/devis?service=coproprietes">
                  Demander un devis gratuit
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl space-y-12">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
              Contrat syndic : durée, suivi, continuité
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Durée et résiliation</h3>
                <p>
                  Durée initiale, reconduction et préavis sont écrits au contrat — pas de clause
                  cachée. Le devis détaille zones, fréquences et prix ; il peut servir de base pour
                  une présentation en assemblée générale.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Suivi et reprise</h3>
                <p>
                  Registre ou fiche de passage si le syndic le demande. Point régulier avec le
                  référent. Un oubli (sanitaires communs, local poubelles) : reprise dans la journée
                  ou au passage suivant selon l&apos;heure de l&apos;appel.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Continuité</h3>
                <p>
                  Agent absent : remplaçant sur le même créneau quand c&apos;est possible. Pas de
                  promesse de « supervision constante » : un référent et un numéro direct quand la
                  taille du site le permet.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Pièces administratives</h3>
                <p>
                  Attestation RC Pro. Personnel déclaré. Attestation de vigilance URSSAF sur demande
                  pour les contrats qui l&apos;exigent — à confirmer avec votre syndic avant
                  signature.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <div className="bg-green-50 p-6 md:p-8 rounded-xl border border-green-200">
              <h2 className="text-xl font-bold text-gray-900 mb-3">
                Vous êtes copropriétaire ?
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                C&apos;est le syndic (ou le conseil syndical) qui choisit le prestataire, souvent en
                AG. Vous pouvez transmettre notre fiche ou demander un devis : nous le remettons au
                syndic pour comparaison, sans contacter les résidents directement.
              </p>
              <Link
                to="/devis?service=coproprietes"
                className="text-green-800 font-semibold underline underline-offset-2 hover:text-green-900"
              >
                Demander un devis pour ma copropriété
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Zones desservies</h2>
          <p className="text-gray-700 text-sm leading-relaxed mb-4">
            {ZONE_COMMUNES} — Bouches-du-Rhône (13). Pages locales avec accès et contraintes de
            terrain :{' '}
            <Link
              to="/nettoyage-coproprietes-aubagne"
              className="text-green-700 font-semibold underline underline-offset-2"
            >
              copropriétés à Aubagne
            </Link>
            ,{' '}
            <Link
              to="/nettoyage-coproprietes-la-ciotat"
              className="text-green-700 font-semibold underline underline-offset-2"
            >
              La Ciotat
            </Link>
            .{' '}
            <Link to="/zones-intervention" className="text-green-700 font-semibold underline underline-offset-2">
              Carte des zones
            </Link>
            .
          </p>
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
        items={FAQ_ITEMS}
        title="Questions fréquentes — Copropriétés"
        subtitle="Parties communes, contrat syndic, résidences et vitres"
      />

      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Entretien de copropriétés à Marseille
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            {ZONE_LABEL} — réponse sous 2 h, devis sous 24 h
          </p>
          <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black">
            <Link to="/devis?service=coproprietes">
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Consultez également :</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-vitre">Nettoyage de vitres à Marseille</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-graffitis">Enlèvement de graffitis à Marseille</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services">Tous nos services</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
