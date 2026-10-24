import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { Button } from '@/app/components/ui/button';
import {
  Building2,
  Store,
  HardHat,
  Home,
  Briefcase,
  Users,
  ArrowRight,
  MapPin,
  LayoutGrid,
  Heart,
  SprayCan,
  GlassWater,
  Phone,
} from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { useState, useMemo } from 'react';
import { IMAGES } from '@/app/utils/images';
import {
  FOUNDING_YEAR,
  PHONE_DISPLAY,
  PHONE_HREF,
  ARIA_PHONE,
  ZONE_LABEL,
} from '@/app/utils/constants';

type RealisationCategory =
  | 'Cas clients'
  | 'Fin de chantier'
  | 'Commerces'
  | 'Bureaux & santé'
  | 'Événementiel';

interface Realisation {
  id: string;
  title: string;
  alt: string;
  category: RealisationCategory;
  location: string;
  image: string;
  desc: string;
  link: string;
  linkLabel: string;
  color: 'amber' | 'green' | 'purple' | 'cyan';
}

const realisations: Realisation[] = [
  {
    id: 'real-magasin-pret-a-porter-urgence',
    title: 'Remise en état d’urgence — boutique prêt-à-porter',
    alt: 'Boutique de prêt-à-porter après remise en état, sols et rayonnages',
    category: 'Cas clients',
    location: 'Marseille',
    image: IMAGES.magasinPretAPorterUrgence,
    desc: 'Après un saccage : débarras de la réserve, nettoyage des rayonnages et des sols en résine, désinfection des comptoirs.',
    link: '/services/remise-etat-urgence-commerce',
    linkLabel: 'Lire le cas',
    color: 'cyan',
  },
  {
    id: 'real-vitrines-cc',
    title: 'Nettoyage de vitrines de boutique en centre commercial, Marseille',
    alt: 'Vitrine et entrée d’une boutique de sport en centre commercial, vitres propres et cadre noir nettoyé',
    category: 'Commerces',
    location: 'Marseille — centre commercial',
    image: IMAGES.vitrinesBoutiqueCentreCommercialMarseille,
    desc: 'Lavage des vitres grand format, dégraissage du cadre, enseigne dépoussiérée si prévu au contrat — créneau hors clientèle.',
    link: '/services/nettoyage-commerces',
    linkLabel: 'Nettoyage de commerces à Marseille',
    color: 'cyan',
  },
  {
    id: 'real-entree-boutique-jeux',
    title: 'Entretien de l’entrée et des sols d’une boutique de jeux vidéo, Marseille',
    alt: 'Entrée d’une boutique de jeux vidéo avec sol en carrelage brillant après entretien',
    category: 'Commerces',
    location: 'Marseille — centre commercial',
    image: IMAGES.entretienEntreeBoutiqueCentreCommercialMarseille,
    desc: 'Baies vitrées de l’entrée, lavage du carrelage et panneaux de façade selon cahier des charges.',
    link: '/services/nettoyage-commerces',
    linkLabel: 'Nettoyage de commerces à Marseille',
    color: 'cyan',
  },
  {
    id: 'real-galerie-art-marseille',
    title: 'Entretien d’une galerie d’art',
    alt: 'Salle d’exposition avec sol lustré et vitrine',
    category: 'Cas clients',
    location: 'Marseille',
    image: IMAGES.galerieArtMarseille,
    desc: 'Aspiration HEPA et produits neutres, intervention planifiée avant un vernissage.',
    link: '/blog/nettoyage-galerie-art-marseille',
    linkLabel: 'Lire le cas',
    color: 'purple',
  },
  {
    id: 'real-graffitis-facade',
    title: 'Effacement de graffitis sur façade commerciale',
    alt: 'Façade commerciale avec tags avant traitement',
    category: 'Cas clients',
    location: 'Marseille',
    image: IMAGES.graffitiCarrefourAvant,
    desc: 'Diagnostic du support, choix du procédé, remise en état sans fermeture prolongée.',
    link: '/services/nettoyage-graffitis',
    linkLabel: 'Voir le service',
    color: 'cyan',
  },
  {
    id: 'real-decapage',
    title: 'Décapage de sol d’un commerce',
    alt: 'Sol de commerce en cours de décapage, anciennes couches d’émulsion',
    category: 'Commerces',
    location: 'Marseille',
    image: IMAGES.decapageSolEco,
    desc: 'Plusieurs couches d’émulsion décapées sur un sol jauni, puis remise en état et protection.',
    link: '/services/remise-etat-sols',
    linkLabel: 'Voir le service',
    color: 'cyan',
  },
  {
    id: 'real-terrasse',
    title: 'Nettoyage d’une terrasse de restaurant',
    alt: 'Terrasse extérieure, carrelage et joints',
    category: 'Commerces',
    location: 'Marseille',
    image: IMAGES.nettoyageTerrassePro,
    desc: 'Haute pression maîtrisée, démoussage et nettoyage des joints avant la saison.',
    link: '/services/nettoyage-commerces',
    linkLabel: 'Voir le service',
    color: 'cyan',
  },
  {
    id: 'real-vitres-julien',
    title: 'Nettoyage de vitrine — quartier commerçant',
    alt: 'Vitrine de commerce, reflets sans traces',
    category: 'Commerces',
    location: 'Marseille (Cours Julien)',
    image: IMAGES.lavageVitrine,
    desc: 'Vitrines intérieures et extérieures, raclette et produit adapté au verre.',
    link: '/services/nettoyage-vitre',
    linkLabel: 'Voir le service',
    color: 'cyan',
  },
  {
    id: 'real-1',
    title: 'Appartement neuf — programme immobilier',
    alt: 'Séjour vide, carrelage et menuiseries après fin de chantier',
    category: 'Fin de chantier',
    location: 'Marseille',
    image: IMAGES.finChantierAppartement,
    desc: 'Films retirés des vitres, sols aspirés et lavés, sanitaires nettoyés avant livraison.',
    link: '/services/nettoyage-chantiers',
    linkLabel: 'Voir le service',
    color: 'amber',
  },
  {
    id: 'real-0',
    title: 'Maison individuelle après travaux',
    alt: 'Maison en cours de nettoyage fin de chantier, sols et murs',
    category: 'Fin de chantier',
    location: 'Marseille',
    image: IMAGES.finChantierMaison,
    desc: 'Dépoussiérage, retrait des résidus de plâtre et de ciment, sols et menuiseries.',
    link: '/services/nettoyage-chantiers',
    linkLabel: 'Voir le service',
    color: 'amber',
  },
  {
    id: 'real-remise-etat-appart',
    title: 'Appartement rénové',
    alt: 'Pièce de vie avec sol carrelé propre après travaux',
    category: 'Fin de chantier',
    location: 'Aubagne',
    image: IMAGES.remiseEtatAppartMarseille,
    desc: 'Sols, plinthes et pièces de vie remis en état avant la réception.',
    link: '/services/nettoyage-chantiers',
    linkLabel: 'Voir le service',
    color: 'amber',
  },
  {
    id: 'real-cuisine-apres-travaux',
    title: 'Cuisine après travaux',
    alt: 'Cuisine après travaux, résidus de colle sur les façades de meubles',
    category: 'Fin de chantier',
    location: 'Marseille',
    image: IMAGES.cuisineApresTravaux,
    desc: 'Résidus de colle sur les façades, ciment autour de l’évier, traces sur l’inox.',
    link: '/services/nettoyage-chantiers',
    linkLabel: 'Voir le service',
    color: 'amber',
  },
  {
    id: 'real-avant-chantier',
    title: 'Appartement avant intervention',
    alt: 'Appartement après travaux, poussière sur les surfaces et vitres',
    category: 'Fin de chantier',
    location: 'Marseille',
    image: IMAGES.appartAvantChantier,
    desc: 'Poussière sur les surfaces, résidus de plâtre dans les angles, traces sur les vitres neuves.',
    link: '/services/nettoyage-chantiers',
    linkLabel: 'Voir le service',
    color: 'amber',
  },
  {
    id: 'real-sols-bureaux',
    title: 'Sols de bureaux remis en état',
    alt: 'Open space, sol PVC après monobrosse',
    category: 'Bureaux & santé',
    location: 'Marseille',
    image: IMAGES.solsBureauxPro,
    desc: 'Décapage de l’ancienne protection, monobrosse, émulsion de protection.',
    link: '/services/remise-etat-sols',
    linkLabel: 'Voir le service',
    color: 'green',
  },
  {
    id: 'real-7',
    title: 'Nettoyage d’un cabinet médical',
    alt: 'Salle d’attente de cabinet médical, sols et sièges',
    category: 'Bureaux & santé',
    location: 'Marseille 13005',
    image: IMAGES.cabinetMedical,
    desc: 'Salle d’attente et salles de consultation, surfaces de contact et poignées, après la fermeture.',
    link: '/realisations/cas/cabinet-medical-marseille',
    linkLabel: 'Lire le cas',
    color: 'green',
  },
  {
    id: 'real-event',
    title: 'Remise en état d’une salle de réception',
    alt: 'Salle de réception vide, sols et chaises rangées',
    category: 'Événementiel',
    location: 'Marseille',
    image: IMAGES.salleEvenementielle,
    desc: 'Salle remise en état le soir même ou tôt le lendemain, après le départ du traiteur.',
    link: '/services/nettoyage-evenementiel',
    linkLabel: 'Voir le service',
    color: 'purple',
  },
];

