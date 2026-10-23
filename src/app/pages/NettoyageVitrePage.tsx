import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Square, Sparkles, Shield, CheckCircle2, ArrowRight, Wind, MapPin } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { IMAGES, getOptimizedCldUrl, cldSrcSet } from '@/app/utils/images';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { FOUNDING_YEAR } from '@/app/utils/constants';
import { NATURE_CLEAN_PROVIDER } from '@/app/utils/cleaning-service-jsonld';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { GoogleReviews } from '@/app/components/GoogleReviews';

const FAQ_VITRE: FAQItem[] = [
  {
    question: 'Jusqu\'à quelle hauteur intervenez-vous pour le nettoyage de vitres ?',
    answer:
      'La base, c\'est la perche télescopique et l\'eau déminéralisée, pour les étages accessibles depuis le sol ou un balcon. Une nacelle, seulement si l\'accès et l\'autorisation de voirie le permettent. On ne promet pas le travail sur cordes.',
  },
  {
    question: 'À quelle fréquence faut-il nettoyer les vitres professionnelles ?',
    answer:
      'En rez-de-chaussée commerçant, le calcaire et les projections de rue appellent un passage plus souvent. Un bureau en étage tient plus longtemps. Une façade exposée au mistral et aux embruns, c\'est encore un autre rythme. On le fixe à la visite, pas sur une grille nationale.',
  },
  {
    question: 'Nettoyez-vous aussi l\'intérieur des vitres ?',
    answer:
      'Oui, intérieur et extérieur. En bureaux, horaires décalés si besoin. Films solaires et vitres teintées : geste adapté, pas le même produit qu\'une vitrine brute.',
  },
  {
    question: 'Que comprend le lavage d\'une façade vitrée ?',
    answer:
      'Vitrages accessibles, cadres, joints, traces tenaces. Eau déminéralisée et raclette. Si une nacelle occupe le trottoir, l\'autorisation de voirie se prévoit avant, pas le matin même.',
  },
  {
    question: 'Proposez-vous un contrat d\'entretien régulier pour les vitres ?',
    answer:
      'Oui. Fréquence écrite au devis, planning calé, pas besoin de rappeler à chaque fois. Réponse sous 2 h, devis sous 24 h.',
  },
  {
    question: 'Que se passe-t-il s\'il reste une trace à la fin ?',
    answer:
      'On retouche sur place si un défaut est constaté à la fin. Contrôle de propreté, pas de diagnostic de solidité du vitrage.',
  },
];

