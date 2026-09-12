/**
 * ZonesInterventionPage — Hub SEO geographique.
 * Agrege toutes les pages geo avec une carte visuelle des zones couvertes,
 * un maillage interne dense, et un contenu unique riche en mots-cles locaux.
 */

import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { FAQSection } from '@/app/components/FAQSection';
import { PacaInteractiveMap } from '@/app/components/PacaInteractiveMap';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Link } from 'react-router';
import {
  MapPin, ArrowRight, Phone, Building2, Home as HomeIcon,
  HardHat, Store, PartyPopper, Droplet, CheckCircle2, Leaf, Shield, Clock
} from 'lucide-react';
import { IMAGES } from '@/app/utils/images';
import { GEO_PAGES } from '@/app/utils/geoData';
import { AnimatedCounter } from '@/app/components/AnimatedCounter';
import type { FAQItem } from '@/app/components/FAQSection';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';

const FAQ_ITEMS: FAQItem[] = [
  { question: 'Dans quelles villes intervenez-vous ?', answer: 'Nature Clean intervient dans tous les arrondissements de Marseille (13001 a 13016), ainsi qu\'a Aix-en-Provence, Aubagne et La Ciotat dans les Bouches-du-Rhone.' },
  { question: 'Facturez-vous un supplement pour les interventions hors Marseille ?', answer: 'Non, nos tarifs sont identiques sur toute notre zone d\'intervention. Le deplacement est inclus dans le prix de la prestation, quel que soit le secteur geographique.' },
  { question: 'Quel est votre delai d\'intervention ?', answer: 'Nous garantissons des interventions sous 48h sur Marseille, Aix-en-Provence, Aubagne et La Ciotat. Pour les urgences, un delai de 24h est possible sur devis express.' },
  { question: 'Proposez-vous les memes services dans toutes les villes ?', answer: 'Oui, l\'integralite de notre catalogue (bureaux, coproprietes, chantiers, commerces, vitres, evenementiel, sols, particuliers) est disponible sur tous nos secteurs d\'intervention.' },
  { question: 'Comment demander un devis pour ma ville ?', answer: 'Appelez-nous au 04 84 89 68 75 ou utilisez notre formulaire de devis en ligne. Precisez votre adresse et le type de prestation souhaitee, nous vous repondrons sous 24h avec une proposition personnalisee.' },
];

/** Regroupement des zones pour la grille visuelle */
const ZONE_GROUPS = [
  {
    region: 'Marseille',
    department: '13 — Bouches-du-Rhone',
    color: 'green',
    cities: [
      { name: 'Marseille', postalCodes: '13001 a 13016', isMain: true, link: '/nettoyage-bureaux-marseille', services: 'Bureaux & tous services' },
      { name: 'Fin de chantier', postalCodes: '13000', link: '/nettoyage-fin-chantier-marseille', services: 'Chantiers' },
      { name: 'Industriel', postalCodes: '13000', link: '/nettoyage-industriel-marseille', services: 'Industriel' },
      { name: 'Medical', postalCodes: '13000', link: '/nettoyage-medical-marseille', services: 'Sante' },
    ],
  },
  {
    region: 'Pays d\'Aix & Est 13',
    department: '13 — Bouches-du-Rhone',
    color: 'emerald',
    cities: [
      { name: 'Aix-en-Provence', postalCodes: '13100', link: '/nettoyage-bureaux-aix-en-provence', services: 'Bureaux', isMain: true },
      { name: 'Aubagne', postalCodes: '13400', link: '/nettoyage-coproprietes-aubagne', services: 'Coproprietes' },
      { name: 'La Ciotat', postalCodes: '13600', link: '/nettoyage-coproprietes-la-ciotat', services: 'Coproprietes' },
    ],
  },
];

const SERVICE_ICONS: Record<string, typeof Building2> = {
  'Bureaux': Building2,
  'Coproprietes': HomeIcon,
  'Particuliers': HomeIcon,
  'Fin de chantier': HardHat,
  'Commerces': Store,
  'Evenementiel': PartyPopper,
  'Vitres': Droplet,
};

