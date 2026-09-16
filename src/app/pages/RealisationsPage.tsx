import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { BeforeAfterCarousel } from '@/app/components/BeforeAfterCarousel';
import { Button } from '@/app/components/ui/button';
import { Building2, Store, HardHat, Home, Briefcase, Users, ArrowRight, MapPin, Calendar, LayoutGrid } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { useState, useMemo } from 'react';
import { IMAGES } from '@/app/utils/images';

/* ──────────────────────────────────────────────
   PORTFOLIO : toutes les photos réelles Cloudinary
   Organisées en 5 catégories SEO
   ────────────────────────────────────────────── */
const realisations = [
  /* ── CAS CLIENTS (articles blog) ─── */
  {
    id: 'real-galerie-art-marseille',
    title: "Entretien galerie d'art et espace d'exposition — Marseille",
    alt: "Nettoyage professionnel galerie d'art Marseille — sols lustrés et vitrines sans trace Nature Clean",
    category: 'Cas clients',
    location: 'Marseille',
    date: 'Septembre 2026',
    image: IMAGES.galerieArtMarseille,
    desc: "Lieux culturels exigeants : zéro poussière en suspension, produits neutres et aspiration HEPA pour protéger œuvres et cimaises. Nature Clean planifie l'intervention avant vernissage à Marseille. Retour de méthode et bonnes pratiques dans notre article dédié.",
    link: '/blog/nettoyage-galerie-art-marseille',
    color: 'purple',
  },
  {
    id: 'real-graffitis-carrefour-marseille',
    title: 'Effacement graffitis sur façade commerciale — Carrefour Marseille',
    alt: 'Effacement tags et graffitis façade grande surface Marseille — intervention Nature Clean',
    category: 'Cas clients',
    location: 'Marseille',
    date: 'Juin 2026',
    image: IMAGES.graffitiCarrefourAvant,
    desc: "Enseigne à flux intense : diagnostic du support (béton, vitrine, bardage), choix du procédé anti-graffiti et remise en état sans fermeture prolongée. Notre protocole d'urgence pour commerces marseillais est détaillé pas à pas dans le récit complet sur le blog.",
    link: '/blog/nettoyage-graffitis-carrefour-marseille',
    color: 'cyan',
  },
  /* ── MAI 2026 ─── */
  {
    id: 'real-jd-sport',
    title: 'Nettoyage magasin JD Sport Marseille',
    alt: 'Nettoyage sols magasin JD Sport Marseille - Nature Clean entretien commerce retail',
    category: 'Commerces & Terrasses',
    location: 'Marseille Centre',
    date: 'Mai 2026',
    image: IMAGES.jdSportMarseilleFloor,
    desc: 'Entretien régulier du magasin JD Sport en plein cœur de Marseille. Sols lavés à l\'autolaveuse professionnelle, surfaces impeccables pour une enseigne qui soigne son image. Dans le retail, la propreté fait partie de l\'expérience client — nos équipes interviennent avant ouverture pour un résultat optimal.',
    link: '/services/nettoyage-commerces',
    color: 'cyan',
  },
  {
    id: 'real-vitres',
    title: 'Nettoyage vitres professionnel Marseille',
    alt: 'Nettoyage vitres professionnel commerce Marseille - Nature Clean vitrerie',
    category: 'Commerces & Terrasses',
    location: 'Marseille',
    date: 'Mai 2026',
    image: IMAGES.lavageVitrine,
    desc: 'Vitrines impeccables dans le quartier commerçant du cours Julien. Quand le soleil de Marseille tape à travers les vitres propres, les clients entrent naturellement. Raclette professionnelle, produit sans trace, résultat du premier coup.',
    link: '/services/nettoyage-vitre',
    color: 'cyan',
  },
  {
    id: 'real-remise-etat-appart',
    title: 'Remise en état appartement — Marseille 13ème',
    alt: 'Remise en état appartement Marseille après départ locataire - Nature Clean',
    category: 'Fin de chantier',
    location: 'Marseille 13013',
    date: 'Mai 2026',
    image: IMAGES.remiseEtatAppartMarseille,
    desc: 'Appartement du 13ème arrondissement remis à neuf après départ de locataire. Sols, plinthes, cuisine, salle de bain : on repart de zéro. À Marseille, les propriétaires qui soignent leur bien entre deux locations font la différence.',
    link: '/services/nettoyage-chantiers',
    color: 'amber',
  },
  {
    id: 'real-eco-marseille',
    title: 'Nettoyage éco-responsable — Cœur de Marseille',
    alt: 'Nettoyage écologique professionnel Marseille - Nature Clean produits bio',
    category: 'Commerces & Terrasses',
    location: 'Marseille Centre',
    date: 'Mai 2026',
    image: IMAGES.nettoyageMarseilleEco,
    desc: 'On est à Marseille, la Méditerranée est à deux pas. Alors on a choisi dès le départ des produits certifiés éco-responsables, sans chlore ni phosphates. Ce n\'est pas un argument marketing, c\'est une évidence géographique.',
    link: '/services/nettoyage-commerces',
    color: 'cyan',
  },
  {
    id: 'real-magasin-paca',
    title: 'Remise à neuf boutique — Marseille PACA',
    alt: 'Nettoyage magasin boutique Marseille PACA - Nature Clean remise en état',
    category: 'Commerces & Terrasses',
    location: 'Marseille',
    date: 'Mai 2026',
    image: IMAGES.magasinBoutiquePACA,
    desc: 'Entre deux saisons ou avant réouverture, une boutique marseillaise retrouve son éclat. Sols lavés en profondeur, vitrines intérieures dégraissées, mobilier dépoussiéré. Nos équipes interviennent la nuit pour que le rideau se lève sur quelque chose de propre.',
    link: '/services/nettoyage-commerces',
    color: 'cyan',
  },
  {
    id: 'real-sols-fin-bdr',
    title: 'Sols fin de chantier — Bouches-du-Rhône',
    alt: 'Nettoyage sols fin de chantier Bouches-du-Rhône - Nature Clean',
    category: 'Fin de chantier',
    location: 'Bouches-du-Rhône',
    date: 'Mai 2026',
    image: IMAGES.solsFinChantierBDR,
    desc: 'Livraison de chantier dans les Bouches-du-Rhône : c\'est le moment de vérité pour tout maître d\'ouvrage. Gravier de piscine, poussière de découpe, résidus de chape — nos machines n\'en font qu\'une bouchée. Le sol repart propre, la livraison peut avoir lieu.',
    link: '/services/nettoyage-chantiers',
    color: 'amber',
  },
  {
    id: 'real-remise-cuisine',
    title: 'Cuisine après travaux — Remise en état Marseille',
    alt: 'Remise en état cuisine après travaux Marseille - Nature Clean nettoyage',
    category: 'Fin de chantier',
    location: 'Marseille',
    date: 'Mai 2026',
    image: IMAGES.remiseEtatCuisine,
    desc: 'Une cuisine restructurée à Marseille mérite un nettoyage à sa hauteur. Résidus de colle carrelage, poussière de découpe de plan de travail, ciment autour de l\'évier : nos techniciens connaissent chaque matériau et utilisent les produits adaptés à chaque surface.',
    link: '/services/nettoyage-chantiers',
    color: 'amber',
  },
  {
    id: 'real-salle-bain-desinf',
    title: 'Désinfection salle de bain post-chantier',
    alt: 'Nettoyage désinfection salle de bain post-chantier Marseille - Nature Clean',
    category: 'Fin de chantier',
    location: 'Marseille',
    date: 'Mai 2026',
    image: IMAGES.salleBainDesinfection,
    desc: 'Faïences, robinetterie neuve encore maculée de projections, joints fraîchement posés : la salle de bain post-chantier demande de la méthode, pas de la force. Chaque centimètre carré est traité pour une livraison qui en impose.',
    link: '/services/nettoyage-chantiers',
    color: 'amber',
  },
  {
    id: 'real-sols-bureaux',
    title: 'Sols bureaux remis en état — Zone d\'activités Marseille',
    alt: 'Nettoyage sols bureaux professionnels Marseille - Nature Clean remise en état',
    category: 'Santé & Bureaux',
    location: 'Marseille',
    date: 'Mai 2026',
    image: IMAGES.solsBureauxPro,
    desc: 'Sols de bureaux remis en état dans un immeuble tertiaire de la métropole marseillaise. Décapage de l\'ancienne couche de protection, passage monobrosse, application d\'une émulsion haute résistance. Le matin, vos équipes arrivent sur un sol qui a de la tenue.',
    link: '/services/entretien-bureaux',
    color: 'green',
  },
  {
    id: 'real-entreprise-bureaux',
    title: 'Entretien entreprise — Quartier d\'affaires Marseille',
    alt: 'Nettoyage entretien bureaux locaux entreprise Marseille - Nature Clean',
    category: 'Santé & Bureaux',
    location: 'Marseille',
    date: 'Mai 2026',
    image: IMAGES.entrepriseBureauxMarseille,
    desc: 'Entre la Joliette et les docks en pleine mutation, Marseille vit une vraie renaissance de ses espaces de travail. Nous accompagnons les entreprises qui soignent leur cadre : entretien régulier, réactivité au quotidien, discrétion pendant les heures ouvrées.',
    link: '/services/entretien-bureaux',
    color: 'green',
  },
  /* ── AVRIL 2026 ─── */
  {
    id: 'real-event',
    title: 'Nettoyage événementiel — Salle de réception Marseille',
    alt: 'Nettoyage salle événementielle réception Marseille - Nature Clean',
    category: 'Evenementiel',
    location: 'Marseille & PACA',
    date: 'Avril 2026',
    image: IMAGES.salleEvenementielle,
    desc: 'Mariage, conférence d\'entreprise ou gala : quand la fête est finie à Marseille, on intervient. Salle remise en état le soir même ou avant 7h le lendemain matin. Le traiteur a fait son travail, on fait le nôtre.',
    link: '/services/nettoyage-evenementiel',
    color: 'purple',
  },
  {
    id: 'real-cuisine-valentine',
    title: 'Livraison appartement neuf — Valentine Marseille',
    alt: 'Nettoyage cuisine après travaux livraison Valentine Marseille - Nature Clean',
    category: 'Fin de chantier',
    location: 'Marseille Valentine',
    date: 'Avril 2026',
    image: IMAGES.cuisineLivraisonValentine,
    desc: 'Dans le quartier Valentine, côté est de Marseille, un appartement neuf attend ses habitants. Cuisine posée, carrelage au sol encore poussiéreux, vitres maculées de projections de peinture. En quelques heures, tout est prêt pour le premier emménagement.',
    link: '/services/nettoyage-chantiers',
    color: 'amber',
  },
  {
    id: 'real-avant-chantier',
    title: 'Appartement avant intervention — Fin de chantier',
    alt: 'Appartement avant nettoyage fin de chantier Marseille - état initial Nature Clean',
    category: 'Fin de chantier',
    location: 'Marseille',
    date: 'Avril 2026',
    image: IMAGES.appartAvantChantier,
    desc: 'Ce cliché, c\'est notre point de départ. Un appartement marseillais sorti de travaux, tel quel : poussière sur chaque surface, résidus de plâtre dans les angles, traces d\'outillage sur les vitres neuves. Voir l\'avant, c\'est comprendre l\'ampleur du travail et la valeur du résultat.',
    link: '/services/nettoyage-chantiers',
    color: 'amber',
  },
  {
    id: 'real-cuisine-apres-travaux',
    title: 'Cuisine après travaux — Appartement Marseille',
    alt: 'Nettoyage cuisine après travaux appartement Marseille - Nature Clean',
    category: 'Fin de chantier',
    location: 'Marseille',
    date: 'Avril 2026',
    image: IMAGES.cuisineApresTravaux,
    desc: 'Après le passage des artisans, la cuisine d\'un appartement marseillais se retrouve dans un état que seul un œil de professionnel peut déchiffrer. Résidus de colle sur les façades de meubles, ciment autour de l\'évier, empreintes sur l\'inox. On repart sur des bases saines.',
    link: '/services/nettoyage-chantiers',
    color: 'amber',
  },
  {
    id: 'real-commerce-whatsapp',
    title: 'Commerce remis à neuf — Marseille',
    alt: 'Commerce nettoyé professionnel Marseille avant réouverture - Nature Clean',
    category: 'Commerces & Terrasses',
    location: 'Marseille',
    date: 'Avril 2026',
    image: IMAGES.whatsappCommerce,
    desc: 'Ce visuel nous a été envoyé directement par notre client, le soir même de notre intervention. C\'est la meilleure des cartes de visite. Un commerce marseillais prêt à rouvrir, propre de fond en comble, sans qu\'il ait eu à lever le petit doigt.',
    link: '/services/nettoyage-commerces',
    color: 'cyan',
  },
  {
    id: 'real-0',
    title: 'Nettoyage fin de chantier — Maison individuelle',
    alt: 'Nettoyage fin de chantier maison Marseille par Nature Clean',
    category: 'Fin de chantier',
    location: 'Marseille',
    date: 'Avril 2026',
    image: IMAGES.finChantierMaison,
    desc: 'Villa marseillaise rendue à ses propriétaires après neuf mois de travaux. Dépoussiérage de toutes les surfaces, retrait des résidus de plâtre et de ciment, nettoyage des sols et menuiseries. Livraison clé en main, prête à meubler.',
    link: '/services/nettoyage-chantiers',
    color: 'amber',
  },
  {
    id: 'real-10',
    title: 'Entretien magasin Marseille Centre-Ville',
    alt: 'Entretien nettoyage magasin Marseille centre-ville propre - Nature Clean',
    category: 'Commerces & Terrasses',
    location: 'Marseille Centre',
    date: 'Avril 2026',
    image: IMAGES.entretienMagasin,
    desc: 'En centre-ville de Marseille, les clients jugent un commerce en trois secondes. Sols entretenus chaque semaine, vitrines dégraissées, arrière-boutique tenue : rien ne traîne, rien ne se voit, tout se ressent. C\'est notre travail régulier depuis plus de deux ans chez ce commerçant.',
    link: '/services/nettoyage-commerces',
    color: 'cyan',
  },
  {
    id: 'real-decapage',
    title: 'Décapage écologique sol commerce Marseille',
    alt: 'Décapage sol écologique commerce Marseille - Nature Clean remise en état sols',
    category: 'Commerces & Terrasses',
    location: 'Marseille',
    date: 'Avril 2026',
    image: IMAGES.decapageSolEco,
    desc: 'Le sol de ce commerce marseillais n\'avait plus été décapé depuis des années. Trois couches d\'émulsion superposées, une teinte jaunie par le temps. Après décapage écologique et remise en état, la dalle retrouve sa couleur d\'origine. Produits certifiés, zéro résidu chimique.',
    link: '/services/remise-etat-sols',
    color: 'cyan',
  },
  /* ── MARS 2026 ─── */
  {
    id: 'real-7',
    title: 'Nettoyage cabinet médical Marseille',
    alt: 'Nettoyage désinfection cabinet médical Marseille aux normes sanitaires',
    category: 'Santé & Bureaux',
    location: 'Marseille 13005',
    date: 'Mars 2026',
    image: IMAGES.cabinetMedical,
    desc: 'Dans le 5ème arrondissement de Marseille, un cabinet médical ne supporte aucune approximation. Protocole de désinfection adapté : salle d\'attente, salles de consultation, surfaces de contact et poignées. On travaille après la fermeture, sans perturber les consultations du lendemain matin.',
    link: '/services/entretien-bureaux',
    color: 'green',
  },
  {
    id: 'real-1',
    title: 'Nettoyage fin de chantier — Appartement neuf',
    alt: 'Nettoyage fin de chantier appartement Marseille - Nature Clean',
    category: 'Fin de chantier',
    location: 'Marseille',
    date: 'Mars 2026',
    image: IMAGES.finChantierAppartement,
    desc: 'Appartement neuf livré dans un programme immobilier marseillais. Vitres décapées de leurs films de protection, sols aspirés et lavés, sanitaires neufs débarrassés de leurs résidus de montage. Le promoteur peut signer la livraison en toute confiance.',
    link: '/services/nettoyage-chantiers',
    color: 'amber',
  },
  {
    id: 'real-11',
    title: 'Nettoyage terrasse professionnelle Marseille',
    alt: 'Nettoyage terrasse professionnel Marseille haute pression - Nature Clean',
    category: 'Commerces & Terrasses',
    location: 'Marseille',
    date: 'Mars 2026',
    image: IMAGES.nettoyageTerrassePro,
    desc: 'Terrasse de restaurant marseillais avant l\'arrivée de la belle saison. Le mistral dépose ce qu\'il veut, la mousse colonise les joints dès l\'automne. Haute pression maîtrisée, démoussage, détartrage des joints : la terrasse est prête pour les premiers apéros de mai.',
    link: '/services/nettoyage-commerces',
    color: 'cyan',
  },
  /* ── FÉVRIER 2026 ─── */
  {
    id: 'real-2',
    title: 'Équipe Nature Clean — Intervention fin de chantier',
    alt: 'Équipe Nature Clean nettoyage fin de chantier professionnel Marseille',
    category: 'Fin de chantier',
    location: 'Marseille & PACA',
    date: 'Février 2026',
    image: IMAGES.finChantierEquipe,
    desc: 'Notre équipe sur le terrain à Marseille. Aspirateurs industriels, monobrosse, produits éco-certifiés et matériel de protection : on n\'improvise pas, on prépare chaque intervention. La rigueur, c\'est ce qui sépare un nettoyage ordinaire d\'une vraie remise en état.',
    link: '/services/nettoyage-chantiers',
    color: 'amber',
  },
  {
    id: 'real-8',
    title: 'Entreprise de nettoyage Marseille 13008',
    alt: 'Entreprise nettoyage professionnel Marseille 13008 - Nature Clean',
    category: 'Santé & Bureaux',
    location: 'Marseille 13008',
    date: 'Février 2026',
    image: IMAGES.entrepriseNettoyage13008,
    desc: 'Le 8ème arrondissement de Marseille concentre entreprises, professions libérales et résidences haut de gamme. Nos équipes y interviennent régulièrement pour l\'entretien de bureaux et parties communes. Contrats sur mesure, ponctualité garantie.',
    link: '/services/entretien-bureaux',
    color: 'green',
  },
  /* ── JANVIER 2026 ─── */
  {
    id: 'real-3',
    title: 'Nettoyage fin de chantier Marseille',
    alt: 'Nettoyage fin de chantier à Marseille - entreprise spécialisée Nature Clean',
    category: 'Fin de chantier',
    location: 'Marseille 13000',
    date: 'Janvier 2026',
    image: IMAGES.finChantierMarseille,
    desc: 'Marseille construit, rénove, se réinvente sans arrêt. Nous sommes là pour le dernier maillon de cette chaîne : le nettoyage de fin de chantier. Rapide, méthodique, tous arrondissements, résidentiel et tertiaire confondus. Devis sous 24h.',
    link: '/services/nettoyage-chantiers',
    color: 'amber',
  },
  {
    id: 'real-9',
    title: 'Hygiène locaux de santé — Protocole renforcé',
    alt: 'Hygiène et nettoyage locaux de santé Marseille - Nature Clean',
    category: 'Santé & Bureaux',
    location: 'Marseille',
    date: 'Janvier 2026',
    image: IMAGES.hygieneLocauxSante,
    desc: 'Les locaux médicaux et paramédicaux marseillais exigent bien plus qu\'un passage de serpillière. Désinfection certifiée, produits virucides et bactéricides à spectre large, traçabilité des interventions. Nous respectons les protocoles exigés par les ARS et les ordres professionnels.',
    link: '/services/entretien-bureaux',
    color: 'green',
  },
  /* ── DÉCEMBRE 2025 ─── */
  {
    id: 'real-4',
    title: 'Nettoyage chantier Marseille 13 — Résidentiel',
    alt: 'Nettoyage fin de chantier Marseille 13 arrondissements - Nature Clean',
    category: 'Fin de chantier',
    location: 'Marseille (13)',
    date: 'Décembre 2025',
    image: IMAGES.finChantierMarseille13,
    desc: 'Des 1er aux 16ème arrondissements, Marseille reste notre terrain de jeu. Ici, une livraison résidentielle dans un secteur en pleine densification. Réactivité maximale, présence garantie même en période de fêtes. Le chantier finit, on s\'en charge.',
    link: '/services/nettoyage-chantiers',
    color: 'amber',
  },
  /* ── NOVEMBRE 2025 ─── */
  {
    id: 'real-5',
    title: 'Nettoyage fin de chantier Cassis — Secteur Calanques',
    alt: 'Nettoyage fin de chantier Cassis et secteur Calanques - Nature Clean',
    category: 'Fin de chantier',
    location: 'Cassis 13260',
    date: 'Novembre 2025',
    image: IMAGES.finChantierCassis,
    desc: 'À deux pas des Calanques, Cassis est un terrain exigeant : les clients y sont attentifs aux détails et les matériaux de construction parfois nobles. Nettoyage fin de chantier sur-mesure, produits adaptés aux surfaces en pierre locale et aux menuiseries aluminium côtières.',
    link: '/services/nettoyage-chantiers',
    color: 'amber',
  },
  /* ── OCTOBRE 2025 ─── */
  {
    id: 'real-6',
    title: 'Nettoyage après travaux — Résidence PACA',
    alt: 'Nettoyage fin de chantier professionnel PACA - Nature Clean Marseille',
    category: 'Fin de chantier',
    location: 'Région PACA',
    date: 'Octobre 2025',
    image: IMAGES.nettoyageFinChantier,
    desc: 'Une résidence neuve livrée en PACA. Depuis l\'Étang-de-Berre jusqu\'à Aubagne, notre zone d\'intervention couvre tout l\'arc méditerranéen. Dépoussiérage, nettoyage des vitres, des sols et des sanitaires. Devis gratuit sous 24h, présence le jour J.',
    link: '/services/nettoyage-chantiers',
    color: 'amber',
  },
];

