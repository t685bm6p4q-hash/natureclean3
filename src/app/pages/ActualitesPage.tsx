import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import { Calendar, Leaf, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { IMAGES } from '@/app/utils/images';

export function ActualitesPage() {
  return (
    <>
      <SEO_Guardian currentSection="actualites" disableReviews={true} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-20 md:py-28 overflow-hidden">
        <img
          src={IMAGES.carnetBlog}
          alt="Actualités blog nettoyage écologique Marseille - Conseils et news durables green business Nature Clean"
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
            <Link to="/" className="hover:underline">Accueil</Link> &gt; <span>Actualités</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">Actualités Nature Clean</h1>
          <p className="text-xl md:text-2xl drop-shadow-md">
            Conseils, astuces et actualités du nettoyage écologique
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Sparkles className="w-16 h-16 text-green-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bientôt disponible
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Notre section actualités est en cours de préparation. Nous partagerons bientôt avec vous des conseils 
              pratiques sur le nettoyage écologique, nos nouveautés et nos engagements environnementaux.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-gray-50 p-6 rounded-lg">
                <Leaf className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Nettoyage écologique</h3>
                <p className="text-sm text-gray-600">
                  Découvrez nos méthodes et produits respectueux de l'environnement
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <Calendar className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Conseils pratiques</h3>
                <p className="text-sm text-gray-600">
                  Astuces pour maintenir la propreté de vos espaces au quotidien
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg">
                <Sparkles className="w-10 h-10 text-green-600 mx-auto mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">Nouveautés</h3>
                <p className="text-sm text-gray-600">
                  Les dernières actualités de Nature Clean à Marseille
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              En attendant, découvrez nos services
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Nature Clean vous accompagne depuis plus de 10 ans pour tous vos besoins de nettoyage écologique 
              à Marseille et dans les Alpes-Maritimes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-700 hover:bg-green-800">
                <Link to="/services">Nos services</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                <Link to="/a-propos">À propos de nous</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Un projet de nettoyage ?
          </h2>
          <Button asChild size="lg" className="bg-white text-green-700 hover:bg-gray-100">
            <Link to="/devis">Demander un devis gratuit</Link>
          </Button>
        </div>
      </section>
    </>
  );
}