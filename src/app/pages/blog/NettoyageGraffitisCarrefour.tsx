import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { Button } from '@/app/components/ui/button';
import { Link } from 'react-router';
import { Phone, ArrowLeft, Clock, CheckCircle2, Zap } from 'lucide-react';
import { useArticleJsonLd } from '@/app/hooks/useArticleJsonLd';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { getOptimizedCldUrl, cldSrcSet, IMAGES } from '@/app/utils/images';

export function NettoyageGraffitisCarrefour() {
  const heroImageUrl = getOptimizedCldUrl(IMAGES.graffitiCarrefourAvant, 1200);
  const apresImageUrl = getOptimizedCldUrl(IMAGES.effacementTagVitrine, 900);

  useArticleJsonLd({
    headline: "Nettoyage de graffitis chez Carrefour à Marseille : retour sur intervention",
    description: "Nature Clean intervient en urgence sur un site Carrefour à Marseille pour effacer tags et graffitis. Découvrez notre protocole d'intervention et pourquoi les enseignes nous font confiance.",
    image: heroImageUrl,
    datePublished: '2026-06-09',
    dateModified: '2026-06-09',
    slug: 'nettoyage-graffitis-carrefour-marseille',
    keywords: 'nettoyage graffitis marseille, effacement tags grande surface, anti-graffiti carrefour, nettoyage façade marseille, intervention urgence graffitis',
    articleSection: 'Cas clients',
    wordCount: 650,
  });

  return (
    <>
      <SEO_Guardian
        title="Nettoyage Graffitis Carrefour Marseille | Intervention d'urgence | Nature Clean"
        description="Nature Clean intervient en urgence pour effacer tags et graffitis sur la façade d'un Carrefour à Marseille. Protocole, techniques et résultat : découvrez notre retour d'expérience."
        keywords="nettoyage graffitis marseille, effacement tags façade, anti-graffiti grande surface, intervention urgence marseille, nature clean graffitis"
        currentSection="blog"
        disableReviews={true}
      />

      <article className="bg-white">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <div className="relative h-96 md:h-[480px] overflow-hidden">
          <img
            src={heroImageUrl}
            srcSet={cldSrcSet(IMAGES.graffitiCarrefourAvant, [600, 900, 1200])}
            sizes="100vw"
            alt="Façade Carrefour Marseille avant nettoyage graffitis – Nature Clean"
            width="1200"
            height="480"
            // @ts-ignore — fetchpriority: attribut HTML valide, non typé en minuscules dans React 18
            fetchpriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-white hover:text-green-300 mb-4 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour au blog
              </Link>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  <Zap className="w-3 h-3" />
                  Intervention d'urgence
                </span>
                <span className="flex items-center gap-1.5 text-green-300 text-sm">
                  <Clock className="w-4 h-4" />
                  5 min de lecture • 9 juin 2026
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white max-w-4xl leading-tight">
                Quand la propreté fait partie de l'expérience client : retour sur l'intervention de nettoyage de graffitis chez Carrefour à Marseille
              </h1>
            </div>
          </div>
        </div>

        {/* ── CONTENU ──────────────────────────────────────────── */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">

            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-gray-700 leading-relaxed">
                L'image d'une grande surface ou d'un commerce de détail se joue dès le premier regard. Pour les clients qui se rendent dans un hypermarché ou un supermarché, la façade extérieure est le premier contact avec l'enseigne. C'est pourquoi l'apparition soudaine de tags ou de graffitis non désirés représente un véritable défi pour l'image de marque des enseignes de grande distribution.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Récemment, l'équipe de <strong>Nature Clean</strong> est intervenue en urgence sur un site <strong>Carrefour à Marseille</strong> pour effacer des inscriptions indésirables et redonner à la façade toute sa netteté.
              </p>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Un défi esthétique et sécuritaire pour la grande distribution
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                À Marseille, les commerces subissent régulièrement des incivilités urbaines. Lorsqu'un acte de vandalisme visuel touche un magasin à fort trafic comme Carrefour, il est impératif d'agir vite. Laisser s'installer des graffitis envoie un signal négatif aux clients et peut altérer la perception de la qualité et de la sécurité du site.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">
                Cependant, nettoyer un mur ou une devanture de grande surface ne s'improvise pas :
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'La diversité des supports',
                    desc: 'Béton, métal, verre ou pierre demandent des techniques d\'intervention radicalement différentes pour ne pas décaper ou abîmer le support d\'origine.',
                  },
                  {
                    title: 'Les contraintes d\'exploitation',
                    desc: 'L\'intervention doit souvent se faire en horaires décalés ou de manière ultra-rapide pour ne pas perturber l\'accès des clients et la logistique des livraisons.',
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 2 — protocole + photo après */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                L'intervention rapide et méthodique de Nature Clean
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                Fidèle à ses engagements d'efficacité et de réactivité sur l'arc méditerranéen, l'équipe technique de <strong>Nature Clean</strong> s'est mobilisée pour résoudre ce problème dans les meilleurs délais. Grâce à notre expertise en matière de nettoyage technique et d'interventions d'urgence, l'opération s'est déroulée selon un protocole strict :
              </p>

              <div className="space-y-4 mb-10">
                {[
                  {
                    step: '01',
                    title: 'Diagnostic du support',
                    desc: 'Analyse de la porosité et de la nature de la surface touchée pour choisir le procédé chimique ou mécanique le plus adapté.',
                  },
                  {
                    step: '02',
                    title: 'Effacement ciblé',
                    desc: 'Utilisation de techniques respectueuses des matériaux (aérogommage doux ou solutions de nettoyage chimique éco-maîtrisées) pour éliminer 100 % des pigments sans laisser de traces résiduelles.',
                  },
                  {
                    step: '03',
                    title: 'Remise en état immédiate',
                    desc: 'Restitution d\'une façade propre, soignée et accueillante, parfaitement alignée avec les standards de qualité de l\'enseigne.',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex gap-5 items-start bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                    <span className="text-3xl font-black text-green-200 select-none shrink-0 leading-none">{item.step}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Photo après */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={apresImageUrl}
                  srcSet={cldSrcSet(IMAGES.effacementTagVitrine, [400, 700, 900])}
                  sizes="(max-width: 768px) 100vw, 896px"
                  alt="Vitrine Marseille après effacement tag – Nature Clean"
                  width="900"
                  height="500"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-72 md:h-96 object-cover"
                />
                <div className="bg-gray-900 text-white px-6 py-3 text-sm text-center">
                  Résultat après intervention — façade restituée sans trace résiduelle
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Pourquoi les enseignes et syndics font appel à nous ?
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Qu'il s'agisse d'un commerce de centre-ville, d'une grande surface en périphérie ou de parties communes gérées par des syndics de copropriété, <strong>Nature Clean</strong> propose des solutions clés en main :
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Intervention rapide sous 48h pour limiter l\'impact visuel des tags.',
                  'Garantie d\'effacement sans trace sur tous types de supports (pierre, verre, métal, béton).',
                  'Une démarche pragmatique et éco-responsable combinant efficacité professionnelle et respect des normes environnementales.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-6">
                <p className="text-gray-700 italic leading-relaxed">
                  Vous gérez un commerce, des bureaux ou une copropriété à Marseille ou en région PACA et vous faites face à des dégradations ? Contactez l'équipe de Nature Clean pour obtenir un diagnostic et un <strong>devis gratuit sous 24h</strong>.
                </p>
              </div>
            </section>

            {/* CTA */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-8 text-center shadow-lg">
                <h3 className="text-2xl font-bold mb-3">
                  Victime de tags ou graffitis sur votre façade ?
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  Intervention sous 48h à Marseille et en région PACA. Devis gratuit sous 24h.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-green-700 hover:bg-gray-100 font-bold">
                    <Link to="/devis">Demander un devis gratuit</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="!bg-transparent border-2 border-white !text-white hover:!bg-white/10 [&>*]:!text-white">
                    <a href={PHONE_HREF} className="flex items-center gap-2" aria-label={ARIA_PHONE}>
                      <Phone className="w-5 h-5" />
                      {PHONE_DISPLAY}
                    </a>
                  </Button>
                </div>
              </div>
            </section>

            {/* Articles connexes */}
            <section className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Articles connexes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link
                  to="/services/nettoyage-graffitis"
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-green-700 mb-2">
                    Service nettoyage graffitis →
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Tous nos services d'effacement de tags, aérogommage et protection anti-graffiti.
                  </p>
                </Link>
                <Link
                  to="/blog/checklist-nettoyage-copropriete-syndic"
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-green-700 mb-2">
                    Checklist nettoyage copropriété →
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Le guide complet pour les syndics et la gestion des parties communes.
                  </p>
                </Link>
              </div>
            </section>

          </div>
        </div>
      </article>
    </>
  );
}
