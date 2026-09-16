import { Link } from 'react-router';
import { Shield, Mail, MapPin, ChevronRight } from 'lucide-react';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from '@/app/utils/constants';

export function PolitiqueConfidentialitePage() {
  return (
    <>
      <SEO_Guardian currentSection="privacy" />
      {/* Hero */}
      <section className="bg-gradient-to-r from-green-700 to-green-600 text-white py-14 md:py-20">
        <div className="container mx-auto px-4">
          <nav className="text-sm mb-5 opacity-80 flex items-center gap-1.5">
            <Link to="/" className="hover:underline">Accueil</Link>
            <ChevronRight className="w-3 h-3" />
            <span>Politique de confidentialité</span>
          </nav>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl md:text-5xl font-black">
              Politique de confidentialité
            </h1>
          </div>
          <p className="text-white/80 text-base md:text-lg max-w-2xl">
            Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679)
            et à la loi Informatique et Libertés.
          </p>
          <p className="text-white/60 text-sm mt-3">Dernière mise à jour : 29 avril 2026</p>
        </div>
      </section>

      {/* Contenu */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-gray">

            {/* 1. Responsable du traitement */}
            <article className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-sm font-black">1</span>
                Responsable du traitement
              </h2>
              <div className="bg-gray-50 rounded-xl p-5 text-sm text-gray-700 space-y-1.5 border border-gray-100">
                <p><strong>Nature Clean Marseille</strong></p>
                <p className="flex items-center gap-2"><MapPin className="w-4 h-4 text-green-600 flex-shrink-0" /> 22 Traverse Pupat, 13008 Marseille</p>
                <p className="flex items-center gap-2"><Mail className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <a href={EMAIL_HREF} className="text-green-700 hover:underline">{EMAIL}</a>
                </p>
                <p>SIRET : 89020726900022</p>
              </div>
            </article>

            {/* 2. Données collectées */}
            <article className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-sm font-black">2</span>
                Données personnelles collectées
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                Nous collectons uniquement les données strictement nécessaires à la réalisation de nos prestations :
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-green-50">
                      <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Données</th>
                      <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Finalité</th>
                      <th className="text-left p-3 font-semibold text-gray-700 border border-gray-200">Base légale</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-600">
                    {[
                      ['Nom, prénom ou raison sociale', 'Identification du demandeur, établissement du devis', 'Consentement / Exécution du contrat'],
                      ['Adresse email', 'Envoi du devis, réponse à vos demandes', 'Consentement / Intérêt légitime'],
                      ['Numéro de téléphone', 'Contact pour affiner votre demande', 'Consentement'],
                      ['Adresse d\'intervention', 'Planification et chiffrage de la prestation', 'Exécution du contrat'],
                      ['Description du besoin', 'Élaboration d\'une offre personnalisée', 'Consentement'],
                      ['Données de navigation (cookies)', 'Analyse d\'audience anonymisée (Google Analytics)', 'Consentement'],
                    ].map(([data, purpose, base], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="p-3 border border-gray-200 font-medium text-gray-700">{data}</td>
                        <td className="p-3 border border-gray-200">{purpose}</td>
                        <td className="p-3 border border-gray-200 text-green-700">{base}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>

            {/* 3. Durée de conservation */}
            <article className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-sm font-black">3</span>
                Durée de conservation
              </h2>
              <ul className="text-sm text-gray-600 space-y-2 list-none">
                {[
                  ['Données de contact et devis', '3 ans à compter du dernier contact'],
                  ['Données clients (prestations réalisées)', '5 ans (obligations comptables et légales)'],
                  ['Cookies analytiques', '13 mois maximum (recommandation CNIL)'],
                  ['Consentement au traitement', '3 ans'],
                ].map(([item, duration]) => (
                  <li key={item} className="flex items-start gap-2 bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0 mt-1.5" />
                    <span><strong className="text-gray-700">{item}</strong> — {duration}</span>
                  </li>
                ))}
              </ul>
            </article>

            {/* 4. Destinataires */}
            <article className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-sm font-black">4</span>
                Destinataires des données
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                Vos données sont traitées uniquement par Nature Clean Marseille. Elles peuvent être transmises aux sous-traitants techniques suivants, dans le strict cadre de nos services :
              </p>
              <ul className="text-sm text-gray-600 space-y-2">
                {[
                  ['Make.com (Integromat)', 'Automatisation des demandes de devis', 'Union Européenne'],
                  ['Google Analytics', 'Mesure d\'audience anonymisée', 'USA (Privacy Shield / SCC)'],
                  ['Cloudinary', 'Hébergement des images du site', 'USA (SCC)'],
                ].map(([tool, role, location]) => (
                  <li key={tool} className="flex items-start gap-2 bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <span className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                    <span><strong className="text-gray-700">{tool}</strong> — {role} ({location})</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-gray-500 mt-3 italic">
                Vos données ne sont jamais vendues ni cédées à des tiers à des fins commerciales.
              </p>
            </article>

            {/* 5. Cookies */}
            <article className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-sm font-black">5</span>
                Politique cookies
              </h2>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                  <p className="font-semibold text-green-800 mb-1">🍃 Cookies strictement nécessaires</p>
                  <p>Indispensables au fonctionnement du site (navigation, formulaires, sécurité). Aucun consentement requis.</p>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <p className="font-semibold text-amber-800 mb-1">📊 Cookies analytiques (Google Analytics)</p>
                  <p>Nous permettent de comprendre comment vous naviguez sur notre site. Ces cookies sont anonymisés et activés uniquement avec votre accord. Durée : 13 mois.</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-3">
                Vous pouvez modifier vos préférences à tout moment via le bandeau de consentement en bas de page.
              </p>
            </article>

            {/* 6. Droits */}
            <article className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-sm font-black">6</span>
                Vos droits (RGPD)
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                Conformément au RGPD (articles 15 à 22), vous disposez des droits suivants sur vos données personnelles :
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                {[
                  ['Droit d\'accès', 'Obtenir une copie de vos données'],
                  ['Droit de rectification', 'Corriger des données inexactes'],
                  ['Droit à l\'effacement', '« Droit à l\'oubli »'],
                  ['Droit d\'opposition', 'S\'opposer à un traitement'],
                  ['Droit à la portabilité', 'Récupérer vos données'],
                  ['Droit de limitation', 'Limiter un traitement en cours'],
                ].map(([right, desc]) => (
                  <div key={right} className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                    <p className="font-semibold text-gray-800">{right}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-green-50 border border-green-100 rounded-xl p-4 text-sm text-gray-600">
                <p className="font-semibold text-green-800 mb-1">Exercer vos droits</p>
                <p>
                  Envoyez votre demande par email à{' '}
                  <a href={EMAIL_HREF} className="text-green-700 font-semibold hover:underline">{EMAIL}</a>
                  {' '}ou par téléphone au{' '}
                  <a href={PHONE_HREF} className="text-green-700 font-semibold hover:underline">{PHONE_DISPLAY}</a>.
                  Réponse dans un délai d'un mois.
                </p>
                <p className="mt-2 text-gray-500">
                  Vous pouvez également adresser une réclamation à la{' '}
                  <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-green-700 hover:underline">
                    CNIL (www.cnil.fr)
                  </a>.
                </p>
              </div>
            </article>

            {/* 7. Sécurité */}
            <article className="mb-10">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-sm font-black">7</span>
                Sécurité des données
              </h2>
              <p className="text-sm text-gray-600">
                Nature Clean Marseille met en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données contre tout accès non autorisé, perte ou divulgation : chiffrement HTTPS, accès restreint aux données, contrôle des sous-traitants.
              </p>
            </article>

            {/* 8. Contact DPO */}
            <article className="mb-4">
              <h2 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                <span className="w-7 h-7 bg-green-100 rounded-full flex items-center justify-center text-green-700 text-sm font-black">8</span>
                Contact & modifications
              </h2>
              <p className="text-sm text-gray-600">
                Pour toute question relative à la présente politique, contactez-nous à{' '}
                <a href={EMAIL_HREF} className="text-green-700 hover:underline font-semibold">{EMAIL}</a>.
                Nous nous réservons le droit de mettre à jour cette politique ; la date de dernière modification est indiquée en haut de page.
              </p>
            </article>

          </div>
        </div>
      </section>
    </>
  );
}
