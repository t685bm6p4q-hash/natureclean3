import { IMAGES } from '@/app/utils/images';
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  ARIA_PHONE,
  ZONE_LABEL,
} from '@/app/utils/constants';
import { BulletList } from '@/app/components/BulletList';
import { MobileSnapRail } from '@/app/components/MobileSnapRail';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import {
  Heart,
  ShieldCheck,
  Trash2,
  Sparkles,
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

const PROCESS_STEPS = [
  {
    title: '1. Appel confidentiel',
    text: 'Vous décrivez la situation. Réponse sous 2 h aux heures d’ouverture (lundi–samedi, 8 h–18 h).',
  },
  {
    title: '2. Visite et devis gratuits',
    text: 'Volume, état du logement, accès (étage, ascenseur, couloirs). Devis détaillé sous 24 h, sans engagement.',
  },
  {
    title: '3. Tri et mise de côté',
    text: 'Documents, papiers d’identité, argent, souvenirs et objets de valeur repérés avant tout déplacement. Liste ou photos sur demande, remise à l’occupant ou à la personne désignée.',
  },
  {
    title: '4. Évacuation',
    text: 'Déchets et encombrants vers une filière adaptée (benne ou déchetterie). Bordereau de suivi remis si votre dossier l’exige.',
  },
  {
    title: '5. Nettoyage et désinfection',
    text: 'Lessivage des murs, sols et sanitaires, dégraissage cuisine, désinfection des surfaces avec produits professionnels adaptés au support.',
  },
  {
    title: '6. Contrôle final',
    text: 'Vérification avec vous, retouches si nécessaire, compte rendu avec photos si vous le souhaitez.',
  },
] as const;

const WHO_CAN_REQUEST = [
  'L’occupant lui-même',
  'Un proche (enfant, conjoint, famille), avec l’accord de la personne ou de son représentant légal',
  'Un tuteur, un curateur ou un mandataire judiciaire',
  'Un bailleur ou un syndic, dans le cadre de ses démarches',
  'Un service social ou un organisme d’aide',
] as const;

const FAQ_DIOGENE: FAQItem[] = [
  {
    question: 'Qu’est-ce que le syndrome de Diogène ?',
    answer:
      'C’est un trouble du comportement qui se traduit par une accumulation d’objets ou de déchets (syllogomanie), une négligence de l’hygiène du logement et souvent un isolement social. Notre rôle n’est pas de juger, mais de remettre le logement en état de propreté et d’hygiène, de façon discrète et respectueuse.',
  },
  {
    question: 'Comment se déroule une intervention ?',
    answer:
      'Après un appel confidentiel, visite et devis gratuits, puis tri, évacuation, nettoyage et désinfection. Une vérification finale est faite avec vous. Le détail des six étapes est présenté sur cette page.',
  },
  {
    question: 'Intervenez-vous si la personne refuse ou n’est pas consciente du problème ?',
    answer:
      'Non, pas sans l’accord de l’occupant ou de son représentant légal. Mieux vaut d’abord passer par le médecin traitant, un service social ou la mairie (service d’hygiène). Nous pouvons vous aider à identifier le bon interlocuteur.',
  },
  {
    question: 'Mes affaires personnelles seront-elles conservées ?',
    answer:
      'Les documents, papiers d’identité, argent, souvenirs et objets de valeur sont repérés et mis de côté avant tout déplacement. Sur demande : liste ou photos ; remise à l’occupant ou à la personne que vous désignez.',
  },
  {
    question: 'Comment assurez-vous la discrétion ?',
    answer:
      'Véhicule banalisé sur demande, horaires adaptés, tenue neutre. Nous ne communiquons sur la nature de l’intervention ni au voisinage ni à des tiers, sauf personnes que vous indiquez (syndic, gardien) si c’est nécessaire à l’accès.',
  },
  {
    question: 'Combien de temps dure une intervention ?',
    answer:
      'De quelques heures à plusieurs jours selon le volume et l’état du logement. Estimation précise lors de la visite.',
  },
  {
    question: 'Intervenez-vous vite ?',
    answer:
      'Réponse sous 2 h en horaires d’ouverture, devis sous 24 h après la visite, intervention en général sous 48 h selon disponibilité. Situation urgente (signalement, délai bailleur) : appelez-nous directement.',
  },
  {
    question: 'Le logement sera-t-il propre à la fin ?',
    answer:
      'Notre objectif est un logement nettoyé et désinfecté — remise en état de propreté et d’hygiène. Si des travaux sont nécessaires (peinture, revêtements, humidité structurelle), nous vous le disons après la visite.',
  },
  {
    question: 'Que se passe-t-il après l’intervention ?',
    answer:
      'Le nettoyage ne traite pas la cause du problème. Nous vous conseillons un suivi avec un médecin ou un service social pour limiter une rechute. Un passage d’entretien ponctuel peut être chiffré au devis si vous le souhaitez.',
  },
];

const QUOTE_FACTORS = [
  'Volume à évacuer et surface du logement',
  'Accès (étage sans ascenseur, couloirs étroits, distance de la benne)',
  'État sanitaire (déchets souillés, moisissures, nuisibles)',
  'Niveau de nettoyage et de désinfection nécessaire',
  'Stationnement benne et autorisation de voirie si occupation du trottoir ou de la chaussée',
  'Horaires et contraintes de discrétion',
] as const;

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
              'Désencombrement, tri, nettoyage et désinfection de logement en situation d’accumulation. Intervention discrète, devis confidentiel.',
            provider: NATURE_CLEAN_PROVIDER,
            areaServed: { '@type': 'AdministrativeArea', name: 'Bouches-du-Rhône' },
            serviceType: 'Nettoyage syndrome de Diogène',
            url: 'https://natureclean.fr/services/nettoyage-diogene',
          }),
        }}
      />

      <ServicePageHero
        title="Nettoyage syndrome de Diogène à Marseille"
        subtitle="Désencombrement, nettoyage et désinfection d'un logement, avec discrétion et sans jugement"
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
              Un proche, un locataire ou un voisin vit dans un{' '}
              <strong>logement insalubre</strong> ou envahi par les objets et les déchets, et vous ne
              savez pas par où commencer ? Nature Clean intervient à Marseille et dans les{' '}
              {ZONE_LABEL} pour remettre le logement en{' '}
              <strong>état de propreté et d’hygiène</strong>, en respectant la personne et ses
              affaires.
            </p>
            <p className="text-sm text-gray-600 mb-6">
              Réponse sous 2 h en horaires d’ouverture (lundi–samedi, 8 h–18 h). Visite et devis
              gratuits sous 24 h — le diagnostic et le devis sont sans engagement.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-emerald-700 hover:bg-emerald-800 font-bold">
                <Link to="/devis?service=diogene">
                  Demander un devis confidentiel
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
              <strong className="text-gray-900">Nous n’intervenons pas</strong> sans l’accord de
              l’occupant ou de son représentant légal. Si la situation est bloquée, tournez-vous
              vers le médecin traitant, une assistante sociale ou le service d’hygiène de la mairie.
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
            <p className="text-center text-xs text-gray-400 mt-3 md:hidden">Glissez pour voir toutes les étapes</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <ScrollReveal>
            <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Notre façon de travailler</h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: Heart,
                title: 'Discrétion',
                text: 'Véhicule banalisé sur demande, horaires adaptés, tenue neutre. Pas de communication sur l’intervention au voisinage ou à des tiers non désignés.',
              },
              {
                icon: ShieldCheck,
                title: 'Protection',
                text: 'Combinaisons, gants et masques adaptés à la situation ; protection des parties communes pendant l’évacuation. Aiguilles ou déchets souillés : protocole renforcé ou recours à un intervenant spécialisé si nécessaire.',
              },
              {
                icon: CheckCircle2,
                title: 'Équipe et assurance',
                text: 'Personnel déclaré, couvert par notre assurance responsabilité civile professionnelle (RC Pro).',
              },
              {
                icon: Trash2,
                title: 'Nuisibles',
                text: 'Si des nuisibles sont constatés, traitement par un partenaire spécialisé ou solution adaptée — précisé au devis, avec les habilitations requises.',
              },
              {
                icon: Sparkles,
                title: 'Odeurs',
                text: 'Nettoyage approfondi et aération en priorité. Nébulisation ou ozone uniquement si adapté : logement inoccupé pendant le traitement, puis aération avant toute réoccupation.',
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
                    'Tri et évacuation, nettoyage approfondi, désinfection',
                    'Remise en état de propreté des sols, murs, sanitaires et cuisine',
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
                    'Constater l’insalubrité ou la salubrité d’un logement (autorités compétentes : mairie, ARS)',
                    'Travaux de rénovation (peinture, plomberie, électricité)',
                    'Suivi médical ou social — le nettoyage ne traite pas la cause',
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
        subtitle="Appel confidentiel — Marseille et Bouches-du-Rhône (13). Devis sous 24 h après visite."
        devisLink="/devis?service=diogene"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-4">
              Ce qui fait varier le devis
            </h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Nous n’affichons pas de tarif standard : chaque{' '}
              <strong>désencombrement d’appartement</strong> ou maison est différent. À Marseille,
              comptez aussi les étages sans ascenseur, les couloirs étroits et l’organisation de la
              benne.
            </p>
            <BulletList lines={QUOTE_FACTORS} bulletClassName="text-emerald-600" />
          </ScrollReveal>
        </div>
      </section>

      <FAQSection
        items={FAQ_DIOGENE}
        title="Questions fréquentes — Syndrome de Diogène"
        subtitle="Désencombrement, discrétion et délais à Marseille"
      />

      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Besoin d’en parler ?</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Appel confidentiel, visite et devis gratuits. {ZONE_LABEL}.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-gray-900 font-black">
              <Link to="/devis?service=diogene">
                Demander un devis confidentiel
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/10 font-bold"
            >
              <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
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
