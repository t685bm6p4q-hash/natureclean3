import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { PHONE_HREF } from '@/app/utils/constants';
import { Button } from '@/app/components/ui/button';
import { Phone, Layers, Grid3x3, Wind, ArrowRight, CheckCircle2, Leaf } from 'lucide-react';
import { Link } from 'react-router';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { IMAGES } from '@/app/utils/images';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';

const FAQ_ITEMS: FAQItem[] = [
  { question: 'Quels types de sols traitez-vous à Marseille ?', answer: 'Nous intervenons sur tous types de revêtements : marbre, granit, parquet bois massif, béton ciré, carrelage, linoléum, moquette et résine. Chaque matériau bénéficie d\'un protocole de traitement spécifique adapté à ses caractéristiques.' },
  { question: 'Combien de temps dure une remise en état de sol ?', answer: 'La durée dépend de la surface et de l\'état initial du revêtement. Pour un hall de 50 m² en marbre, comptez une journée complète. Un parquet de 30 m² nécessite généralement une demi-journée. Nous vous communiquons un planning précis dans le devis.' },
  { question: 'Le ponçage de marbre est-il bruyant ? Peut-on rester dans les locaux ?', answer: 'Le ponçage mécanique génère un niveau sonore modéré. Pour les copropriétés, nous planifions les interventions en journée aux horaires convenus avec le syndic. Pour les bureaux, nous pouvons intervenir le week-end ou en soirée.' },
  { question: 'Quelle est la durée de vie d\'une cristallisation de marbre ?', answer: 'Une cristallisation professionnelle dure entre 1 et 3 ans selon le trafic. Nous recommandons un entretien annuel pour les halls d\'immeubles et tous les 2-3 ans pour les particuliers. Un contrat d\'entretien régulier prolonge significativement la durée de vie du traitement.' },
  { question: 'Intervenez-vous en dehors de Marseille pour les sols ?', answer: 'Oui, nous intervenons sur l\'ensemble des Bouches-du-Rhône (Aix-en-Provence, Aubagne, Salon-de-Provence) ainsi que dans les environs de Cannes et Nice dans les Alpes-Maritimes.' },
];