const colorMap: Record<string, string> = {
  amber: 'bg-amber-100 text-amber-700',
  green: 'bg-green-100 text-green-700',
  purple: 'bg-purple-100 text-purple-700',
  cyan: 'bg-cyan-100 text-cyan-700',
  blue: 'bg-blue-100 text-blue-700',
};

/* Onglets de filtrage — extraits dynamiquement des donnees */
const FILTER_ALL = 'Tous';
const filterCategories = [
  FILTER_ALL,
  ...Array.from(new Set(realisations.map((r) => r.category))),
];

const realisationCategories = [
  { icon: Briefcase, title: 'Entretien de bureaux', link: '/services/entretien-bureaux' },
  { icon: Store, title: 'Nettoyage de commerces et magasins', link: '/services/nettoyage-commerces' },
  { icon: Building2, title: 'Nettoyage de coproprietes', link: '/services/nettoyage-coproprietes' },
  { icon: HardHat, title: 'Nettoyage de chantiers', link: '/services/nettoyage-chantiers' },
  { icon: Users, title: 'Nettoyage evenementiel', link: '/services/nettoyage-evenementiel' },
  { icon: Home, title: 'Remise en etat des sols', link: '/services/remise-etat-sols' },
];

export function RealisationsPage() {
  const [activeFilter, setActiveFilter] = useState(FILTER_ALL);

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
        title="Nos Réalisations Nettoyage Marseille"
        subtitle="Decouvrez nos prestations de nettoyage ecologique a Marseille et en PACA"
        imageSrc={IMAGES.nettoyageFinChantier}
        imageAlt="Realisations nettoyage professionnel Marseille - Portfolio projets reussis Nature Clean"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Realisations' },
        ]}
      />

      {/* Galerie Portfolio */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <p className="text-lg text-gray-600 leading-relaxed">
                <strong>Nature Clean</strong> intervient depuis 2021 aupres de professionnels et particuliers
                sur Marseille et ses environs. Voici un apercu de nos realizations recentes.
              </p>
            </div>
          </ScrollReveal>

          {/* Onglets de filtrage */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto">
            {filterCategories.map((cat) => {
              const isActive = activeFilter === cat;
              const count = cat === FILTER_ALL
                ? realisations.length
                : realisations.filter((r) => r.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`
                    inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm transition-all duration-200
                    ${isActive
                      ? 'bg-green-700 text-white shadow-md shadow-green-700/20'
                      : 'bg-gray-100 text-gray-600 hover:bg-green-50 hover:text-green-700'
                    }
                  `}
                >
                  {cat === FILTER_ALL && <LayoutGrid className="w-3.5 h-3.5" />}
                  {cat}
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20' : 'bg-gray-200 text-gray-500'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Compteur de resultats */}
          <p className="text-center text-sm text-gray-400 mb-6">
            {filtered.length} realisation{filtered.length > 1 ? 's' : ''} affichee{filtered.length > 1 ? 's' : ''}
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {filtered.map((real, i) => (
              <div
                key={real.id}
                className="ncm-grid-item-appear"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <Link
                  to={real.link}
                  className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-56 overflow-hidden">
                    <ImageWithFallback
                      src={real.image}
                      alt={(real as { alt?: string }).alt ?? real.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      loading="lazy"
                      decoding="async"
                      width={600}
                      height={400}
                    />

                    {/* Gradient cinématique — renforce la lisibilité du badge */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* Reflet lumineux au hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-white/0 group-hover:from-white/5 group-hover:via-white/0 group-hover:to-transparent transition-all duration-700" />

                    {/* Badge catégorie — haut gauche */}
                    <div className="absolute top-3 left-3">
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm ring-1 ring-white/20 ${colorMap[real.color] || 'bg-gray-100/90 text-gray-700'}`}>
                        {real.category === 'Fin de chantier' && (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
                        )}
                        {real.category === 'Santé & Bureaux' && (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd"/></svg>
                        )}
                        {real.category === 'Commerces & Terrasses' && (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z"/></svg>
                        )}
                        {real.category === 'Evenementiel' && (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/></svg>
                        )}
                        {real.category === 'Copropriétés' && (
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/></svg>
                        )}
                        {real.category}
                      </span>
                    </div>

                    {/* Badge "Photo réelle" — haut droit, visible au hover */}
                    <div className="absolute top-3 right-3 translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="inline-flex items-center gap-1 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-md ring-1 ring-gray-200/50">
                        <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                        Photo réelle
                      </span>
                    </div>

                    {/* Localisation en bas — visible au hover */}
                    <div className="absolute bottom-0 left-0 right-0 px-4 py-3 translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white text-xs font-semibold flex items-center gap-1 drop-shadow">
                        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>
                        {real.location}
                      </p>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-black text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                      {real.title}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3 leading-relaxed">{real.desc}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {real.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {real.date}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carrousel Avant / Apres */}
      <BeforeAfterCarousel />

      {/* Categories de services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10 text-center">
              Nos domaines d'expertise
            </h2>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {realisationCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <ScrollReveal key={index} delay={index * 0.06}>
                  <Link
                    to={category.link}
                    className="group bg-white border border-gray-200 rounded-xl p-6 hover:border-green-400 hover:shadow-lg transition-all flex items-start gap-4"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-700 transition-colors">
                      <IconComponent className="w-6 h-6 text-green-600 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1 group-hover:text-green-700 transition-colors">
                        {category.title}
                      </h3>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        Voir le service <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chiffres cles */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-10 text-center">
                Notre engagement qualite
              </h2>

              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-4xl font-black text-green-600 mb-2">4+</div>
                  <p className="text-sm text-gray-600">Annees d'experience</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-4xl font-black text-green-600 mb-2">50%</div>
                  <p className="text-sm text-gray-600">Produits bio</p>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="text-4xl font-black text-green-600 mb-2">100%</div>
                  <p className="text-sm text-gray-600">Satisfaction client</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 md:py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-green-500 rounded-full blur-[100px]" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Un projet de nettoyage ?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Contactez-nous pour un devis gratuit et personnalise
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black shadow-lg shadow-green-500/20">
                <Link to="/devis">
                  Demander un devis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white/10 border border-white/20 text-white hover:bg-white/20 font-semibold">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>

            {/* Instagram */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <p className="text-gray-500 text-sm mb-4">Suivez nos interventions au quotidien</p>
              <a
                href="https://www.instagram.com/natureclean13/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 group"
                aria-label="Suivre Nature Clean sur Instagram"
              >
                <span className="w-11 h-11 rounded-full flex items-center justify-center bg-gradient-to-br from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </span>
                <span className="text-left">
                  <span className="block text-white font-black group-hover:text-green-400 transition-colors">@natureclean13</span>
                  <span className="block text-gray-500 text-xs">Nos chantiers en direct sur Instagram</span>
                </span>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}