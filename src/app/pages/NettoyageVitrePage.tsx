import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Phone, Mail, Square, Sparkles, Shield, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { IMAGES, getOptimizedCldUrl, cldSrcSet } from '@/app/utils/images';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';

const FAQ_VITRE: FAQItem[] = [
  { question: 'Jusqu\'à quelle hauteur intervenez-vous pour le nettoyage de vitres ?', answer: 'Nous intervenons jusqu\'à 30 mètres de hauteur grâce à nos nacelles élévatrices et perches télescopiques. Pour les immeubles de grande hauteur, nous utilisons des techniques de cordiste certifiées.' },
  { question: 'À quelle fréquence faut-il nettoyer les vitres professionnelles ?', answer: 'Nous recommandons un nettoyage mensuel pour les commerces en centre-ville, bimensuel pour les bureaux et trimestriel pour les copropriétés. La fréquence idéale dépend de l\'exposition et de l\'environnement.' },
  { question: 'Nettoyez-vous aussi l\'intérieur des vitres ?', answer: 'Oui, nous assurons le nettoyage intérieur et extérieur des vitrages. Pour les bureaux, nous pouvons intervenir en horaires décalés pour ne pas perturber l\'activité.' },
  { question: 'Que comprend le nettoyage de façade vitrée ?', answer: 'Le nettoyage de façade vitrée inclut le lavage des vitrages, le nettoyage des cadres et joints, le traitement des traces tenaces et un rinçage à l\'eau pure pour un résultat sans traces.' },
  { question: 'Proposez-vous un contrat d\'entretien régulier pour les vitres ?', answer: 'Oui, nous proposons des contrats annuels avec une fréquence adaptée à vos besoins. Le contrat garantit un tarif préférentiel et une planification régulière sans avoir à nous recontacter à chaque fois.' },
];

