import { Link } from 'react-router';
import { Scale, Mail, MapPin, ChevronRight, Phone } from 'lucide-react';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import {
  COMPANY_FULL_NAME,
  EMAIL,
  EMAIL_HREF,
  PHONE_DISPLAY,
  PHONE_HREF,
  SIRET,
} from '@/app/utils/constants';

export function MentionsLegalesPage() {
  return (
    <>
      <SEO_Guardian currentSection="legal" />

      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-14 md:py-20">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-5 opacity-80 flex items-center gap-1.5">
            <Link to="/" className="hover:underline">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <span>Mentions légales</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Scale className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black">Mentions légales</h1>
          </div>
          <p className="text-white/80 text-base md:text-lg max-w-2xl">
            Informations légales du site natureclean.fr, conformément à la loi pour la confiance
            dans l&apos;économie numérique (LCEN).
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto space-y-10">
            <article>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Éditeur du site</h2>
              <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-700 space-y-1.5 border border-gray-100">
                <p><strong>{COMPANY_FULL_NAME}</strong></p>
                <p className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-600 flex-shrink-0" />
                  22 Traverse Pupat, 13008 Marseille
                </p>
                <p>SIRET : {SIRET}</p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <a href={EMAIL_HREF} className="text-green-700 hover:underline">{EMAIL}</a>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <a href={PHONE_HREF} className="text-green-700 hover:underline">{PHONE_DISPLAY}</a>
                </p>
                <p>Directeur de la publication : {COMPANY_FULL_NAME}</p>
              </div>
            </article>

            <article>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Hébergement</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Propriété intellectuelle</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                L&apos;ensemble des contenus de ce site (textes, visuels, logos, structure) est protégé.
                Toute reproduction non autorisée est interdite.
              </p>
            </article>

            <article>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Données personnelles</h2>
              <p className="text-sm text-gray-600 leading-relaxed">
                Le traitement des données est décrit dans notre{' '}
                <Link to="/politique-de-confidentialite" className="text-green-700 font-semibold hover:underline">
                  politique de confidentialité
                </Link>
                .
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
