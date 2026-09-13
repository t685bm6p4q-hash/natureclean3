import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { Button } from '@/app/components/ui/button';
import { Link } from 'react-router';
import { ArrowLeft, Clock, Euro, TrendingUp, Calculator, Phone } from 'lucide-react';
import { IMAGES } from '@/app/utils/images';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { useArticleJsonLd } from '@/app/hooks/useArticleJsonLd';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';

const FAQ_ITEMS: FAQItem[] = [
  { question: 'Quel est le prix moyen du nettoyage de bureaux au m2 a Marseille ?', answer: 'A Marseille, le tarif moyen se situe entre 0,15 et 0,40 euro/m2 par passage pour un entretien courant. Ce tarif varie selon la surface, la frequence et les prestations incluses (vitres, sanitaires, etc.).' },
  { question: 'Est-il moins cher de prendre un contrat annuel ou des interventions ponctuelles ?', answer: 'Un contrat annuel est generalement 20 a 30% moins cher que des interventions ponctuelles. Il permet aussi de garantir la regularite et la qualite du service avec une equipe dediee.' },
  { question: 'Le nettoyage de bureaux est-il deductible des charges ?', answer: 'Oui, les frais de nettoyage professionnel sont entierement deductibles en tant que charges d\'exploitation pour les entreprises. Ils reduisent donc votre resultat imposable.' },
];

