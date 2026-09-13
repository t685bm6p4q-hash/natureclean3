import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { Button } from '@/app/components/ui/button';
import { Link } from 'react-router';
import { Phone, HardHat, ArrowLeft, Clock, FileText, Scale, CheckCircle2 } from 'lucide-react';
import { IMAGES } from '@/app/utils/images';
import { useArticleJsonLd } from '@/app/hooks/useArticleJsonLd';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';

export function NormesChantier2025() {
  useArticleJsonLd({
    headline: 'Nettoyage de chantier : obligations légales et normes 2025',
    description: 'Guide complet des normes de nettoyage fin de chantier 2025. Obligations légales BTP, réglementation, protocole pour promoteurs et artisans à Marseille.',
    image: IMAGES.chantierBrut,
    datePublished: '2025-01-27',
    dateModified: '2025-01-27',
    slug: 'normes-nettoyage-chantier-2025',
    keywords: 'nettoyage fin de chantier marseille, normes BTP 2025, obligations légales chantier, réglementation nettoyage 13, protocole fin de travaux',
  });

  return (
    <>
      <SEO_Guardian 
        title="Nettoyage Chantier Marseille : Normes & Obligations 2025 | Nature Clean"
        description="Obligations légales nettoyage fin de chantier 2025. Normes BTP, réglementation, protocole certifié pour promoteurs et artisans à Marseille. Devis gratuit."
        keywords="nettoyage fin de chantier marseille, normes BTP 2025, obligations légales chantier 13, réglementation nettoyage PACA, livraison chantier propre"
        currentSection="blog"

      />

      <article className="bg-white">
        <div className="relative h-96 overflow-hidden">
          <img
            src={IMAGES.chantierBrut}
            alt="Nettoyage professionnel fin de chantier BTP Marseille normes 2025"
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
                <span className="text-sm">7 min de lecture • 27 janvier 2025</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white max-w-4xl">
                Nettoyage de chantier : obligations légales et normes 2025
              </h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            
            <div className="prose prose-lg max-w-none mb-12">
              <p className="text-xl text-gray-700 leading-relaxed">
                Le <strong>nettoyage de fin de chantier</strong> n'est pas une option, c'est une <strong>obligation légale</strong>. 
                En 2025, la réglementation BTP impose aux promoteurs, maîtres d'œuvre et artisans de livrer un chantier <strong>propre et conforme</strong>. 
                À <strong>Marseille et dans les Bouches-du-Rhône (13)</strong>, Nature Clean vous accompagne pour respecter ces normes et éviter les pénalités.
              </p>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12">
              <div className="flex items-start gap-3">
                <Scale className="w-6 h-6 text-blue-600 mt-1 shrink-0" />
                <div>
                  <h3 className="font-bold text-blue-900 mb-2">📜 Cadre légal 2025</h3>
                  <p className="text-blue-800">
                    <strong>Article R4228-1 du Code du Travail</strong> : "Les locaux doivent être tenus dans un état constant de propreté." 
                    + <strong>Norme NF DTU 42.1</strong> pour le nettoyage des façades et vitrages après travaux.
                  </p>
                </div>
              </div>
            </div>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <FileText className="w-8 h-8 text-green-600" />
                Les 3 obligations légales incontournables
              </h2>

              <div className="space-y-6">
                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    1️⃣ Nettoyage avant livraison (Obligation contractuelle)
                  </h3>
                  <p className="text-gray-700 mb-4">
                    <strong>Qui est concerné ?</strong> Tous les maîtres d'ouvrage (promoteurs, entreprises générales) et sous-traitants BTP.
                  </p>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-700 mb-2"><strong>Ce que dit la loi :</strong></p>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Le bien doit être livré "en parfait état de propreté" (Article 1792 du Code Civil)</li>
                      <li>• Les gravats, poussières et résidus doivent être évacués</li>
                      <li>• Les équipements (sanitaires, cuisine) doivent être fonctionnels et propres</li>
                      <li>• Les protections (films, adhésifs) doivent être retirées sans laisser de traces</li>
                    </ul>
                  </div>
                  <div className="mt-4 bg-red-50 border-l-4 border-red-600 p-4">
                    <p className="text-red-800 text-sm">
                      ⚠️ <strong>Sanction en cas de non-conformité :</strong> Refus de réception des travaux + pénalités de retard + obligation de reprise à vos frais.
                    </p>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    2️⃣ Gestion des déchets de chantier (Obligation environnementale)
                  </h3>
                  <p className="text-gray-700 mb-4">
                    <strong>Réglementation :</strong> Décret n°2020-1817 (Diagnostic déchets) + Loi anti-gaspillage (AGEC 2020)
                  </p>
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-gray-700 mb-2"><strong>Obligations de tri et recyclage :</strong></p>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Tri à la source en 7 catégories (bois, métal, plastique, plâtre, verre, carton, inertes)</li>
                      <li>• Traçabilité obligatoire : <strong>Bordereau de Suivi des Déchets (BSD)</strong> à conserver 3 ans</li>
                      <li>• Interdiction de mélanger déchets dangereux et non dangereux</li>
                      <li>• Évacuation vers centres de traitement agréés uniquement</li>
                    </ul>
                  </div>
                  <div className="mt-4 bg-orange-50 border-l-4 border-orange-600 p-4">
                    <p className="text-orange-800 text-sm">
                      💰 <strong>Amendes :</strong> Jusqu'à 75 000€ pour une entreprise + 2 ans d'emprisonnement en cas de dépôt sauvage.
                    </p>
                  </div>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    3️⃣ Protection des voies publiques (Obligation municipale)
                  </h3>
                  <p className="text-gray-700 mb-4">
                    <strong>Réglementation Marseille :</strong> Arrêté municipal sur la propreté des chantiers (Article L541-3 du Code de l'Environnement)
                  </p>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-gray-700 mb-2"><strong>Règles à respecter :</strong></p>
                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li>• Nettoyage quotidien des abords du chantier (trottoirs, chaussée)</li>
                      <li>• Mise en place de systèmes de lavage des roues (chantiers importants)</li>
                      <li>• Interdiction de stockage sur la voie publique sans autorisation</li>
                      <li>• Bennes fermées pour éviter l'envol de poussières</li>
                    </ul>
                  </div>
                  <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-600 p-4">
                    <p className="text-yellow-800 text-sm">
                      📋 <strong>À Marseille :</strong> Autorisation de voirie obligatoire + caution de 500 à 2000€ (remboursée si nettoyage conforme).
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <HardHat className="w-8 h-8 text-green-600" />
                Protocole de nettoyage fin de chantier conforme 2025
              </h2>

              <p className="text-gray-700 mb-6">
                Pour être en conformité avec les normes BTP et réussir la réception des travaux, voici le protocole en <strong>4 phases</strong> 
                que nous appliquons chez <strong>Nature Clean Marseille</strong> :
              </p>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-600 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-green-900 mb-3">
                    Phase 1 : Déblaiement et évacuation (Gros nettoyage)
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Enlèvement gravats, débris de matériaux, emballages</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Évacuation vers déchetterie agréée avec BSD (Bordereau Suivi Déchets)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                      <span>Tri sélectif : recyclage métal, bois, carton, plastique</span>
                    </li>
                  </ul>
                  <div className="mt-3 text-sm text-green-800 bg-green-50 rounded p-3">
                    ⏱️ Durée : 1-2 jours selon taille chantier
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-blue-900 mb-3">
                    Phase 2 : Dépoussiérage et aspiration (Nettoyage intermédiaire)
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                      <span>Aspiration industrielle plâtre, poussières de ponçage, sciure</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                      <span>Nettoyage radiateurs, gaines électriques, interrupteurs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
                      <span>Dépoussiérage murs, plafonds, menuiseries</span>
                    </li>
                  </ul>
                  <div className="mt-3 text-sm text-blue-800 bg-blue-50 rounded p-3">
                    ⏱️ Durée : 1-2 jours
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-600 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-purple-900 mb-3">
                    Phase 3 : Nettoyage en profondeur (Finitions)
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                      <span><strong>Sols</strong> : Lavage parquet, carrelage, élimination laitance ciment</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                      <span><strong>Vitres</strong> : Nettoyage intérieur/extérieur + retrait films protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                      <span><strong>Sanitaires</strong> : Détartrage, désinfection WC, lavabos, douches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
                      <span><strong>Cuisine</strong> : Nettoyage placards, plan de travail, électroménager</span>
                    </li>
                  </ul>
                  <div className="mt-3 text-sm text-purple-800 bg-purple-50 rounded p-3">
                    ⏱️ Durée : 1-3 jours selon surface
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 border-l-4 border-orange-600 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-orange-900 mb-3">
                    Phase 4 : Contrôle qualité et livraison (Inspection finale)
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                      <span>Vérification checklist 150 points (norme interne Nature Clean)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                      <span>Contrôle absence de traces, taches, résidus</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                      <span>Remise dossier : photos avant/après + BSD déchets + facture détaillée</span>
                    </li>
                  </ul>
                  <div className="mt-3 text-sm text-orange-800 bg-orange-50 rounded p-3">
                    ⏱️ Durée : 0.5 jour
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Pourquoi externaliser le nettoyage de chantier ?
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">💰 Économie garantie</h3>
                  <p className="text-gray-700">
                    Coût d'un nettoyage pro : <strong>2-5€/m²</strong><br />
                    Coût d'un refus de réception : <strong>Pénalités de retard + reprise = 10-50x plus cher</strong>
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">⚡ Gain de temps</h3>
                  <p className="text-gray-700">
                    Nettoyage par vos équipes : <strong>3-7 jours</strong><br />
                    Nettoyage Nature Clean : <strong>1-3 jours</strong> (équipe dédiée 4-8 personnes)
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">📋 Conformité assurée</h3>
                  <p className="text-gray-700">
                    Nous fournissons tous les documents pour prouver la conformité réglementaire (BSD, photos, rapport).
                  </p>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">🔧 Équipement pro</h3>
                  <p className="text-gray-700">
                    Mono-brosses, injecteur-extracteur, nacelle vitres, produits spécialisés laitance/ciment.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Tarifs nettoyage fin de chantier Marseille 2025
              </h2>

              <div className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-green-700 text-white">
                    <tr>
                      <th className="p-4 text-left">Type de chantier</th>
                      <th className="p-4 text-left">Surface</th>
                      <th className="p-4 text-left">Tarif indicatif</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="p-4">Appartement T2/T3</td>
                      <td className="p-4">50-80 m²</td>
                      <td className="p-4 font-semibold text-green-700">200-350€</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4">Maison individuelle</td>
                      <td className="p-4">100-150 m²</td>
                      <td className="p-4 font-semibold text-green-700">400-600€</td>
                    </tr>
                    <tr>
                      <td className="p-4">Local commercial</td>
                      <td className="p-4">200-500 m²</td>
                      <td className="p-4 font-semibold text-green-700">800-2000€</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4">Immeuble résidentiel</td>
                      <td className="p-4">1000+ m²</td>
                      <td className="p-4 font-semibold text-green-700">Sur devis</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-600 mt-4">
                * Tarifs indicatifs TTC. Devis personnalisé gratuit sous 24h. Inclut : main d'œuvre, produits, matériel, évacuation déchets + BSD.
              </p>
            </section>

            <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-8 text-center mb-12">
              <HardHat className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-4">
                🏗️ Devis Nettoyage Chantier Express
              </h3>
              <p className="text-xl mb-6 opacity-90">
                Réponse sous 4h • Intervention sous 48h • Marseille et région PACA
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-white text-green-700 hover:bg-gray-100 font-bold">
                  <Link to="/devis?service=fin-chantier">Demander un devis gratuit</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="!bg-transparent border-2 border-white !text-white hover:!bg-white/10 [&>*]:!text-white">
                  <a href={PHONE_HREF} className="flex items-center gap-2" aria-label={ARIA_PHONE}>
                    <Phone className="w-5 h-5" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
              <div className="mt-6 grid md:grid-cols-3 gap-4 text-sm">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-semibold">✅ Conformité garantie</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-semibold">📋 Dossier complet fourni</p>
                </div>
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="font-semibold">⚡ Livraison dans les délais</p>
                </div>
              </div>
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
                <Link to="/blog/nettoyage-apres-sinistre" className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">
                    Nettoyage après sinistre →
                  </h3>
                  <p className="text-gray-600">
                    Protocole professionnel dégât des eaux et incendie
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