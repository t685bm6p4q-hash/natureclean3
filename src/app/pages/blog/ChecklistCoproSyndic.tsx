import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { Button } from '@/app/components/ui/button';
import { Link } from 'react-router';
import { Phone, CheckCircle2, ArrowLeft, Clock, Building2, ClipboardList, AlertTriangle } from 'lucide-react';
import { IMAGES } from '@/app/utils/images';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { useArticleJsonLd } from '@/app/hooks/useArticleJsonLd';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';

const FAQ_ITEMS: FAQItem[] = [
  { question: 'A quelle frequence faut-il nettoyer les parties communes d\'une copropriete ?', answer: 'Pour une copropriete de taille moyenne (30 a 60 lots), un minimum de 2 passages hebdomadaires est recommande pour les halls et escaliers, avec un nettoyage approfondi mensuel des parkings et locaux techniques.' },
  { question: 'Comment choisir un prestataire de nettoyage pour sa copropriete ?', answer: 'Verifiez l\'assurance RC Pro, demandez des references de coproprietes similaires, exigez un audit gratuit des lieux, comparez au moins 3 devis et privilegiez les entreprises locales pour la reactivite.' },
  { question: 'Le syndic peut-il changer de prestataire de nettoyage sans l\'accord de l\'AG ?', answer: 'Le syndic peut changer de prestataire dans la limite du budget vote en AG. Si le nouveau contrat depasse le budget, un vote en AG est necessaire. La decision releve de la gestion courante si le montant reste dans l\'enveloppe.' },
];

