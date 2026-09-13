import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import { Store, TrendingUp, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { IMAGES } from '@/app/utils/images';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';

const FAQ_ITEMS: FAQItem[] = [
  { question: 'Pouvez-vous nettoyer avant l\'ouverture du commerce ?', answer: 'Oui, et c\'est notre créneau de prédilection. On intervient dès 5h30 — ça dépend de votre quartier à Marseille et du type de commerce. Les sols sont lavés à l\'autolaveuse Kärcher, les vitrines dégraissées, les sanitaires désinfectés. Quand vos équipes arrivent à 9h, tout est déjà sec et impeccable.' },
  { question: 'Le nettoyage des vitrines est-il inclus dans le contrat ?', answer: 'Le lavage des vitrines peut être intégré au contrat récurrent ou réalisé en prestation ponctuelle. Sur les commerces du centre-ville de Marseille, entre le calcaire de l\'eau et les projections de rue, on recommande un lavage hebdomadaire à l\'eau déminéralisée. C\'est le seul moyen d\'éviter les traces persistantes.' },
  { question: 'Nettoyez-vous aussi les restaurants et espaces alimentaires ?', answer: 'Oui. Pour les espaces de restauration, on applique des protocoles conformes au règlement CE 852/2004 (HACCP). Les dégraissants qu\'on utilise — notamment la gamme Suma Nova L6 de Diversey — sont homologués pour les surfaces en contact alimentaire. La cuisine doit être aussi propre que votre salle, c\'est non-négociable.' },
  { question: 'Quel est le tarif pour l\'entretien d\'un commerce de 100 m² ?', answer: 'Le tarif dépend de la fréquence d\'intervention, du type de commerce et des prestations souhaitées. Pour une boutique de 100 m², comptez une prestation quotidienne avant ouverture ou une intervention hebdomadaire approfondie — on établit le devis en 24h après votre contact.' },
  { question: 'Intervenez-vous aussi pour les rideaux métalliques et façades ?', answer: 'Oui. Les rideaux métalliques encrassés et les façades taguées ou simplement grises sont traités avec notre matériel haute pression Kärcher HD. La façade propre, c\'est la première impression que vous donnez à un client qui passe sur votre rue — dans un marché concurrentiel, c\'est un investissement.' },
];

export function NettoyageCommercesPage() {
  return (
    <>
      <SEO_Guardian currentSection="nettoyage-commerces" faqItems={FAQ_ITEMS} />

      <ServicePageHero
        title="Nettoyage de commerces et magasins à Marseille"
        subtitle="Egalement présent dans les Alpes-Maritimes"
        badge="Image de marque"
        badgeIcon={<Store className="w-4 h-4" />}
        imageSrc={IMAGES.jdSportMarseilleFloor}
        imageAlt="Nettoyage commerces et magasins Marseille - JD Sport Marseille entretenu par Nature Clean"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Nettoyage de commerces' },
        ]}
        devisLink="/devis?service=commerces"
      />

      {/* Intro — ambient background */}
      <section className="relative py-16 bg-white overflow-hidden">
        <ImageWithFallback
          src={IMAGES.boutiqueVide}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] hidden md:block"
          loading="lazy" decoding="async" width={800} height={450}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">
            <p>
              Un magasin propre ne se contente pas de rassurer — il vend. Sur le terrain, on le voit à chaque fois : un sol brillant, des rayonnages époussetés et des vitrines sans traces font partie de l'expérience d'achat au même titre que votre marchandise.
            </p>
            <p>
              Depuis 15 ans, on entretient des commerces de toutes tailles à <strong>Marseille</strong> et dans les <strong>Alpes-Maritimes</strong>. On intervient tôt le matin avant ouverture avec des autolaveuses <strong>Kärcher BR 45/22 C</strong> sur les sols durs, et des produits <strong>Suma Nova L6</strong> (Diversey, homologués contact alimentaire) pour les espaces de restauration conformes au règlement <strong>CE 852/2004 HACCP</strong>.
            </p>
            <p className="text-xl font-semibold text-green-700 text-center py-4">
              Votre commerce mérite d'être aussi soigné que vos produits. On s'en occupe.
            </p>
          </div>
        </div>
      </section>

      {/* Atout vente — cartes avec mini-hero images */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
                L'hygiène : un atout vente pour votre commerce
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                Un ménage régulier et un entretien soigné inspirent confiance et fidélisent votre clientèle
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6 mb-10">
              {([
                { icon: Store, title: 'Image de marque', image: IMAGES.vitrineBoutiqueLuxe, desc: 'Ce qu\'on voit souvent : un client qui hésite à entrer dans un commerce mal éclairé avec une vitrine grasse ne donnera jamais une seconde chance. La propreté de façade, c\'est votre première prise de parole.' },
                { icon: TrendingUp, title: 'Expérience client', image: IMAGES.boutiqueVide, desc: 'Un sol propre, des rayons bien tenus et des sanitaires corrects — des études Nielsen (2022) montrent qu\'un environnement soigné augmente le temps de séjour en magasin de 18% en moyenne.' },
                { icon: Users, title: 'Avantage concurrentiel', image: IMAGES.lavageVitrine, desc: 'Dans une galerie commerciale ou une rue commerçante à fort trafic, la propreté de votre devanture se compare en permanence à celle du voisin. C\'est un levier sous-estimé.' },
              ] as const).map((card, i) => (
                <ScrollReveal key={card.title} delay={i * 0.08}>
                  <div className="relative bg-white rounded-2xl shadow-md border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all h-full overflow-hidden">
                    <div className="relative h-32 overflow-hidden">
                      <ImageWithFallback
                        src={card.image}
                        alt="" aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy" decoding="async" width={400} height={180}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/30 to-white" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 rounded-xl flex items-center justify-center shadow-lg">
                          <card.icon className="w-6 h-6 text-green-600" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-black text-gray-900 mb-2">{card.title}</h3>
                      <p className="text-sm text-gray-700 leading-relaxed">{card.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ MID-PAGE CONVERSION BREAK ═══ */}
      <ConversionBreak
        image={IMAGES.whatsappCommerce}
        imageAlt="Commerce professionnel nettoyé par Nature Clean Marseille"
        title="Boostez votre chiffre d'affaires par la propreté"
        subtitle="Un commerce propre = +23% de confiance client. Intervention tôt le matin ou tard le soir, zéro perturbation."
        urgencyText="Devis en 2h"
        devisLink="/devis?service=commerces"
        objectPosition="object-center"
      />

      {/* Section images commerces */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
                Entretien professionnel pour tous types de commerces
              </h2>
              <p className="text-center text-gray-500 mb-12 text-lg">
                Boutiques, restaurants, centres commerciaux : ménage et propreté sur mesure
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-6">
              <ScrollReveal delay={0.08}>
                <div className="group relative rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src={IMAGES.entretienMagasin}
                    alt="Nettoyage boutique magasin retail Marseille"
                    className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy" decoding="async" width={400} height={350}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-xl font-bold mb-1">Boutiques & Magasins</h3>
                    <p className="text-sm opacity-90">Retail, prêt-à-porter, électronique</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.16}>
                <div className="group relative rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src={IMAGES.nettoyageVitresPro}
                    alt="Nettoyage restaurant café bar Marseille"
                    className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy" decoding="async" width={400} height={350}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-xl font-bold mb-1">Restaurants & Cafés</h3>
                    <p className="text-sm opacity-90">Cuisine, salle, terrasse</p>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.24}>
                <div className="group relative rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src={IMAGES.lavageVitrine}
                    alt="Nettoyage centre commercial galerie Marseille"
                    className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy" decoding="async" width={400} height={350}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-xl font-bold mb-1">Centres Commerciaux</h3>
                    <p className="text-sm opacity-90">Galeries, espaces communs</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Service adapté — ambient background */}
      <section className="relative py-16 bg-white overflow-hidden">
        <ImageWithFallback
          src={IMAGES.lavageVitrine}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] hidden md:block"
          loading="lazy" decoding="async" width={800} height={450}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">
                Un ménage adapté aux exigences des professionnels
              </h2>
            </ScrollReveal>

            <div className="space-y-6 text-gray-700 leading-relaxed">
              <p>
                Que vous exerciez votre métier dans une petite boutique ou dans un grand espace commercial, avec 
                <strong> Nature Clean</strong>, vous trouverez toujours des prestations adaptées à la nature de votre 
                activité. Et, si jamais ce n'est pas le cas, pas de panique. Notre équipe est en mesure de s'adapter à 
                vos besoins.
              </p>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Notre flexibilité d'horaires</h3>
                <p className="mb-4">
                  On comprend qu'un commerce ne s'arrête pas d'être vivant pour laisser place à nos équipes. C'est pour ça qu'on intervient avant l'ouverture, après la fermeture, ou la nuit si besoin. À Marseille, on a des clients dans le <strong>Vieux-Port</strong>, sur la <strong>Canebière</strong> et dans les zones commerciales de <strong>La Valentine</strong> et <strong>Plan-de-Campagne</strong> — chaque site a ses contraintes horaires, et on s'y adapte.
                </p>
                <p className="font-semibold text-green-700">
                  Lève-tôt ou couche-tard : on est là quand votre commerce ne l'est pas.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  'Entretien courant avant ouverture',
                  'Ménage des espaces administratifs',
                  'Lavage des vitrines et façades',
                  'Hygiène des sols et sanitaires',
                  'Plan de propreté personnalisé',
                  'Produits 50% écologiques Bio',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final avec vraie photo */}
      <section className="relative py-16 md:py-20 bg-gray-900 overflow-hidden">
        <ImageWithFallback
          src={IMAGES.boutiqueVide}
          alt="Commerce propre entretenu par Nature Clean Marseille"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          loading="lazy" decoding="async" width={1920} height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-gray-900/80" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Votre commerce mérite une hygiène et une propreté irréprochables
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Intervention à Marseille et dans les Alpes-Maritimes — Horaires flexibles 7j/7
            </p>
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black shadow-lg shadow-green-500/20">
              <Link to="/devis?service=commerces">
                Demander un devis gratuit
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ FAQ CONTEXTUELLE ═══ */}
      <FAQSection
        items={FAQ_ITEMS}
        title="Questions fréquentes — Nettoyage de commerces"
        subtitle="Tout savoir sur l'entretien de votre commerce à Marseille"
      />

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Consultez également :</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/remise-etat-sols">Remise en état des sols</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-evenementiel">Nettoyage événementiel</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-coproprietes">Nettoyage de copropriétés</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}