export function NettoyageVitrePage() {
  return (
    <>
      <SEO_Guardian currentSection="nettoyage-vitre" faqItems={FAQ_VITRE}  disableReviews={true} />

      <ServicePageHero
        title="Nettoyage de vitres professionnel à Marseille"
        subtitle="Des vitres éclatantes pour une meilleure luminosité"
        badge="Haute visibilité"
        badgeIcon={<Square className="w-4 h-4" />}
        imageSrc={IMAGES.facadeVitreeImmeuble}
        imageAlt="Nettoyage vitres Marseille - Lavage professionnel gratte-ciel immeubles avec raclette et matériel spécialisé Nature Clean"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Nettoyage de vitre' },
        ]}
        devisLink="/devis?service=vitres"
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">
            <p>
              Pour un client, la <strong>vitre est l'un des aspects physiques</strong> de votre bâtiment qui lui saute 
              aux yeux au premier abord. Une vitre sale égale certainement un manque d'hygiène de la part des gérants.
            </p>
            <p>
              Pour vous éviter cette réputation, <strong>Nature Clean</strong> prépare, nettoie et vérifie la sûreté de 
              vos vitres, afin de maximiser l'apparence de votre espace. Faites-nous confiance et laissez entrer la lumière 
              grâce à des vitres que nous vous promettons éclatantes.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              Nos prestations d'entretien de vitrerie
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="hover:shadow-xl transition-shadow border-green-100">
                <CardContent className="p-6">
                  <Square className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Vitres intérieures</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Nettoyage complet de toutes vos vitres intérieures pour un intérieur lumineux et agréable.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Bureaux et locaux professionnels</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Domiciles particuliers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Copropriétés</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow border-green-100">
                <CardContent className="p-6">
                  <Sparkles className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Vitres extérieures</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Façades et vitrines impeccables pour une image professionnelle irréprochable.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Vitrines de commerces</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Façades de bâtiments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Baies vitrées</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-xl transition-shadow border-green-100">
                <CardContent className="p-6">
                  <Shield className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-3">Lavage en hauteur</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Équipement professionnel et personnel qualifié pour les vitres difficiles d'accès.
                  </p>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Normes de sécurité respectées</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Matériel adapté</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Personnel formé</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section images immersives */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
              Nos expertises en lavage et entretien de vitres à Marseille
            </h2>
            <p className="text-center text-gray-600 mb-12 text-lg">
              Propreté et hygiène garanties pour tous types de surfaces vitrées
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="group relative rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src={IMAGES.laveurNacelle}
                  alt="Nettoyage vitres en hauteur immeuble Marseille"
                  className="w-full h-[320px] object-cover group-hover:scale-105 transition-transform duration-300"
                  width={500}
                  height={320}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-xl font-bold mb-1">Nettoyage en hauteur</h3>
                  <p className="text-sm opacity-90">Immeubles & façades vitrées</p>
                </div>
              </div>

              <div className="group relative rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src={IMAGES.facadeVitreeImmeuble}
                  alt="Vitres modernes bâtiment professionnel Marseille"
                  className="w-full h-[320px] object-cover group-hover:scale-105 transition-transform duration-300"
                  width={500}
                  height={320}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-xl font-bold mb-1">Bâtiments modernes</h3>
                  <p className="text-sm opacity-90">Bureaux & locaux professionnels</p>
                </div>
              </div>

              <div className="group relative rounded-2xl overflow-hidden shadow-xl">
                <ImageWithFallback
                  src={getOptimizedCldUrl(IMAGES.lavageVitrine, 600)}
                  srcSet={cldSrcSet(IMAGES.lavageVitrine, [300, 500, 800])}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  alt="Nettoyage vitres professionnel a Marseille — vitrine commerce Nature Clean"
                  className="w-full h-[320px] object-cover group-hover:scale-105 transition-transform duration-300"
                  width={500}
                  height={320}
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="text-xl font-bold mb-1">Vitrines commerciales</h3>
                  <p className="text-sm opacity-90">Commerces & boutiques</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Notre méthode de lavage écologique
            </h2>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <div className="bg-green-50 p-6 rounded-lg">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Une approche en 3 étapes :</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">1. Préparation</h4>
                    <p className="text-sm">
                      Évaluation de l'état des vitres, protection des zones environnantes et préparation du matériel adapté.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">2. Entretien professionnel</h4>
                    <p className="text-sm">
                      Utilisation de produits écologiques pour une hygiène parfaite et un résultat sans traces.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-green-700 mb-2">3. Contrôle propreté</h4>
                    <p className="text-sm">
                      Vérification minutieuse de la propreté et de la sûreté des vitres, avec retouches si nécessaire.
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-center font-semibold text-green-700 text-lg">
                Des vitres éclatantes garanties, pour laisser entrer un maximum de lumière naturelle !
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Contact</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Phone className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Besoin de nous appeler ?</p>
                  <a href={PHONE_HREF} className="text-lg font-semibold text-green-700" aria-label={ARIA_PHONE}>{PHONE_DISPLAY}</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-green-600" />
                <div>
                  <p className="text-sm text-gray-600">Contactez-nous</p>
                  <Link to="/contact" className="text-lg font-semibold text-green-700">Formulaire</Link>
                </div>
              </div>
            </div>
            <Button asChild className="w-full mt-6 bg-green-700 hover:bg-green-800">
              <Link to="/devis?service=vitres">Demande de devis</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
            Propreté impeccable de vos vitres pour une image irreprochable
          </h2>
          <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black shadow-lg shadow-green-500/20">
            <Link to="/devis?service=vitres">
              Demander un devis gratuit
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ═══ FAQ CONTEXTUELLE ═══ */}
      <FAQSection
        items={FAQ_VITRE}
        title="Questions fréquentes — Nettoyage de vitres"
        subtitle="Tout savoir sur notre service de vitrerie à Marseille"
      />

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Consultez également :</h3>
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