/** Index des pages geo groupe par departement — optimise pour le maillage interne et le crawl Googlebot */
const GEO_INDEX = [
  {
    dept: 'Bouches-du-Rhône (13)',
    color: 'green',
    pages: [
      { slug: 'nettoyage-bureaux-marseille', anchor: 'Nettoyage de bureaux à Marseille' },
      { slug: 'nettoyage-fin-chantier-marseille', anchor: 'Nettoyage fin de chantier à Marseille' },
      { slug: 'nettoyage-industriel-marseille', anchor: 'Nettoyage industriel à Marseille' },
      { slug: 'nettoyage-medical-marseille', anchor: 'Nettoyage médical à Marseille' },
      { slug: 'nettoyage-bureaux-aix-en-provence', anchor: 'Nettoyage de bureaux à Aix-en-Provence' },
      { slug: 'nettoyage-coproprietes-aubagne', anchor: 'Nettoyage de copropriétés à Aubagne' },
      { slug: 'nettoyage-coproprietes-la-ciotat', anchor: 'Nettoyage de copropriétés à La Ciotat' },
    ],
  },
];

export function ZonesInterventionPage() {
  const geoPagesList = Object.values(GEO_PAGES);

  return (
    <>
      <SEO_Guardian
        currentSection="zones-intervention"
        title="Zones d'Intervention Marseille | Nature Clean"
        description="Nature Clean intervient a Marseille (13001-13016), Aix-en-Provence, Aubagne et La Ciotat. Devis gratuit 04 84 89 68 75"
        keywords="zone intervention nettoyage marseille, nettoyage professionnel Bouches-du-Rhone, entreprise nettoyage 13, secteur intervention Nature Clean"
        faqItems={FAQ_ITEMS}
        disableReviews={true}
      />

      <ServicePageHero
        title="Zones Nettoyage Marseille & Est 13"
        subtitle="Nature Clean intervient sur Marseille, Aix-en-Provence, Aubagne et La Ciotat. Retrouvez nos services de nettoyage professionnel pres de chez vous."
        badge="Marseille — Aix — Aubagne — La Ciotat"
        badgeIcon={<MapPin className="w-4 h-4" aria-hidden="true" />}
        imageSrc={IMAGES.vueMarseilleBasin}
        imageAlt="Vue panoramique de Marseille — zones d'intervention Nature Clean"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Zones d\'intervention' },
        ]}
      />

      {/* ═══ CHIFFRES CLES ═══ */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { target: 1, suffix: '', label: 'Departement couvert', sub: 'Bouches-du-Rhone (13)' },
              { target: 4, suffix: '', label: 'Villes desservies', sub: 'Marseille, Aix, Aubagne, La Ciotat' },
              { target: 7, suffix: '', label: 'Pages geo dediees', sub: 'Contenu unique par secteur' },
              { target: 9, suffix: '', label: 'Services proposes', sub: 'Bureaux, copros, chantiers...' },
            ].map((stat) => (
              <ScrollReveal key={stat.label}>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-black text-green-600 mb-1">
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                  </div>
                  <div className="font-bold text-gray-900 text-sm">{stat.label}</div>
                  <div className="text-xs text-gray-400">{stat.sub}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CARTE INTERACTIVE PACA ═══ */}
      <PacaInteractiveMap />

      {/* ═══ CARTE VISUELLE DES ZONES ═══ */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 text-center">
              Toutes nos zones d'intervention
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              De Marseille a la Cote d'Azur, nos equipes interviennent sur l'ensemble de la region PACA.
            </p>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {ZONE_GROUPS.map((group, gi) => (
              <ScrollReveal key={group.region} delay={gi * 0.08}>
                <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full">
                  {/* Header zone */}
                  <div className="bg-gray-900 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-black text-white">{group.region}</h3>
                        <p className="text-xs text-gray-400">{group.department}</p>
                      </div>
                      <MapPin className="w-5 h-5 text-green-400" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Villes */}
                  <div className="p-4">
                    <div className="space-y-2">
                      {group.cities.map((city) => {
                        const ServiceIcon = SERVICE_ICONS[city.services] || CheckCircle2;
                        const content = (
                          <div className={`flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all ${
                            city.link
                              ? 'bg-green-50 border border-green-100 hover:border-green-300 hover:shadow-sm cursor-pointer'
                              : 'bg-gray-50 border border-gray-100'
                          } ${city.isMain ? 'ring-1 ring-green-200' : ''}`}>
                            <div className="flex items-center gap-3 min-w-0">
                              <ServiceIcon className={`w-4 h-4 flex-shrink-0 ${city.link ? 'text-green-600' : 'text-gray-400'}`} aria-hidden="true" />
                              <div className="min-w-0">
                                <span className={`font-bold text-sm ${city.isMain ? 'text-green-700' : 'text-gray-900'}`}>
                                  {city.name}
                                </span>
                                <span className="text-xs text-gray-400 ml-2">({city.postalCodes})</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span className="text-[10px] text-gray-400 hidden sm:inline">{city.services}</span>
                              {city.link && (
                                <ArrowRight className="w-3 h-3 text-green-500" aria-hidden="true" />
                              )}
                            </div>
                          </div>
                        );

                        return city.link ? (
                          <Link key={city.name} to={city.link} className="block">
                            {content}
                          </Link>
                        ) : (
                          <div key={city.name}>{content}</div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES DISPONIBLES ═══ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 text-center">
              Tous nos services, partout
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              L'integralite de notre catalogue est disponible sur toutes les zones couvertes.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { icon: Building2, label: 'Entretien Bureaux', href: '/services/entretien-bureaux', desc: 'Open spaces, locaux pro' },
              { icon: Store, label: 'Nettoyage Commerces', href: '/services/nettoyage-commerces', desc: 'Vitrines, surfaces de vente' },
              { icon: HomeIcon, label: 'Coproprietes', href: '/services/nettoyage-coproprietes', desc: 'Halls, escaliers, parkings' },
              { icon: HardHat, label: 'Fin de Chantier', href: '/services/nettoyage-chantiers', desc: 'Remise en etat complete' },
              { icon: PartyPopper, label: 'Evenementiel', href: '/services/nettoyage-evenementiel', desc: 'Avant, pendant, apres' },
              { icon: Droplet, label: 'Nettoyage Vitres', href: '/services/nettoyage-vitre', desc: 'Interieur, exterieur, nacelle' },
              { icon: MapPin, label: 'Remise en Etat Sols', href: '/services/remise-etat-sols', desc: 'Poncage, cristallisation' },
              { icon: Leaf, label: 'Menage Particuliers', href: '/nettoyage-particuliers', desc: 'Domicile, Airbnb, seniors' },
            ].map((service, i) => (
              <ScrollReveal key={service.label} delay={i * 0.05}>
                <Link
                  to={service.href}
                  className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all group"
                >
                  <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                    <service.icon className="w-4 h-4 text-green-600" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 text-sm group-hover:text-green-700 transition-colors">{service.label}</span>
                    <p className="text-xs text-gray-400">{service.desc}</p>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CONVERSION BREAK ═══ */}
      <ConversionBreak
        image={IMAGES.equipeCamionnette}
        imageAlt="Equipe Nature Clean en intervention — zone Marseille PACA"
        title="Votre ville n'est pas listee ?"
        subtitle="Contactez-nous — nous intervenons sur demande dans toute la region PACA et au-dela."
      />

      {/* ═══ GRILLE PAGES GEO ═══ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 text-center">
              Pages dediees par ville
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              Retrouvez nos services de nettoyage adaptes a chaque secteur geographique.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {geoPagesList.map((page, i) => (
              <ScrollReveal key={page.slug} delay={i * 0.05}>
                <Link
                  to={`/${page.slug}`}
                  className="group block bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl hover:border-green-200 transition-all"
                >
                  <div className="relative h-36 overflow-hidden">
                    <ImageWithFallback
                      src={page.heroImage}
                      alt={page.heroAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={200}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="inline-flex items-center gap-1 bg-green-500/90 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                        <MapPin className="w-2.5 h-2.5" aria-hidden="true" />
                        {page.city} — {page.postalCode}
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-green-700 transition-colors">
                      {page.service} a {page.city}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 mb-3">
                      {page.intro.substring(0, 120)}...
                    </p>
                    <span className="inline-flex items-center gap-1 text-xs text-green-600 font-bold group-hover:gap-2 transition-all">
                      Decouvrir
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INDEX SEO — MAILLAGE INTERNE PAR DEPARTEMENT ═══ */}
      <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 text-center">
              Index de nos pages locales par département
            </h2>
            <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
              Chaque ville dispose d'une page dédiée avec un contenu unique, des témoignages et des informations spécifiques à votre secteur.
            </p>
          </ScrollReveal>

          <nav aria-label="Index des pages locales par département" className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {GEO_INDEX.map((group, gi) => {
                const colorMap: Record<string, { header: string; dot: string; link: string; border: string }> = {
                  green: { header: 'bg-green-600', dot: 'bg-green-500', link: 'text-green-700 hover:text-green-900', border: 'border-green-100' },
                  blue:  { header: 'bg-blue-600',  dot: 'bg-blue-500',  link: 'text-blue-700 hover:text-blue-900',  border: 'border-blue-100' },
                  amber: { header: 'bg-amber-600', dot: 'bg-amber-500', link: 'text-amber-700 hover:text-amber-900', border: 'border-amber-100' },
                };
                const c = colorMap[group.color];
                return (
                  <ScrollReveal key={group.dept} delay={gi * 0.08}>
                    <div className={`bg-white rounded-2xl border ${c.border} shadow-sm overflow-hidden h-full`}>
                      {/* En-tête département */}
                      <div className={`${c.header} px-5 py-3`}>
                        <h3 className="font-black text-white text-sm tracking-wide flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                          {group.dept}
                        </h3>
                        <p className="text-white/70 text-xs mt-0.5">{group.pages.length} page{group.pages.length > 1 ? 's' : ''} dédiée{group.pages.length > 1 ? 's' : ''}</p>
                      </div>

                      {/* Liste des liens */}
                      <ul className="p-4 space-y-1" role="list">
                        {group.pages.map((page) => (
                          <li key={page.slug} className="flex items-start gap-2">
                            <span className={`w-1.5 h-1.5 rounded-full ${c.dot} mt-[7px] flex-shrink-0`} aria-hidden="true" />
                            <Link
                              to={`/${page.slug}`}
                              className={`text-sm ${c.link} font-medium hover:underline underline-offset-2 transition-colors leading-snug`}
                              title={`${page.anchor} — Nature Clean`}
                            >
                              {page.anchor}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {/* Footer carte */}
                      <div className={`px-5 py-3 border-t ${c.border} bg-gray-50/50`}>
                        <p className="text-[11px] text-gray-400 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3 h-3 text-green-400 flex-shrink-0" aria-hidden="true" />
                          Contenu unique · Devis en 2h · 7j/7
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Compte total — signal de confiance */}
            <ScrollReveal delay={0.25}>
              <p className="text-center mt-8 text-sm text-gray-400">
                <span className="font-bold text-gray-600">{GEO_INDEX.reduce((acc, g) => acc + g.pages.length, 0)} pages locales</span> réparties sur{' '}
                <span className="font-bold text-gray-600">3 départements</span> — mises à jour régulièrement.
              </p>
            </ScrollReveal>
          </nav>
        </div>
      </section>

      {/* ═══ TRUST SECTION ═══ */}
      <section className="py-12 bg-gray-50 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 max-w-4xl mx-auto">
            {[
              { icon: Leaf, text: '50% produits eco-responsables' },
              { icon: Shield, text: 'Assurance RC Pro' },
              { icon: Clock, text: 'Intervention 6h-22h, 7j/7' },
              { icon: CheckCircle2, text: 'Depuis 2021 — 500+ clients' },
            ].map((badge) => (
              <div key={badge.text} className="flex items-center gap-2 text-sm text-gray-600">
                <badge.icon className="w-4 h-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                {badge.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <FAQSection
        items={FAQ_ITEMS}
        title="Questions frequentes — Zones d'intervention"
        subtitle="Tout savoir sur notre couverture geographique"
      />

      {/* ═══ CTA FINAL ═══ */}
      <section className="py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Devis gratuit, ou que vous soyez en PACA
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Appelez-nous ou remplissez le formulaire en ligne — nous vous repondrons sous 24h avec une proposition personnalisee pour votre ville.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black shadow-lg shadow-green-500/20">
              <Link to="/devis">
                Demander un devis gratuit
                <ArrowRight className="w-5 h-5 ml-2" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold">
              <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}