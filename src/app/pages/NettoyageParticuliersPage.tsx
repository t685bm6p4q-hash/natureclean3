import { IMAGES } from '@/app/utils/images';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Phone, Sparkles, Star, Heart, ArrowRight, Construction, Trash2, ShieldCheck, Clock, FileText } from 'lucide-react';
import { Link } from 'react-router';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

const FAQ_PARTICULIERS: FAQItem[] = [
  {
    question: 'Quels services proposez-vous pour les particuliers ?',
    answer: 'Nous nous spécialisons dans les interventions techniques et complexes où le ménage classique ne suffit plus : nettoyage après syndrome de Diogène, remise en état après travaux (gros chantiers), nettoyage de printemps extrême et gestion de rotation Airbnb haut de gamme. Nos équipes utilisent du matériel industriel (monobrosses, aspirateurs HEPA) pour garantir une désinfection et une propreté impossibles à obtenir avec des méthodes standards.'
  },
  {
    question: 'Les produits de nettoyage sont-ils fournis ?',
    answer: 'Oui, Nature Clean fournit l\'intégralité du matériel et des produits nécessaires à l\'intervention. Fidèles à notre engagement éco-responsable, nous utilisons 50% de produits certifiés écologiques et biodégradables, garantissant un environnement sain pour votre foyer tout en offrant une efficacité professionnelle contre les graisses, les poussières de chantier et les bactéries.'
  },
  {
    question: 'Quel est le tarif pour un gros nettoyage à Marseille ?',
    answer: 'Le tarif dépend de la surface (m²), du niveau d\'encombrement et du type d\'intervention (fin de chantier, insalubrité, etc.). À Marseille et en région PACA, nous proposons un diagnostic gratuit sous 24h. Nos prix sont transparents et incluent le déplacement, la main-d\'œuvre et les produits. Pour une remise en état après travaux, nous proposons généralement des forfaits adaptés à la configuration de votre logement.'
  },
  {
    question: 'Garantissez-vous la discrétion pour un nettoyage Diogène ?',
    answer: 'La discrétion et la bienveillance sont les piliers de nos interventions Diogène. Nous intervenons avec tact, sans jugement, et utilisons des véhicules banalisés si nécessaire pour protéger la vie privée des résidents. Notre objectif est de restaurer la salubrité et la dignité de l\'habitat tout en respectant l\'aspect humain et émotionnel lié au désencombrement.'
  },
];

const mainServices = [
  {
    icon: Trash2,
    title: 'Syndrome de Diogène',
    description: 'Une intervention humaine, discrète et totale pour redonner vie à un logement insalubre ou encombré.',
    link: '/services/nettoyage-diogene',
    color: 'bg-purple-50 text-purple-600',
    hoverBorder: 'hover:border-purple-500'
  },
  {
    icon: Construction,
    title: 'Gros Chantiers',
    description: 'Le nettoyage après travaux de rénovation, fin de bail ou remise en état extrême par des experts.',
    link: '/services/nettoyage-gros-chantiers',
    color: 'bg-orange-50 text-orange-600',
    hoverBorder: 'hover:border-orange-500'
  },
  {
    icon: Star,
    title: 'Airbnb & Saisonnier',
    description: 'Gestion de la propreté entre deux voyageurs pour garantir vos notes 5 étoiles et votre sérénité.',
    link: '#airbnb',
    color: 'bg-blue-50 text-blue-600',
    hoverBorder: 'hover:border-blue-500'
  }
];

