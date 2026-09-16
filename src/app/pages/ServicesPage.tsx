import { Link } from 'react-router';
import { Services } from '@/app/components/Services';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';

export function ServicesPage() {
  return (
    <>
      <SEO_Guardian currentSection="services" />
      <div className="pt-8">
        <section className="container mx-auto px-4 max-w-3xl pb-6 text-center text-gray-600 leading-relaxed">
          <p>
            Nature Clean intervient à Marseille (13001-13016), Aix-en-Provence, Aubagne et La Ciotat.
            Chaque fiche service décrit notre protocole métier ; les pages locales détaillent quartiers,
            délais et cas terrain.{' '}
            <Link
              to="/zones-intervention"
              className="text-green-700 font-semibold underline underline-offset-2 hover:text-green-800"
            >
              Carte des zones
            </Link>
            {' · '}
            <Link
              to="/realisations"
              className="text-green-700 font-semibold underline underline-offset-2 hover:text-green-800"
            >
              Réalisations
            </Link>
          </p>
        </section>
        <Services />
      </div>
    </>
  );
}
