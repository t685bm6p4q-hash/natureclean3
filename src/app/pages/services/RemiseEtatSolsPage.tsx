import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { PHONE_HREF, ARIA_PHONE, FOUNDING_YEAR } from '@/app/utils/constants';
import { NATURE_CLEAN_PROVIDER } from '@/app/utils/cleaning-service-jsonld';
import { Button } from '@/app/components/ui/button';
import { Phone, Layers, Grid3x3, ArrowRight, Clock, Volume2, ShieldAlert, Sparkles } from 'lucide-react';
import { Link } from 'react-router';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ServiceFeatureCard } from '@/app/components/ServiceFeatureCard';
import { IMAGES } from '@/app/utils/images';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Quels types de sols traitez-vous à Marseille ?',
    answer:
      'En priorité : marbre, pierre, granit, béton ciré, carrelage et sols de commerces à décaper. Le parquet, on le fait quand le support s\'y prête — un parqueteur reste parfois plus adapté, on le dit à la visite. La moquette, c\'est de l\'entretien, pas une remise en état : voir la fiche bureaux.',
  },
  {
    question: 'Combien de temps dure une remise en état de sol ?',
    answer:
      'Ça dépend de la surface, de l\'état et du traitement. On ne publie pas de durée type. Le planning est dans le devis, après visite ou photos. Réponse sous 2 h, devis sous 24 h.',
  },
  {
    question: 'Le polissage de marbre est-il bruyant ? Peut-on rester dans les locaux ?',
    answer:
      'Le diamantage et le polissage font du bruit. En copropriété, on cale la journée avec le syndic. En commerce ou bureau, soir ou week-end si besoin. Rester sur place : possible selon le traitement et la poussière, on le tranche à la visite.',
  },
  {
    question: 'Quelle est la durée de vie d\'une cristallisation de marbre ?',
    answer:
      'Elle dépend du trafic et de l\'entretien ensuite. Un hall d\'immeuble s\'use plus vite qu\'un palier peu passé. On ne promet pas un nombre d\'années : on dit comment entretenir pour que le rendu tienne.',
  },
  {
    question: 'Intervenez-vous en dehors de Marseille pour les sols ?',
    answer:
      'Oui, dans les Bouches-du-Rhône : Aix-en-Provence, Aubagne, Salon-de-Provence, La Ciotat. Zone : Marseille et le 13.',
  },
  {
    question: 'Quels sols refusez-vous ou testez-vous d\'abord ?',
    answer:
      'Un support fissuré, une résine douteuse, un marbre trop usé : on teste ou on refuse. Mieux vaut le dire avant que de promettre un rendu uniforme.',
  },
];

const CONSTRAINTS = [
  {
    icon: Clock,
    title: 'Séchage et circulation',
    text: 'Certains traitements demandent un délai avant de marcher dessus. On l\'écrit au devis, on ne l\'invente pas ici.',
  },
  {
    icon: Volume2,
    title: 'Bruit et horaires',
    text: 'Machines bruyantes. Soir, week-end ou journée syndic : on cale avant de venir.',
  },
  {
    icon: Sparkles,
    title: 'Poussière',
    text: 'Protection du mobilier, aspiration. Un hall occupé n\'est pas un atelier : on le prévoit.',
  },
  {
    icon: ShieldAlert,
    title: 'Après le traitement',
    text: 'Paillassons, produits adaptés, passages d\'entretien. Sans ça, le rendu ne tient pas.',
  },
];