const colorMap: Record<string, string> = {
  amber: 'bg-amber-100 text-amber-700',
  green: 'bg-green-100 text-green-700',
  purple: 'bg-purple-100 text-purple-700',
  cyan: 'bg-cyan-100 text-cyan-700',
};

const FILTER_ALL = 'Tous';
const filterCategories = [
  FILTER_ALL,
  'Cas clients',
  'Fin de chantier',
  'Commerces',
  'Bureaux & santé',
  'Événementiel',
] as const;

const SERVICE_LINKS = [
  { icon: Briefcase, title: 'Entretien de bureaux', link: '/services/entretien-bureaux' },
  { icon: Store, title: 'Nettoyage de commerces', link: '/services/nettoyage-commerces' },
  { icon: Building2, title: 'Nettoyage de copropriétés', link: '/services/nettoyage-coproprietes' },
  { icon: HardHat, title: 'Nettoyage de fin de chantier', link: '/services/nettoyage-chantiers' },
  { icon: Home, title: 'Remise en état des sols', link: '/services/remise-etat-sols' },
  { icon: GlassWater, title: 'Nettoyage de vitres', link: '/services/nettoyage-vitre' },
  { icon: SprayCan, title: 'Enlèvement de graffitis', link: '/services/nettoyage-graffitis' },
  { icon: Users, title: 'Nettoyage événementiel', link: '/services/nettoyage-evenementiel' },
  { icon: Heart, title: 'Nettoyage syndrome de Diogène', link: '/services/nettoyage-diogene' },
] as const;

