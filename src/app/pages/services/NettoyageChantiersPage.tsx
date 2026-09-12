import { ConversionBreak } from '@/app/components/ConversionBreak';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import { Phone, Trash2, Sparkles, Droplets, CheckCircle2, HardHat, Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { IMAGES } from '@/app/utils/images';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { ScrollReveal } from '@/app/components/ScrollReveal';

const FAQ_ITEMS: FAQItem[] = [
  { question: 'Quel est le délai d\'intervention pour un nettoyage fin de chantier ?', answer: 'En général, on mobilise une équipe sous 48 à 72h après votre demande. Pour les urgences — remise des clés promoteur, visite de réception — on peut être là en 24h. Le vrai problème sur les chantiers marseillais, c\'est souvent la coordination avec les autres corps de métier. On règle ça dès le premier appel.' },
  { question: 'Évacuez-vous les gravats et déchets de chantier ?', answer: 'Oui. On évacue les menus gravats, résidus de plâtre, voiles de ciment et retombées de peinture. Pour les gros volumes, on coordonne avec nos partenaires de bennes agréés selon la réglementation du Plan Régional de Prévention et Gestion des Déchets du Bâtiment (PRPGDB PACA, révision 2023). Tri à la source inclus.' },
  { question: 'Nettoyez-vous après des travaux de rénovation chez un particulier ?', answer: 'Absolument. Rénovation de salle de bain, extension, ravalement — on s\'adapte. Ce qu\'on voit souvent, c\'est une couche de poussière de plâtre sur toutes les surfaces, y compris les interstices de parquet. On utilise un aspirateur HEPA classe H (rétention 99,995%) pour éviter la remise en suspension des particules fines.' },
  { question: 'Combien coûte un nettoyage fin de chantier pour un programme neuf ?', answer: 'Le tarif dépend du nombre de lots, de la surface totale et de l\'état de propreté initial. Pour un programme de 50 à 200 logements, on établit un devis détaillé gratuit après visite technique du site. On fournit aussi un certificat de nettoyage conforme aux exigences des promoteurs et des assurances Dommages-Ouvrage.' },
  { question: 'Travaillez-vous avec les promoteurs immobiliers ?', answer: 'Oui, et c\'est une grande partie de notre activité sur le secteur Marseille-Aubagne. On respecte les délais de livraison et on fournit un certificat de nettoyage signé à la fin de chaque intervention — un document que les assureurs Dommages-Ouvrage peuvent exiger.' },
];

export function NettoyageChantiersPage() {
  return (
    <>
      <SEO_Guardian currentSection="nettoyage-chantiers" faqItems={FAQ_ITEMS}  disableReviews={true} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Nettoyage Fin de Chantier à Marseille",
          "description": "Remise en état après travaux, nettoyage de fin de chantier, évacuation de gravats et dépoussiérage complet pour professionnels et particuliers.",
          "provider": {
            "@type": "LocalBusiness",
            "name": "Nature Clean Marseille"
          },
          "areaServed": {
            "@type": "City",
            "name": "Marseille"
          },
          "serviceType": "Nettoyage fin de chantier et remise en état après travaux",
          "url": "https://natureclean.fr/services/nettoyage-chantiers"
        })
      }} />

      <ServicePageHero
        title="Nettoyage Fin de Chantier Marseille"
        subtitle="La touche finale indispensable avant la remise des cles"
        badge="Interventions ponctuelles"
        badgeIcon={<HardHat className="w-4 h-4" aria-hidden="true" />}
        imageSrc="https://res.cloudinary.com/dc9xmxpvv/image/upload/v1777394479/nettoyage-fin-de-chantier-maison_zlarzz.jpg"
        imageAlt="Nettoyage fin de chantier maison Marseille après travaux — remise en état Nature Clean"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Nettoyage fin de chantier' },
        ]}
        devisLink="/devis?service=fin-chantier"
      />

      {/* Introduction — ambient background */}
      <section className="relative py-16 md:py-20 bg-white overflow-hidden">
        <ImageWithFallback
          src={IMAGES.finChantierMaison}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] hidden md:block"
          loading="lazy" decoding="async" width={800} height={450}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                <strong>Professionnels du BTP</strong>, <strong>artisans</strong> et <strong>particuliers</strong> :
                un chantier livré propre, c'est votre réputation qui parle avant même que le client ouvre la bouche.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                On intervient après vos travaux pour une <strong>livraison conforme</strong> et irréprochable. Voile de ciment sur les carrelages, résidus de colle époxy sur les sols en résine, poussière de plâtre incrustée dans les huisseries — rien ne nous surprend. On sort la <strong>Kärcher HD 13/35-4 triphasée</strong> quand la situation le demande, ou l'aspirateur <strong>HEPA classe H</strong> pour les finitions sensibles.
              </p>
              <p className="font-bold text-green-700 text-lg mb-8">
                Intervention rapide pour respecter vos délais de livraison
              </p>
              <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 font-bold shadow-md">
                <Link to="/devis?service=fin-chantier">
                  Demander un devis gratuit
                  <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Nos interventions — cartes avec mini-hero images */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
                Remise en propreté et hygiène après travaux
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                Du gros oeuvre aux finitions, chaque étape bénéficie d'un ménage et d'un entretien adapté
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {([
                { icon: Trash2, title: 'Évacuation', image: IMAGES.appartAvantChantier, items: [
                  { bold: 'Retrait', text: 'des menus gravats et résidus de matériaux' },
                  { bold: 'Élimination', text: 'de la sciure, colle et plâtre' },
                  { bold: 'Tri', text: 'et recyclage selon les normes en vigueur' },
                ]},
                { icon: Sparkles, title: 'Sols & Murs', image: IMAGES.cuisineApresTravaux, items: [
                  { bold: 'Élimination', text: 'du voile de ciment et laitance' },
                  { bold: 'Retrait', text: 'des traces de peinture et plâtre' },
                  { bold: 'Lessivage', text: 'avec produits adaptés à chaque surface' },
                ]},
                { icon: Droplets, title: 'Vitres', image: IMAGES.cuisineLivraisonValentine, items: [
                  { bold: 'Nettoyage complet', text: 'des vitrages et cadres' },
                  { bold: 'Retrait', text: 'des autocollants de protection' },
                  { bold: 'Nettoyage', text: 'des rails et joints encrassés' },
                ]},
                { icon: Package, title: 'Détails Techniques', image: IMAGES.remiseEtatAppartMarseille, items: [
                  { bold: 'Désinfection', text: 'des prises et interrupteurs' },
                  { bold: 'Nettoyage', text: 'des radiateurs et luminaires' },
                  { bold: 'Dépoussiérage', text: 'complet de tous les espaces' },
                ]},
              ] as const).map((card, i) => (
                <ScrollReveal key={card.title} delay={i * 0.08}>
                  <div className="relative bg-white rounded-2xl shadow-md border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all h-full overflow-hidden">
                    <div className="relative h-28 overflow-hidden">
                      <ImageWithFallback
                        src={card.image}
                        alt="" aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover"
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

            {/* L'engagement Nature Clean */}
            <ScrollReveal delay={0.2}>
              <div className="bg-green-50 p-8 rounded-lg border-2 border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <HardHat className="w-8 h-8 text-green-600" aria-hidden="true" />
                  <h3 className="text-2xl font-bold text-gray-900">L'engagement Nature Clean</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6 text-gray-700">
                  <div>
                    <p className="font-semibold text-green-700 mb-2">Équipe réactive</p>
                    <p className="text-sm">Mobilisation sous 24h pour les urgences de livraison — Marseille, Aubagne, La Ciotat</p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-700 mb-2">Sécurité PPSPS</p>
                    <p className="text-sm">EPI conformes, protocoles de sécurité chantier et coordination avec le CSPS si nécessaire</p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-700 mb-2">Traçabilité documentaire</p>
                    <p className="text-sm">Certificat de nettoyage signé — requis par les assureurs Dommages-Ouvrage et les promoteurs</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ MID-PAGE CONVERSION BREAK ═══ */}
      <ConversionBreak
        image={IMAGES.finChantierAppartement}
        imageAlt="Nettoyage fin de chantier appartement Marseille - sols impeccables Nature Clean"
        title="Livrez un chantier impeccable à vos clients"
        subtitle="Intervention rapide pour respecter vos délais — Devis gratuit sous 24h"
        urgencyText="Créneaux disponibles cette semaine"
        objectPosition="object-center"
        devisLink="/devis?service=fin-chantier"
      />

      {/* ═══ GALERIE RÉALISATIONS ═══ */}
      <section className="py-16 md:py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 text-center">
                Nos chantiers livrés
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                Chaque photo est une intervention réelle réalisée par nos équipes — appartements, maisons, programmes neufs sur Marseille et la région PACA.
              </p>
            </ScrollReveal>

            {/* Grille 3 colonnes — photos authentiques, sans mise en scène */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {([
                { src: IMAGES.nettoyageFinChantier, alt: 'Nettoyage fin de chantier Marseille — Nature Clean', label: 'Chantier Marseille' },
                { src: IMAGES.finChantierAppartement, alt: 'Fin de chantier appartement — remise en état après travaux', label: 'Appartement neuf' },
                { src: IMAGES.finChantierMaison, alt: 'Nettoyage fin de chantier maison individuelle PACA', label: 'Maison individuelle' },
                { src: IMAGES.finChantierEquipe, alt: 'Équipe Nature Clean sur chantier de fin de travaux', label: 'Notre équipe en action' },
                { src: IMAGES.finChantierMarseille, alt: 'Fin de chantier Marseille — livraison impeccable Nature Clean', label: 'Marseille 13' },
                { src: IMAGES.finChantierCassis, alt: 'Nettoyage fin de chantier Cassis — Nature Clean', label: 'Cassis' },
              ] as const).map((photo, i) => (
                <ScrollReveal key={photo.label} delay={i * 0.07}>
                  <div className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all aspect-[4/3]">
                    <ImageWithFallback
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy" decoding="async" width={600} height={450}
                    />
                    {/* Label discret — localisation uniquement, pas de jugement de valeur */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4">
                      <span className="text-white text-sm font-semibold">{photo.label}</span>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Note honnête sur les avant/après */}
            <ScrollReveal delay={0.2}>
              <p className="text-center text-sm text-gray-400 italic">
                Des photos avant/après de nos interventions seront ajoutées prochainement. En attendant, <a href={PHONE_HREF} className="text-green-600 underline hover:text-green-700">appelez-nous</a> pour voir nos références sur des chantiers similaires au vôtre.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Pour qui intervenons-nous — ambient background */}
      <section className="relative py-16 bg-white overflow-hidden">
        <ImageWithFallback
          src={IMAGES.equipeCamionnette}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] hidden md:block"
          loading="lazy" decoding="async" width={800} height={450}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Pour qui assurons-nous le ménage de fin de chantier ?
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {([
                { icon: HardHat, title: 'Entreprises BTP', image: IMAGES.appartAvantChantier, desc: 'Maçons, charpentiers, menuisiers et peintres qui souhaitent offrir une livraison propre' },
                { icon: Package, title: 'Artisans', image: IMAGES.finChantierAppartement, desc: 'Professionnels du bâtiment ayant besoin d\'un partenaire fiable pour la phase finale' },
                { icon: Sparkles, title: 'Particuliers', image: IMAGES.remiseEtatAppartMarseille, desc: 'Propriétaires gérant eux-mêmes leur rénovation et ayant besoin d\'un coup de pouce' },
              ] as const).map((card, i) => (
                <ScrollReveal key={card.title} delay={i * 0.08}>
                  <div className="relative bg-gray-50 rounded-2xl overflow-hidden shadow-md h-full">
                    <div className="relative h-24 overflow-hidden">
                      <ImageWithFallback
                        src={card.image}
                        alt="" aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy" decoding="async" width={400} height={120}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-transparent to-gray-50/80" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-10 h-10 bg-white/90 rounded-lg flex items-center justify-center shadow-lg">
                          <card.icon className="w-5 h-5 text-green-600" aria-hidden="true" />
                        </div>
                      </div>
                    </div>
                    <div className="p-5 text-center">
                      <h3 className="font-black text-gray-900 mb-2">{card.title}</h3>
                      <p className="text-sm text-gray-700">{card.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <div className="text-center">
              <p className="text-lg text-gray-700 mb-6">
                D'ailleurs, depuis la révision du <strong>Plan Régional de Prévention et Gestion des Déchets du Bâtiment PACA (2023)</strong>, le tri des déchets de chantier sur site est obligatoire. Nos équipes assurent ce tri à la source — un point de plus qui vous protège légalement lors de la réception.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 font-bold">
                  <Link to="/devis?service=fin-chantier">Devis gratuit sous 24h</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
                  <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                    <Phone className="w-5 h-5 mr-2" aria-hidden="true" />
                    {PHONE_DISPLAY}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final avec vraie photo */}
      <section className="relative py-16 md:py-20 bg-gray-900 overflow-hidden">
        <ImageWithFallback
          src={IMAGES.finChantierMarseille}
          alt="Chantier livré impeccable par Nature Clean Marseille"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          loading="lazy" decoding="async" width={1920} height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-gray-900/80" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Propreté garantie pour une livraison de chantier impeccable a Marseille
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Intervention dans les Bouches-du-Rhone et les Alpes-Maritimes
            </p>
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black shadow-lg shadow-green-500/20">
              <Link to="/devis?service=fin-chantier">
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
        title="Questions fréquentes — Fin de chantier"
        subtitle="Tout savoir sur notre service de nettoyage après travaux à Marseille"
      />

      {/* Services complémentaires */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Consultez également :</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/entretien-bureaux">Nettoyage de bureaux</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-coproprietes">Nettoyage de copropriétés</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/remise-etat-sols">Remise en état des sols</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}