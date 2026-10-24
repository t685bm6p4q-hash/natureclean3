/**
 * ZonesInterventionPage — Hub géographique (Marseille et Bouches-du-Rhône uniquement).
 */

import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { FAQSection } from '@/app/components/FAQSection';
import { PacaInteractiveMap } from '@/app/components/PacaInteractiveMap';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { Link } from 'react-router';
import {
  MapPin,
  ArrowRight,
  Phone,
  Building2,
  Home as HomeIcon,
  HardHat,
  Store,
  PartyPopper,
  Eraser,
  Heart,
  GlassWater,
  Stethoscope,
} from 'lucide-react';
import { IMAGES } from '@/app/utils/images';
import { GEO_PAGES } from '@/app/utils/geoData';
import type { FAQItem } from '@/app/components/FAQSection';
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  ARIA_PHONE,
  FOUNDING_YEAR,
} from '@/app/utils/constants';
import {
  SERVED_CITIES_LABELS,
  MARSEILLE_QUARTIERS,
  CITY_SECTORS,
  LOCAL_GEO_PAGE_SLUGS,
} from '@/app/config/zone-data';

const MARSEILLE_GEO_LINKS = [
  { label: 'Nettoyage de bureaux à Marseille', href: '/nettoyage-bureaux-marseille' },
  { label: 'Nettoyage de copropriétés à Marseille', href: '/services/nettoyage-coproprietes' },
  { label: 'Nettoyage de fin de chantier à Marseille', href: '/nettoyage-fin-chantier-marseille' },
] as const;

const ZONE_SERVICE_LINKS = [
  { icon: Building2, label: 'Entretien de bureaux à Marseille', href: '/nettoyage-bureaux-marseille' },
  { icon: Stethoscope, label: 'Nettoyage de cabinets médicaux à Marseille', href: '/services/nettoyage-cabinet-medical-marseille' },
  { icon: Store, label: 'Nettoyage de commerces à Marseille', href: '/services/nettoyage-commerces' },
  { icon: HomeIcon, label: 'Nettoyage de copropriétés à Marseille', href: '/services/nettoyage-coproprietes' },
  { icon: HardHat, label: 'Nettoyage de fin de chantier à Marseille', href: '/nettoyage-fin-chantier-marseille' },
  { icon: HomeIcon, label: 'Remise en état des sols à Marseille', href: '/services/remise-etat-sols' },
  { icon: GlassWater, label: 'Nettoyage de vitres à Marseille', href: '/services/nettoyage-vitre' },
  { icon: Eraser, label: 'Enlèvement de graffitis à Marseille', href: '/services/nettoyage-graffitis' },
  { icon: PartyPopper, label: 'Nettoyage événementiel à Marseille', href: '/services/nettoyage-evenementiel' },
  { icon: Heart, label: 'Nettoyage syndrome de Diogène à Marseille', href: '/services/nettoyage-diogene' },
] as const;

const PROCESS_STEPS = [
  {
    title: 'Vous nous contactez',
    desc: 'Réponse sous 2 h en horaires d\'ouverture (lundi–samedi, 8 h–18 h).',
  },
  {
    title: 'Nous évaluons',
    desc: 'Votre site et vos contraintes, puis envoi d\'un devis gratuit et détaillé sous 24 h.',
  },
  {
    title: 'Nous intervenons',
    desc: 'À la date convenue, avec produits et matériel fournis.',
  },
] as const;

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Dans quelles villes intervenez-vous ?',
    answer:
      'À Marseille (13001 à 13016), Aix-en-Provence, Aubagne, La Ciotat, Marignane, Vitrolles, Salon-de-Provence, Istres et Martigues, dans les Bouches-du-Rhône.',
  },
  {
    question: 'Dans quels quartiers de Marseille intervenez-vous ?',
    answer: `Dans tous les arrondissements, notamment au Vieux-Port, à La Joliette, Castellane, Endoume, au Prado, à La Timone, Saint-Loup, La Valentine, aux Cinq Avenues, au Panier, à Saint-Charles, La Blancarde, Bonneveine et Mazargues.`,
  },
  {
    question: 'Facturez-vous un supplément hors de Marseille ?',
    answer:
      'Cela dépend de la ville, du type de prestation et de la fréquence. Les conditions éventuelles sont indiquées clairement dans le devis, avant toute intervention.',
  },
  {
    question: 'Quel est votre délai d\'intervention ?',
    answer:
      'Réponse sous 2 h en horaires d\'ouverture et devis sous 24 h. Le délai d\'intervention dépend du service, de la zone et du planning : nous vous annonçons une date au devis.',
  },
  {
    question: 'Proposez-vous les mêmes services dans toutes les villes ?',
    answer:
      'Nos neuf services sont disponibles dans les zones desservies. Certaines prestations demandant un matériel spécifique peuvent être limitées selon l\'accès ou la distance. Nous vous le disons dès le devis.',
  },
  {
    question: 'Où êtes-vous basés ?',
    answer:
      'À Marseille 8e (22 Traverse Pupat). Nos horaires d\'accueil sont du lundi au samedi, de 8 h à 18 h. Les créneaux d\'intervention sur site (6 h–22 h, week-end possible) se définissent au contrat.',
  },
  {
    question: 'Comment demander un devis pour ma ville ?',
    answer: `Appelez le ${PHONE_DISPLAY} ou remplissez le formulaire en ligne. Nous répondons sous 2 h en horaires d'ouverture, avec un devis gratuit sous 24 h.`,
  },
];