export function NettoyageParticuliersPage() {
  return (
    <>
      <SEO_Guardian currentSection="nettoyage-particuliers" faqItems={FAQ_PARTICULIERS} disableReviews={true} />

      <ServicePageHero
        title="Nettoyage Particuliers Marseille"
        subtitle="Spécialiste de la remise en état extrême et des interventions complexes"
        badge="Expertise & Discrétion"
        badgeIcon={<ShieldCheck className="w-4 h-4" />}
        imageSrc={IMAGES.remiseEtatCuisine}
        imageAlt="Nettoyage particuliers Marseille - Remise en état après travaux cuisine Nature Clean"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Nettoyage pour particuliers' },
        ]}
        devisLink="/devis?service=particuliers"
      />

      {/* Intro Section */}
      <section className="relative py-20 bg-white overflow-hidden">
        <ImageWithFallback
          src={IMAGES.appartVideLumineux}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] hidden md:block"
          loading="lazy" decoding="async" width={800} height={450}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Quand le ménage classique ne suffit plus, <span className="text-emerald-700">Nature Clean</span> intervient.
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mt-6">
                Nous avons choisi de mettre notre expertise industrielle au service des particuliers pour les situations les plus exigeantes. Que vous fassiez face à un <strong>syndrome de Diogène</strong>, que vous sortiez de <strong>mois de travaux</strong> ou que vous gériez des <strong>locations saisonnières</strong>, nous avons la réponse technique adaptée.
              </p>
              <div className="flex flex-wrap justify-center gap-6 pt-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  Assurance RC Pro
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="w-5 h-5 text-emerald-600" />
                  Intervention sous 48h
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Sparkles className="w-5 h-5 text-emerald-600" />
                  Résultat garanti
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {mainServices.map((service, idx) => (
              <ScrollReveal key={idx} delay={idx * 0.1}>
                <Card className={`h-full border-2 border-transparent transition-all duration-300 shadow-lg ${service.hoverBorder} group`}>
                  <CardContent className="p-10 flex flex-col h-full text-center">
                    <div className={`w-20 h-20 rounded-3xl ${service.color} flex items-center justify-center mb-8 mx-auto transform group-hover:scale-110 transition-transform`}>
                      <service.icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">{service.title}</h3>
                    <p className="text-gray-600 mb-8 flex-grow leading-relaxed">
                      {service.description}
                    </p>
                    <Button asChild className="w-full bg-gray-900 hover:bg-emerald-700 text-white rounded-xl py-6">
                      <Link to={service.link}>
                        Consulter les détails
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Diogène Section Highlight */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <ScrollReveal direction="left" className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-full font-bold text-sm uppercase tracking-wider">
                <Heart className="w-4 h-4" /> Spécialité Diogène
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                Nettoyage Diogène Marseille : une approche <span className="text-purple-700 italic">bienveillante</span> de l'insalubrité.
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Le syndrome de Diogène n'est pas qu'une question de ménage. C'est une situation humaine complexe qui nécessite de la patience et du respect. Nos équipes sont formées pour trier, désencombrer et désinfecter sans jamais juger.
              </p>
              <ul className="space-y-4">
                {['Tri sélectif des souvenirs et objets de valeur', 'Évacuation des déchets vers centres agréés', 'Désinfection virucide et bactérienne totale', 'Neutralisation définitive des odeurs'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-800">
                    <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 shrink-0">
                      <ArrowRight className="w-3 h-3" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <Button asChild size="lg" className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-7 text-lg rounded-2xl shadow-xl shadow-purple-200">
                <Link to="/services/nettoyage-diogene">En savoir plus sur notre méthode</Link>
              </Button>
            </ScrollReveal>
            <ScrollReveal direction="right" className="lg:w-1/2 relative">
              <div className="aspect-square rounded-[3rem] overflow-hidden shadow-2xl rotate-3">
                <ImageWithFallback
                  src={IMAGES.appartVideLumineux}
                  alt="Logement propre et lumineux après intervention Nature Clean"
                  className="w-full h-full object-cover"
                  loading="lazy" decoding="async" width={700} height={700}
                />
              </div>
              <div className="absolute -bottom-10 -left-10 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 max-w-[280px]">
                <div className="text-purple-600 font-bold text-lg mb-2">Discrétion Absolue</div>
                <p className="text-sm text-gray-500">Nous intervenons avec tact pour protéger la vie privée des résidents.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ConversionBreak mid-page */}
      <ConversionBreak
        image={IMAGES.cuisineApresTravaux}
        imageAlt="Cuisine après travaux nettoyée par Nature Clean Marseille"
        title="Un logement à remettre en état ?"
        subtitle="Diagnostic gratuit et devis confidentiel sous 24h. Nos équipes interviennent à Marseille et dans toute la région PACA."
        urgencyText="Intervention sous 48h"
        devisLink="/devis?service=particuliers"
        objectPosition="object-center"
      />

      {/* Gros Chantiers Highlight */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-16">
            <ScrollReveal direction="right" className="lg:w-1/2 space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full font-bold text-sm uppercase tracking-wider">
                <Construction className="w-4 h-4" /> Remise en état
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                Nettoyage après <span className="text-orange-400 italic">travaux</span> & remise en état Marseille.
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                La poussière fine de chantier s'infiltre partout. Nos aspirateurs HEPA et nos monobrosses industrielles viennent à bout des résidus de plâtre, de peinture et de colle pour un logement "prêt à emménager".
              </p>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-orange-400 mb-2">Garantie Caution</h4>
                  <p className="text-sm text-gray-400">Pour les locataires sortants, nous garantissons un état des lieux impeccable.</p>
                </div>
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <h4 className="font-bold text-orange-400 mb-2">Post-Rénovation</h4>
                  <p className="text-sm text-gray-400">Élimination du voile de ciment et des poussières volatiles sur toutes surfaces.</p>
                </div>
              </div>
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-7 text-lg rounded-2xl shadow-xl shadow-orange-900/40">
                <Link to="/services/nettoyage-gros-chantiers">Voir nos forfaits chantiers</Link>
              </Button>
            </ScrollReveal>
            <ScrollReveal direction="left" className="lg:w-1/2">
              <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/5">
                <ImageWithFallback
                  src={IMAGES.cuisineLivraisonValentine}
                  alt="Cuisine après travaux nettoyage livraison Valentine Marseille - Nature Clean"
                  className="w-full h-full object-cover"
                  loading="lazy" decoding="async" width={700} height={525}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Airbnb Section */}
      <section id="airbnb" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-bold text-sm uppercase tracking-wider">
                <Star className="w-4 h-4" /> Service Airbnb Pro
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">Nettoyage Airbnb Marseille : une gestion 5 étoiles de votre location.</h2>
              <p className="text-lg text-gray-600 mt-4">
                Nous assurons la rotation complète de vos locations saisonnières à Marseille, Aix et Cassis. Ménage express, linge impeccable et réapprovisionnement pour vos futurs voyageurs.
              </p>
              <div className="bg-blue-50 p-8 rounded-[2rem] border-2 border-blue-100 grid md:grid-cols-3 gap-8 mt-6">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-blue-900">Rotation Rapide</div>
                  <p className="text-xs text-blue-600">Intervention entre 11h et 15h</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-blue-900">Linge Inclus</div>
                  <p className="text-xs text-blue-600">Lavage et pose (en option)</p>
                </div>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-blue-900">Check-up Qualité</div>
                  <p className="text-xs text-blue-600">Vérification de l'état général</p>
                </div>
              </div>
              <Button asChild variant="outline" className="border-blue-600 text-blue-700 hover:bg-blue-50 px-10 py-6 rounded-xl mt-4">
                <Link to="/contact">Demander nos tarifs Airbnb</Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 bg-gray-900 overflow-hidden">
        <ImageWithFallback
          src={IMAGES.appartVideLumineux}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          loading="lazy" decoding="async" width={1920} height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/70 to-gray-900/80" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Un projet de nettoyage complexe ?</h2>
            <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
              Nos experts sont à votre disposition pour un diagnostic gratuit et confidentiel.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a
                href={PHONE_HREF}
                aria-label={ARIA_PHONE}
                className="flex items-center justify-center gap-3 bg-white text-emerald-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition-colors shadow-xl"
              >
                <Phone className="w-6 h-6" />
                {PHONE_DISPLAY}
              </a>
              <Link
                to="/devis?service=particuliers"
                className="flex items-center justify-center gap-3 bg-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 border border-emerald-500 transition-colors shadow-xl"
              >
                <FileText className="w-6 h-6" />
                Obtenir un devis
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FAQSection items={FAQ_PARTICULIERS} title="Questions fréquentes sur nos services aux particuliers" />
    </>
  );
}