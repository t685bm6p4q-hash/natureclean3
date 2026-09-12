import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { Button } from '@/app/components/ui/button';
import { Phone, Calendar, Music, Users, ArrowRight, CheckCircle2, Sparkles, PartyPopper } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { IMAGES } from '@/app/utils/images';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';

const FAQ_ITEMS: FAQItem[] = [
  { question: 'Quels types d\'événements prenez-vous en charge ?', answer: 'Nous intervenons pour tous types d\'événements : mariages, séminaires d\'entreprise, salons professionnels, concerts, foires, soirées privées et inaugurations. Chaque événement bénéficie d\'un plan de nettoyage sur mesure.' },
  { question: 'Intervenez-vous pendant l\'événement ?', answer: 'Oui, nous pouvons assurer un entretien continu pendant la manifestation : vidage des poubelles, nettoyage des sanitaires, maintien de la propreté des espaces communs. Nos équipes sont discrètes et professionnelles.' },
  { question: 'Quel préavis est nécessaire pour réserver ?', answer: 'Nous recommandons de nous contacter 2 à 4 semaines avant l\'événement pour les grandes manifestations. Pour les événements plus modestes, un préavis d\'une semaine suffit généralement. En cas d\'urgence, appelez-nous au 04 84 89 68 75.' },
  { question: 'Fournissez-vous le matériel et les produits ?', answer: 'Oui, nous apportons l\'intégralité du matériel professionnel et des produits d\'entretien. 50% de nos produits sont éco-responsables. Vous n\'avez absolument rien à fournir.' },
  { question: 'Intervenez-vous aussi en dehors de Marseille pour les événements ?', answer: 'Oui, nous couvrons l\'ensemble de la région PACA : Aix-en-Provence, Aubagne, Toulon, et les Alpes-Maritimes (Nice, Cannes, Antibes). Les frais de déplacement sont inclus dans le devis.' },
];

