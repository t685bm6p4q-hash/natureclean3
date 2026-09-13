import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { CheckCircle2, Briefcase, Trash2, Sparkles, Wind, Square, Droplets } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { IMAGES } from '@/app/utils/images';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { NATURE_CLEAN_PROVIDER } from '@/app/utils/cleaning-service-jsonld';

const FAQ_ITEMS: FAQItem[] = [
  { question: 'À quelle fréquence faut-il nettoyer des bureaux professionnels ?', answer: 'Sur le terrain, on observe deux réalités. Un open space de plus de 10 postes accumule quotidiennement poussière fine, résidus de café et micro-particules de toner — un passage quotidien est indispensable. Pour les petits bureaux, 2 à 3 interventions par semaine suffisent. Depuis la révision de la norme NF X50-790 en 2021, les cahiers des charges de propreté tertiaire intègrent explicitement la désinfection des surfaces tactiles à haute fréquence. On définit ensemble le planning lors du devis.' },
  { question: 'Pouvez-vous intervenir en dehors des heures de bureau ?', answer: 'Oui, et c\'est même notre mode opératoire standard. Nos équipes interviennent de 6h à 22h, 7 jours sur 7. La majorité de nos clients préfèrent un passage avant 8h ou après 19h. À Marseille, on travaille souvent en binôme sur les grands open spaces : l\'un démarre par les sanitaires avec la Kärcher Puzzi 30/4 pour l\'injection-extraction des moquettes, l\'autre enchaîne sur les bureaux. On s\'adapte entièrement à vos contraintes horaires.' },
  { question: 'Les produits de nettoyage sont-ils fournis ?', answer: 'Oui, nous fournissons l\'intégralité des produits. Nos dégraissants de surfaces sont certifiés Ecolabel Européen (n°SE/011/002 pour la gamme Ecover Pro que nous utilisons). Pour les sanitaires, on applique un désinfectant bactéricide conforme à la norme EN 1276. Vous n\'avez rien à fournir ni à stocker — et vos équipes n\'auront pas de produits chimiques agressifs sous la main.' },
  { question: 'Proposez-vous un contrat sans engagement ?', answer: 'On propose une période d\'essai de 4 semaines, sans engagement de durée. Après validation, les contrats sont résiliables avec 1 mois de préavis. Franchement, c\'est la qualité constante du résultat qui fidélise nos clients — pas une clause contractuelle.' },
  { question: 'Quelles zones de bureaux nettoyez-vous exactement ?', answer: 'L\'intégralité des locaux : open spaces, bureaux individuels, salles de réunion, sanitaires, cuisines/espaces détente, halls d\'accueil, vitrages intérieurs et parking si nécessaire. Un cahier des charges détaillé est établi avec vous — on précise notamment la fréquence de désinfection des surfaces tactiles (claviers, poignées) qui a été revue à la hausse depuis 2021.' },
];

