import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import {
  PHONE_HREF,
  ARIA_PHONE,
  PHONE_DISPLAY,
  LEAD_RESPONSE_SLA_SHORT,
  MOBILIZATION_AFTER_QUOTE,
  ZONE_LABEL,
} from '@/app/utils/constants';
import { NATURE_CLEAN_PROVIDER } from '@/app/utils/cleaning-service-jsonld';
import { Button } from '@/app/components/ui/button';
import { BulletList } from '@/app/components/BulletList';
import { Phone, Layers, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { IMAGES } from '@/app/utils/images';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { ServiceSeoContentSection } from '@/app/components/ServiceSeoContentSection';

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Quels sols traitez-vous ?',
    answer:
      'Carrelage, parquet, béton ciré, marbre, tommettes, PVC et autres supports, selon la compatibilité technique.',
  },
  {
    question: 'Combien de temps dure une remise en état ?',
    answer:
      'Cela dépend de la surface, du revêtement et de la technique. Nous vous donnons une estimation après étude.',
  },
  {
    question: 'Pouvez-vous intervenir sans arrêter mon activité ?',
    answer:
      'Nous organisons le chantier selon vos contraintes d’exploitation, par zones ou en horaires adaptés — à confirmer au devis.',
  },
  {
    question: 'Intervenez-vous sur des sols en marbre ?',
    answer:
      'Oui, nous avons une expérience sur le marbre. Nous examinons l’état du support avant de choisir la méthode.',
  },
  {
    question: 'Combien coûte une remise en état de sol ?',
    answer:
      'Le prix dépend de la surface, du revêtement, de l’état et de l’accès. Le devis est détaillé et établi sur étude.',
  },
  {
    question: 'Proposez-vous un décapage de sol pour un commerce ou une copropriété à Marseille ?',
    answer:
      `Oui, sur carrelage, marbre, tommettes, béton ciré ou PVC selon faisabilité technique. Intervention en zones ou horaires adaptés sur ${ZONE_LABEL}. ${LEAD_RESPONSE_SLA_SHORT}, ${MOBILIZATION_AFTER_QUOTE.toLowerCase()}.`,
  },
];

const FLOORS_TREATED = [
  'Carrelage, parquet, béton ciré, marbre, tommettes, PVC et autres supports',
  'Sous réserve de compatibilité technique',
  'Expérience particulière sur le marbre et les tommettes',
];

const WHAT_WE_DO = [
  'Décapage de l’ancienne protection ou des couches d’émulsion accumulées',
  'Traitement mécanisé à la monobrosse, disques et produits choisis selon le revêtement',
  'Nettoyage de remise en état après travaux, avant location ou vente, ou pour redonner de l’uniformité à un sol usé',
  'Produits professionnels adaptés au support — méthode déterminée après examen',
];

const BEFORE_WE_START = [
  'Nature exacte du revêtement et son état (fissures, joints, anciennes protections)',
  'Accès et manutention du matériel',
  'Ce qu’il faut protéger (plinthes, mobilier, menuiseries)',
  'Contraintes d’exploitation : horaires, circulation pendant le séchage',
];

const WHAT_WE_DONT_PROMISE = [
  'Un sol « comme neuf » : le résultat dépend de l’état de départ',
  'Délai universel de remise en circulation ou durée de vie du traitement : précisés pour votre sol après étude',
  'Cristallisation, métallisation ou anti-dérapant sans validation technique du support au préalable',
];

