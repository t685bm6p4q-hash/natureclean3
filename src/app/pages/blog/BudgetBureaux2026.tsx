import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { Button } from '@/app/components/ui/button';
import { Link } from 'react-router';
import { ArrowLeft, Clock, TrendingUp, Calculator, Phone } from 'lucide-react';
import { IMAGES } from '@/app/utils/images';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { useArticleJsonLd } from '@/app/hooks/useArticleJsonLd';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { BlogArticleByline } from '@/app/components/BlogArticleByline';

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Pourquoi Nature Clean n’affiche-t-il pas de prix au m² sur le site ?',
    answer:
      'Chaque site a sa surface, sa fréquence, ses horaires et son état initial. Un chiffre générique serait faux dans la majorité des cas. Nous préférons un audit sur place et un devis détaillé, gratuit et sans engagement.',
  },
  {
    question: 'Un contrat annuel ou des passages ponctuels : que choisir ?',
    answer:
      'Un contrat récurrent permet de planifier les équipes, d’harmoniser le protocole et de lisser le budget. Les ponctuels conviennent aux besoins irréguliers ; le devis compare les deux scénarios.',
  },
  {
    question: 'Le nettoyage de bureaux est-il déductible ?',
    answer:
      'Pour les entreprises, les frais de nettoyage professionnel relèvent en principe des charges d’exploitation. Votre expert-comptable confirme le traitement fiscal adapté à votre structure.',
  },
];

