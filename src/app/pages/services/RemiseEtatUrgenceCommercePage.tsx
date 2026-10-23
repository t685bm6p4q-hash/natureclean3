import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import { Package, Sparkles, Droplets, Shield, AlertTriangle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { IMAGES, getOptimizedCldUrl, cldSrcSet } from '@/app/utils/images';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { NATURE_CLEAN_PROVIDER } from '@/app/utils/cleaning-service-jsonld';

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Intervenez-vous le week-end après un saccage ?',
    answer:
      'Oui. Exemple récent : boutique de prêt-à-porter à Marseille remise en état un week-end — débarras de la réserve, nettoyage intensif, sols en résine, désinfection des comptoirs. On se cale sur la réouverture, pas sur un planning de semaine.',
  },
  {
    question: 'Quelle est la différence avec l\'entretien régulier ?',
    answer:
      'L\'entretien, c\'est le contrat avant ouverture. Ici, le magasin n\'est plus vendable : cartons, salissures, parfois bris. On vient pour réouvrir, puis on peut enchaîner sur un contrat si vous le voulez.',
  },
  {
    question: 'En combien de temps partez-vous ?',
    answer:
      'Réponse sous 2 h aux heures d\'ouverture, devis sous 24 h. Sur une urgence déjà visitée, le démarrage peut être le jour même ou le lendemain, selon les accès et le volume à évacuer.',
  },
  {
    question: 'Évacuez-vous les déchets et le stock abîmé ?',
    answer:
      'On débarrasse ce qui bloque les circulations et on trie ce qui peut être sauvé. Les gros volumes passent par une benne si besoin. On ne remplace pas un assureur ni un huissier.',
  },
];

const STEPS = [
  {
    icon: Package,
    title: 'Tri et débarras',
    desc: 'Évacuation des cartons encombrants et tri du stock dans la réserve pour retrouver des circulations sûres.',
  },
  {
    icon: Sparkles,
    title: 'Nettoyage intensif',
    desc: 'Dépoussiérage des structures, tiroirs et étagères ; aspiration autour des textiles.',
  },
  {
    icon: Droplets,
    title: 'Traitement des sols',
    desc: 'Nettoyage en profondeur des sols en résine, escaliers et tapis de circulation.',
  },
  {
    icon: Shield,
    title: 'Désinfection',
    desc: 'Faïences, comptoirs et zones de contact avant le retour du public.',
  },
] as const;

export function RemiseEtatUrgenceCommercePage() {
  return (
    <>
      <SEO_Guardian currentSection="remise-etat-urgence-commerce" faqItems={FAQ_ITEMS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Remise en état d\'urgence après dégradation à Marseille',
            description:
              'Remise en état de magasin après saccage ou dégradation à Marseille : débarras, nettoyage intensif, sols, désinfection. Réponse sous 2 h, devis sous 24 h.',
            provider: NATURE_CLEAN_PROVIDER,
            areaServed: { '@type': 'City', name: 'Marseille' },
            serviceType: 'Remise en état d\'urgence de commerce',
            url: 'https://natureclean.fr/services/remise-etat-urgence-commerce',
          }),
        }}
      />

      <ServicePageHero
        title="Remise en état d'urgence après dégradation à Marseille"
        subtitle="Boutique saccagée, réouverture : débarras, sols, désinfection"
        badge="Urgence commerce"
        badgeIcon={<AlertTriangle className="w-4 h-4" />}
        imageSrc={IMAGES.magasinPretAPorterUrgence}
        imageAlt="Boutique de prêt-à-porter à Marseille après remise en état d'urgence"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Urgence commerce' },
        ]}
        devisLink="/devis?service=commerces"
      />

      <section id="cas-octobre-2026" className="py-16 md:py-20 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <ScrollReveal>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
                Cas client
              </span>
              <span className="text-sm text-gray-500">Boutique prêt-à-porter · Marseille</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 leading-tight">
              Remise en état d&apos;urgence d&apos;une boutique après saccage
            </h2>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl">
              Une boutique de prêt-à-porter à Marseille a subi des dégradations. Le gérant nous a
              contactés pour rouvrir rapidement. Réserve encombrée, sols en résine et comptoirs à
              traiter avant le retour du public.
            </p>
            <p className="text-gray-600 mb-10 max-w-3xl">
              Protocole appliqué sur place — pas un contrat d&apos;entretien hebdomadaire.
            </p>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-5">
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                return (
                  <ScrollReveal key={step.title} delay={i * 0.06}>
                    <div className="flex gap-4 bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                      <div className="w-11 h-11 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-green-700" aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                        <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
              <ScrollReveal delay={0.3}>
                <p className="text-gray-800 font-semibold border-l-4 border-green-600 pl-4 py-1">
                  Résultat : un espace de vente propre, prêt à réaccueillir du public.
                </p>
                <p className="text-gray-600 text-sm mt-4">
                  L&apos;entretien ensuite, c&apos;est{' '}
                  <Link
                    to="/services/nettoyage-commerces"
                    className="text-green-700 font-bold hover:underline"
                  >
                    la fiche nettoyage de commerces
                  </Link>
                  . Ici, on parle d&apos;urgence.
                </p>
              </ScrollReveal>
            </div>

            <ScrollReveal delay={0.1}>
              <figure className="rounded-2xl overflow-hidden shadow-xl border border-gray-200">
                <img
                  src={getOptimizedCldUrl(IMAGES.magasinPretAPorterUrgence, 900)}
                  srcSet={cldSrcSet(IMAGES.magasinPretAPorterUrgence, [500, 700, 900])}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  alt="Rayonnages et sols d'une boutique prêt-à-porter après intervention d'urgence à Marseille"
                  width={900}
                  height={600}
                  loading="eager"
                  decoding="async"
                  className="w-full h-72 md:h-96 object-cover"
                />
                <figcaption className="bg-gray-900 text-gray-200 text-sm text-center px-4 py-3">
                  Marseille — après intervention d&apos;urgence
                </figcaption>
              </figure>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ConversionBreak
        image={IMAGES.magasinPretAPorterUrgence}
        imageAlt="Boutique marseillaise après remise en état d'urgence"
        title="Besoin de réouvrir après une dégradation ?"
        subtitle="Réponse sous 2 h, devis sous 24 h — Marseille et Bouches-du-Rhône"
        devisLink="/devis?service=commerces"
      />

      <FAQSection
        items={FAQ_ITEMS}
        title="Questions fréquentes — Urgence commerce"
        subtitle="Saccage, week-end, délais, ce qu'on évacue"
      />

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Consultez également :</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-commerces">Entretien régulier de commerces</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-graffitis">Nettoyage de graffitis</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/realisations">Réalisations</Link>
            </Button>
            <Button asChild className="bg-green-700 hover:bg-green-800 font-bold">
              <Link to="/devis?service=commerces">
                Demander un devis
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