export function RemiseEtatSolsPage() {
  return (
    <>
      <SEO_Guardian currentSection="remise-etat-sols" faqItems={FAQ_ITEMS} />

      <ServicePageHero
        title="Remise en état des sols à Marseille"
        subtitle="Intervient également dans les environs de Cannes"
        badge="Expertise sols"
        badgeIcon={<Layers className="w-4 h-4" />}
        imageSrc={IMAGES.decapageSolEco}
        imageAlt="Remise en état sols Marseille - Décapage et polissage professionnel des revêtements Nature Clean"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Remise en état des sols' },
        ]}
        devisLink="/devis?service=sols"
      />

      {/* Intro — ambient background */}
      <section className="relative py-16 bg-white overflow-hidden">
        <ImageWithFallback
          src={IMAGES.solMarbrePoli}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] hidden md:block"
          loading="lazy" decoding="async" width={800} height={450}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">
            <ScrollReveal>
              <p>
                Il existe de nombreuses raisons pour vouloir remettre en état un sol ou un revêtement de sol. L'usure du temps 
                ou celle de l'utilisation intensive sont des exemples flagrants, mais on peut aussi en avoir besoin après des 
                travaux par exemple ou encore afin de préparer un logement ou un bâtiment à la location et la vente.
              </p>
              <p>
                Les raisons sont multiples ; les moyens de le faire, moins. En effet, chaque matériau, chaque revêtement ou 
                traitement utilisé pour la finition du sol possède des caractéristiques et des méthodes propres qui leur sont 
                propres.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Découvrez nos prestations — ambient background */}
      <section className="relative py-16 bg-gray-50 overflow-hidden">
        <ImageWithFallback
          src={IMAGES.hallMarbreSale}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.03] hidden md:block"
          loading="lazy" decoding="async" width={800} height={450}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8 text-center">
                Découvrez nos prestations d'entretien de sols dans les Bouches-du-Rhône
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                Que ce soit pour une demande de ménage à domicile à Marseille ou pour des locaux professionnels, l'expertise 
                et la fiabilité des prestations de <strong>Nature Clean</strong> sont mises en avant avec les travaux de remises 
                en état de sols. Cette prestation est proposée à Marseille, mais aussi dans le département des Bouches-du-Rhône.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Elle permet à ceux qui ont besoin de remettre en état leurs sols, de profiter d'un service minutieux et réactif, 
                garantissant propreté et hygiène dans le respect de l'écoresponsabilité.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services — cartes avec mini-hero images */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
              Nos services de remise en état
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              Chaque matériau bénéficie d'un traitement spécifique adapté à ses caractéristiques
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {([
              { icon: Layers, title: 'Parquets', image: IMAGES.solsFinChantierBDR, items: [
                { bold: 'Ponçage', text: 'professionnel' },
                { bold: 'Finition', text: 'cirée, huilée ou vitrifiée' },
                { bold: 'Éclat retrouvé', text: 'pour votre parquet' },
              ], desc: 'Des parquets en bois massifs à ceux utilisant du bambou, nous appliquerons les méthodes de remise en état les mieux adaptées.' },
              { icon: Grid3x3, title: 'Carrelages & revêtements', image: IMAGES.finChantierCassis, items: [
                { bold: 'Céramique', text: 'et Linoléum' },
                { bold: 'Béton ciré', text: 'et résine' },
                { bold: 'Ponçage', text: 'et comblement' },
              ], desc: 'La remise en état des revêtements de sol à base de minéraux, granulats et matières synthétiques.' },
              { icon: Wind, title: 'Moquettes & tapis', image: IMAGES.monobrosseAction, items: [
                { bold: 'Aspiration', text: 'en profondeur' },
                { bold: 'Nettoyage vapeur', text: 'et shampouinage' },
                { bold: 'Séchage', text: 'contrôlé' },
              ], desc: 'Les textiles ont des besoins différents du bois, des minéraux et des granulats.' },
            ] as const).map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.1}>
                <div className="relative bg-white rounded-2xl shadow-md border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all h-full overflow-hidden">
                  <div className="relative h-32 overflow-hidden">
                    <ImageWithFallback
                      src={card.image}
                      alt="" aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy" decoding="async" width={400} height={180}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-gray-900/10 to-white/80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/90 rounded-xl flex items-center justify-center shadow-lg">
                        <card.icon className="w-6 h-6 text-green-600" aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-black text-gray-900 mb-2">{card.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{card.desc}</p>
                    <ul className="space-y-2">
                      {card.items.map((item) => (
                        <li key={item.bold} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                          <span><strong>{item.bold}</strong> {item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Contact inline — CTA au milieu pas en bas */}
          <ScrollReveal delay={0.15}>
            <div className="max-w-3xl mx-auto bg-green-50 p-8 rounded-2xl border border-green-200">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Besoin d'un devis ?</h3>
                  <p className="text-sm text-gray-600">Évaluation gratuite de vos sols sous 24h</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="bg-green-700 hover:bg-green-800 font-bold flex-1">
                    <Link to="/devis?service=sols">Devis gratuit</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold flex-1">
                    <a href={PHONE_HREF} aria-label="Appeler Nature Clean">
                      <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                      Appeler
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ MID-PAGE CONVERSION BREAK ═══ */}
      <ConversionBreak
        image={IMAGES.nettoyageMarseilleEco}
        imageAlt="Nettoyage éco-responsable Marseille Nature Clean"
        title="Redonnez vie à vos sols"
        subtitle="Marbre, parquet, carrelage, moquette — traitement adapté à chaque revêtement avec des produits éco-responsables"
        urgencyText="Évaluation gratuite sous 24h"
        devisLink="/devis?service=sols"
      />

      {/* Éco-responsabilité — ambient background */}
      <section className="relative py-16 bg-gray-50 overflow-hidden">
        <ImageWithFallback
          src={IMAGES.produitsEcoHero}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] hidden md:block"
          loading="lazy" decoding="async" width={800} height={450}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <Leaf className="w-3 h-3" aria-hidden="true" />
                Éco-responsable
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                Une méthode efficace, des produits respectueux de l'hygiène et de l'environnement
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Nature Clean est une société dont le savoir-faire repose sur le ménage et l'entretien écologique. C'est pourquoi nous mettons 
                en avant des méthodes, techniques et produits qui ont fait leurs preuves. Nos collaborateurs mettront à votre 
                service notre savoir-faire et notre expertise forgée au cours de ces 10 dernières années.
              </p>
              <p className="text-lg font-semibold text-green-700">
                Remettre la responsabilité du traitement de vos sols à Nature Clean, c'est d'une part s'assurer qu'ils ressortent 
                aussi neufs qu'au début, mais aussi que leur remise en état ait le moins d'impact négatif possible sur l'environnement.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ PHOTOS réalisations ═══ */}
      <section className="py-16 md:py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10 text-center">
                Nos réalisations sols
              </h2>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6">
              {([
                { src: IMAGES.decapageSolEco, alt: 'Decapage sol ecologique commerce Marseille Nature Clean', title: 'Monobrosse pro', sub: 'Décapage écologique' },
                { src: IMAGES.remiseEtatCuisine, alt: 'Cuisine avant remise en etat apres travaux Marseille Nature Clean', title: 'Avant intervention', sub: 'Cuisine après travaux' },
                { src: IMAGES.cuisineLivraisonValentine, alt: 'Cuisine apres nettoyage livraison Valentine Marseille Nature Clean', title: 'Après intervention', sub: 'Cuisine impeccable' },
              ] as const).map((photo, i) => (
                <ScrollReveal key={photo.title} delay={i * 0.08}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl group">
                    <ImageWithFallback
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-[280px] object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy" decoding="async" width={400} height={300}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 text-white">
                      <p className="font-bold text-sm">{photo.title}</p>
                      <p className="text-xs text-white/80">{photo.sub}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ CONTEXTUELLE ═══ */}
      <FAQSection
        items={FAQ_ITEMS}
        title="Questions fréquentes — Remise en état des sols"
        subtitle="Tout savoir sur nos prestations de ponçage, cristallisation et lustrage à Marseille"
      />

      {/* CTA Final avec vraie photo */}
      <section className="relative py-16 md:py-20 bg-gray-900 overflow-hidden">
        <ImageWithFallback
          src={IMAGES.solMarbrePoli}
          alt="Sol marbre poli par Nature Clean Marseille"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          loading="lazy" decoding="async" width={1920} height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-gray-900/80" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Des sols comme neufs avec un impact minimal sur l'environnement
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Intervention à Marseille, Bouches-du-Rhône et environs de Cannes
            </p>
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black shadow-lg shadow-green-500/20">
              <Link to="/devis?service=sols">
                Demander un devis gratuit
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Consultez également :</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-evenementiel">Nettoyage événementiel</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-commerces">Nettoyage de commerces</Link>
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