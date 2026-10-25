import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import {
  ArrowRight,
  ClipboardList,
  Clock,
  Shield,
  Stethoscope,
  UserCheck,
  XCircle,
} from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { BulletList } from '@/app/components/BulletList';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { GoogleReviews } from '@/app/components/GoogleReviews';
import { NATURE_CLEAN_PROVIDER } from '@/app/utils/cleaning-service-jsonld';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE, ZONE_LABEL } from '@/app/utils/constants';
import { IMAGES } from '@/app/utils/images';
import { SERVED_CITIES_SHORT } from '@/app/config/zone-data';

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'À quelle heure intervenez-vous ?',
    answer:
      'En dehors des heures de consultation : avant l\'ouverture, après la fermeture ou le week-end, selon vos contraintes. Le créneau se fixe au contrat.',
  },
  {
    question: 'Désinfectez-vous les instruments médicaux ?',
    answer:
      'Non. La désinfection et la stérilisation des instruments et dispositifs médicaux restent sous la responsabilité du cabinet. Nous nettoyons les locaux, le mobilier et les surfaces de contact.',
  },
  {
    question: 'Gérez-vous les déchets de soins (DASRI) ?',
    answer:
      'Non. Leur collecte et leur élimination relèvent d\'un prestataire spécialisé, à contractualiser par le cabinet.',
  },
  {
    question: 'Quelle fréquence conseillez-vous ?',
    answer:
      'Elle dépend de l\'affluence : passage quotidien ou plusieurs fois par semaine pour un cabinet très fréquenté, hebdomadaire pour un petit cabinet. Nous la définissons avec vous lors de la visite.',
  },
  {
    question: 'Que se passe-t-il si un agent est absent ?',
    answer:
      'Un remplaçant est prévu au contrat lorsque c\'est possible. En cas d\'imprévu, nous vous prévenons et reprogrammons le passage au plus tôt.',
  },
  {
    question: 'Les produits sont-ils fournis ?',
    answer:
      'Oui. Produits et matériel professionnels sont inclus dans la prestation.',
  },
  {
    question: 'Combien coûte l\'entretien d\'un cabinet ?',
    answer:
      'Le prix dépend de la surface, du nombre de salles, de la fréquence et des horaires. Devis gratuit et détaillé sous 24 h, sans engagement.',
  },
  {
    question: 'Intervenez-vous dans tout Marseille ?',
    answer:
      'Oui, dans les 16 arrondissements, ainsi qu\'à Aix-en-Provence, Aubagne, La Ciotat, Marignane, Vitrolles, Salon-de-Provence, Istres et Martigues.',
  },
];

const AREA_SERVED = SERVED_CITIES_SHORT.map((name) => ({ '@type': 'City' as const, name }));

