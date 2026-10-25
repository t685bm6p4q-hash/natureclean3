import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import {
  Briefcase,
  Trash2,
  Sparkles,
  Wind,
  Square,
  Droplets,
  ClipboardList,
  UserCheck,
  PhoneCall,
  CalendarCheck,
} from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { BulletList } from '@/app/components/BulletList';
import { ServiceFeatureCard } from '@/app/components/ServiceFeatureCard';
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
    question: 'À quelle fréquence faut-il nettoyer des bureaux professionnels ?',
    answer:
      'Un open space occupé tous les jours se salit plus vite qu’un cabinet de deux pièces : poussière, traces de café, sanitaires. En pratique, on propose un passage quotidien sur les grands plateaux, et 2 à 3 passages par semaine sur les petits bureaux. Le planning se décide après la visite, pas sur une grille générique.',
  },
  {
    question: 'Pouvez-vous intervenir en dehors des heures de bureau ?',
    answer:
      'Oui. C’est le mode le plus demandé à Marseille : avant 8 h ou après 19 h, dans une plage 6 h–22 h, pour que vos équipes retrouvent les locaux propres. Les grands plateaux se font souvent en binôme. Le standard téléphonique, lui, reste ouvert du lundi au samedi, 8 h–18 h.',
  },
  {
    question: 'Les produits de nettoyage sont-ils fournis ?',
    answer:
      'Oui. Produits et matériel viennent avec le contrat : vous n’avez rien à stocker. Environ 50 % de nos produits sont éco-labellisés. Les désinfectants de sanitaires et de surfaces tactiles sont des produits professionnels, distincts des produits d’entretien courants.',
  },
  {
    question: 'Comment démarre un contrat d’entretien ?',
    answer:
      'Visite des locaux, cahier des charges (zones, fréquences, horaires), devis sous 24 h, puis un interlocuteur dédié et un planning. Si l’agent habituel est absent, on le remplace. Un écart de qualité se signale sur le numéro dédié : on revient corriger, on n’attend pas la fin du mois.',
  },
  {
    question: 'Que se passe-t-il en cas d’absence ou de souci de qualité ?',
    answer:
      'Un remplaçant est envoyé. Un oubli (sanitaires, cuisine, salle de réunion) se rattrape dans la journée ou au passage suivant, selon l’heure de l’appel. Le référent du site reste le même : vous n’avez pas à raconter l’historique à chaque fois.',
  },
  {
    question: 'Quelles zones de bureaux nettoyez-vous ?',
    answer:
      'Open spaces, bureaux individuels, salles de réunion, sanitaires, cuisines et espaces détente, halls, vitrages de bureaux, et parking si c’est dans le contrat. Le détail (hauteur, voirie, calcaire) est sur la page Nettoyage de vitres à Marseille. Les vitrines de magasins : fiche commerces.',
  },
];

const services = [
  {
    icon: Briefcase,
    title: 'Entretien des postes de travail',
    description:
      'Bureaux, écrans, claviers, souris et combinés : on dépoussière, puis on désinfecte les surfaces que tout le monde touche. Sans laisser d’humidité sur le matériel informatique.',
    features: [
      'Dépoussiérage microfibre des bureaux, étagères et écrans',
      'Désinfection des claviers, souris et téléphones',
      'Nettoyage du matériel informatique sans humidité résiduelle',
    ],
  },
  {
    icon: Sparkles,
    title: 'Surfaces tactiles',
    description:
      'Poignées, interrupteurs, boutons d’ascenseur, tables de réunion : ce sont les points de contact du quotidien. On les traite à chaque passage, pas une fois par mois.',
    features: [
      'Boutons d’ascenseur et interrupteurs',
      'Rampes, poignées de porte, badges',
      'Distributeurs et surfaces partagées',
    ],
  },
  {
    icon: Trash2,
    title: 'Gestion des déchets',
    description:
      'Vidage des corbeilles et tri selon les filières déjà en place dans vos locaux (jaune, gris, bio si vous en avez). On ne gère pas les déchets de soins infectieux (DASRI) : ce n’est pas notre métier.',
    features: [
      'Vidage des corbeilles et remplacement des sacs',
      'Tri selon les bacs de votre site',
      'Sortie des sacs vers le local prévu au contrat',
    ],
  },
  {
    icon: Wind,
    title: 'Entretien des sols et moquettes',
    description:
      'Aspiration au quotidien, lavage des sols durs, shampoing ou injection-extraction des moquettes selon le revêtement. Le passage est calé pour que le sol soit praticable au retour des équipes.',
    features: [
      'Aspiration des sols et moquettes',
      'Lavage des sols durs à l’autolaveuse',
      'Traitement des taches : café, encre, traces de cuisine',
    ],
  },
  {
    icon: Square,
    title: 'Vitrages de bureaux',
    description:
      'À Marseille, calcaire et embruns marquent les vitrages. On lave à l’eau déminéralisée, à la perche télescopique. Hauteur, voirie et façades : voir le nettoyage de vitres à Marseille. Les vitrines de commerces sont sur la fiche commerces.',
    features: [
      'Vitrages intérieurs et extérieurs accessibles',
      'Eau déminéralisée pour limiter les traces de calcaire',
      'Intervention en hauteur sécurisée, hors chantier BTP',
    ],
  },
  {
    icon: Droplets,
    title: 'Hygiène des sanitaires',
    description:
      'Nettoyage et désinfection des sanitaires à chaque passage, réassort savon et papier. Produits professionnels, sans chercher l’odeur chimique forte.',
    features: [
      'Lavabos, cuvettes, urinoirs, robinetterie',
      'Désinfection des points de contact',
      'Réapprovisionnement savon, papier, diffuseurs',
    ],
  },
];

