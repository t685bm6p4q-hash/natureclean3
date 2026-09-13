import { IMAGES, getOptimizedCldUrl } from '@/app/utils/images';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import { Phone, Building2, DoorOpen, ArrowUpDown, Trash2, Shield, Leaf, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { NATURE_CLEAN_PROVIDER } from '@/app/utils/cleaning-service-jsonld';

const FAQ_ITEMS: FAQItem[] = [
  { question: 'Quelles parties communes nettoyez-vous en copropriété ?', answer: 'L\'ensemble des parties communes : halls d\'entrée, escaliers, paliers, ascenseurs, parkings, local poubelles, caves et espaces verts communs. Un cahier des charges précis est établi avec le syndic — on précise notamment la fréquence de désinfection des points de contact (rampes, boutons d\'ascenseur) conformément aux recommandations de l\'ANSES.' },
  { question: 'Pouvez-vous remplacer notre gardien pour l\'entretien ?', answer: 'Oui, on propose des contrats de substitution ou de complément. La vraie différence par rapport à un gardien seul, c\'est qu\'on arrive avec du matériel — autolaveuse Kärcher B 40 W pour les halls carrelés, aspirateurs HEPA pour les moquettes — et du personnel formé aux gestes professionnels. Le niveau de qualité est constant et contrôlé, quelle que soit l\'absence.' },
  { question: 'Comment fonctionne le contrat syndic ?', answer: 'On établit un contrat sur mesure avec le syndic ou le conseil syndical. Il précise la fréquence, les zones, les prestations et les horaires. Depuis la révision de la norme NF X50-790 (2021), les contrats d\'entretien d\'immeubles doivent intégrer un volet désinfection explicite — c\'est inclus par défaut chez nous.' },
  { question: 'Intervenez-vous pour les grandes résidences de plus de 100 lots ?', answer: 'Oui, on gère des copropriétés de 10 à plus de 200 lots. Pour les grandes résidences — on pense notamment à des programmes sur Aubagne, Plan-de-Cuques ou Allauch — on affecte une équipe dédiée et un responsable de site. Le suivi qualité est hebdomadaire, avec rapport transmis au syndic si demandé.' },
  { question: 'Les résidents peuvent-ils signaler un problème de propreté ?', answer: 'Oui. On met en place un numéro direct ou un email dédié pour les remontées des résidents ou du gardien. Réactivité garantie sous 24h. Sur le terrain, les problèmes les plus fréquents concernent le local poubelles — et c\'est justement là qu\'on est le plus rigoureux, car c\'est la zone à plus fort risque sanitaire.' },
];

export function NettoyageCoproprietesPage() {
  return (
    <>
      <SEO_Guardian currentSection="nettoyage-coproprietes" faqItems={FAQ_ITEMS} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "Nettoyage de Copropriétés à Marseille",
          "description": "Entretien régulier des parties communes, halls d'entrée, cages d'escalier et gestion des locaux poubelles pour les copropriétés et syndics.",
          "provider": NATURE_CLEAN_PROVIDER,
          "areaServed": {
            "@type": "City",
            "name": "Marseille"
          },
          "serviceType": "Nettoyage de copropriétés et parties communes",
          "url": "https://natureclean.fr/services/nettoyage-coproprietes"
        })
      }} />

      <ServicePageHero
        title="Nettoyage de Coproprietes a Marseille"
        subtitle="Syndics, coproprietaires et gestionnaires d'immeubles : confiez la proprete de vos parties communes a un partenaire de proximite."
        badge="Syndics & gestionnaires"
        badgeIcon={<Building2 className="w-4 h-4" aria-hidden="true" />}
        imageSrc={IMAGES.hallMarbreAscenseurs}
        imageAlt="Nettoyage coproprietes Marseille - Immeuble residentiel moderne avec facade et entree entretenus par Nature Clean"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Nettoyage de coproprietes' },
        ]}
        devisLink="/devis?service=coproprietes"
      />

      {/* ═══ INTRO TEXTE — ambient background ═══ */}
      <section className="relative py-16 md:py-20 bg-white overflow-hidden">
        <ImageWithFallback
          src={IMAGES.hallMarbreAscenseurs}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.04] hidden md:block"
          loading="lazy" decoding="async" width={800} height={450}
        />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
                <strong>Nature Clean</strong> intervient sur <strong>Marseille</strong>, <strong>Aubagne</strong>,{' '}
                <strong>Plan-de-Cuques</strong> et <strong>Allauch</strong> pour valoriser votre patrimoine immobilier et garantir un environnement sain aux résidents.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Halls, escaliers, ascenseurs, parkings, locaux poubelles — on assure l'entretien complet de vos parties communes avec des autolaveuses <strong>Kärcher B 40 W</strong> et des produits <strong>Ecover Pro</strong> certifiés <strong>Ecolabel Européen n°SE/011/002</strong>. Biodégradables, sans résidu irritant pour les résidents.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 font-bold shadow-md">
                  <Link to="/devis?service=coproprietes">
                    Demander un devis gratuit
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

      {/* ═══ NOS EXPERTISES — 4 cartes ═══ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
                Nos expertises d'entretien et d'hygiène pour vos parties communes
              </h2>
              <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
                Un plan de ménage adapte a chaque residence pour une propreté impeccable.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                {
                  icon: DoorOpen,
                  title: 'Halls & Escaliers',
                  items: [
                    { bold: 'Aspiration', text: 'des sols et moquettes' },
                    { bold: 'Lessivage', text: 'des surfaces et carrelages' },
                    { bold: 'Depoussierage', text: 'des rampes et plinthes' },
                  ],
                },
                {
                  icon: ArrowUpDown,
                  title: 'Ascenseurs & Vitres',
                  items: [
                    { bold: 'Nettoyage', text: 'des parois et miroirs' },
                    { bold: 'Vitrages d\'entree', text: 'haute brillance' },
                    { bold: 'Desinfection', text: 'des boutons tactiles' },
                  ],
                },
                {
                  icon: Building2,
                  title: 'Parkings & Abords',
                  items: [
                    { bold: 'Balayage', text: 'des zones de stationnement' },
                    { bold: 'Nettoyage', text: 'des exterieurs et jardins' },
                    { bold: 'Elimination', text: 'des graffitis' },
                  ],
                },
                {
                  icon: Trash2,
                  title: 'Gestion des Dechets',
                  items: [
                    { bold: 'Sortie/entree', text: 'des containers' },
                    { bold: 'Desinfection', text: 'des locaux poubelles' },
                    { bold: 'Maintenance', text: 'des zones de tri' },
                  ],
                },
              ].map((card, i) => (
                <ScrollReveal key={card.title} delay={i * 0.08}>
                  <div className="relative bg-white rounded-2xl shadow-md border border-gray-100 hover:border-green-200 hover:shadow-lg transition-all h-full overflow-hidden">
                    {/* Mini-hero image compressée avec forte opacité */}
                    <div className="relative h-28 overflow-hidden">
                      <ImageWithFallback
                        src={
                          ({
                            'Halls & Escaliers': IMAGES.parkingSouterrain,
                            'Ascenseurs & Vitres': IMAGES.cageEscalier,
                            'Parkings & Abords': IMAGES.hallClassiqueAscenseurs,
                            'Gestion des Dechets': IMAGES.cageEscalier,
                          } as Record<string, string>)[card.title] || IMAGES.hallCoproBoites
                        }
                        alt=""
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        width={400}
                        height={150}
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-transparent to-white/80" />
                      <div className="absolute bottom-0 left-0 right-0 flex items-end px-4 pb-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md border border-green-100">
                          <card.icon className="w-5 h-5 text-green-600" aria-hidden="true" />
                        </div>
                      </div>
                    </div>

                    {/* Contenu texte */}
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
        image={IMAGES.hallCoproBoites}
        imageAlt="Hall de copropriete avec boites aux lettres entretenu par Nature Clean"
        title="Copropriétaires, syndics : passez à l'action"
        subtitle="Confiez la propreté de vos parties communes à un partenaire de confiance à Marseille"
        urgencyText="Créneaux disponibles cette semaine"
        devisLink="/devis?service=coproprietes"
      />

      {/* ═══ SHOWCASE VISUEL — photos au MILIEU de page ═══ */}
      <section className="py-16 md:py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <ScrollReveal direction="left">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src={getOptimizedCldUrl('v1779383832/nettoyage-sol-marseile-nature-clean-marseille_ufer1m.jpg', 400)}
                      alt="Nettoyage sol copropriete Marseille - Nature Clean intervention professionnelle"
                      className="w-full h-[240px] object-cover object-top"
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={300}
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-xl mt-8">
                    <ImageWithFallback
                      src={IMAGES.cageEscalier}
                      alt="Cage d'escalier propre et lumineuse copropriete Marseille"
                      className="w-full h-[240px] object-cover"
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={300}
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-xl">
                    <ImageWithFallback
                      src={IMAGES.hallClassiqueAscenseurs}
                      alt="Hall classique avec ascenseurs entretenu professionnellement"
                      className="w-full h-[240px] object-cover"
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={300}
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-xl mt-8">
                    <ImageWithFallback
                      src={IMAGES.parkingSouterrain}
                      alt="Parking souterrain copropriete nettoye par Nature Clean"
                      className="w-full h-[240px] object-cover"
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={300}
                    />
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal direction="right">
                <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                  <Sparkles className="w-3 h-3" aria-hidden="true" />
                  Pourquoi Nature Clean ?
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                  Un partenaire de confiance pour le ménage de votre residence
                </h2>
                <div className="space-y-4 mb-8">
                  {[
                    { icon: Shield, title: 'Contrats sur-mesure', desc: 'Fréquences adaptées à vos besoins — quotidien pour les grandes résidences, hebdomadaire pour les plus petites copropriétés' },
                    { icon: CheckCircle2, title: 'Conformité NF X50-790', desc: 'Cahiers des charges conformes à la norme révisée en 2021, avec volet désinfection inclus par défaut' },
                    { icon: Leaf, title: 'Produits Ecolabel', desc: 'Gamme Ecover Pro certifiée Ecolabel Européen n°SE/011/002 — biodégradable, sans irritant pour les résidents' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-green-600" aria-hidden="true" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 font-bold shadow-md">
                  <Link to="/devis?service=coproprietes">
                    Devis gratuit sous 24h
                    <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
                  </Link>
                </Button>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CONTRAT PERSONNALISE ═══ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4 text-center">
                Confiez l'hygiène et la propreté de votre residence
              </h2>
              <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
                Notre contrat d'entretien personnalise s'adapte a votre copropriete
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-100 mb-10">
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    'Prestations de ménage detaillees et adaptees',
                    'Frequences d\'entretien modulables',
                    'Interventions de propreté a la demande 24/7',
                    'Professionnalisme et discretion garantis',
                    'Suivi qualite et supervision constante',
                    'Conformite aux normes d\'hygiene',
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="text-center">
                <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                  <strong>Nature Clean</strong> travaille en accord avec les réglementations en vigueur — norme <strong>NF X50-790 (révision 2021)</strong> sur les marchés de propreté, obligations du décret 2016-288 sur la gestion des déchets. Notre politique éco-responsable utilise exclusivement des produits certifiés <strong>Ecolabel Européen</strong>, traçables et biodégradables.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 font-bold shadow-md">
                    <Link to="/devis?service=coproprietes">
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
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ PHOTO LARGE — en bas de page ═══ */}
      <section className="relative py-16 md:py-20 bg-gray-900 overflow-hidden">
        <ImageWithFallback
          src={IMAGES.hallMarbreAscenseurs}
          alt="Hall de copropriété entretenu par Nature Clean Marseille"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          loading="lazy"
          decoding="async"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-gray-900/80" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
              Hygiène et propreté irréprochables pour des residents satisfaits
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Intervention sur Marseille, Aubagne, Aix-en-Provence et les Alpes-Maritimes
            </p>
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black shadow-lg shadow-green-500/20">
              <Link to="/devis?service=coproprietes">
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
        title="Questions fréquentes — Copropriétés"
        subtitle="Tout savoir sur l'entretien de vos parties communes à Marseille"
      />

      {/* ═══ SERVICES COMPLEMENTAIRES ═══ */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-xl font-black text-gray-900 mb-6 text-center">Consultez egalement :</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/entretien-bureaux">Nettoyage de bureaux</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-commerces">Nettoyage de commerces</Link>
            </Button>
            <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 font-bold">
              <Link to="/services/nettoyage-chantiers">Nettoyage fin de chantier</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}