const services = [
  {
    icon: Briefcase,
    title: 'Entretien des postes de travail',
    description: 'Ce qu\'on voit souvent sur le terrain, c\'est que les claviers et téléphones sont les surfaces les plus contaminées d\'un bureau — bien plus que les poignées de porte. On applique un désinfectant bactericide EN 1276 sur ces surfaces après chaque dépoussiérage.',
    features: [
      'Dépoussiérage micro-fibre des bureaux, étagères et écrans',
      'Désinfection EN 1276 des claviers, souris et combinés téléphoniques',
      'Nettoyage des matériels informatiques sans humidité résiduelle'
    ]
  },
  {
    icon: Sparkles,
    title: 'Désinfection des surfaces tactiles',
    description: 'Depuis la mise à jour des protocoles de désinfection post-2020, on désinfecte systématiquement toutes les surfaces à contact fréquent avec un produit virucide conforme EN 14476. Ça prend 3 minutes de plus par zone — et ça fait toute la différence.',
    features: [
      'Boutons d\'ascenseur et interrupteurs',
      'Rampes de balustrades et poignées de porte',
      'Distributeurs automatiques et surfaces partagées'
    ]
  },
  {
    icon: Trash2,
    title: 'Gestion des déchets',
    description: 'Le tri sélectif n\'est plus une option depuis les obligations du décret 2016-288. On gère la sortie quotidienne des poubelles et le tri en respectant les filières locales de la Métropole Aix-Marseille-Provence.',
    features: [
      'Vidage quotidien et tri sélectif conforme au décret 2016-288',
      'Remplacement des sacs avec matériaux compatibles filière jaune',
      'Gestion des DASRI si activité médicale ou para-médicale'
    ]
  },
  {
    icon: Wind,
    title: 'Entretien de moquettes',
    description: 'Une moquette de bureau capture en moyenne 10 fois plus de poussière et d\'allergènes qu\'un sol dur. On utilise la Kärcher Puzzi 30/4 en injection-extraction pour un séchage en moins de 2h — vos équipes peuvent revenir dans la journée.',
    features: [
      'Aspiration quotidienne avec aspirateur HEPA classe H',
      'Injection-extraction Kärcher Puzzi 30/4 (mensuel ou selon besoin)',
      'Traitement ciblé des taches : café, encre, graisse de cuisine'
    ]
  },
  {
    icon: Square,
    title: 'Lavage de vitres',
    description: 'À Marseille, le calcaire de l\'eau et les remontées salines du bord de mer créent un dépôt opaque sur les vitrages en moins de 3 semaines. On travaille avec un perche télescopique et eau déminéralisée pour un résultat sans traces durables.',
    features: [
      'Lavage eau déminéralisée anti-calcaire pour vitrages intérieurs et extérieurs',
      'Traitement anti-traces adapté au climat méditerranéen',
      'Accès en hauteur sécurisé conforme PPSPS'
    ]
  },
  {
    icon: Droplets,
    title: 'Hygiène des sanitaires',
    description: 'Les sanitaires sont l\'espace où la contamination croisée est la plus rapide. On désinfecte avec des produits Ecover Pro certifiés Ecolabel Européen n°SE/011/002, bactéricides EN 1276 et fongicides EN 1650. Résultat propre sans odeur chimique.',
    features: [
      'Nettoyage complet : lavabos, cuvettes, urinoirs, robinetterie',
      'Désinfection EN 1276 + EN 1650 (bactéricide + fongicide)',
      'Réapprovisionnement savon, papier et diffuseurs de salle'
    ]
  }
];