export function RemiseEtatSolsPage() {
  return (
    <>
      <SEO_Guardian currentSection="remise-etat-sols" faqItems={FAQ_ITEMS} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Remise en état et rénovation de sols à Marseille',
            description:
              'Polissage, cristallisation, décapage et lustrage de sols à Marseille depuis 2021 : marbre, béton ciré, parquet. Réponse sous 2 h, devis sous 24 h.',
            provider: NATURE_CLEAN_PROVIDER,
            areaServed: { '@type': 'City', name: 'Marseille' },
            serviceType: 'Remise en état de sols',
            url: 'https://natureclean.fr/services/remise-etat-sols',
          }),
        }}
      />

      <ServicePageHero
        title="Remise en état et rénovation de sols à Marseille"
        subtitle="Marbre, pierre, béton ciré, décapage de locaux — depuis 2021"
        badge="Marbre et pierre"
        badgeIcon={<Layers className="w-4 h-4" />}
        imageSrc={IMAGES.solMarbrePoli}
        imageAlt="Hall en marbre à Marseille, sol lustré devant les ascenseurs"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Remise en état des sols' },
        ]}
        devisLink="/devis?service=sols"
      />

      <section className="relative py-16 bg-white overflow-hidden">
        <ImageWithFallback
          src={IMAGES.solMarbrePoli}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] hidden md:block"
          loading="lazy"
          decoding="async"
          width={800}
          height={450}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto space-y-6 text-gray-700 leading-relaxed">
            <ScrollReveal>
              <p className="text-lg">
                Un hall de copropriété terni, un sol de commerce encraissé, un béton ciré qui a perdu
                son film : Nature Clean remet en état des sols à Marseille depuis {FOUNDING_YEAR},
                depuis le 8e.
              </p>
              <p>
                On est une société de nettoyage, pas un parqueteur. Notre terrain, c&apos;est le{' '}
                <strong>marbre et la pierre</strong>, le <strong>béton ciré</strong>, le{' '}
                <strong>décapage de locaux</strong>. Le parquet, si le support le permet. Zone :
                Marseille et Bouches-du-Rhône.
              </p>
              <p className="font-semibold text-green-700">
                Réponse sous 2 h, devis sous 24 h — visite ou photos du support
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
                Marbre et pierre : polissage, puis cristallisation
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                On ne « ponce » pas le marbre comme un parquet. Diamantage, polissage, cristallisation
                — dans cet ordre, si le support le permet.
              </p>
            </ScrollReveal>
            <div className="grid md:grid-cols-2 gap-8 items-center mb-10">
              <ScrollReveal>
                <ImageWithFallback
                  src={IMAGES.hallMarbreSale}
                  alt="Hall en marbre d'un immeuble, avant ou après lustrage"
                  className="w-full h-72 object-cover rounded-2xl border border-gray-200"
                  loading="lazy"
                  decoding="async"
                  width={800}
                  height={450}
                />
              </ScrollReveal>
              <ScrollReveal delay={0.08}>
                <ul className="space-y-3 text-gray-700">
                  <li>
                    <strong>Diagnostic :</strong> nature de la pierre, usure, joints, trafic.
                  </li>
                  <li>
                    <strong>Diamantage / polissage :</strong> pour rouvrir le grain et uniformiser.
                  </li>
                  <li>
                    <strong>Cristallisation :</strong> pour durcir et faire briller la surface, pas
                    pour « faire comme neuf » un sol trop usé.
                  </li>
                  <li>
                    <strong>Résultat visé :</strong> un rendu uniforme et protégé, adapté à l&apos;état
                    du support.
                  </li>
                </ul>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
              Les autres supports
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              Un geste par matériau. On ne ponce pas le linoléum. La moquette n&apos;est pas une
              rénovation de sol.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {(
              [
                {
                  icon: Grid3x3,
                  title: 'Béton ciré, carrelage, locaux',
                  image: IMAGES.decapageSolEco,
                  items: [
                    { bold: 'Décapage', text: 'de sols de commerces et de halls' },
                    { bold: 'Béton ciré et résine', text: 'si le film le permet' },
                    { bold: 'Carrelage', text: 'lessivage, joints, protection' },
                  ],
                  desc: 'L\'entretien lourd : enlever les couches, dégraisser, protéger. Produits à faible impact lorsque le support le permet.',
                },
                {
                  icon: Layers,
                  title: 'Parquet',
                  image: IMAGES.jdSportMarseilleFloor,
                  items: [
                    { bold: 'Ponçage', text: 'si le bois a encore de l\'épaisseur' },
                    { bold: 'Finition', text: 'huile, cire ou vitrificateur' },
                    { bold: 'Limite', text: 'un parqueteur parfois plus adapté' },
                  ],
                  desc: 'Occasionnel. On le dit à la visite si le chantier relève plutôt d\'un spécialiste bois.',
                  footer: undefined,
                },
                {
                  icon: Sparkles,
                  title: 'Ce que ce n\'est pas',
                  image: IMAGES.entrepriseBureauxMarseille,
                  items: [
                    { bold: 'Moquette', text: 'entretien, fiche bureaux' },
                    { bold: 'Linoléum', text: 'pas de ponçage' },
                    { bold: 'Ménage à domicile', text: 'ce n\'est pas cette page' },
                  ],
                  desc: 'On ne mélange pas rénovation de sol et ménage courant.',
                  footer: (
                    <p className="text-gray-600 leading-relaxed">
                      <Link
                        to="/services/entretien-bureaux"
                        className="font-semibold text-green-800 underline underline-offset-2 hover:text-green-900"
                      >
                        Entretien bureaux (moquette)
                      </Link>
                      <span className="text-gray-400 mx-2" aria-hidden="true">
                        ·
                      </span>
                      <Link
                        to="/services/nettoyage-diogene"
                        className="font-semibold text-green-800 underline underline-offset-2 hover:text-green-900"
                      >
                        Ménage logement / Diogène
                      </Link>
                    </p>
                  ),
                },
              ] as const
            ).map((card, i) => (
              <ScrollReveal key={card.title} delay={i * 0.1}>
                <ServiceFeatureCard
                  title={card.title}
                  image={card.image}
                  icon={card.icon}
                  items={card.items}
                  description={card.desc}
                  footer={'footer' in card ? card.footer : undefined}
                />
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.15}>
            <div className="max-w-3xl mx-auto bg-green-50 p-8 rounded-2xl border border-green-200">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-xl font-black text-gray-900 mb-2">Besoin d&apos;un devis ?</h3>
                  <p className="text-sm text-gray-600">
                    Réponse sous 2 h, devis sous 24 h — photos du sol bienvenues
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="bg-green-700 hover:bg-green-800 font-bold flex-1">
                    <Link to="/devis?service=sols">Devis gratuit</Link>
                  </Button>
                  <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold flex-1">
                    <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
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

      <ConversionBreak
        image={IMAGES.decapageSolEco}
        imageAlt="Décapage d'un sol de local à Marseille, monobrosse au travail"
        title="Un sol terne n'est pas forcément à changer"
        subtitle="Visite ou photos. On dit ce qu'on peut faire — et ce qu'on ne peut pas."
        devisLink="/devis?service=sols"
      />

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
                Contraintes de terrain
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                C&apos;est ça qui décide si on peut intervenir, pas une promesse « écologique » ou
                « comme neuf ».
              </p>
            </ScrollReveal>
            <div className="grid sm:grid-cols-2 gap-4">
              {CONSTRAINTS.map((item, i) => {
                const Icon = item.icon;
                return (
                  <ScrollReveal key={item.title} delay={i * 0.06}>
                    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm h-full">
                      <Icon className="w-7 h-7 text-green-600 mb-3" aria-hidden="true" />
                      <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
                Sols sur lesquels on intervient
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                Halls en marbre et décapage de locaux. Pas de cuisine « après travaux » déguisée en
                avant/après.
              </p>
            </ScrollReveal>
            <div className="grid md:grid-cols-3 gap-6">
              {(
                [
                  {
                    src: IMAGES.solMarbrePoli,
                    alt: 'Sol en marbre d\'un hall d\'immeuble à Marseille',
                    title: 'Hall marbre',
                    sub: 'Polissage / lustrage',
                  },
                  {
                    src: IMAGES.hallMarbreSale,
                    alt: 'Hall en marbre, circulation et paliers',
                    title: 'Pierre en copropriété',
                    sub: 'Cristallisation si le support tient',
                  },
                  {
                    src: IMAGES.decapageSolEco,
                    alt: 'Décapage d\'un sol de commerce à Marseille',
                    title: 'Décapage local',
                    sub: 'Commerces et halls',
                  },
                ] as const
              ).map((photo, i) => (
                <ScrollReveal key={photo.title} delay={i * 0.08}>
                  <div className="relative rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-[280px] object-cover"
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={300}
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent px-4 py-3 text-white">
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

      <FAQSection
        items={FAQ_ITEMS}
        title="Questions fréquentes — Remise en état des sols"
        subtitle="Marbre, bruit, délais, ce qu'on ne traite pas"
      />

      <section className="py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Un rendu uniforme et protégé, adapté à l&apos;état du support
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Marseille et Bouches-du-Rhône — réponse sous 2 h, devis sous 24 h
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Consultez également :</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-coproprietes">Nettoyage de copropriétés</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-commerces">Nettoyage de commerces</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-chantiers">Fin de chantier</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
