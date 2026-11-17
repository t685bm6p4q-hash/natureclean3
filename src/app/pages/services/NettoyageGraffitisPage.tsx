import { Link } from 'react-router';
import { BulletList } from '@/app/components/BulletList';
import { Eraser, Phone, ArrowRight } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { FAQSection } from '@/app/components/FAQSection';
import { ServiceSeoContentSection } from '@/app/components/ServiceSeoContentSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { IMAGES, getOptimizedCldUrl, cldSrcSet } from '@/app/utils/images';
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  ARIA_PHONE,
  LEAD_RESPONSE_SLA_SHORT,
  MOBILIZATION_AFTER_QUOTE,
  ZONE_LABEL,
} from '@/app/utils/constants';
import { NATURE_CLEAN_PROVIDER } from '@/app/utils/cleaning-service-jsonld';

const PROCESS_STEPS = [
  {
    title: '1. Examen du support',
    text: 'Verre, métal, pierre, béton, enduit. Sur les supports fragiles, nous faisons une étude préalable.',
  },
  {
    title: '2. Choix du produit',
    text: 'Produit adapté au graffiti et au support, après examen.',
  },
  {
    title: '3. Retrait du graffiti',
    text: 'Intervention par un agent Nature Clean.',
  },
  {
    title: '4. Contrôle sur site',
    text: 'Photos transmises avec la facture, utiles pour votre dossier d’assurance. Produits achetés par Nature Clean et inclus dans le devis.',
  },
] as const;

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Quelle méthode utilisez-vous ?',
    answer:
      'Des produits professionnels adaptés au graffiti et au support, choisis après examen de la surface.',
  },
  {
    question: 'Peut-on effacer un graffiti sans abîmer la façade ?',
    answer:
      'Nous examinons le support avant d’intervenir et nous faisons une étude préalable sur les supports fragiles. Sur certaines façades poreuses, une remise en peinture peut rester nécessaire.',
  },
  {
    question: 'Proposez-vous une protection anti-graffiti ?',
    answer:
      'Ce n’est pas une prestation systématique. Nous vous l’indiquons après examen du site si une solution existe.',
  },
  {
    question: 'Pouvez-vous m’aider pour mon assurance ?',
    answer:
      'Nous transmettons généralement des photos avec la facture, qui peuvent être utiles pour votre dossier. Nous ne gérons pas votre déclaration de sinistre.',
  },
  {
    question: 'Sous quel délai pouvez-vous intervenir ?',
    answer: `${LEAD_RESPONSE_SLA_SHORT} (lun–ven, 9 h–18 h). ${MOBILIZATION_AFTER_QUOTE}.`,
  },
  {
    question: 'Comment enlever un tag sur une vitrine de commerce à Marseille ?',
    answer:
      'Nous examinons le support (verre, métal, enduit), testons sur une zone discrète puis appliquons des produits professionnels adaptés. Plus le tag est récent, plus l’effacement est favorable — sans garantie universelle sur supports poreux.',
  },
];