export function RemiseEtatSolsPage() {
  return (
    <>
      <SEO_Guardian currentSection="remise-etat-sols" faqItems={FAQ_ITEMS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Remise en état de sols à Marseille',
            description:
              'Décapage et remise en état de sols : carrelage, parquet, béton ciré, marbre, tommettes. Traitement à la monobrosse.',
            provider: NATURE_CLEAN_PROVIDER,
            areaServed: { '@type': 'City', name: 'Marseille' },
            serviceType: 'Remise en état de sols',
            url: 'https://natureclean.fr/services/remise-etat-sols',
          }),
        }}
      />

      <ServicePageHero
        title="Remise en état de sols à Marseille"
        subtitle="Décapage et traitement mécanisé de vos sols, adaptés à chaque revêtement."
        badge="Monobrosse & décapage"
        badgeIcon={<Layers className="w-4 h-4" aria-hidden="true" />}
        imageSrc={IMAGES.solMarbrePoli}
        imageAlt="Sol en marbre après remise en état"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Remise en état des sols' },
        ]}
        devisLink="/devis?service=sols"
      />

      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Un sol terni, encrassé ou recouvert de plusieurs couches d&apos;ancien produit se voit
              dès l&apos;entrée. Nature Clean remet en état les sols des commerces, bureaux,
              copropriétés et logements de Marseille et des Bouches-du-Rhône, avec un{' '}
              <strong>traitement mécanisé à la monobrosse</strong>, des disques et des produits adaptés
              à chaque support.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 font-bold">
                <Link to="/devis?service=sols">Demander un devis gratuit</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-green-600 text-green-700">
                <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                  <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl grid md:grid-cols-2 gap-12 items-start">
          <ScrollReveal>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Les sols que nous traitons</h2>
            <BulletList lines={FLOORS_TREATED} bulletClassName="text-green-600" />
          </ScrollReveal>
          <ScrollReveal delay={0.08}>
            <ImageWithFallback
              src={IMAGES.monobrosseAction}
              alt="Traitement de sol à la monobrosse"
              className="w-full h-64 object-cover rounded-2xl border border-gray-200"
              loading="lazy"
              decoding="async"
              width={600}
              height={256}
            />
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl font-black text-gray-900 mb-6">Ce que nous faisons</h2>
            <BulletList lines={WHAT_WE_DO} bulletClassName="text-green-600" />
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-green-50 border-y border-green-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-2xl font-black text-gray-900 mb-4">
              Organisation dès la validation du devis
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              La date et la durée dépendent de la surface, du revêtement, de la technique, du
              matériel et des contraintes d&apos;accès. {MOBILIZATION_AFTER_QUOTE}, selon
              disponibilités.
            </p>
            <p className="text-sm text-gray-600">
              {LEAD_RESPONSE_SLA_SHORT} pour toute nouvelle demande — {ZONE_LABEL}.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl font-black text-gray-900 mb-6">
              Ce que nous vérifions avant d&apos;intervenir
            </h2>
            <BulletList lines={BEFORE_WE_START} bulletClassName="text-green-600" />
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-amber-50 border-y border-amber-100">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-2xl font-black text-gray-900 mb-6">Ce que nous ne promettons pas</h2>
            <BulletList lines={WHAT_WE_DONT_PROMISE} bulletClassName="text-amber-700" />
          </ScrollReveal>
        </div>
      </section>

      <ConversionBreak
        image={IMAGES.decapageSolEco}
        imageAlt="Décapage d'un sol professionnel"
        title="Photos ou visite du sol"
        subtitle="Nous vous disons ce qui est réaliste sur votre support."
        devisLink="/devis?service=sols"
      />

      <ServiceSeoContentSection
        title="Décapage et remise en état de sols à Marseille"
        lead="Monobrosse, disques et produits adaptés — pas de promesse de sol « comme neuf » sans voir le support."
      >
        <p>
          La <strong>remise en état de sols à Marseille</strong> concerne les revêtements ternis par
          l&apos;usage, plusieurs couches d&apos;ancien produit ou les salissures de fin de chantier.
          Nature Clean travaille en <strong>décapage et traitement mécanisé à la monobrosse</strong> sur
          carrelage, parquet, béton ciré, marbre, tommettes et PVC — après examen du support dans le{' '}
          {ZONE_LABEL}.
        </p>
        <p>
          Nous ne vendons pas de cristallisation, métallisation ou anti-dérapant sans validation
          technique préalable. Résultat et délai de remise en circulation : annoncés pour <em>votre</em>{' '}
          sol au devis, pas en généralités.
        </p>
        <p>
          Souvent demandé en complément d&apos;une{' '}
          <Link to="/services/nettoyage-chantiers" className="text-green-800 font-semibold underline">
            fin de chantier
          </Link>{' '}
          ou d&apos;un{' '}
          <Link to="/services/entretien-bureaux" className="text-green-800 font-semibold underline">
            contrat bureaux
          </Link>
          . Photos ou visite obligatoires avant engagement.
        </p>
      </ServiceSeoContentSection>

      <FAQSection
        items={FAQ_ITEMS}
        title="Questions fréquentes — Remise en état des sols"
        subtitle="Supports, durée, marbre, tarifs"
      />

      <section className="py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Demander une étude de sol
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            {ZONE_LABEL} — {LEAD_RESPONSE_SLA_SHORT}, devis détaillé après étude.
          </p>
          <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-white font-black">
            <Link to="/devis?service=sols">
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
              <Link to="/services/nettoyage-coproprietes">Nettoyage de copropriétés</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-commerces">Nettoyage de commerces</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-chantiers">Fin de chantier</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}