export function ChecklistCoproSyndic() {
  useArticleJsonLd({
    headline: 'Checklist nettoyage copropriete : le guide complet pour les syndics a Marseille',
    description: 'Checklist complete pour les syndics : zones a nettoyer, frequences recommandees, criteres de choix du prestataire. Guide pratique pour les coproprietes a Marseille.',
    image: IMAGES.hallMarbreAscenseurs,
    datePublished: '2026-02-10',
    dateModified: '2026-02-10',
    slug: 'checklist-nettoyage-copropriete-syndic',
    keywords: 'checklist nettoyage copropriete, guide syndic nettoyage, entretien parties communes marseille, cahier charges nettoyage immeuble',
    articleSection: 'Guides Syndics',
    wordCount: 1500,
  });

  const zones = [
    { zone: 'Hall d\'entree', frequence: 'Quotidien a 3x/semaine', details: 'Aspiration, lessivage sol, depoussierage boites aux lettres, nettoyage vitres d\'entree' },
    { zone: 'Escaliers & paliers', frequence: '2 a 3x/semaine', details: 'Aspiration marches, lessivage, depoussierage rampes et plinthes, toiles d\'araignees' },
    { zone: 'Ascenseurs', frequence: 'Quotidien', details: 'Nettoyage parois, miroirs, boutons (desinfection), sol. Verification odeurs.' },
    { zone: 'Parking souterrain', frequence: '1x/mois', details: 'Balayage mecanique, nettoyage taches huile, desinfection zones pietonnes' },
    { zone: 'Local poubelles', frequence: '2x/semaine', details: 'Desinfection, desodorisation, nettoyage sol et murs, verification containers' },
    { zone: 'Espaces verts communs', frequence: '1x/semaine', details: 'Ramassage dechets, feuilles mortes, nettoyage mobilier exterieur' },
    { zone: 'Caves & sous-sols', frequence: '1x/mois', details: 'Balayage, depoussierage, verification proprete, elimination toiles d\'araignees' },
    { zone: 'Vitres parties communes', frequence: '1x/mois', details: 'Nettoyage interieur/exterieur des vitrages d\'entree, sas, cages d\'escalier' },
  ];

  return (
    <>
      <SEO_Guardian
        title="Checklist Nettoyage Copropriete : Guide Complet Syndics Marseille | Nature Clean"
        description="Checklist complete pour les syndics : zones a nettoyer, frequences recommandees, criteres de choix du prestataire. Guide pratique pour les coproprietes a Marseille et PACA."
        keywords="checklist nettoyage copropriete, guide syndic nettoyage, entretien parties communes marseille, cahier charges nettoyage immeuble, frequence nettoyage copro"
        currentSection="blog"
        faqItems={FAQ_ITEMS}
        disableReviews={true}
      />

      <article className="bg-white">
        {/* Hero */}
        <div className="relative h-80 md:h-96 overflow-hidden">
          <img
            src={IMAGES.hallMarbreAscenseurs}
            alt="Hall de copropriete avec ascenseurs — checklist nettoyage syndic"
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
                <span className="bg-green-700 text-white px-3 py-1 rounded-full text-xs font-semibold">Syndics</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" aria-hidden="true" /> 8 min de lecture</span>
                <span>10 fevrier 2026</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white max-w-3xl">
                Checklist nettoyage copropriete : le guide complet pour les syndics
              </h1>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                En tant que syndic ou gestionnaire de copropriete a Marseille, vous etes garant de la proprete des parties communes. Une bonne checklist de nettoyage permet de <strong>structurer les interventions</strong>, d'<strong>evaluer objectivement la qualite du prestataire</strong> et de <strong>repondre aux attentes des coproprietaires</strong>. Voici notre guide complet.
              </p>
            </ScrollReveal>

            {/* Section 1 : Les zones */}
            <ScrollReveal>
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <ClipboardList className="w-6 h-6 text-green-600" aria-hidden="true" />
                Les 8 zones a inclure dans votre cahier des charges
              </h2>
            </ScrollReveal>

            <div className="space-y-4 mb-12">
              {zones.map((item, i) => (
                <ScrollReveal key={item.zone} delay={i * 0.04}>
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-bold text-gray-900 flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" aria-hidden="true" />
                        {item.zone}
                      </h3>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold whitespace-nowrap">
                        {item.frequence}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">{item.details}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Section 2 : Criteres de choix */}
            <ScrollReveal>
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <Building2 className="w-6 h-6 text-green-600" aria-hidden="true" />
                5 criteres pour bien choisir votre prestataire
              </h2>
            </ScrollReveal>

            <ScrollReveal>
              <div className="space-y-4 mb-12">
                {[
                  { title: 'Assurance RC Pro obligatoire', desc: 'Exigez une attestation d\'assurance Responsabilite Civile Professionnelle a jour. C\'est la garantie de couverture en cas de dommage dans les parties communes.' },
                  { title: 'References verifiables sur des coproprietes similaires', desc: 'Demandez au moins 3 references de coproprietes comparables (meme nombre de lots, meme type de prestations). Contactez les syndics pour avoir un retour reel.' },
                  { title: 'Audit gratuit des locaux avant devis', desc: 'Un prestataire serieux visite systematiquement les lieux avant d\'etablir un devis. Mefiance envers les devis "a l\'aveugle" bases uniquement sur la surface.' },
                  { title: 'Produits eco-responsables et transparence', desc: 'Demandez la liste des produits utilises. Privilegiez les prestataires qui utilisent au moins 50% de produits eco-labellises (Ecolabel, Nature & Progres, etc.).' },
                  { title: 'Suivi qualite et reporting au syndic', desc: 'Un bon prestataire fournit un rapport mensuel avec photos, signale les anomalies (degradations, pannes) et propose des ajustements de frequence si necessaire.' },
                ].map((item, i) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-green-700 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {i + 1}
                    </span>
                    <div>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Section 3 : Erreurs */}
            <ScrollReveal>
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-500" aria-hidden="true" />
                Les 3 erreurs les plus frequentes
              </h2>

              <div className="space-y-4 mb-12">
                {[
                  { erreur: 'Choisir uniquement sur le prix', solution: 'Le tarif le plus bas cache souvent des prestations degradees, du turnover et un manque de suivi. Comparez le rapport qualite-prix, pas juste le prix.' },
                  { erreur: 'Ne pas definir un cahier des charges precis', solution: 'Sans cahier des charges, impossible d\'evaluer objectivement la qualite. Detaillez les zones, les frequences et les criteres de controle dans le contrat.' },
                  { erreur: 'Ignorer les retours des residents', solution: 'Les coproprietaires sont les meilleurs indicateurs de qualite. Mettez en place un canal simple pour remonter les insatisfactions (email, boite a idees).' },
                ].map((item) => (
                  <div key={item.erreur} className="bg-amber-50 rounded-xl p-5 border border-amber-100">
                    <h3 className="font-bold text-gray-900 mb-1">{item.erreur}</h3>
                    <p className="text-sm text-gray-600">{item.solution}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>

            {/* Photo break */}
            <ScrollReveal>
              <div className="rounded-2xl overflow-hidden shadow-xl mb-12">
                <ImageWithFallback
                  src={IMAGES.cageEscalier}
                  alt="Cage d'escalier propre et bien entretenue dans une copropriete a Marseille"
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
                  Nature Clean : votre partenaire coproprietes a Marseille
                </h2>
                <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                  Audit gratuit, cahier des charges sur mesure et suivi qualite mensuel. 500+ clients satisfaits depuis 2021.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black">
                    <Link to="/devis?service=coproprietes">Demander un devis gratuit</Link>
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
        title="Questions frequentes — Nettoyage de copropriete"
        subtitle="Ce que les syndics nous demandent le plus souvent"
      />
    </>
  );
}