export function EntretienBureauxPage() {
  return (
    <>
      <SEO_Guardian currentSection="entretien-bureaux" faqItems={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Entretien de Bureaux à Marseille",
          "description": "Nettoyage professionnel et régulier de bureaux, open-spaces et locaux commerciaux à Marseille. Produits écologiques et horaires flexibles.",
          "provider": NATURE_CLEAN_PROVIDER,
          "areaServed": {
            "@type": "City",
            "name": "Marseille"
          },
          "serviceType": "Entretien de bureaux et locaux professionnels",
          "url": "https://natureclean.fr/services/entretien-bureaux"
        })
      }} />

      <ServicePageHero
        title="Nettoyage de Bureaux à Marseille"
        subtitle="Un environnement sain pour des équipes performantes et des clients séduits"
        badge="Contrats récurrents"
        badgeIcon={<Briefcase className="w-4 h-4" />}
        imageSrc={IMAGES.entrepriseBureauxMarseille}
        imageAlt="Entreprise nettoyage bureaux et locaux professionnels Marseille - Nature Clean service de qualité"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Entretien de bureaux' },
        ]}
        devisLink="/devis?service=bureaux"
      />

      {/* Introduction — ambient background */}
      <section className="relative py-16 bg-white overflow-hidden">
        <ImageWithFallback
          src={IMAGES.entrepriseBureauxMarseille}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] hidden md:block"
          loading="lazy" decoding="async" width={800} height={450}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-gray-700 leading-relaxed">
                <p className="text-lg">
                  <strong>Entrepreneurs</strong>, <strong>gérants de commerces</strong> et <strong>responsables d'espaces tertiaires</strong> : 
                  un local propre, c'est 3 secondes pour convaincre — ou perdre — un client qui pousse votre porte.
                </p>
                <p>
                  Depuis 15 ans, nos équipes interviennent sur Marseille, La Valentine, Aubagne et le bassin économique de Vitrolles. On travaille tôt le matin ou en soirée avec des autolaveuses autoportées <strong>Kärcher B 60 W</strong> sur les grandes surfaces, et des produits désinfectants <strong>Ecover Pro</strong> certifiés <strong>Ecolabel Européen n°SE/011/002</strong> sur les zones sensibles.
                </p>
                <p className="font-semibold text-green-700">
                  Devis sous 24h — Interventions en horaires décalés 6h/22h
                </p>
              </div>

              <div className="bg-green-50 p-8 rounded-lg border-2 border-green-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Le + Nature Clean</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-gray-700"><strong>Horaires décalés</strong> — 6h à 22h, 7j/7, sans perturber vos équipes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-gray-700"><strong>Produits certifiés</strong> Ecolabel Européen n°SE/011/002 (Ecover Pro) — biodégradables, sans résidu toxique</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-gray-700"><strong>Matériel professionnel</strong> Kärcher — autolaveuses B 60 W et extracteurs Puzzi 30/4</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nos services — cartes avec mini-hero images */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
                Propreté et hygiène pour vos espaces professionnels
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                Chaque espace reçoit un ménage adapté et une attention spécifique à ses besoins
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {([
                { icon: Briefcase, title: 'Postes de travail', image: IMAGES.entrepriseBureauxMarseille, imagePosition: 'center', items: [
                  { bold: 'Dépoussiérage', text: 'informatique, mobilier et surfaces' },
                  { bold: 'Désinfection', text: 'des claviers, souris et écrans' },
                  { bold: 'Nettoyage', text: 'des téléphones et accessoires' },
                ]},
                { icon: Wind, title: 'Sols', image: IMAGES.solsBureauxPro, imagePosition: 'center', items: [
                  { bold: 'Entretien', text: 'de moquettes, parquets et carrelages' },
                  { bold: 'Aspiration', text: 'en profondeur avec matériel professionnel' },
                  { bold: 'Traitement', text: 'des taches et séchage rapide' },
                ]},
                { icon: Droplets, title: 'Sanitaires', image: IMAGES.salleBainDesinfection, imagePosition: 'center bottom', items: [
                  { bold: 'Nettoyage profond', text: 'et désinfection' },
                  { bold: 'Gestion', text: 'des consommables (savon, papier)' },
                  { bold: 'Produits', text: 'écologiques et hypoallergéniques' },
                ]},
                { icon: Square, title: 'Vitrines', image: IMAGES.lavageVitrine, imagePosition: 'center', items: [
                  { bold: 'Lavage', text: 'haute visibilité pour vos commerces' },
                  { bold: 'Nettoyage', text: 'intérieur et extérieur des vitrages' },
                  { bold: 'Traitement', text: 'anti-traces pour un résultat durable' },
                ]},
              ] as const).map((card, i) => (
                <ScrollReveal key={card.title} delay={i * 0.08}>
                  <div className="relative bg-white rounded-2xl shadow-md border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all h-full overflow-hidden">
                    <div className="relative h-28 overflow-hidden">
                      <ImageWithFallback
                        src={card.image}
                        alt="" aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover"
                        style={{ objectPosition: card.imagePosition }}
                        loading="lazy" decoding="async" width={400} height={150}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-transparent to-white/80" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 bg-white/90 rounded-xl flex items-center justify-center shadow-lg">
                          <card.icon className="w-6 h-6 text-green-600" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-black text-gray-900 mb-3">{card.title}</h3>
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
          </div>
        </div>
      </section>

      {/* ═══ MID-PAGE CONVERSION BREAK ═══ */}
      <ConversionBreak
        image={IMAGES.entrepriseBureauxMarseille}
        imageAlt="Bureaux professionnels entretenus par Nature Clean Marseille"
        title="Vos bureaux méritent un entretien professionnel"
        subtitle="Intervention en horaires décalés pour zéro perturbation de votre activité"
        urgencyText="Devis en 2h"
        devisLink="/devis?service=bureaux"
      />

      {/* Services détaillés — ambient background */}
      <section className="relative py-16 bg-white overflow-hidden">
        <ImageWithFallback
          src={IMAGES.entrepriseBureauxMarseille}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.03] hidden md:block"
          loading="lazy" decoding="async" width={800} height={450}
        />
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Nos prestations de ménage et d'entretien de bureaux
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <Card key={index} className="hover:shadow-xl transition-shadow border-green-100">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <IconComponent className="w-7 h-7 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm text-gray-700">
                          <span className="text-green-600 mr-2">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ FAQ CONTEXTUELLE ═══ */}
      <FAQSection
        items={FAQ_ITEMS}
        title="Questions fréquentes — Entretien de bureaux"
        subtitle="Tout savoir sur notre service de nettoyage de bureaux à Marseille"
      />

      {/* Consultez également */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Consultez également :</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link to="/services/nettoyage-commerces">Nettoyage de commerces et magasins</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link to="/services/remise-etat-sols">Remise en état des sols</Link>
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