function geoAnchor(slug: string): string {
  const page = GEO_PAGES[slug];
  if (!page) return slug;
  return `${page.service} à ${page.city}`;
}

export function ZonesInterventionPage() {
  const localGeoPages = LOCAL_GEO_PAGE_SLUGS.map((slug) => GEO_PAGES[slug]).filter(Boolean);

  return (
    <>
      <SEO_Guardian currentSection="zones-intervention" faqItems={FAQ_ITEMS} />

      <ServicePageHero
        title="Zones d'intervention : Marseille et Bouches-du-Rhône"
        subtitle="Basés à Marseille 8e — 9 villes du 13, devis gratuit sous 24 h"
        badge="Département 13"
        badgeIcon={<MapPin className="w-4 h-4" aria-hidden="true" />}
        imageSrc={IMAGES.vueMarseilleBasin}
        imageAlt="Vue de Marseille depuis le Vieux-Port"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Zones d\'intervention' },
        ]}
      />

      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl text-center">
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Basés à Marseille 8e, nous intervenons chez les syndics, entreprises, commerçants et promoteurs de
            Marseille et de huit autres villes des Bouches-du-Rhône. Réponse sous 2 h en horaires d&apos;ouverture
            (lundi–samedi, 8 h–18 h), devis gratuit sous 24 h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-700 hover:bg-green-800 text-white font-bold">
              <Link to="/devis">Demander un devis gratuit</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-green-600 text-green-700 font-bold">
              <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-5xl mx-auto text-center">
            <div>
              <p className="text-3xl font-black text-green-600">1</p>
              <p className="text-sm font-bold text-gray-900">Département</p>
              <p className="text-xs text-gray-500">Bouches-du-Rhône (13)</p>
            </div>
            <div>
              <p className="text-3xl font-black text-green-600">9</p>
              <p className="text-sm font-bold text-gray-900">Villes desservies</p>
            </div>
            <div>
              <p className="text-3xl font-black text-green-600">14</p>
              <p className="text-sm font-bold text-gray-900">Quartiers Marseille</p>
              <p className="text-xs text-gray-500">Détaillés ci-dessous</p>
            </div>
            <div>
              <p className="text-3xl font-black text-green-600">9</p>
              <p className="text-sm font-bold text-gray-900">Services</p>
              <p className="text-xs text-gray-500">Bureaux à Diogène</p>
            </div>
            <div className="col-span-2 md:col-span-1">
              <p className="text-3xl font-black text-green-600">{FOUNDING_YEAR}</p>
              <p className="text-sm font-bold text-gray-900">Depuis</p>
            </div>
          </div>
        </div>
      </section>

      <PacaInteractiveMap />

      <section id="marseille" className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl font-black text-gray-900 mb-4">Marseille (13001 à 13016)</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Notre base est à Marseille 8e (Traverse Pupat). Nous intervenons dans tous les arrondissements, avec
              une présence régulière dans ces quartiers :
            </p>
            <p className="text-gray-800 font-medium leading-relaxed mb-6">
              {MARSEILLE_QUARTIERS.join(' · ')}
            </p>
            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              Pour chaque quartier, nous tenons compte des contraintes locales : accès difficiles dans les ruelles
              du Panier ou du Vieux-Port, stationnement en centre-ville, immeubles anciens sans ascenseur, horaires
              de livraison — nous vous les confirmons au devis.
            </p>
            <div className="flex flex-wrap gap-3">
              {MARSEILLE_GEO_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-bold text-green-700 hover:text-green-800 underline underline-offset-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl font-black text-gray-900 mb-3 text-center">Autres villes desservies</h2>
            <p className="text-center text-sm text-gray-500 mb-8 max-w-2xl mx-auto">
              Regroupement indicatif par secteur dans les Bouches-du-Rhône.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-xl overflow-hidden bg-white">
                <thead className="bg-gray-900 text-white">
                  <tr>
                    <th className="text-left p-3 font-bold">Secteur</th>
                    <th className="text-left p-3 font-bold">Villes</th>
                    <th className="text-left p-3 font-bold">Délai depuis Marseille 8e</th>
                  </tr>
                </thead>
                <tbody>
                  {CITY_SECTORS.map((row) => (
                    <tr key={row.sector} className="border-t border-gray-100">
                      <td className="p-3 font-medium text-gray-900">{row.sector}</td>
                      <td className="p-3 text-gray-700">{row.cities}</td>
                      <td className="p-3 text-gray-600">Annoncé au devis (trajet depuis Marseille 8e)</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-600 text-sm mt-6 text-center">
              Pour chaque ville, nous précisons dans le devis les créneaux possibles et, le cas échéant, les
              conditions de déplacement.
            </p>
            <ul className="flex flex-wrap justify-center gap-2 mt-8">
              {SERVED_CITIES_LABELS.map((city) => (
                <li
                  key={city}
                  className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-800"
                >
                  {city}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <ScrollReveal>
            <h2 className="text-3xl font-black text-gray-900 mb-4 text-center">Nos services dans ces zones</h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto text-sm leading-relaxed">
              Tous nos services sont proposés sur les zones desservies. Certains équipements lourds (nacelle,
              marbre) peuvent être limités selon l&apos;accès : nous vous le précisons au devis :
            </p>
          </ScrollReveal>
          <ul className="grid sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
            {ZONE_SERVICE_LINKS.map((service) => (
              <li key={service.href}>
                <Link
                  to={service.href}
                  className="flex items-center gap-2 text-green-700 font-semibold hover:text-green-800 text-sm py-1"
                >
                  <service.icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <ScrollReveal>
            <h2 className="text-3xl font-black text-gray-900 mb-3 text-center">Pages locales</h2>
            <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto text-sm">
              Pages avec contenu propre à la ville — une phrase qui dit pour qui et ce qui est spécifique au terrain.
            </p>
          </ScrollReveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {localGeoPages.map((page, i) => (
              <ScrollReveal key={page.slug} delay={i * 0.06}>
                <article className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow h-full flex flex-col">
                  <div className="relative h-36 overflow-hidden">
                    <ImageWithFallback
                      src={page.heroImage}
                      alt={page.heroAlt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      width={400}
                      height={200}
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <span className="text-[10px] font-bold text-green-700 uppercase tracking-wide mb-1">
                      {page.city} — {page.postalCode}
                    </span>
                    <h3 className="font-bold text-gray-900 text-sm mb-2">{geoAnchor(page.slug)}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed flex-1 mb-4 line-clamp-4">
                      {page.intro}
                    </p>
                    <Link
                      to={`/${page.slug}`}
                      className="inline-flex items-center gap-1 text-sm text-green-700 font-bold hover:text-green-800"
                    >
                      {geoAnchor(page.slug)}
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>

          <nav aria-label="Liste des pages locales" className="mt-10 max-w-md mx-auto">
            <ul className="space-y-2">
              {LOCAL_GEO_PAGE_SLUGS.map((slug) => (
                <li key={slug}>
                  <Link
                    to={`/${slug}`}
                    className="block text-center text-green-700 font-semibold hover:underline underline-offset-2 text-sm"
                  >
                    {geoAnchor(slug)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h2 className="text-2xl font-black text-gray-900 mb-4">Votre commune n&apos;est pas dans la liste ?</h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Appelez-nous. Selon la distance et le type de prestation, nous étudions les interventions ponctuelles
            hors de ces zones — périmètre et conditions précisés au devis.
          </p>
          <Button asChild variant="outline" className="border-green-600 text-green-700 font-bold">
            <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
              {PHONE_DISPLAY}
            </a>
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">Comment ça se passe</h2>
          <ol className="space-y-8">
            {PROCESS_STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-700 text-white font-black">
                  {i + 1}
                </span>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FAQSection
        items={FAQ_ITEMS}
        title="Questions fréquentes"
        subtitle="Couverture géographique et devis dans le 13"
      />

      <section className="py-16 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Un devis gratuit sous 24 h</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Marseille et Bouches-du-Rhône. Réponse sous 2 h en horaires d&apos;ouverture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black">
              <Link to="/devis">Demander un devis</Link>
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
