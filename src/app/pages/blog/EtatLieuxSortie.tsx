import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { Button } from '@/app/components/ui/button';
import { Link } from 'react-router';
import { Phone, CheckCircle2, AlertTriangle, ArrowLeft, Clock } from 'lucide-react';
import { IMAGES } from '@/app/utils/images';
import { useArticleJsonLd } from '@/app/hooks/useArticleJsonLd';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';

export function EtatLieuxSortie() {
  useArticleJsonLd({
    headline: 'Comment préparer un état des lieux de sortie à Marseille',
    description: 'Guide complet pour récupérer votre caution locative grâce à un nettoyage professionnel à Marseille. Zones critiques, erreurs à éviter et conseils d\'experts.',
    image: IMAGES.appartClesComplete,
    datePublished: '2025-01-27',
    dateModified: '2025-01-27',
    slug: 'etat-des-lieux-sortie-marseille',
    keywords: 'état des lieux sortie marseille, nettoyage fin de bail 13, récupérer caution locative, nettoyage appartement marseille, état des lieux 13001',
    articleSection: 'Guides Pratiques',
    wordCount: 1200,
  });

  return (
    <>
      <SEO_Guardian 
        title="État des Lieux Sortie Marseille : Guide Complet 2025 | Nature Clean"
        description="Comment préparer un état des lieux de sortie à Marseille et récupérer votre caution ? Guide expert avec checklist complète et conseils de nettoyage professionnel."
        keywords="état des lieux sortie marseille, nettoyage fin de bail 13, récupérer caution locative, nettoyage appartement marseille, état des lieux 13001, 13002, 13003"
        currentSection="blog"

      />

      {/* Hero Article */}
      <article className="bg-white">
        <div className="relative h-96 overflow-hidden">
          <img
            src={IMAGES.appartClesComplete}
            alt="Nettoyage appartement état des lieux sortie Marseille"
            width="1920"
            height="1080"
            // @ts-ignore — fetchpriority: attribut HTML valide, non typé en minuscules dans React 18
            fetchpriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Link to="/blog" className="inline-flex items-center gap-2 text-white hover:text-green-300 mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Retour au blog
              </Link>
              <div className="flex items-center gap-2 text-green-300 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm">5 min de lecture • 27 janvier 2025</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white max-w-4xl">
                Comment préparer un état des lieux de sortie à Marseille
              </h1>
            </div>
          </div>
        </div>

        {/* Contenu Article */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            
            {/* Introduction */}
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-gray-700 leading-relaxed">
                Vous quittez votre logement à <strong>Marseille</strong> et vous souhaitez <strong>récupérer l'intégralité de votre caution</strong> ? 
                L'état des lieux de sortie est une étape cruciale qui peut vous coûter cher si elle n'est pas bien préparée. 
                Dans cet article, découvrez notre <strong>guide complet</strong> pour réussir votre état des lieux et éviter les mauvaises surprises.
              </p>
            </div>

            {/* Section 1 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                Les zones critiques à nettoyer absolument
              </h2>
              
              <div className="bg-green-50 border-l-4 border-green-600 p-6 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  <strong>90% des retenues sur caution</strong> concernent un nettoyage insuffisant. 
                  Voici les zones que les propriétaires vérifient en priorité lors de l'état des lieux de sortie.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">1. La cuisine</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Four et plaques de cuisson</strong> : dégraissage complet (intérieur/extérieur)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Hotte aspirante</strong> : filtres + parois intérieures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Réfrigérateur</strong> : dégivrage, désinfection, élimination des odeurs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Placards</strong> : intérieur + extérieur, pas de miettes ni taches</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">2. La salle de bain</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Joints de carrelage</strong> : traitement anti-moisissure, blanchiment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Sanitaires</strong> : détartrage WC, lavabo, baignoire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Miroirs et parois de douche</strong> : sans traces ni calcaire</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">3. Les sols et murs</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Parquet / carrelage</strong> : lavage approfondi, élimination des taches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Plinthes</strong> : dépoussiérage + nettoyage humide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Murs</strong> : enlever traces de doigts, marques de meubles</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">4. Les vitres et fenêtres</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Vitres intérieures et extérieures</strong> : nettoyage sans traces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span><strong>Encadrements et rails</strong> : dépoussiérage + dégraissage</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
                Les erreurs fatales qui vous coûtent votre caution
              </h2>

              <div className="bg-orange-50 border-l-4 border-orange-600 p-6 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  <strong>Attention !</strong> Ces erreurs courantes peuvent entraîner une retenue de <strong>100 à 500€</strong> sur votre caution.
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-white border border-orange-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">❌ Négliger les petits détails</h3>
                  <p className="text-gray-700">
                    Poignées de porte, interrupteurs, radiateurs... Les propriétaires inspectent TOUT. 
                    Un simple oubli peut justifier une retenue importante.
                  </p>
                </div>

                <div className="bg-white border border-orange-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">❌ Utiliser des produits inadaptés</h3>
                  <p className="text-gray-700">
                    Eau de javel sur du parquet, vinaigre sur le marbre... Ces erreurs peuvent causer des dégradations irréversibles 
                    et vous coûter bien plus cher que la caution.
                  </p>
                </div>

                <div className="bg-white border border-orange-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">❌ S'y prendre au dernier moment</h3>
                  <p className="text-gray-700">
                    Un nettoyage en profondeur nécessite <strong>minimum 1 à 2 journées complètes</strong>. 
                    Prévoir seulement quelques heures la veille est une erreur fréquente.
                  </p>
                </div>

                <div className="bg-white border border-orange-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">❌ Oublier les zones extérieures</h3>
                  <p className="text-gray-700">
                    Balcon, terrasse, cave, parking... Ces espaces font partie du bail et doivent être rendus propres.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Pourquoi faire appel à Nature Clean Marseille ?
              </h2>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">✅ Garantie récupération caution</h3>
                  <p className="text-gray-700">
                    Notre nettoyage professionnel répond aux exigences des propriétaires et agences immobilières marseillaises.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">⚡ Intervention rapide 24-48h</h3>
                  <p className="text-gray-700">
                    Besoin urgent ? Nous intervenons rapidement sur tous les arrondissements de Marseille (13001 à 13016).
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">💰 Moins cher qu'une retenue</h3>
                  <p className="text-gray-700">
                    Un nettoyage professionnel coûte entre 150€ et 300€. Une retenue sur caution peut atteindre 500€ ou plus.
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">🧪 Produits professionnels</h3>
                  <p className="text-gray-700">
                    Matériel adapté à chaque surface pour un résultat impeccable sans risque de dégradation.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">
                  🎯 Offre Spéciale "État des Lieux Sortie"
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  Devis gratuit sous 24h + intervention express sur Marseille et région PACA
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-green-700 hover:bg-gray-100">
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

            {/* Checklist téléchargeable */}
            <section className="mb-12">
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  📋 Checklist complète (à imprimer)
                </h2>
                <p className="text-gray-700 mb-4">
                  Téléchargez notre checklist gratuite pour ne rien oublier lors de votre état des lieux de sortie :
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ Cuisine : Four, plaques, frigo, placards</li>
                  <li>✅ Salle de bain : Joints, sanitaires, miroirs</li>
                  <li>✅ Chambres : Sols, plinthes, murs, vitres</li>
                  <li>✅ Zones communes : Entrée, couloirs, balcon</li>
                  <li>✅ Extérieurs : Cave, parking (si applicable)</li>
                </ul>
              </div>
            </section>

            {/* Articles connexes */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Articles connexes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link to="/blog/nettoyage-apres-sinistre" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">
                    Nettoyage après sinistre →
                  </h3>
                  <p className="text-gray-600">
                    Protocole professionnel pour dégât des eaux et incendie
                  </p>
                </Link>
                <Link to="/blog/normes-nettoyage-chantier-2025" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">
                    Normes nettoyage chantier 2025 →
                  </h3>
                  <p className="text-gray-600">
                    Obligations légales pour promoteurs et artisans
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