export function RealisationsPage() {
  const [activeFilter, setActiveFilter] = useState<string>(FILTER_ALL);

  const filtered = useMemo(
    () =>
      activeFilter === FILTER_ALL
        ? realisations
        : realisations.filter((r) => r.category === activeFilter),
    [activeFilter],
  );

  return (
    <>
      <SEO_Guardian currentSection="realisations" />

      <ServicePageHero
        title="Nos réalisations de nettoyage à Marseille"
        subtitle="Des interventions réelles, des photos et des cas clients, depuis 2021 — Marseille et Bouches-du-Rhône"
        imageSrc={IMAGES.finChantierEquipe}
        imageAlt="Équipe sur un chantier de nettoyage fin de travaux"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Réalisations' },
        ]}
      />

      <section className="py-10 bg-green-50 border-y border-green-100">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            <div className="bg-white rounded-xl p-4 border border-green-100">
              <p className="text-2xl font-black text-green-700">Depuis {FOUNDING_YEAR}</p>
              <p className="text-gray-600 mt-1">{ZONE_LABEL}</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-green-100">
              <p className="text-2xl font-black text-green-700">50 %</p>
              <p className="text-gray-600 mt-1">Produits éco-labellisés (entretien courant)</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-green-100">
              <p className="text-2xl font-black text-green-700">RC Pro</p>
              <p className="text-gray-600 mt-1">Assurance responsabilité civile professionnelle</p>
            </div>
            <div className="bg-white rounded-xl p-4 border border-green-100">
              <p className="text-2xl font-black text-green-700">2 h / 24 h</p>
              <p className="text-gray-600 mt-1">Réponse puis devis écrit gratuit</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Fin de chantier, commerces, bureaux, locaux de santé et événementiel : chaque photo
              correspond à une intervention de nos équipes sur le terrain. Pas de tarif affiché ici
              — chaque devis dépend du volume, des accès et de l’état du site.
            </p>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto">
            {filterCategories.map((cat) => {
              const isActive = activeFilter === cat;
              const count =
                cat === FILTER_ALL
                  ? realisations.length
                  : realisations.filter((r) => r.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-green-700 text-white shadow-md shadow-green-700/20'
                      : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  {cat === FILTER_ALL && <LayoutGrid className="w-3.5 h-3.5" aria-hidden="true" />}
                  {cat}
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="text-center text-sm text-gray-400 mb-8">
            {filtered.length} réalisation{filtered.length > 1 ? 's' : ''}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filtered.map((real, i) => (
              <article
                key={real.id}
                className="ncm-grid-item-appear bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md flex flex-col"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={real.image}
                    alt={real.alt}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={400}
                  />
                  <div className="absolute top-3 left-3">
                    <span
                      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold shadow-lg ring-1 ring-white/20 ${
                        colorMap[real.color] ?? 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {real.category}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="font-black text-gray-900 mb-2">{real.title}</h3>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed flex-1">{real.desc}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mb-4">
                    <MapPin className="w-3 h-3" aria-hidden="true" />
                    {real.location}
                  </p>
                  <Link
                    to={real.link}
                    className="text-sm font-semibold text-green-700 hover:text-green-800 inline-flex items-center gap-1"
                  >
                    {real.linkLabel}
                    <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10 text-center">
              Nos domaines d&apos;intervention
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
            {SERVICE_LINKS.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <ScrollReveal key={category.link} delay={index * 0.04}>
                  <Link
                    to={category.link}
                    className="group bg-white border border-gray-200 rounded-xl p-5 hover:border-green-400 hover:shadow-lg transition-all flex items-center gap-4"
                  >
                    <div className="w-11 h-11 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-700 transition-colors">
                      <IconComponent
                        className="w-5 h-5 text-green-600 group-hover:text-white transition-colors"
                        aria-hidden="true"
                      />
                    </div>
                    <span className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                      {category.title}
                    </span>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Un projet de nettoyage ?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Réponse sous 2 h en horaires d&apos;ouverture, devis gratuit sous 24 h.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black">
                <Link to="/devis">
                  Demander un devis
                  <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold">
                <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                  <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                  {PHONE_DISPLAY}
                </a>
              </Button>
            </div>

            <div className="pt-8 border-t border-white/10">
              <p className="text-gray-400 text-sm mb-4">Suivez nos interventions</p>
              <a
                href="https://www.instagram.com/natureclean13/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 group"
                aria-label="Suivre Nature Clean sur Instagram @natureclean13"
              >
                <span className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-br from-[#f09433] via-[#dc2743] to-[#bc1888] shadow-lg group-hover:scale-105 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </span>
                <span className="text-left">
                  <span className="block text-white font-black group-hover:text-green-400 transition-colors">
                    @natureclean13
                  </span>
                  <span className="block text-gray-500 text-xs">Instagram</span>
                </span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