export function NettoyageGraffitisPage() {
  return (
    <>
      <SEO_Guardian currentSection="nettoyage-graffitis" faqItems={FAQ_ITEMS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Nettoyage et enlèvement de graffitis à Marseille',
            description:
              'Effacement de graffitis et de tags à Marseille et dans les Bouches-du-Rhône : façades, vitrines, rideaux. Produits adaptés au support, étude préalable.',
            provider: NATURE_CLEAN_PROVIDER,
            areaServed: { '@type': 'AdministrativeArea', name: 'Bouches-du-Rhône' },
            serviceType: 'Enlèvement de graffitis',
            url: 'https://natureclean.fr/services/nettoyage-graffitis',
          }),
        }}
      />

      <div className="bg-slate-50 min-h-screen">
        <ServicePageHero
          title="Nettoyage et enlèvement de graffitis à Marseille"
          subtitle="Un tag sur votre façade ou votre vitrine ? Nous l'effaçons avec une méthode adaptée au support."
          badge="Façades & vitrines"
          badgeIcon={<Eraser className="w-4 h-4" aria-hidden="true" />}
          imageSrc={IMAGES.graffitiCarrefourAvant}
          imageAlt="Façade taguée avant effacement — Marseille"
          breadcrumbs={[
            { label: 'Accueil', to: '/' },
            { label: 'Services', to: '/services' },
            { label: 'Graffitis' },
          ]}
          devisLink="/devis?service=graffitis"
        />

        <section className="py-12 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4 max-w-4xl">
            <ScrollReveal>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Vitrine recouverte d&apos;un tag blanc, rideau métallique taggé, façade de commerce ou
                d&apos;immeuble : nous retirons les graffitis avec des{' '}
                <strong>produits professionnels adaptés au graffiti et au support</strong>. La méthode
                est déterminée après examen de la surface.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 font-bold">
                  <Link to="/devis?service=graffitis">Demander un devis gratuit</Link>
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

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <ScrollReveal>
                <h2 className="text-3xl font-black text-slate-900 mb-4">
                  Pourquoi agir vite
                </h2>
                <p className="text-slate-600 leading-relaxed">
                  Plus un tag est ancien, plus la peinture pénètre le support, surtout s&apos;il est poreux.
                  Un traitement rapide limite le risque d&apos;abîmer la surface.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.08}>
                <h2 className="text-3xl font-black text-slate-900 mb-4">
                  Notre façon de procéder
                </h2>
                <ul className="space-y-4">
                  {PROCESS_STEPS.map((step) => (
                    <li key={step.title} className="flex gap-3 text-slate-700">
                      <span className="font-bold text-green-700 shrink-0">{step.title}</span>
                      <span className="text-sm leading-relaxed">{step.text}</span>
                    </li>
                  ))}
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-16 bg-slate-50">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <ScrollReveal>
                <h2 className="text-2xl font-black text-slate-900 mb-4">
                  Exemple : une vitrine de grande surface
                </h2>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  Grande baie vitrée recouverte d&apos;un tag blanc, avec coulures. Après
                  l&apos;intervention, la vitre a retrouvé sa transparence.
                </p>
                <p className="text-xs text-slate-500">
                  Visuels publiés avec logos floutés si besoin ; date et technique confirmées au devis.
                </p>
                <Button asChild variant="link" className="text-green-700 px-0 mt-2">
                  <Link to="/blog/nettoyage-graffitis-grande-surface-marseille">
                    Voir le cas grande surface (avant / après)
                    <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
                  </Link>
                </Button>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <img
                  src={getOptimizedCldUrl(IMAGES.effacementTagVitrine, 900)}
                  srcSet={cldSrcSet(IMAGES.effacementTagVitrine, [400, 700, 900])}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  alt="Vitrine après effacement de graffiti"
                  width={900}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="rounded-2xl shadow-xl w-full object-cover"
                />
              </ScrollReveal>
            </div>
          </div>
        </section>

        <section className="py-16 bg-amber-50 border-y border-amber-100">
          <div className="container mx-auto px-4 max-w-4xl">
            <ScrollReveal>
              <h2 className="text-2xl font-black text-slate-900 mb-6">Ce que nous ne promettons pas</h2>
              <BulletList
                bulletClassName="text-amber-700"
                itemClassName="text-slate-700"
                lines={[
                  'Un effacement parfait sur tous les supports. Certaines façades poreuses ou en béton peuvent nécessiter une remise en peinture pour un aspect satisfaisant — nous vous le disons après examen.',
                  'Une protection anti-graffiti préventive en standard : ce n’est pas proposé systématiquement.',
                ]}
              />
            </ScrollReveal>
          </div>
        </section>

        <ConversionBreak
          image={IMAGES.graffitiCarrefourAvant}
          imageAlt="Effacement de graffiti sur façade"
          title="Un tag à effacer ?"
          subtitle={`${ZONE_LABEL} — ${LEAD_RESPONSE_SLA_SHORT}, ${MOBILIZATION_AFTER_QUOTE.toLowerCase()}.`}
          devisLink="/devis?service=graffitis"
        />

        <ServiceSeoContentSection
          title="Enlèvement de graffitis et tags à Marseille"
          lead="Façades, vitrines, rideaux métalliques : agir vite limite la pénétration du pigment."
        >
          <p>
            L&apos;<strong>enlèvement de graffitis à Marseille</strong> est une demande fréquente des
            commerces, syndics et gestionnaires de sites : tag sur vitrine, bombe sur rideau, graffiti
            sur enduit. Nature Clean choisit la méthode <strong>après examen du support</strong> —
            produits professionnels adaptés, sans aérogommage systématique annoncé sur le site.
          </p>
          <p>
            Photos transmises avec la facture pour votre dossier d&apos;assurance ; nous ne gérons pas la
            déclaration de sinistre. Protection anti-graffiti : pas en standard, discussion au cas par
            cas. Zone : {ZONE_LABEL}.
          </p>
          <p>
            Article terrain :{' '}
            <Link
              to="/blog/nettoyage-graffitis-grande-surface-marseille"
              className="text-green-800 font-semibold underline"
            >
              cas vitrine grande surface
            </Link>
            . Fiche métier complète :{' '}
            <Link to="/services/nettoyage-vitre" className="text-green-800 font-semibold underline">
              nettoyage de vitres
            </Link>{' '}
            si le besoin est surtout entretien récurrent.
          </p>
        </ServiceSeoContentSection>

        <FAQSection
          items={FAQ_ITEMS}
          title="Questions fréquentes — graffitis à Marseille"
          subtitle="Méthode, façade, assurance et délais"
        />

        <section className="py-16 bg-slate-900 text-center">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-black text-white mb-4">Demander une étude</h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              Photos du tag et du support : nous répondons sur la faisabilité avant engagement.
            </p>
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-slate-900 font-black">
              <Link to="/devis?service=graffitis">
                <Eraser className="w-5 h-5 mr-2" aria-hidden="true" />
                Devis graffitis
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}