export function NettoyageCabinetMedicalMarseillePage() {
  return (
    <>
      <SEO_Guardian currentSection="nettoyage-cabinet-medical-marseille" faqItems={FAQ_ITEMS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Nettoyage de cabinets médicaux à Marseille',
            description:
              'Nettoyage et désinfection de cabinets médicaux et paramédicaux à Marseille : salles de consultation, accueil, sanitaires. Hors heures de soins, devis gratuit sous 24 h.',
            provider: NATURE_CLEAN_PROVIDER,
            areaServed: AREA_SERVED,
            serviceType: 'Entretien de cabinets médicaux et paramédicaux',
            url: 'https://natureclean.fr/services/nettoyage-cabinet-medical-marseille',
          }),
        }}
      />

      <ServicePageHero
        title="Nettoyage de cabinets médicaux à Marseille"
        subtitle="Un entretien régulier, discret et réalisé hors des heures de consultation"
        badge="Locaux de santé"
        badgeIcon={<Stethoscope className="w-4 h-4" />}
        imageSrc={IMAGES.cabinetMedical}
        imageAlt="Salle de consultation d'un cabinet médical avec table d'examen, plan de travail et sol en carrelage brillant après entretien"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Nettoyage de cabinets médicaux' },
        ]}
        devisLink="/devis?service=bureaux"
      />

      <section className="relative py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              Dans un cabinet, la propreté fait partie de la confiance des patients, et le ménage ne
              doit jamais empiéter sur les consultations. Nature Clean entretient des cabinets
              médicaux et paramédicaux à Marseille et dans les Bouches-du-Rhône, en dehors des
              heures de soins, avec produits et matériel fournis et une assurance RC Pro.
            </p>
            <p className="font-semibold text-green-700 text-center py-2">
              Réponse sous 2 h en horaires d&apos;ouverture (lundi–samedi, 8 h–18 h), devis gratuit sous 24 h
            </p>
            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <Button asChild className="bg-green-700 hover:bg-green-800 font-bold">
                <Link to="/devis?service=bureaux">Demander un devis gratuit</Link>
              </Button>
              <Button asChild variant="outline" className="font-bold border-green-600 text-green-800">
                <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                  {PHONE_DISPLAY}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">Pour qui ?</h2>
            <p className="text-gray-700 leading-relaxed">
              Cabinets de médecine générale et de spécialistes, cabinets dentaires,
              kinésithérapeutes, infirmiers, sages-femmes, podologues, cabinets de groupe et maisons
              de santé — selon les locaux que nous visitons au devis.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 text-center">
              Ce que nous entretenons
            </h2>
          </ScrollReveal>
          <div className="space-y-10">
            {[
              {
                title: 'Salle de consultation',
                items: [
                  'Table d\'examen : dépoussiérage et désinfection des surfaces, remplacement du drap d\'examen si convenu au contrat',
                  'Plan de travail, évier, distributeurs de savon et d\'essuie-mains',
                  'Bureau, clavier, poignées de porte, interrupteurs',
                  'Sols lavés sans traces',
                ],
              },
              {
                title: 'Salle d\'attente et accueil',
                items: [
                  'Assises, tables, comptoir d\'accueil',
                  'Poignées, interphone, surfaces de contact fréquent',
                  'Vitres intérieures et sols',
                ],
              },
              {
                title: 'Sanitaires',
                items: [
                  'Nettoyage et désinfection complets, réapprovisionnement en savon et papier',
                ],
              },
              {
                title: 'Parties communes du cabinet',
                items: [
                  'Couloirs, vestiaire, local de pause lorsque prévus au contrat',
                  'Vidage des poubelles ordinaires et tri sélectif',
                ],
              },
            ].map((block, i) => (
              <ScrollReveal key={block.title} delay={i * 0.05}>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{block.title}</h3>
                <BulletList lines={block.items} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ConversionBreak
        image={IMAGES.hygieneLocauxSante}
        imageAlt="Locaux de santé entretenus par Nature Clean à Marseille"
        title="Intervention hors consultation"
        subtitle="Planning calé sur votre activité — discrétion et respect des lieux."
        devisLink="/devis?service=bureaux"
        objectPosition="object-center"
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8 text-center">
              Comment nous travaillons
            </h2>
          </ScrollReveal>
          <div className="space-y-6" role="list">
            {[
              {
                icon: ClipboardList,
                title: 'Visite et cahier des charges',
                text: 'Nous repérons les locaux, les zones sensibles et les contraintes du cabinet, puis nous établissons ensemble un planning et une liste de tâches.',
              },
              {
                icon: Clock,
                title: 'Intervention hors consultation',
                text: 'Tôt le matin, en soirée ou le week-end, pour que les locaux soient prêts à l\'ouverture.',
              },
              {
                icon: Shield,
                title: 'Ordre de nettoyage adapté',
                text: 'Des zones les moins sensibles vers les plus sensibles, avec du matériel dédié aux sanitaires et des chiffons séparés par zone.',
              },
              {
                icon: UserCheck,
                title: 'Contrôle et suivi',
                text: 'Fiche de passage et point régulier avec le cabinet lorsque le contrat le prévoit.',
              },
            ].map((step, i) => (
              <ScrollReveal key={step.title} delay={i * 0.06}>
                <div className="flex gap-4 bg-white rounded-xl border border-gray-200 p-5" role="listitem">
                  <step.icon className="w-8 h-8 text-green-600 shrink-0" aria-hidden="true" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.text}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl space-y-8 text-gray-700 leading-relaxed">
          <ScrollReveal>
            <h2 className="text-2xl font-black text-gray-900 mb-4">Produits et désinfection</h2>
            <p>
              Nous utilisons des produits professionnels adaptés aux surfaces et aux zones de contact.
              Environ 50 % de nos produits d&apos;entretien courant sont éco-labellisés. Pour la
              désinfection des locaux, nous utilisons des produits conventionnels lorsque la
              situation l&apos;exige. Fiches de données de sécurité disponibles sur demande.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <h2 className="text-2xl font-black text-gray-900 mb-4">Ce que nous ne faisons pas</h2>
            <ul className="space-y-3">
              {[
                'La stérilisation et la désinfection des instruments et dispositifs médicaux : elles restent sous la responsabilité du cabinet.',
                'La collecte et l\'élimination des déchets de soins (DASRI) : elles relèvent d\'un prestataire spécialisé.',
                'Nous ne manipulons pas les dossiers, les ordonnances ni les données des patients, et nous respectons la confidentialité des lieux.',
              ].map((line) => (
                <li key={line} className="flex gap-2 text-sm">
                  <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <h2 className="text-2xl font-black text-gray-900 mb-4">Notre engagement</h2>
            <div className="grid sm:grid-cols-2 gap-x-4 gap-y-0">
              <BulletList
                lines={[
                  'Équipe déclarée, assurance RC Pro',
                  'Discrétion : intervention hors présence des patients',
                  'Interlocuteur dédié au contrat',
                ]}
              />
              <BulletList
                lines={[
                  "Remplacement en cas d'absence d'un agent lorsque c'est prévu",
                  'Contrat sur mesure : fréquence quotidienne, hebdomadaire ou ponctuelle',
                ]}
              />
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Ce qui fait varier le devis</h2>
            <p className="text-sm">
              La surface, le nombre de salles de consultation, la fréquence des passages, les horaires
              (soir, week-end) et les besoins de désinfection. Devis gratuit, détaillé et sans
              engagement.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-gray-50 border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-6 text-center">
              Un cas concret
            </h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                <ImageWithFallback
                  src={IMAGES.cabinetMedical}
                  alt="Salle de consultation d'un cabinet médical avec table d'examen, plan de travail et sol en carrelage brillant après entretien"
                  className="w-full h-64 object-cover"
                  loading="lazy"
                  width={800}
                  height={400}
                />
                <p className="text-xs text-gray-500 px-4 py-2 bg-white border-t border-gray-100">
                  Salle de consultation entretenue par Nature Clean.
                </p>
              </div>
              <div className="text-gray-700 leading-relaxed space-y-4">
                <p className="font-bold text-gray-900">Cabinet médical, Marseille 13005</p>
                <p className="text-sm">
                  Entretien après la fermeture de la salle d&apos;attente, des salles de consultation,
                  des surfaces de contact et des poignées, pour une réouverture normale le lendemain.
                </p>
                <Link
                  to="/realisations/cas/cabinet-medical-marseille"
                  className="inline-flex items-center gap-1 text-green-800 font-semibold underline underline-offset-2 hover:text-green-900 text-sm"
                >
                  Voir le cas client cabinet médical à Marseille
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <GoogleReviews />

      <FAQSection
        items={FAQ_ITEMS}
        title="Questions fréquentes — Nettoyage de cabinets médicaux"
        subtitle="Horaires, désinfection, DASRI et tarifs"
      />

      <section className="py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Un cabinet à entretenir ?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Visite et devis gratuits sous 24 h. {ZONE_LABEL}.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black">
                <Link to="/devis?service=bureaux">
                  Demander un devis
                  <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold">
                <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                  {PHONE_DISPLAY}
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Consultez également :</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/entretien-bureaux">Entretien de bureaux à Marseille</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-commerces">Nettoyage de commerces à Marseille</Link>
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
