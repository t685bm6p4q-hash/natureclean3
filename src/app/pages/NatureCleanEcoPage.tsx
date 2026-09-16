import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { IMAGES } from '@/app/utils/images';
import { Button } from '@/app/components/ui/button';
import { Leaf, Mail, MapPin, Target } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

export function NatureCleanEcoPage() {
  return (
    <>
      <SEO_Guardian currentSection="about" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-20 md:py-28 overflow-hidden">
        <img
          src={IMAGES.produitsEcoHero}
          alt="Produits de nettoyage écologiques Nature Clean Marseille - Spray et bouteilles éco-responsables minimalistes verts"
          width="1920"
          height="1080"
          // @ts-ignore — fetchpriority: attribut HTML valide, non typé en minuscules dans React 18
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay CLAIR */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 to-green-800/50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <nav className="text-sm mb-6 opacity-90 drop-shadow-md">
            <Link to="/" className="hover:underline">Accueil</Link> &gt; <span>Nature Clean Eco</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Nature Clean Eco
          </h1>
          <p className="text-xl md:text-2xl drop-shadow-md">
            Société de nettoyage écologique à Marseille et ses environs
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 leading-relaxed">
                  Soucieuse de l'environnement, l'entreprise de nettoyage à Marseille <strong>Nature Clean</strong> opère 
                  de façon propre et écologique. Nous vous proposons des solutions de nettoyage régulières ou ponctuelles 
                  en prenant soin d'utiliser des techniques douces afin de respecter mère nature. Opérant dans la Cité 
                  Phocéenne et dans sa banlieue, nous vous assurons un travail efficace et adapté à vos besoins.
                </p>
              </div>
              
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src={IMAGES.produitsEcoBrosses}
                  alt="Produits de nettoyage écologiques Nature Clean"
                  className="w-full h-[300px] object-cover"
                  width={600}
                  height={300}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* L'environnement au cœur */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              L'environnement au cœur de nos préoccupations à Marseille
            </h2>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg font-semibold text-gray-900">
                  <strong>Nature Clean</strong> : votre entreprise de <strong>nettoyage écologique à Marseille</strong> 
                  pour particuliers, copropriétés et professionnels.
                </p>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
                  <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Leaf className="w-6 h-6 text-green-600 shrink-0" aria-hidden="true" />
                    Notre engagement écologique
                  </h3>
                  <ul className="space-y-2 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span><strong>Minimum 50% de produits labellisés Bio</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Techniques de <strong>nettoyage écologique respectueuses de l'environnement</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Démarche de <strong>développement durable</strong> certifiée</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-600 font-bold">✓</span>
                      <span>Équipe qualifiée et matériel professionnel éco-responsable</span>
                    </li>
                  </ul>
                </div>

                <p className="text-gray-700">
                  <strong>Notre équipe dirigeante</strong> pilote une <strong>entreprise de nettoyage à taille humaine</strong> 
                  reconnue pour sa <strong>rigueur</strong>, sa <strong>persévérance</strong> et son engagement 
                  environnemental à <strong>Marseille et les Alpes-Maritimes</strong>.
                </p>

                <p className="font-semibold text-green-700 text-lg flex items-start gap-2">
                  <Target className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>
                    Objectif 2026 : extension des services de <strong>nettoyage écologique jusqu&apos;à Cannes</strong>.
                  </span>
                </p>
              </div>

              <div className="bg-green-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600">Contactez-nous</p>
                      <Link to="/contact" className="text-lg font-semibold text-green-700 hover:text-green-800">
                        Formulaire de contact
                      </Link>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button asChild className="w-full bg-green-700 hover:bg-green-800">
                      <Link to="/devis">Demande de devis</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Toujours plus proche */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Nos services de nettoyage à Marseille et Cannes
            </h2>

            <div className="space-y-8">
              {/* Carte entreprise */}
              <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-lg border-2 border-green-200">
                <p className="text-lg text-gray-700 leading-relaxed">
                  <strong>Nature Clean</strong> : entreprise de <strong>nettoyage en pleine croissance à Marseille</strong> 
                  depuis plusieurs années. Une équipe de <strong>3 professionnels passionnés</strong>, 
                  <strong> toute l'équipe</strong> au service de vos locaux.
                </p>
              </div>

              {/* Grille de services */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
                  <h3 className="font-bold text-gray-900 mb-3">🏢 Services professionnels</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• <strong>Nettoyage de bureaux</strong> et locaux tertiaires</li>
                    <li>• <strong>Entretien de copropriétés</strong> (syndics)</li>
                    <li>• <strong>Nettoyage de commerces</strong> et boutiques</li>
                    <li>• <strong>Nettoyage de vitres</strong> professionnelles</li>
                    <li>• Agences immobilières & agro-alimentaire</li>
                  </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600">
                  <h3 className="font-bold text-gray-900 mb-3">🏗️ Services spécialisés</h3>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• <strong>Nettoyage fin de chantier</strong> BTP</li>
                    <li>• <strong>Remise en état des sols</strong> professionnelle</li>
                    <li>• Nettoyage après travaux & rénovation</li>
                    <li>• Prestations sur-mesure adaptées</li>
                    <li>• Intervention rapide sous 24h</li>
                  </ul>
                </div>
              </div>

              {/* Zone d'intervention */}
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <MapPin className="w-6 h-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Zone d'intervention</h3>
                    <p className="text-gray-700 mb-3">
                      <strong>Agence Nature Clean</strong> : <strong>24 avenue du Prado, Marseille</strong>
                    </p>
                    <p className="text-gray-700 mb-2">
                      📞 <strong>Ouvert 9h-18h</strong> du lundi au vendredi
                    </p>
                    <p className="text-gray-700 font-semibold text-green-700">
                      🚀 Intervention sur <strong>Marseille, Aubagne, Aix-en-Provence et Alpes-Maritimes</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à adopter un nettoyage écologique ?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Découvrez nos services de nettoyage respectueux de l'environnement
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-700 hover:bg-gray-100">
              <Link to="/services">Nos services</Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-green-700 hover:bg-gray-100">
              <Link to="/devis">Demander un devis</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Consultez également */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Consultez également :</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link to="/realisations">Réalisations</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link to="/services">Nettoyage de chantiers</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link to="/services/entretien-bureaux">Entretien de bureaux</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}