export function BudgetBureaux2026() {
  useArticleJsonLd({
    headline: 'Ce qui fait varier le prix d\'un nettoyage de bureaux à Marseille',
    description:
      'Surface, fréquence, horaires, type de locaux et prestations incluses : les critères qui influencent un devis de nettoyage de bureaux à Marseille, sans grille tarifaire.',
    image: IMAGES.grandOpenSpaceModerne,
    datePublished: '2026-02-15',
    dateModified: '2026-10-24',
    slug: 'budget-nettoyage-bureaux-marseille-2026',
    keywords: 'prix nettoyage bureaux marseille, facteurs tarif entretien bureaux, devis nettoyage bureau 13, budget entretien locaux marseille',
    articleSection: 'Guides pratiques',
    wordCount: 1100,
  });

  const facteurs = [
    {
      facteur: 'Surface et configuration',
      impact: 'Open space, bureaux cloisonnés, sanitaires, cuisine : le temps de passage diffère. Les grandes surfaces permettent parfois d’optimiser le protocole.',
    },
    {
      facteur: 'Fréquence d’intervention',
      impact: 'Quotidien, 3×/semaine ou hebdomadaire : plus la fréquence est élevée, plus le coût par passage tend à baisser, mais le budget mensuel global augmente.',
    },
    {
      facteur: 'Type de locaux',
      impact: 'Bureaux tertiaires, accueil public, espaces avec exigences sanitaires ou alimentaires : protocoles et produits ne sont pas les mêmes.',
    },
    {
      facteur: 'Horaires d’intervention',
      impact: 'Avant ouverture, après fermeture ou week-end : les créneaux décalés peuvent influencer le chiffrage (effectifs, accès, sécurité).',
    },
    {
      facteur: 'Prestations incluses',
      impact: 'Vitres, moquettes, désinfection ponctuelle, consommables : chaque ligne du devis doit être explicitée.',
    },
    {
      facteur: 'État initial et accessibilité',
      impact: 'Remise à niveau après travaux, débarras léger, ascenseur, badge, stationnement : autant d’éléments pris en compte à la visite.',
    },
  ] as const;

  return (
    <>
      <SEO_Guardian
        title="Prix Nettoyage Bureaux Marseille : Facteurs & Devis | Nature Clean"
        description="Ce qui fait varier le prix d'un nettoyage de bureaux à Marseille : surface, fréquence, horaires, prestations. Sans grille chiffrée — devis gratuit sous 24 h."
        keywords="prix nettoyage bureaux marseille, facteurs tarif entretien bureaux, devis nettoyage bureau 13"
        currentSection="blog"
        faqItems={FAQ_ITEMS}
      />

      <article className="bg-white">
        <div>
          <div className="h-56 md:h-72 overflow-hidden">
            <img
              src={IMAGES.grandOpenSpaceModerne}
              alt="Open space — facteurs de prix nettoyage bureaux Marseille"
              className="w-full h-full object-cover"
              width={1920}
              height={600}
              // @ts-ignore
              fetchpriority="high"
              decoding="async"
            />
          </div>
          <div className="bg-gray-900 text-white p-6 md:p-10">
            <div className="container mx-auto">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-green-300 hover:text-green-200 mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Retour au blog
              </Link>
              <div className="flex items-center gap-4 text-gray-300 text-sm mb-3">
                <span className="bg-green-700 text-white px-3 py-1 rounded-full text-xs font-semibold">Guides pratiques</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" aria-hidden="true" /> 7 min de lecture
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white max-w-3xl">
                Ce qui fait varier le prix d&apos;un nettoyage de bureaux à Marseille
              </h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <BlogArticleByline publishedLabel="15 février 2026" updatedLabel="24 octobre 2026" />

            <ScrollReveal>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                « Combien coûte le nettoyage de nos bureaux ? » est la question la plus fréquente — et la plus difficile à
                répondre sans visite. À <strong>Marseille et dans les Bouches-du-Rhône</strong>, nous chiffrons chaque
                site sur mesure : pas de grille tarifaire publique, pour rester cohérents avec nos{' '}
                <Link to="/devis?service=bureaux" className="text-green-700 font-semibold hover:underline">
                  devis personnalisés
                </Link>
                .
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                Voici les critères que nous utilisons pour établir un{' '}
                <Link to="/services/entretien-bureaux" className="text-green-700 font-semibold hover:underline">
                  devis d&apos;entretien de bureaux à Marseille
                </Link>
                .
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-green-600" aria-hidden="true" />
                Les critères qui influencent votre devis
              </h2>
            </ScrollReveal>

            <div className="space-y-3 mb-12">
              {facteurs.map((item, i) => (
                <ScrollReveal key={item.facteur} delay={i * 0.04}>
                  <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className="flex-shrink-0 w-7 h-7 bg-green-700 text-white rounded-full flex items-center justify-center font-bold text-xs">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">{item.facteur}</h3>
                      <p className="text-sm text-gray-600">{item.impact}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-12">
                <h3 className="font-black text-gray-900 mb-2 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-green-600" aria-hidden="true" />
                  Notre méthode
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Visite sur site (ou échange détaillé avec plans), protocole écrit, devis ligne par ligne. Réponse sous{' '}
                  <strong>2 h en horaires d&apos;ouverture</strong>, devis gratuit sous <strong>24 h</strong>.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden shadow-xl mb-12">
                <ImageWithFallback
                  src={IMAGES.openSpaceBureaux}
                  alt="Bureaux professionnels entretenus par Nature Clean à Marseille"
                  className="w-full h-64 md:h-80 object-cover"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={400}
                />
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-gray-900 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-black text-white mb-3">Obtenir un devis sur mesure</h2>
                <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                  Audit gratuit de vos locaux, devis détaillé et transparent. Aucun engagement.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black">
                    <Link to="/devis?service=bureaux">Demander un devis gratuit</Link>
                  </Button>
                  <Button asChild size="lg" variant="outlineOnDark">
                    <a href={PHONE_HREF} className="flex items-center justify-center gap-2" aria-label={ARIA_PHONE}>
                      <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                      {PHONE_DISPLAY}
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </article>

      <FAQSection
        items={FAQ_ITEMS}
        title="Questions fréquentes — Budget nettoyage bureaux"
        subtitle="Devis et facteurs de prix à Marseille"
      />
    </>
  );
}