export function BudgetBureaux2026() {
  useArticleJsonLd({
    headline: 'Quel budget prevoir pour le nettoyage de bureaux a Marseille en 2026 ?',
    description: 'Guide tarifaire complet : prix au m2, facteurs de variation, comparatif prestations. Tout pour budgetiser le nettoyage de vos bureaux a Marseille.',
    image: IMAGES.grandOpenSpaceModerne,
    datePublished: '2026-02-15',
    dateModified: '2026-02-15',
    slug: 'budget-nettoyage-bureaux-marseille-2026',
    keywords: 'prix nettoyage bureaux marseille, tarif nettoyage bureau m2, budget entretien locaux 13, cout nettoyage professionnel marseille',
    articleSection: 'Guides Tarifaires',
    wordCount: 1400,
  });

  const tarifs = [
    { surface: 'Petit bureau (< 100 m2)', frequence: '2x/semaine', fourchette: '180 - 350 euro/mois', details: 'Aspiration, lessivage, sanitaires, poubelles' },
    { surface: 'Bureau moyen (100-300 m2)', frequence: '3x/semaine', fourchette: '350 - 750 euro/mois', details: 'Entretien complet + vitres mensuelles' },
    { surface: 'Grand open space (300-800 m2)', frequence: '5x/semaine', fourchette: '750 - 1 800 euro/mois', details: 'Equipe dediee + referent site' },
    { surface: 'Locaux > 800 m2', frequence: 'Quotidien', fourchette: 'Sur devis', details: 'Audit sur site obligatoire, equipe permanente' },
  ];

  const facteurs = [
    { facteur: 'Surface totale', impact: 'Plus la surface est grande, plus le tarif au m2 diminue (economies d\'echelle).' },
    { facteur: 'Frequence d\'intervention', impact: 'Un passage quotidien coute plus cher qu\'un entretien 2x/semaine, mais le cout par passage est degressif.' },
    { facteur: 'Type de locaux', impact: 'Les locaux medicaux, alimentaires ou industriels necessitent des protocoles specifiques plus couteux.' },
    { facteur: 'Horaires d\'intervention', impact: 'Les interventions en horaires decales (avant 7h, apres 20h) ou le week-end entrainent un supplement de 10 a 20%.' },
    { facteur: 'Prestations incluses', impact: 'Vitres, desinfection, moquettes : chaque prestation supplementaire impacte le budget mensuel.' },
    { facteur: 'Engagement contractuel', impact: 'Un contrat annuel est 20 a 30% moins cher que des interventions ponctuelles sans engagement.' },
  ];

  return (
    <>
      <SEO_Guardian
        title="Prix Nettoyage Bureaux Marseille 2026 : Tarifs & Budget | Nature Clean"
        description="Quel budget pour le nettoyage de bureaux a Marseille en 2026 ? Tarifs au m2, grille tarifaire par surface, facteurs de prix. Guide complet pour les entreprises. Devis gratuit."
        keywords="prix nettoyage bureaux marseille, tarif nettoyage bureau m2, budget entretien locaux 13, cout nettoyage professionnel, devis nettoyage bureau marseille 2026"
        currentSection="blog"
        faqItems={FAQ_ITEMS}

      />

      <article className="bg-white">
        {/* Hero */}
        <div className="relative h-80 md:h-96 overflow-hidden">
          <img
            src={IMAGES.grandOpenSpaceModerne}
            alt="Open space moderne — guide budget nettoyage bureaux Marseille"
            className="w-full h-full object-cover"
            width="1920"
            height="600"
            // @ts-ignore — fetchpriority: attribut HTML valide, non typé en minuscules dans React 18
            fetchpriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="container mx-auto">
              <Link to="/blog" className="inline-flex items-center gap-2 text-green-300 hover:text-green-200 mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Retour au blog
              </Link>
              <div className="flex items-center gap-4 text-gray-300 text-sm mb-3">
                <span className="bg-green-700 text-white px-3 py-1 rounded-full text-xs font-semibold">Tarifs</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" aria-hidden="true" /> 7 min de lecture</span>
                <span>15 fevrier 2026</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white max-w-3xl">
                Quel budget prevoir pour le nettoyage de bureaux a Marseille en 2026 ?
              </h1>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Le nettoyage de bureaux represente un poste budgetaire incontournable pour les entreprises a Marseille. Mais entre les offres a bas prix et les prestations haut de gamme, <strong>comment s'y retrouver ?</strong> Voici notre guide tarifaire actualise pour 2026, base sur les prix reels pratiques dans la region PACA.
              </p>
            </ScrollReveal>

            {/* Grille tarifaire */}
            <ScrollReveal>
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <Euro className="w-6 h-6 text-green-600" aria-hidden="true" />
                Grille tarifaire indicative 2026
              </h2>
            </ScrollReveal>

            <ScrollReveal>
              <div className="overflow-x-auto mb-12">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-900 text-white">
                      <th className="px-4 py-3 text-left font-bold text-sm rounded-tl-xl">Surface</th>
                      <th className="px-4 py-3 text-left font-bold text-sm">Frequence</th>
                      <th className="px-4 py-3 text-left font-bold text-sm">Fourchette</th>
                      <th className="px-4 py-3 text-left font-bold text-sm rounded-tr-xl">Inclus</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tarifs.map((row, i) => (
                      <tr key={row.surface} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-4 py-3 font-bold text-gray-900 text-sm">{row.surface}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{row.frequence}</td>
                        <td className="px-4 py-3 text-sm font-bold text-green-700">{row.fourchette}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{row.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="text-xs text-gray-400 mt-2 italic">* Tarifs indicatifs HT, bases sur les prix pratiques a Marseille et PACA en 2026. Devis personnalise sur demande.</p>
              </div>
            </ScrollReveal>

            {/* Facteurs de prix */}
            <ScrollReveal>
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-green-600" aria-hidden="true" />
                Les 6 facteurs qui influencent le prix
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

            {/* Astuce */}
            <ScrollReveal>
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-12">
                <h3 className="font-black text-gray-900 mb-2 flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-green-600" aria-hidden="true" />
                  L'astuce Nature Clean
                </h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  Pour obtenir le meilleur rapport qualite-prix, <strong>demandez toujours un audit sur site gratuit</strong> avant de signer un contrat. Cela permet de calibrer precisement les besoins (frequence, zones, protocoles) et d'eviter les mauvaises surprises. Chez Nature Clean, l'audit est offert et sans engagement.
                </p>
              </div>
            </ScrollReveal>

            {/* Photo break */}
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden shadow-xl mb-12">
                <ImageWithFallback
                  src={IMAGES.openSpaceBureaux}
                  alt="Bureaux professionnels entretenus par Nature Clean a Marseille"
                  className="w-full h-64 md:h-80 object-cover"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={400}
                />
              </div>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal>
              <div className="bg-gray-900 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-black text-white mb-3">
                  Obtenez votre devis personnalise en 24h
                </h2>
                <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                  Audit gratuit de vos locaux, devis detaille et transparent. Aucun engagement, aucune surprise.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black">
                    <Link to="/devis?service=bureaux">Demander un devis gratuit</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold">
                    <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                      <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                      {PHONE_DISPLAY}
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </article>

      {/* FAQ */}
      <FAQSection
        items={FAQ_ITEMS}
        title="Questions frequentes — Budget nettoyage bureaux"
        subtitle="Ce que les entreprises nous demandent le plus souvent"
      />
    </>
  );
}