export function NettoyageEvenementielPage() {
  return (
    <>
      <SEO_Guardian currentSection="nettoyage-evenementiel" faqItems={FAQ_ITEMS}  disableReviews={true} />

      <ServicePageHero
        title="Nettoyage événementiel à Marseille"
        subtitle="Egalement présent dans les Alpes-Maritimes"
        badge="Avant & après événement"
        badgeIcon={<Calendar className="w-4 h-4" />}
        imageSrc={IMAGES.salleEvenementielle}
        imageAlt="Nettoyage événementiel Marseille - Service professionnel pour événements et manifestations Nature Clean"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Nettoyage événementiel' },
        ]}
        devisLink="/devis?service=evenementiel"
      />

      {/* Intro — ambient background */}
      <section className="relative py-16 bg-white overflow-hidden">
        <ImageWithFallback
          src={IMAGES.salleEvenementielle}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] hidden md:block"
          loading="lazy" decoding="async" width={800} height={450}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">
            <ScrollReveal>
              <p className="text-lg">
                <strong>Nature Clean</strong> ne propose pas seulement l'entretien des bureaux et le nettoyage de copropriété 
                à Marseille, elle intervient également dans le <strong>nettoyage événementiel</strong>.
              </p>
              <p>
                Outre la prise de contact avec les collaborateurs et l'exécution d'un planning qui se joue parfois à la seconde, 
                il faut aussi penser au nettoyage lorsque l'on met en place un évènement. C'est ici qu'intervient Nature Clean 
                avec ses prestations de nettoyage événementiel.
              </p>
              <p>
                Nous intervenons en <strong>début d'évènement</strong> pour nous assurer que tout est rangé, propre et prêt pour 
                accueillir vos invités, mais aussi <strong>après l'évènement</strong> pour tout remettre en état.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services — cartes avec mini-hero images */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
                Entretien et remise en propreté avant & après votre événement
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                Particuliers et professionnels : un ménage clé en main et une hygiène irréprochable pour chaque occasion
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              {([
                { icon: PartyPopper, title: 'Chez le particulier', image: IMAGES.salleEvenementielle, items: [
                  { bold: 'Nettoyage en profondeur', text: 'avant la fête' },
                  { bold: 'Préparation', text: 'de l\'espace de réception' },
                  { bold: 'Nettoyage cuisine', text: 'pour le traiteur' },
                  { bold: 'Entretien sanitaires', text: 'et espaces communs' },
                  { bold: 'Remise en état', text: 'complète après l\'événement' },
                ]},
                { icon: Music, title: 'Salles de réception & concerts', image: IMAGES.salleConference, items: [
                  { bold: 'Préparation', text: 'de la salle avant l\'arrivée des invités' },
                  { bold: 'Intervention pendant', text: 'zones VIP, cuisines et sanitaires' },
                  { bold: 'Remise en état', text: 'complète après l\'événement' },
                  { bold: 'Parkings & extérieurs', text: 'tribunes et vitreries' },
                ]},
              ] as const).map((card, i) => (
                <ScrollReveal key={card.title} delay={i * 0.1}>
                  <div className="relative bg-white rounded-2xl shadow-md border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all h-full overflow-hidden">
                    <div className="relative h-36 overflow-hidden">
                      <ImageWithFallback
                        src={card.image}
                        alt="" aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy" decoding="async" width={400} height={144}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/60 via-gray-900/40 to-white" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 bg-white/90 rounded-xl flex items-center justify-center shadow-lg">
                          <card.icon className="w-7 h-7 text-green-600" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-black text-gray-900 mb-4 text-lg">{card.title}</h3>
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

            {/* Avant / Pendant / Après — timeline visuelle */}
            <ScrollReveal delay={0.15}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
                  <Music className="w-8 h-8 text-blue-600 mb-3" aria-hidden="true" />
                  <h3 className="font-black text-gray-900 mb-2">Avant l'événement</h3>
                  <p className="text-sm text-gray-700">
                    Techniques et produits adaptés pour que votre salle soit propre et au niveau de qualité que vous exigez 
                    avant l'arrivée des invités et de l'audience.
                  </p>
                </div>

                <div className="bg-green-50 p-6 rounded-2xl border border-green-200">
                  <Users className="w-8 h-8 text-green-600 mb-3" aria-hidden="true" />
                  <h3 className="font-black text-gray-900 mb-2">Pendant & après</h3>
                  <p className="text-sm text-gray-700">
                    Intervention pendant l'événement pour les zones VIP, cuisines et sanitaires. Remise en état complète après 
                    l'événement, incluant parkings, tribunes et vitreries.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ MID-PAGE CONVERSION BREAK ═══ */}
      <ConversionBreak
        image={IMAGES.salleConference}
        imageAlt="Salle de conférence préparée par Nature Clean"
        title="Votre événement mérite un cadre impeccable"
        subtitle="Anniversaire, mariage, congrès, concert — nous gérons le nettoyage, vous gérez vos invités"
        urgencyText="Devis express en 2h"
        devisLink="/devis?service=evenementiel"
      />

      {/* Galerie photos terrain */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-10">
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-bold mb-4">
                  <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                  Photos terrain
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                  Nature Clean en action
                </h2>
                <p className="text-gray-500">
                  Mise en place et nettoyage d'une salle de congres — Intervention reelle
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6">
              <ScrollReveal delay={0.08}>
                <div className="group relative rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src={IMAGES.clientEventWide}
                    alt="Salle de congres preparee par Nature Clean — vue d'ensemble des tables dressees pour un evenement professionnel a Marseille"
                    width={1200} height={900}
                    loading="lazy" decoding="async"
                    className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-xl font-bold mb-1">Salle de congres — Vue d'ensemble</h3>
                    <p className="text-sm opacity-90">Centaines de couverts dresses, salle nettoyee et preparee</p>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-500/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Photo client
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.16}>
                <div className="group relative rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src={IMAGES.clientEventAngle}
                    alt="Salle de congres preparee par Nature Clean — angle lateral montrant l'organisation des tables et la proprete de l'espace"
                    width={700} height={500}
                    loading="lazy" decoding="async"
                    className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <h3 className="text-xl font-bold mb-1">Congres — Angle lateral</h3>
                    <p className="text-sm opacity-90">Organisation impeccable, espace pret a accueillir les participants</p>
                  </div>
                  <div className="absolute top-3 left-3">
                    <span className="bg-green-500/90 text-white text-xs font-bold px-3 py-1 rounded-full">
                      Photo client
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Collaboration — ambient background */}
      <section className="relative py-16 bg-white overflow-hidden">
        <ImageWithFallback
          src={IMAGES.equipeCamionnette}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] hidden md:block"
          loading="lazy" decoding="async" width={800} height={450}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                <strong>Nature Clean</strong> collabore avec divers types de professionnels : propriétaires de salles de 
                réceptions, d'évènements ou de concerts. Ceci s'applique tant aux <strong>évènements indoor</strong> qu'à 
                ceux qui ont lieu <strong>en extérieur</strong>.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 font-bold shadow-md">
                  <Link to="/devis?service=evenementiel">
                    Devis gratuit sous 24h
                    <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
                  <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                    <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Final avec vraie photo */}
      <section className="relative py-16 md:py-20 bg-gray-900 overflow-hidden">
        <ImageWithFallback
          src={IMAGES.salleEvenementielle}
          alt="Salle événementielle Marseille entretenue par Nature Clean"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          loading="lazy" decoding="async" width={800} height={450}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-gray-900/40" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Événements réussis grâce à une propreté et une hygiène impeccables
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Intervention indoor et outdoor — Marseille & Alpes-Maritimes
            </p>
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black shadow-lg shadow-green-500/20">
              <Link to="/devis?service=evenementiel">
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
        title="Questions fréquentes — Événementiel"
        subtitle="Tout savoir sur notre service de nettoyage événementiel à Marseille"
      />

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Consultez également :</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-commerces">Nettoyage de commerces</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/remise-etat-sols">Remise en état des sols</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-chantiers">Nettoyage de chantiers</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}