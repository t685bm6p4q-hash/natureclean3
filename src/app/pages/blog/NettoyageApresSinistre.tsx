import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { Button } from '@/app/components/ui/button';
import { Link } from 'react-router';
import { Phone, AlertTriangle, ArrowLeft, Clock, Droplets, Flame, Wind } from 'lucide-react';
import { IMAGES } from '@/app/utils/images';
import { useArticleJsonLd } from '@/app/hooks/useArticleJsonLd';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';

export function NettoyageApresSinistre() {
  useArticleJsonLd({
    headline: 'Protocole de nettoyage après sinistre : dégât des eaux et incendie',
    description: 'Guide professionnel pour le nettoyage après sinistre à Marseille. Intervention rapide dégât des eaux, incendie, moisissures. Protocole certifié.',
    image: IMAGES.degatDesEaux,
    datePublished: '2025-01-27',
    dateModified: '2025-01-27',
    slug: 'nettoyage-apres-sinistre',
    keywords: 'nettoyage après sinistre marseille, dégât des eaux 13, nettoyage après incendie, remise en état post-sinistre, intervention urgence marseille',
  });

  return (
    <>
      <SEO_Guardian 
        title="Nettoyage Après Sinistre Marseille | Dégât des Eaux & Incendie | Nature Clean"
        description="Intervention rapide pour nettoyage après sinistre à Marseille : dégât des eaux, incendie, moisissures. Protocole professionnel certifié. Devis gratuit 04 84 89 68 75"
        keywords="nettoyage après sinistre marseille, dégât des eaux 13, nettoyage après incendie marseille, remise en état post-sinistre, intervention urgence 13001"
        currentSection="blog"
        disableReviews={true}
      />

      <article className="bg-white">
        <div className="relative h-96 overflow-hidden">
          <img
            src={IMAGES.degatDesEaux}
            alt="Nettoyage professionnel après dégât des eaux et sinistre à Marseille"
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
                <span className="text-sm">6 min de lecture • 27 janvier 2025</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white max-w-4xl">
                Protocole de nettoyage après sinistre : dégât des eaux et incendie
              </h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-gray-700 leading-relaxed">
                Un <strong>sinistre</strong> (dégât des eaux, incendie, inondation) nécessite une <strong>intervention rapide et professionnelle</strong> 
                pour éviter l'aggravation des dommages. À <strong>Marseille et dans toute la région PACA</strong>, Nature Clean intervient en urgence 
                avec un protocole certifié pour la remise en état de vos locaux.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-600 p-6 mb-12">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-600 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-red-900 mb-2">⚠️ URGENCE SINISTRE</h3>
                  <p className="text-red-800">
                    <strong>Les 48 premières heures sont critiques.</strong> Chaque heure perdue augmente le risque de moisissures, 
                    d'odeurs persistantes et de dégradations irréversibles. Contactez-nous immédiatement au <strong>{PHONE_DISPLAY}</strong>.
                  </p>
                </div>
              </div>
            </div>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Types de sinistres : nos protocoles d'intervention
              </h2>

              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                      <Droplets className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Dégât des eaux</h3>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    <strong>Causes fréquentes :</strong> Fuite canalisation, rupture ballon d'eau chaude, infiltration toiture, 
                    débordement machine à laver, inondation suite à intempéries.
                  </p>

                  <h4 className="font-semibold text-gray-900 mb-3">🔧 Notre protocole en 5 étapes :</h4>
                  <ol className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600 shrink-0">1.</span>
                      <span><strong>Évaluation des dommages</strong> : Inspection complète + détection d'humidité résiduelle (hygromètre professionnel)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600 shrink-0">2.</span>
                      <span><strong>Extraction de l'eau</strong> : Pompage + aspiration avec équipement industriel</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600 shrink-0">3.</span>
                      <span><strong>Séchage accéléré</strong> : Déshumidificateurs professionnels + ventilateurs haute puissance (24-72h)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600 shrink-0">4.</span>
                      <span><strong>Désinfection totale</strong> : Traitement anti-microbien pour prévenir moisissures et bactéries</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-blue-600 shrink-0">5.</span>
                      <span><strong>Nettoyage en profondeur</strong> : Sols, murs, plafonds, mobilier récupérable</span>
                    </li>
                  </ol>

                  <div className="mt-4 bg-blue-100 rounded-lg p-4">
                    <p className="text-blue-900 text-sm">
                      ⏱️ <strong>Délai d'intervention :</strong> 2-4h après votre appel sur Marseille et communes limitrophes
                    </p>
                  </div>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center">
                      <Flame className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Incendie & Fumée</h3>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    <strong>Problématiques spécifiques :</strong> Suie incrustée, odeur de fumée persistante, résidus toxiques, 
                    dégradation des surfaces (peinture, tissus, plastiques).
                  </p>

                  <h4 className="font-semibold text-gray-900 mb-3">🔥 Notre protocole incendie :</h4>
                  <ol className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-orange-600 shrink-0">1.</span>
                      <span><strong>Sécurisation de la zone</strong> : Vérification stabilité structure (en coordination avec sapeurs-pompiers)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-orange-600 shrink-0">2.</span>
                      <span><strong>Évacuation des débris</strong> : Enlèvement matériaux calcinés, tri récupérable/non récupérable</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-orange-600 shrink-0">3.</span>
                      <span><strong>Décontamination suie</strong> : Nettoyage chimique spécifique (murs, plafonds, sols) avec produits adaptés</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-orange-600 shrink-0">4.</span>
                      <span><strong>Traitement odeurs</strong> : Ozonation + neutralisants professionnels pour éliminer 100% des odeurs de fumée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-orange-600 shrink-0">5.</span>
                      <span><strong>Désinfection finale</strong> : Assainissement complet avant travaux de rénovation</span>
                    </li>
                  </ol>

                  <div className="mt-4 bg-orange-100 rounded-lg p-4">
                    <p className="text-orange-900 text-sm">
                      🛡️ <strong>Équipement de protection :</strong> Masques FFP3, combinaisons, gants spéciaux pour manipulation résidus toxiques
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-green-700 rounded-lg flex items-center justify-center">
                      <Wind className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Moisissures & Humidité</h3>
                  </div>
                  
                  <p className="text-gray-700 mb-4">
                    <strong>Risques sanitaires :</strong> Les moisissures post-sinistre peuvent causer allergies, asthme et problèmes respiratoires. 
                    Un traitement professionnel est <strong>obligatoire</strong>.
                  </p>

                  <h4 className="font-semibold text-gray-900 mb-3">🦠 Notre protocole anti-moisissures :</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 shrink-0">✓</span>
                      <span><strong>Diagnostic précis</strong> : Identification des zones contaminées (visibles et cachées)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 shrink-0">✓</span>
                      <span><strong>Confinement</strong> : Isolation zones saines pour éviter la propagation des spores</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 shrink-0">✓</span>
                      <span><strong>Traitement fongicide</strong> : Application produits certifiés + élimination mécanique</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 shrink-0">✓</span>
                      <span><strong>Séchage total</strong> : Taux d'humidité ramené sous 50% (contrôle hygromètre)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Pourquoi choisir Nature Clean pour un sinistre ?
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-green-600 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">⚡ Intervention 24/7</h3>
                  <p className="text-gray-700">
                    Disponible jour et nuit, week-ends et jours fériés. Délai moyen d'arrivée : <strong>2h sur Marseille</strong>.
                  </p>
                </div>

                <div className="bg-white border-2 border-green-600 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">📋 Dossier assurance</h3>
                  <p className="text-gray-700">
                    Nous fournissons tous les documents nécessaires pour votre dossier d'indemnisation (photos, devis détaillé, rapport d'intervention).
                  </p>
                </div>

                <div className="bg-white border-2 border-green-600 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">🔬 Équipement professionnel</h3>
                  <p className="text-gray-700">
                    Déshumidificateurs industriels, pompes haute puissance, générateurs d'ozone, hygromètres de précision.
                  </p>
                </div>

                <div className="bg-white border-2 border-green-600 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">✅ Protocole certifié</h3>
                  <p className="text-gray-700">
                    Respect des normes IICRC (Institute of Inspection Cleaning and Restoration Certification) pour sinistres.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Zone d'intervention urgence
              </h2>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <p className="text-gray-700 mb-4">
                  <strong>Nature Clean Marseille</strong> intervient en urgence sur :
                </p>
                <div className="grid md:grid-cols-3 gap-4 text-gray-700">
                  <ul className="space-y-1">
                    <li>✓ Marseille (13001-13016)</li>
                    <li>✓ Aix-en-Provence</li>
                    <li>✓ Aubagne</li>
                    <li>✓ Martigues</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>✓ Cassis</li>
                    <li>✓ La Ciotat</li>
                    <li>✓ Vitrolles</li>
                    <li>✓ Salon-de-Provence</li>
                  </ul>
                  <ul className="space-y-1">
                    <li>✓ Arles</li>
                    <li>✓ Istres</li>
                    <li>✓ Alpes-Maritimes (Cannes)</li>
                    <li>✓ Toute la région PACA</li>
                  </ul>
                </div>
              </div>
            </section>

            <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl p-8 text-center mb-12">
              <AlertTriangle className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-4">
                🚨 URGENCE SINISTRE
              </h3>
              <p className="text-xl mb-6 opacity-90">
                Dégât des eaux, incendie, inondation ? Intervention immédiate 24/7
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-red-700 hover:bg-gray-100 font-bold text-lg">
                  <a href={PHONE_HREF} className="flex items-center gap-2" aria-label={ARIA_PHONE}>
                    <Phone className="w-6 h-6" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="!bg-transparent border-2 border-white !text-white hover:!bg-white/10 [&>*]:!text-white">
                  <Link to="/devis">Demander un devis</Link>
                </Button>
              </div>
              <p className="mt-4 text-sm opacity-75">
                Disponible 24h/24 • 7j/7 • Intervention sous 2-4h sur Marseille
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Articles connexes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link to="/blog/etat-des-lieux-sortie-marseille" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">
                    État des lieux de sortie →
                  </h3>
                  <p className="text-gray-600">
                    Guide complet pour récupérer votre caution locative
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