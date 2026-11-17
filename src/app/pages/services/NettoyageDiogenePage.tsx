import { IMAGES } from '@/app/utils/images';
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  ARIA_PHONE,
  ZONE_LABEL,
  LEAD_RESPONSE_SLA,
  MOBILIZATION_AFTER_QUOTE,
  WASTE_BORDEREAU_LINE,
  DIOGENE_VOIAGE_LINE,
  DIOGENE_DISCRETION_LINE,
  RC_PRO_SHORT_LINE,
  RC_PRO_FAQ_ANSWER,
} from '@/app/utils/constants';
import { BulletList } from '@/app/components/BulletList';
import { MobileSnapRail } from '@/app/components/MobileSnapRail';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import {
  Heart,
  ShieldCheck,
  Trash2,
  Phone,
  CheckCircle2,
  ArrowRight,
  ClipboardList,
  Users,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { NATURE_CLEAN_PROVIDER } from '@/app/utils/cleaning-service-jsonld';
import { ServiceSeoContentSection } from '@/app/components/ServiceSeoContentSection';

const PROCESS_STEPS = [
  {
    title: '1. Prise en charge de votre demande',
    text: `${LEAD_RESPONSE_SLA}. Vous nous décrivez la situation, avec des photos si vous le pouvez.`,
  },
  {
    title: '2. Étude et visite technique',
    text: 'Volume, accès (étage, ascenseur, escalier), état du logement et précautions à prendre, puis devis détaillé gratuit. Visite sur place gratuite si nécessaire pour chiffrer.',
  },
  {
    title: '3. Tri et débarras',
    text: `Tri, débarras et évacuation des déchets vers des filières adaptées. ${WASTE_BORDEREAU_LINE}`,
  },
  {
    title: '4. Nettoyage approfondi',
    text: 'Sols, murs, sanitaires et cuisine avec des produits professionnels adaptés.',
  },
  {
    title: '5. Odeurs',
    text: 'Après débarras et nettoyage : aération du logement et, si besoin, produits spécifiques contre les odeurs, avec les protections adaptées.',
  },
  {
    title: '6. Contrôle final',
    text: 'Contrôle avec la personne qui nous a mandatés, et photos de suivi si vous le souhaitez.',
  },
] as const;

const WHO_CAN_REQUEST = [
  'Propriétaires',
  'Familles de la personne concernée',
  'Tuteurs ou mandataires, avec autorisation de la personne juridiquement habilitée',
] as const;

const FAQ_DIOGENE: FAQItem[] = [
  {
    question: 'Qui peut demander l’intervention ?',
    answer:
      'Les propriétaires, les familles et les tuteurs. Nous vérifions l’autorisation de la personne juridiquement habilitée avant d’intervenir.',
  },
  {
    question: 'Que faites-vous si la personne refuse ?',
    answer:
      'Nous n’intervenons pas sans l’accord de la personne habilitée. Un médecin, une assistante sociale ou la mairie peuvent vous orienter.',
  },
  {
    question: 'Que devient mon argent ou mes papiers ?',
    answer:
      'Tout objet de valeur ou document important est signalé à la direction, puis restitué à la personne habilitée via la personne qui nous a mandatés.',
  },
  {
    question: 'Gérez-vous les cafards, les punaises de lit ou les rats ?',
    answer:
      'Pas directement : nous travaillons avec un partenaire spécialisé, puis nous coordonnons le nettoyage. Nous ne réalisons pas ces traitements nous-mêmes.',
  },
  {
    question: 'Pouvez-vous évacuer sans benne ?',
    answer:
      `Nous organisons le débarras selon le volume : rotations vers les filières adaptées, ou location de benne sur étude. ${DIOGENE_VOIAGE_LINE}`,
  },
  {
    question: 'Combien de temps dure une intervention ?',
    answer:
      'De quelques heures à plusieurs jours selon le volume et l’état du logement. Estimation après l’étude.',
  },
  {
    question: 'La discrétion est-elle respectée ?',
    answer:
      `Oui : confidentialité, photos sans éléments identifiants autant que possible, aucune publication sans autorisation. ${DIOGENE_DISCRETION_LINE}`,
  },
  {
    question: 'Êtes-vous assurés pour ce type d’intervention ?',
    answer: RC_PRO_FAQ_ANSWER,
  },
  {
    question: 'Intervenez-vous pour un nettoyage syndrome de Diogène à Marseille et dans le 13 ?',
    answer:
      `Oui, sur ${ZONE_LABEL} : tri, débarras, nettoyage et coordination nuisibles via partenaire si besoin. Mandat de la personne juridiquement habilitée obligatoire. ${MOBILIZATION_AFTER_QUOTE}.`,
  },
];

export function NettoyageDiogenePage() {
  return (
    <>
      <SEO_Guardian currentSection="nettoyage-diogene" faqItems={FAQ_DIOGENE} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Nettoyage syndrome de Diogène à Marseille',
            description:
              'Tri, débarras et nettoyage d’un logement en situation d’accumulation à Marseille et dans les Bouches-du-Rhône. Intervention discrète, étude et devis sur demande.',
            provider: NATURE_CLEAN_PROVIDER,
            areaServed: { '@type': 'AdministrativeArea', name: 'Bouches-du-Rhône' },
            serviceType: 'Nettoyage syndrome de Diogène',
            url: 'https://natureclean.fr/services/nettoyage-diogene',
          }),
        }}
      />

      <ServicePageHero
        title="Nettoyage syndrome de Diogène à Marseille"
        subtitle="Débarras, tri et nettoyage d'un logement, avec discrétion et sans jugement"
        badge="Discrétion & respect"
        badgeIcon={<Heart className="w-4 h-4" aria-hidden="true" />}
        imageSrc={IMAGES.hygieneLocauxSante}
        imageAlt="Équipement de protection et matériel professionnel pour intervention en milieu sensible"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Nettoyage syndrome de Diogène' },
        ]}
        devisLink="/devis?service=diogene"
      />

      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Un logement envahi par les objets ou les déchets, un proche en difficulté, un locataire
              dont la situation inquiète : ces situations sont souvent découvertes par la famille, un
              voisin ou un médecin. Nature Clean intervient à Marseille et dans les {ZONE_LABEL} pour le
              travail matériel : trier, débarrasser, évacuer et nettoyer le logement.
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Nous demandons toujours l&apos;accord de la personne juridiquement habilitée avant
              d&apos;intervenir. {LEAD_RESPONSE_SLA}.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-emerald-700 hover:bg-emerald-800 font-bold">
                <Link to="/devis?service=diogene">
                  Demander une étude confidentielle
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold"
              >
                <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                  <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl grid lg:grid-cols-2 gap-12 items-start">
          <ScrollReveal>
            <h2 className="text-3xl font-black text-gray-900 mb-6">Une intervention, pas un jugement</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Le syndrome de Diogène, ou <strong>syllogomanie</strong>, se manifeste par une
                accumulation d’objets ou de déchets et une négligence du logement, souvent dans un
                contexte d’isolement. Ce n’est ni un manque de volonté ni une simple question de
                ménage. La situation est souvent découverte par la famille, un voisin, un médecin ou
                un syndic.
              </p>
              <p>
                On ne vide pas un logement — on dénoue une situation. Notre rôle est limité et clair
                : <strong>faire le travail matériel</strong> (tri, évacuation,{' '}
                <strong>désencombrement d’appartement</strong>, nettoyage, désinfection){' '}
                <strong>avec discrétion et respect</strong>. Nous ne remplaçons pas un médecin ni un
                accompagnement social ; nous pouvons vous orienter vers les bons interlocuteurs.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
              <ImageWithFallback
                src={IMAGES.finChantierEquipe}
                alt="Équipe Nature Clean avec équipements de protection sur un chantier"
                className="w-full h-64 object-cover"
                loading="lazy"
                decoding="async"
                width={600}
                height={256}
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-7 h-7 text-emerald-600" aria-hidden="true" />
              Qui peut demander une intervention ?
            </h2>
            <BulletList lines={WHO_CAN_REQUEST} bulletClassName="text-emerald-600" className="mb-6" />
            <p className="text-sm text-gray-700 leading-relaxed bg-amber-50 border border-amber-100 rounded-xl p-5">
              Avant toute intervention, nous vérifions l&apos;autorisation de la personne
              juridiquement habilitée et les droits de l&apos;occupant.{' '}
              <strong className="text-gray-900">Nous n&apos;intervenons pas sans cet accord.</strong>
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">
              Comment se déroule une intervention
            </h2>
            <MobileSnapRail
              ariaLabel="Étapes d'une intervention"
              className="md:mx-0 md:px-0 md:flex md:flex-col md:gap-4 md:overflow-visible md:snap-none md:max-w-none"
              slideClassName="w-[88%] snap-center md:w-full"
            >
              {PROCESS_STEPS.map((step) => (
                <div
                  key={step.title}
                  className="flex gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm h-full"
                >
                  <ClipboardList className="w-8 h-8 text-emerald-600 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed">{step.text}</p>
                  </div>
                </div>
              ))}
            </MobileSnapRail>
            <p className="text-center text-sm text-gray-600 mt-6 leading-relaxed">
              {MOBILIZATION_AFTER_QUOTE}, selon nos disponibilités.
            </p>
            <p className="text-center text-xs text-gray-400 mt-3 md:hidden">Glissez pour voir toutes les étapes</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-emerald-50 border-y border-emerald-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">Vos objets personnels</h2>
            <p className="text-gray-700 leading-relaxed">
              Tout objet de valeur ou document important trouvé pendant l&apos;intervention est signalé
              par l&apos;agent à la direction. Nous contactons alors la personne qui nous a mandatés pour
              organiser la restitution à la personne habilitée. Les effets personnels sont conservés selon
              les instructions des personnes habilitées.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <ScrollReveal>
            <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Discrétion et équipement</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Heart,
                title: 'Discrétion et confidentialité',
                text: `Respect de la vie privée, photos de suivi sans éléments identifiants autant que possible, aucune publication sans autorisation. ${DIOGENE_DISCRETION_LINE}`,
              },
              {
                icon: ShieldCheck,
                title: 'Équipement de protection',
                text: 'Combinaisons, gants, masques et chaussures de protection, adaptés aux risques du site.',
              },
              {
                icon: CheckCircle2,
                title: 'Équipe et assurance',
                text: RC_PRO_SHORT_LINE,
              },
              {
                icon: Trash2,
                title: 'Nuisibles : partenaire spécialisé',
                text: 'En présence de cafards, punaises de lit ou rongeurs : partenaire pour désinsectisation ou dératisation, puis nous coordonnons le nettoyage. Nous ne réalisons pas ces traitements nous-mêmes.',
              },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.05}>
                <div className="p-6 bg-gray-50 rounded-xl border border-gray-100 h-full">
                  <item.icon className="w-8 h-8 text-emerald-600 mb-3" aria-hidden="true" />
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-emerald-50 border-y border-emerald-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6">
              Ce que nous faisons — et ce que nous ne faisons pas
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-sm text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Nous faisons</h3>
                <BulletList
                  bulletClassName="text-emerald-600"
                  lines={[
                    'Tri, débarras, évacuation des déchets et nettoyage approfondi du logement',
                  ]}
                />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600" aria-hidden="true" />
                  Nous ne faisons pas
                </h3>
                <BulletList
                  bulletClassName="text-amber-600"
                  lines={[
                    'Travaux de rénovation',
                    'Décontamination spécialisée',
                    'Prise en charge des déchets dangereux',
                    'Suivi médical ou social — le nettoyage ne traite pas la cause ; rapprochez-vous d’un médecin ou d’un service social',
                  ]}
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ConversionBreak
        image={IMAGES.hygieneLocauxSante}
        imageAlt="Matériel professionnel de nettoyage et d'hygiène"
        title="Besoin d’en parler ?"
        subtitle={`Appel confidentiel — ${ZONE_LABEL}. Étude sur place ou sur photos.`}
        devisLink="/devis?service=diogene"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
              Ce qui fait varier le devis
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Nous établissons un devis détaillé après étude, sans tarif standard. Facteurs
              principaux :
            </p>
            <BulletList
              lines={[
                'Volume à évacuer',
                'Accès (étage, ascenseur, distance du véhicule)',
                'État du logement',
                'Présence de nuisibles',
                'Temps nécessaire',
              ]}
              bulletClassName="text-emerald-600"
            />
          </ScrollReveal>
        </div>
      </section>

      <ServiceSeoContentSection
        title="Nettoyage syndrome de Diogène à Marseille : tri, débarras, hygiène"
        lead="Sans jugement — pour les familles, propriétaires et mandataires qui doivent agir sur le logement."
      >
        <p>
          Le <strong>nettoyage Diogène à Marseille</strong> regroupe le travail matériel que vous ne
          pouvez pas assumer seul : trier, évacuer, lessiver et désodoriser un logement en situation
          d&apos;accumulation. Nature Clean n&apos;intervient qu&apos;avec l&apos;accord de la personne
          juridiquement habilitée — famille, tuteur, propriétaire ou syndic selon les cas.
        </p>
        <p>
          Nous ne faisons pas de travaux de rénovation, de décontamination spécialisée ni de suivi
          médical ou social. En présence de nuisibles, un <strong>partenaire</strong> traite
          désinsectisation ou dératisation ; nous coordonnons ensuite le nettoyage. Discrétion :
          confidentialité, photos sans identification si possible, pas de publication sans
          autorisation.
        </p>
        <p>
          {LEAD_RESPONSE_SLA}. {MOBILIZATION_AFTER_QUOTE}. Devis détaillé après étude (volume, accès,
          état). Voir aussi nos fiches{' '}
          <Link to="/services/nettoyage-gros-chantiers" className="text-green-800 font-semibold underline">
            remise en état lourde
          </Link>{' '}
          si le besoin dépasse le seul syndrome de Diogène.
        </p>
      </ServiceSeoContentSection>

      <FAQSection
        items={FAQ_DIOGENE}
        title="Questions fréquentes — Syndrome de Diogène"
        subtitle="Désencombrement, discrétion et délais à Marseille"
      />

      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Besoin d’en parler ?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Appel confidentiel — devis détaillé après étude. {ZONE_LABEL}.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-black">
              <Link to="/devis?service=diogene">
                Demander un devis confidentiel
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outlineOnDark">
              <a href={PHONE_HREF} className="flex items-center justify-center gap-2" aria-label={ARIA_PHONE}>
                <Phone className="w-5 h-5 shrink-0" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Consultez également :</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold">
              <Link to="/services/nettoyage-coproprietes">Nettoyage de copropriétés (syndics)</Link>
            </Button>
            <Button asChild variant="outline" className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold">
              <Link to="/contact">Contact confidentiel</Link>
            </Button>
            <Button asChild variant="outline" className="border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-bold">
              <Link to="/services">Tous nos services</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
