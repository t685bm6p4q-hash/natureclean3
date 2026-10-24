import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { Button } from '@/app/components/ui/button';
import { Link } from 'react-router';
import { Phone, ArrowLeft, Clock, CheckCircle2, Zap } from 'lucide-react';
import { useArticleJsonLd } from '@/app/hooks/useArticleJsonLd';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { BlogArticleByline } from '@/app/components/BlogArticleByline';
import { getOptimizedCldUrl, cldSrcSet, IMAGES } from '@/app/utils/images';

const ARTICLE_SLUG = 'nettoyage-graffitis-grande-surface-marseille';

export function NettoyageGraffitisCarrefour() {
  const heroImageUrl = getOptimizedCldUrl(IMAGES.graffitiCarrefourAvant, 1200);
  const apresImageUrl = getOptimizedCldUrl(IMAGES.effacementTagVitrine, 900);

  useArticleJsonLd({
    headline: 'Effacement de graffitis sur façade commerciale à Marseille',
    description:
      'Retour d\'intervention en urgence sur une grande surface alimentaire marseillaise : diagnostic, techniques et remise en état. Fiche détaillée aussi sur nos réalisations.',
    image: heroImageUrl,
    datePublished: '2026-06-09',
    dateModified: '2026-10-24',
    slug: ARTICLE_SLUG,
    keywords: 'nettoyage graffitis marseille, effacement tags grande surface, anti-graffiti façade, intervention urgence graffitis 13',
    articleSection: 'Cas clients',
    wordCount: 650,
  });

  return (
    <>
      <SEO_Guardian
        title="Graffitis sur Façade Commerciale Marseille | Retour d'Intervention"
        description="Intervention d'urgence Nature Clean pour effacer tags et graffitis sur une grande surface à Marseille. Protocole et lien vers la fiche réalisation complète."
        keywords="nettoyage graffitis marseille, effacement tags façade, anti-graffiti grande surface marseille"
        currentSection="blog"
      />

      <article className="bg-white">
        <div>
          <div className="h-56 md:h-72 overflow-hidden">
            <img
              src={heroImageUrl}
              srcSet={cldSrcSet(IMAGES.graffitiCarrefourAvant, [600, 900, 1200])}
              sizes="100vw"
              alt="Façade de grande surface à Marseille avant effacement de graffitis — Nature Clean"
              width="1200"
              height="480"
              // @ts-ignore — fetchpriority: attribut HTML valide, non typé en minuscules dans React 18
              fetchpriority="high"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="bg-gray-900 text-white p-6 md:p-10">
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
                  Intervention d&apos;urgence
                </span>
                <span className="flex items-center gap-1.5 text-green-300 text-sm">
                  <Clock className="w-4 h-4" />
                  5 min de lecture • 9 juin 2026
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white max-w-4xl leading-tight">
                Effacement de graffitis sur une façade commerciale à Marseille
              </h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <BlogArticleByline publishedLabel="9 juin 2026" updatedLabel="24 octobre 2026" />

            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-xl text-gray-700 leading-relaxed">
                L&apos;image d&apos;une grande surface se joue dès le premier regard : la façade est le premier contact avec
                l&apos;enseigne. Tags et graffitis non désirés dégradent cette perception — d&apos;où l&apos;intérêt d&apos;une
                intervention rapide et maîtrisée techniquement.
              </p>
              <p className="text-gray-700 leading-relaxed mt-4">
                Récemment, l&apos;équipe <strong>Nature Clean</strong> est intervenue en urgence sur une{' '}
                <strong>grande surface alimentaire marseillaise</strong> (enseigne anonymisée sur demande) pour effacer des
                inscriptions et redonner à la devanture sa netteté. Photos avant/après et détail du chantier :{' '}
                <Link to="/realisations" className="text-green-800 font-semibold underline">
                  page Réalisations
                </Link>
                .
              </p>
            </div>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Un enjeu esthétique pour la grande distribution
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                À Marseille, les commerces à fort trafic subissent régulièrement des incivilités urbaines. Laisser s&apos;installer
                un tag envoie un signal négatif aux clients. Agir vite limite l&apos;impact sur l&apos;image et la sécurité perçue
                du site.
              </p>
              <p className="text-gray-700 leading-relaxed mb-6">Nettoyer une devanture de grande surface ne s&apos;improvise pas :</p>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  {
                    title: 'La diversité des supports',
                    desc: "Béton, métal, verre ou pierre demandent des techniques différentes pour ne pas abîmer le support d'origine.",
                  },
                  {
                    title: 'Les contraintes d\'exploitation',
                    desc: "Intervention en horaires décalés ou ultra-rapide pour ne pas perturber l'accès clients et la logistique.",
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Protocole d&apos;intervention Nature Clean
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                Mobilisation rapide, expertise nettoyage technique et{' '}
                <Link to="/services/nettoyage-graffitis" className="text-green-800 font-semibold underline">
                  effacement de graffitis à Marseille
                </Link>{' '}
                selon un protocole en trois étapes :
              </p>

              <div className="space-y-4 mb-10">
                {[
                  {
                    step: '01',
                    title: 'Diagnostic du support',
                    desc: 'Analyse de la porosité et de la nature de la surface pour choisir le procédé adapté.',
                  },
                  {
                    step: '02',
                    title: 'Effacement ciblé',
                    desc: 'Techniques respectueuses des matériaux (aérogommage doux ou solutions maîtrisées) pour éliminer les pigments.',
                  },
                  {
                    step: '03',
                    title: 'Remise en état',
                    desc: 'Façade propre et accueillante, conforme aux attentes de l\'exploitant.',
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="flex gap-5 items-start bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
                  >
                    <span className="text-3xl font-black text-green-200 select-none shrink-0 leading-none">{item.step}</span>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={apresImageUrl}
                  srcSet={cldSrcSet(IMAGES.effacementTagVitrine, [400, 700, 900])}
                  sizes="(max-width: 768px) 100vw, 896px"
                  alt="Vitrine après effacement de tag à Marseille — Nature Clean"
                  width="900"
                  height="500"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-72 md:h-96 object-cover"
                />
                <div className="bg-gray-900 text-white px-6 py-3 text-sm text-center">
                  Résultat après intervention — façade nettoyée selon le support et le test préalable
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Pourquoi les enseignes nous confient ce type d&apos;urgence ?
              </h2>
              <ul className="space-y-3 mb-8">
                {[
                  'Réactivité pour limiter l\'impact visuel des tags.',
                  'Effacement adapté au support (pierre, verre, métal, béton).',
                  'Démarche pragmatique : efficacité professionnelle et produits maîtrisés.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-6">
                <p className="text-gray-700 leading-relaxed">
                  Commerce, bureaux ou copropriété dans les Bouches-du-Rhône ?{' '}
                  <Link to="/realisations" className="font-semibold text-green-800 underline">
                    Voir la fiche réalisation
                  </Link>{' '}
                  ou demandez un diagnostic : réponse sous <strong>2 h</strong> en horaires d&apos;ouverture, devis sous{' '}
                  <strong>24 h</strong>.
                </p>
              </div>
            </section>

            <section className="mb-12">
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-8 text-center shadow-lg">
                <h3 className="text-2xl font-bold mb-3">Tags ou graffitis sur votre façade ?</h3>
                <p className="text-lg mb-6 opacity-90">Marseille et Bouches-du-Rhône — devis gratuit sous 24 h.</p>
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

            <section className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Articles connexes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link
                  to="/services/nettoyage-graffitis"
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-green-700 mb-2">Nettoyage graffitis à Marseille →</h3>
                  <p className="text-gray-600 text-sm">Effacement de tags, aérogommage et protection anti-graffiti.</p>
                </Link>
                <Link
                  to="/blog/checklist-nettoyage-copropriete-syndic"
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-green-700 mb-2">Checklist nettoyage copropriété →</h3>
                  <p className="text-gray-600 text-sm">Guide pour syndics et parties communes.</p>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