const contractSteps = [
  {
    icon: PhoneCall,
    title: '1. Demande',
    text: 'Formulaire ou appel. Réponse sous 2 h aux heures d’ouverture.',
  },
  {
    icon: ClipboardList,
    title: '2. Visite',
    text: 'On voit les locaux, les accès, les horaires possibles et ce qui pose vraiment problème.',
  },
  {
    icon: CalendarCheck,
    title: '3. Cahier des charges + devis',
    text: 'Zones, fréquences, créneaux. Devis gratuit sous 24 h.',
  },
  {
    icon: UserCheck,
    title: '4. Planning et référent',
    text: 'Un interlocuteur dédié. Absence d’agent : remplaçant. Écart qualité : on revient.',
  },
];

export function EntretienBureauxPage() {
  return (
    <>
      <SEO_Guardian currentSection="entretien-bureaux" faqItems={FAQ_ITEMS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Nettoyage de bureaux à Marseille',
            description:
              'Entretien régulier de bureaux à Marseille depuis 2021 : horaires décalés, produits et matériel fournis, RC Pro. Réponse sous 2 h, devis sous 24 h.',
            provider: NATURE_CLEAN_PROVIDER,
            areaServed: {
              '@type': 'City',
              name: 'Marseille',
            },
            serviceType: 'Entretien de bureaux et locaux professionnels',
            url: 'https://natureclean.fr/services/entretien-bureaux',
          }),
        }}
      />

      <ServicePageHero
        title="Nettoyage de bureaux à Marseille"
        subtitle="Entretien régulier, horaires décalés, sans perturber vos équipes"
        badge="Contrats récurrents"
        badgeIcon={<Briefcase className="w-4 h-4" />}
        imageSrc={IMAGES.entrepriseBureauxMarseille}
        imageAlt="Open space marseillais avec postes de travail et baies vitrées, éclairé en journée"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Entretien de bureaux' },
        ]}
        devisLink="/devis?service=bureaux"
      />

      <section className="relative py-16 bg-white overflow-hidden">
        <ImageWithFallback
          src={IMAGES.entrepriseBureauxMarseille}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] hidden md:block"
          loading="lazy"
          decoding="async"
          width={800}
          height={450}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  <strong>Responsables de site</strong>, <strong>cabinets</strong> et{' '}
                  <strong>open spaces</strong> : un bureau propre se juge en quelques secondes, par
                  vos équipes autant que par un client.
                </p>
                <p>
                  Nature Clean entretient des bureaux à Marseille depuis {FOUNDING_YEAR}, depuis le
                  8e (Traverse Pupat). On intervient dans les arrondissements, y compris La
                  Valentine, et vers Aubagne ou Vitrolles quand le site est dans le 13. Tôt le matin
                  ou en soirée, avec du matériel professionnel et des produits fournis — environ 50 %
                  éco-labellisés.
                </p>
                <p className="font-semibold text-green-700">
                  Réponse sous 2 h, devis sous 24 h — horaires décalés 6 h–22 h
                </p>
              </div>

              <div className="bg-green-50 p-8 rounded-lg border-2 border-green-200">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Le + Nature Clean</h2>
                <BulletList
                  lines={[
                    { bold: 'Horaires décalés', text: '— 6 h à 22 h, sans bloquer vos équipes' },
                    {
                      bold: 'Produits et matériel fournis',
                      text: '— 50 % éco-labellisés, rien à stocker',
                    },
                    { bold: 'RC Pro', text: '— un référent de site, un numéro direct' },
                  ]}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
                Comment démarre un contrat
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                Visite, cahier des charges, planning. Pas de surprise le premier lundi.
              </p>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {contractSteps.map((step, i) => {
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
            <div className="text-center mt-8">
              <Button asChild className="bg-green-700 hover:bg-green-800 font-bold">
                <Link to="/devis?service=bureaux">Demander un devis gratuit</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
                Qui on entretient à Marseille
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                Des types de sites, pas des logos inventés. Un cas sols tertiaires est déjà dans les
                réalisations.
              </p>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: 'Cabinets et professions libérales',
                  text: 'Salles d’attente, bureaux individuels, sanitaires. Prado, 6e, 8e : souvent un passage 2 à 3 fois par semaine, avant l’ouverture.',
                },
                {
                  title: 'Agences et sièges',
                  text: 'Open space, salles de réunion, kitchenette. Joliette et centre : on calque le créneau sur l’arrivée des équipes.',
                },
                {
                  title: 'Coworkings et plateaux',
                  text: 'Beaucoup de passages, beaucoup de points de contact. Euroméditerranée : badge, parking, intervention tôt.',
                },
              ].map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.08}>
                  <Card className="border-green-100 h-full">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
            <p className="text-center mt-8">
              <Link
                to="/realisations"
                className="text-green-800 font-semibold underline underline-offset-2 hover:text-green-900"
              >
                Voir les réalisations (sols tertiaires et locaux d’entreprise)
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
                Propreté et hygiène pour vos espaces professionnels
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                Chaque espace a son rythme : postes, sols, sanitaires, vitrages de bureaux.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {(
                [
                  {
                    icon: Briefcase,
                    title: 'Postes de travail',
                    image: IMAGES.entrepriseBureauxMarseille,
                    imagePosition: 'center',
                    items: [
                      { bold: 'Dépoussiérage', text: 'informatique, mobilier et surfaces' },
                      { bold: 'Désinfection', text: 'des claviers, souris et écrans' },
                      { bold: 'Nettoyage', text: 'des téléphones et accessoires' },
                    ],
                  },
                  {
                    icon: Wind,
                    title: 'Sols',
                    image: IMAGES.solsBureauxPro,
                    imagePosition: 'center',
                    items: [
                      { bold: 'Entretien', text: 'de moquettes, parquets et carrelages' },
                      { bold: 'Aspiration', text: 'et lavage avec matériel professionnel' },
                      { bold: 'Traitement', text: 'des taches, sol praticable au retour' },
                    ],
                  },
                  {
                    icon: Droplets,
                    title: 'Sanitaires',
                    image: IMAGES.salleBainDesinfection,
                    imagePosition: 'center bottom',
                    items: [
                      { bold: 'Nettoyage', text: 'et désinfection à chaque passage' },
                      { bold: 'Gestion', text: 'des consommables (savon, papier)' },
                      { bold: 'Produits', text: 'professionnels, 50 % éco-labellisés' },
                    ],
                  },
                  {
                    icon: Square,
                    title: 'Vitrages de bureaux',
                    image: IMAGES.facadeVitreeImmeuble,
                    imagePosition: 'center',
                    items: [
                      { bold: 'Lavage', text: 'intérieur et extérieur accessibles' },
                      { bold: 'Eau déminéralisée', text: 'contre le calcaire marseillais' },
                      { bold: 'Hauteur', text: 'sécurisée, équipements et formation' },
                    ],
                  },
                ] as const
              ).map((card, i) => (
                <ScrollReveal key={card.title} delay={i * 0.08}>
                  <ServiceFeatureCard
                    title={card.title}
                    image={card.image}
                    imagePosition={card.imagePosition}
                    icon={card.icon}
                    items={card.items}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ConversionBreak
        image={IMAGES.entrepriseBureauxMarseille}
        imageAlt="Open space entretenu en horaires décalés à Marseille"
        title="Vos bureaux méritent un entretien régulier"
        subtitle="Horaires décalés, produits fournis, interlocuteur dédié"
        devisLink="/devis?service=bureaux"
      />

      <section className="relative py-16 bg-white overflow-hidden">
        <ImageWithFallback
          src={IMAGES.entrepriseBureauxMarseille}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.03] hidden md:block"
          loading="lazy"
          decoding="async"
          width={800}
          height={450}
        />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Nos prestations de ménage et d&apos;entretien de bureaux
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <Card key={service.title} className="hover:shadow-xl transition-shadow border-green-100">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="w-7 h-7 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                    <BulletList lines={service.features} />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 bg-green-50 border-y border-green-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-black text-gray-900 mb-3">
            Quartiers d&apos;affaires : Prado, Joliette, Euroméditerranée
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Cette page décrit le contrat et le protocole (fréquences, sanitaires, planning). Pour les
            accès, badges et parkings des quartiers d&apos;affaires, voir{' '}
            <Link
              to="/nettoyage-bureaux-marseille"
              className="text-green-800 font-semibold underline underline-offset-2 hover:text-green-900"
            >
              l&apos;entretien de bureaux au Prado, à La Joliette et à Euroméditerranée
            </Link>
            .
          </p>
        </div>
      </section>

      <GoogleReviews />

      <FAQSection
        items={FAQ_ITEMS}
        title="Questions fréquentes — Entretien de bureaux"
        subtitle="Fréquences, horaires, contrat et organisation à Marseille"
      />

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Consultez également :</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link to="/nettoyage-bureaux-marseille">Bureaux Prado, Joliette, Euromed</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link to="/services/nettoyage-vitre">Nettoyage de vitres à Marseille</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link to="/services/nettoyage-commerces">Nettoyage de commerces et magasins</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link to="/services/remise-etat-sols">Remise en état des sols</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link to="/realisations">Réalisations</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
