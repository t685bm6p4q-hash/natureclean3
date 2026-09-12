import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import { AlertCircle, Home, Search } from 'lucide-react';
import { Link } from 'react-router';
import { PHONE_DISPLAY, PHONE_HREF } from '@/app/utils/constants';

export function NotFoundPage() {
  return (
    <>
      <SEO_Guardian currentSection="home" disableReviews={true} />
      
      {/* Hero Section 404 */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-20 md:py-28">
        <div className="container mx-auto px-4 text-center">
          <AlertCircle className="w-24 h-24 mx-auto mb-6 opacity-90" />
          <h1 className="text-6xl md:text-8xl font-bold mb-4">404</h1>
          <p className="text-2xl md:text-3xl mb-2">Page introuvable</p>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>
      </section>

      {/* Section Aide */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Que souhaitez-vous faire ?
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Retour accueil */}
              <Link 
                to="/"
                className="group bg-white border-2 border-gray-200 rounded-lg p-8 text-center hover:border-green-500 hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-700 transition-colors">
                  <Home className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700">
                  Retour à l'accueil
                </h3>
                <p className="text-sm text-gray-600">
                  Découvrir tous nos services de nettoyage à Marseille
                </p>
              </Link>

              {/* Nos services */}
              <Link 
                to="/services"
                className="group bg-white border-2 border-gray-200 rounded-lg p-8 text-center hover:border-green-500 hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-700 transition-colors">
                  <Search className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700">
                  Voir nos services
                </h3>
                <p className="text-sm text-gray-600">
                  Nettoyage bureaux, copropriétés, chantiers et plus
                </p>
              </Link>

              {/* Devis */}
              <Link 
                to="/devis"
                className="group bg-white border-2 border-gray-200 rounded-lg p-8 text-center hover:border-green-500 hover:shadow-xl transition-all"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-700 transition-colors">
                  <AlertCircle className="w-8 h-8 text-green-600 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700">
                  Demander un devis
                </h3>
                <p className="text-sm text-gray-600">
                  Obtenez un devis gratuit sous 24h
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Contact */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Besoin d'aide ?
          </h2>
          <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
            Notre équipe Nature Clean est à votre écoute pour tous vos besoins de nettoyage à Marseille
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-700 hover:bg-green-800">
              <Link to="/contact">Nous contacter</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}