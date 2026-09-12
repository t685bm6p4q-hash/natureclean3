import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Building2, Home, HardHat, Users, Sparkles, Store, Droplets, Package, Eraser, Heart } from 'lucide-react';
import { Link } from 'react-router';
import { IMAGES } from '@/app/utils/images';

const services = [
  {
    icon: Building2,
    title: 'Nettoyage de Bureaux & Locaux Professionnels',
    description: 'Entretien régulier ou ponctuel des espaces de travail, magasins et restaurants',
    details: [
      'Dépoussiérage des zones difficiles d\'accès',
      'Lavage des sols avec désinfectants professionnels adaptés',
      'Nettoyage complet des luminaires, moquettes, tapis et vitres',
      'Gestion complète des sanitaires avec renouvellement des fournitures',
      'Intervention flexible adaptée à vos horaires'
    ],
    image: IMAGES.entrepriseBureauxMarseille,
    keywords: 'Nettoyage bureaux Marseille, entretien locaux commerciaux 13',
    link: '/services/entretien-bureaux'
  },
  {
    icon: Home,
    title: 'Entretien de Copropriétés & Parties Communes',
    description: 'Service de ménage dédié aux syndics d\'immeubles et gestionnaires de copropriétés',
    details: [
      'Nettoyage approfondi des halls d\'entrée et espaces d\'accueil',
      'Entretien régulier des couloirs, escaliers et ascenseurs',
      'Nettoyage des zones de stationnement et parkings',
      'Aspiration et lessivage des sols pour garantir la satisfaction des locataires',
      'Protocoles d\'hygiène stricts pour espaces partagés'
    ],
    image: IMAGES.hallCoproBoites,
    keywords: 'Nettoyage copropriété Marseille, entretien parties communes 13',
    link: '/services/nettoyage-coproprietes'
  },
  {
    icon: HardHat,
    title: 'Fin de Chantier / Remise en État',
    description: 'Intervention spécialisée après construction, rénovation ou déménagement',
    details: [
      'Évacuation professionnelle des gravats et résidus de chantier',
      'Élimination des traces de peinture, plâtre, colle et voile de ciment',
      'Nettoyage méticuleux des murs, sols, plafonds et vitres',
      'Entretien des équipements (radiateurs, prises, interrupteurs)',
      'Remise en état impeccable pour livraison ou emménagement'
    ],
    image: IMAGES.finChantierMarseille,
    keywords: 'Nettoyage fin de chantier Marseille, remise en état après travaux 13',
    link: '/services/nettoyage-chantiers'
  },
  {
    icon: Users,
    title: 'Nettoyage pour Particuliers & Seniors',
    description: 'Ménage à domicile et accompagnement personnalisé pour les particuliers',
    details: [
      'Ménage régulier ou ponctuel de résidences privées',
      'Nettoyage complet après événements festifs',
      'Accompagnement spécialisé pour personnes âgées',
      'Garantie d\'un environnement sain et sécurisé',
      'Prévention des risques sanitaires liés à l\'hygiène domestique'
    ],
    image: IMAGES.remiseEtatAppartMarseille,
    keywords: 'Ménage particuliers Marseille, aide à domicile seniors 13',
    link: '/nettoyage-particuliers'
  },
  {
    icon: Store,
    title: 'Entretien de Commerces & Magasins',
    description: 'Hygiène et propreté adaptées aux espaces commerciaux',
    details: [
      'Nettoyage des vitrines et espaces d\'accueil',
      'Entretien régulier des zones de vente',
      'Désinfection des caisses et zones de contact',
      'Nettoyage des réserves et arrière-boutiques',
      'Horaires flexibles hors clientèle'
    ],
    image: IMAGES.jdSportMarseilleFloor,
    keywords: 'Nettoyage commerces Marseille, entretien magasins 13',
    link: '/services/nettoyage-commerces'
  },
  {
    icon: Sparkles,
    title: 'Propreté Événementielle',
    description: 'Solutions rapides de ménage et remise en état pour vos événements',
    details: [
      'Nettoyage pré et post-événement',
      'Intervention rapide et discrète',
      'Équipes disponibles en soirée et week-end',
      'Gestion des déchets et recyclage',
      'Remise en état express des lieux'
    ],
    image: IMAGES.salleEvenementielle,
    keywords: 'Nettoyage événementiel Marseille, services spécialisés propreté 13',
    link: '/services/nettoyage-evenementiel'
  },
  {
    icon: Droplets,
    title: 'Lavage de Vitres Professionnel',
    description: 'Vitrerie et entretien de surfaces vitrées',
    details: [
      'Nettoyage de vitres en hauteur',
      'Traitement des baies vitrées',
      'Nettoyage des vérandas et verrières',
      'Techniques professionnelles sans traces',
      'Matériel adapté et sécurisé'
    ],
    image: IMAGES.lavageVitrine,
    keywords: 'Nettoyage vitres Marseille, vitrerie professionnelle 13',
    link: '/services/nettoyage-vitre'
  },
  {
    icon: Package,
    title: 'Remise en État des Sols',
    description: 'Décapage, cristallisation et rénovation de sols',
    details: [
      'Décapage et ponçage de sols',
      'Cristallisation de marbre',
      'Traitement anti-dérapant',
      'Protection durable des surfaces',
      'Rénovation de tous types de revêtements'
    ],
    image: IMAGES.solMarbrePoli,
    keywords: 'Remise en état sols Marseille, décapage parquet 13',
    link: '/services/remise-etat-sols'
  },
  {
    icon: Eraser,
    title: 'Enlèvement de Graffitis',
    description: 'Effacement rapide de tags et nettoyage de façades',
    details: [
      'Intervention rapide sur tous supports',
      'Nettoyage par aérogommage ou chimique',
      'Respect des matériaux (pierre, verre, métal)',
      'Application de protection anti-graffiti',
      'Devis rapide pour professionnels et particuliers'
    ],
    image: IMAGES.nettoyageGraffitis,
    keywords: 'Enlèvement graffitis Marseille, nettoyage tag 13, aérogommage',
    link: '/services/nettoyage-graffitis'
  },
  {
    icon: Heart,
    title: 'Nettoyage Syndrome de Diogène',
    description: 'Désencombrement, désinfection et accompagnement humain pour un nouveau départ',
    details: [
      'Tri sélectif et évacuation vers centres agréés',
      'Désinfection virucide, bactéricide et fongicide',
      'Nettoyage approfondi et remise à neuf du logement',
      'Intervention discrète et bienveillante',
      'Accompagnement familial et syndics'
    ],
    image: IMAGES.appartVideLumineux,
    keywords: 'Nettoyage Diogène Marseille, désencombrement logement 13, syndrome Diogène',
    link: '/services/nettoyage-diogene'
  }
];

export function Services() {
  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Nos Services d'Entretien et de Nettoyage à Marseille
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Solutions complètes de ménage, d'entretien et de propreté pour professionnels et particuliers à Marseille et dans les Bouches-du-Rhône
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <article key={index} className="h-full">
                <Card className="hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      width={400}
                      height={192}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-green-700">{service.title}</CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.details.map((detail, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-green-600 mt-1 flex-shrink-0">✓</span>
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="text-xs text-gray-500 mt-4 italic" aria-label="Mots-clés SEO">
                      {service.keywords}
                    </p>
                  </CardContent>
                  <div className="p-4">
                    <Link to={service.link}>
                      <Button className="w-full bg-green-700 text-white hover:bg-green-800">
                        En savoir plus
                      </Button>
                    </Link>
                  </div>
                </Card>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}