export function NettoyageVitrePage() {
  return (
    <>
      <SEO_Guardian currentSection="nettoyage-vitre" faqItems={FAQ_VITRE} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Nettoyage de vitres professionnel à Marseille',
            description:
              'Nettoyage de vitres à Marseille depuis 2021 : vitrines, bureaux, façades vitrées. Perche, eau déminéralisée, RC Pro. Réponse sous 2 h, devis sous 24 h.',
            provider: NATURE_CLEAN_PROVIDER,
            areaServed: { '@type': 'City', name: 'Marseille' },
            serviceType: 'Nettoyage de vitres',
            url: 'https://natureclean.fr/services/nettoyage-vitre',
          }),
        }}
      />

      <ServicePageHero
        title="Nettoyage de vitres professionnel à Marseille"
        subtitle="Vitrines, bureaux, façades — perche, eau déminéralisée, depuis 2021"
        badge="Lavage de vitres"
        badgeIcon={<Square className="w-4 h-4" />}
        imageSrc={IMAGES.facadeVitreeImmeuble}
        imageAlt="Vue sur les toits de Marseille depuis une baie vitrée"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Nettoyage de vitres' },
        ]}
        devisLink="/devis?service=vitres"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">
            <p className="text-lg">
              La vitrine est la première chose que voit un client. Nature Clean lave les vitres à
              Marseille depuis {FOUNDING_YEAR} : commerces, bureaux, copropriétés. Zone : Marseille
              et Bouches-du-Rhône.
            </p>
            <p>
              Cette page est celle du <strong>nettoyage de vitres</strong>. Les fiches bureaux et
              commerces en parlent en passant ; le détail (hauteur, voirie, calcaire) est ici.
            </p>
            <p className="font-semibold text-green-700">
              Réponse sous 2 h, devis sous 24 h — 50 % de produits éco-labellisés
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Intérieur, extérieur, hauteur accessible
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-xl transition-shadow border-green-100">
                <CardContent className="p-6">
                  <Square className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Vitres intérieures</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Bureaux, salles de réunion, halls. Horaires décalés si vos équipes sont sur place.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Bureaux et locaux professionnels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Copropriétés (parties communes)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Double vitrage, films, teintes : geste adapté</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow border-green-100">
                <CardContent className="p-6">
                  <Sparkles className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Vitres extérieures</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Vitrines et façades. Eau déminéralisée contre le calcaire marseillais.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Vitrines de commerces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Baies vitrées, verrières, vérandas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Cadres et joints</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow border-green-100">
                <CardContent className="p-6">
                  <Shield className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Hauteur accessible</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Perche depuis le sol ou un balcon. Nacelle seulement si l&apos;accès et la voirie
                    le permettent.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Perche télescopique, formation et EPI</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Autorisation de voirie si nacelle sur trottoir</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Pas de travail sur cordes</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Technique et contraintes à Marseille
            </h2>
            <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
              Calcaire, embruns, mistral, voirie : le métier à Marseille.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">Comment on lave</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Eau déminéralisée sur perche pour limiter les traces de calcaire. Raclette à
                  l&apos;intérieur et sur les vitrines accessibles. 50 % de produits éco-labellisés
                  lorsque le support le permet.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <Wind className="w-6 h-6 text-green-600 mb-2" aria-hidden="true" />
                <h3 className="font-bold text-gray-900 mb-3">Mistral et embruns</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Le vent sèche trop vite et laisse des traces. Un jour de mistral, on décale plutôt
                  que de livrer un résultat médiocre. Les embruns salent les façades côté mer.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <MapPin className="w-6 h-6 text-green-600 mb-2" aria-hidden="true" />
                <h3 className="font-bold text-gray-900 mb-3">Voirie et accès</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Nacelle sur le trottoir ou la chaussée : autorisation de voirie à demander avant.
                  Interphone, gardien, badge, balcon, toiture : on les note à la visite.
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-3">Fréquence type</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Commerce en rez-de-chaussée : plus souvent. Bureau en étage : moins. Façade
                  exposée : à caler. Rien n&apos;est contractuel tant que ce n&apos;est pas au devis.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Façades, bureaux, vitrines
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Photos de bâtiments et de vitrines. Un vrai avant/après dès qu&apos;on en a un net.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src={IMAGES.facadeVitreeImmeuble}
                  alt="Immeuble à bandeaux vitrés, Marseille"
                  className="w-full h-[320px] object-cover"
                  width={500}
                  height={320}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-0 inset-x-0 p-5 text-white bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-bold mb-1">Façades vitrées</h3>
                  <p className="text-sm opacity-90">Étages accessibles à la perche</p>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src={getOptimizedCldUrl(IMAGES.lavageVitrine, 600)}
                  srcSet={cldSrcSet(IMAGES.lavageVitrine, [300, 500, 800])}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  alt="Vitrine de commerce lavée à l'eau déminéralisée"
                  className="w-full h-[320px] object-cover"
                  width={500}
                  height={320}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-0 inset-x-0 p-5 text-white bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-bold mb-1">Vitrines</h3>
                  <p className="text-sm opacity-90">Commerces en rez-de-chaussée</p>
                </div>
              </div>

              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src={IMAGES.nettoyageVitresPro}
                  alt="Lavage de vitrages professionnels à Marseille"
                  className="w-full h-[320px] object-cover"
                  width={500}
                  height={320}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute bottom-0 inset-x-0 p-5 text-white bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-xl font-bold mb-1">Bureaux</h3>
                  <p className="text-sm opacity-90">Intérieur / extérieur</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConversionBreak
        image={IMAGES.facadeVitreeImmeuble}
        imageAlt="Vue sur les toits de Marseille depuis une baie vitrée"
        title="Un passage calé sur vos horaires et la voirie"
        subtitle="Réponse sous 2 h, devis sous 24 h — retouches si un défaut est constaté à la fin"
        devisLink="/devis?service=vitres"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Méthode en 3 étapes
            </h2>

            <div className="bg-green-50 p-6 rounded-lg space-y-4">
              <div>
                <h3 className="font-semibold text-green-700 mb-2">1. Accès et préparation</h3>
                <p className="text-sm text-gray-700">
                  Interphone, gardien, badge, balcon. Protection des abords. Voirie si une nacelle
                  est prévue.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-green-700 mb-2">2. Lavage</h3>
                <p className="text-sm text-gray-700">
                  Perche et eau déminéralisée, raclette. 50 % de produits éco-labellisés lorsque c&apos;est
                  possible.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-green-700 mb-2">3. Contrôle de propreté</h3>
                <p className="text-sm text-gray-700">
                  On vérifie la propreté, pas la solidité du vitrage. Retouches incluses si un
                  défaut est constaté à la fin.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <GoogleReviews />

      <FAQSection
        items={FAQ_VITRE}
        title="Questions fréquentes — Nettoyage de vitres"
        subtitle="Hauteur, fréquence, voirie, retouches"
      />

      <section className="py-16 bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Nettoyage de vitres à Marseille
          </h2>
          <p className="text-gray-300 mb-8">
            Marseille et Bouches-du-Rhône — réponse sous 2 h, devis sous 24 h
          </p>
          <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black">
            <Link to="/devis?service=vitres">
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Consultez également :</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link to="/services/entretien-bureaux">Entretien de bureaux</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link to="/services/nettoyage-commerces">Nettoyage de commerces</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link to="/services/nettoyage-coproprietes">Nettoyage de copropriétés</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
