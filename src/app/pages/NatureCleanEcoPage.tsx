import type { ReactNode } from 'react';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { IMAGES } from '@/app/utils/images';
import { Button } from '@/app/components/ui/button';
import {
  Leaf,
  MapPin,
  Phone,
  ArrowRight,
  CheckCircle2,
  Building2,
  HardHat,
  Recycle,
} from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { FAQSection } from '@/app/components/FAQSection';
import { ServiceSeoContentSection } from '@/app/components/ServiceSeoContentSection';
import type { FAQItem } from '@/app/components/FAQSection';
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  ARIA_PHONE,
  EMAIL,
  EMAIL_HREF,
  SIRET,
  ZONE_LABEL,
  OFFICE_ADDRESS_LINE,
  RESPONSIBLE_PRACTICES_LINE,
  RESPONSIBLE_PRACTICES_SHORT,
  PHONE_RECEPTION_HOURS,
} from '@/app/utils/constants';
import { SERVED_CITIES_SHORT } from '@/app/config/zone-data';

const PRACTICES: { title: string; body: ReactNode }[] = [
  {
    title: 'Pratiques responsables',
    body: (
      <>
        {RESPONSIBLE_PRACTICES_LINE} Nous ne publions pas de pourcentage fixe de produits éco-labellisés : nous
        ne parlons de labels qu&apos;avec les fiches et références en main, communiquées au devis si vous le
        demandez.
      </>
    ),
  },
  {
    title: 'Dosage et microfibres',
    body: RESPONSIBLE_PRACTICES_SHORT,
  },
  {
    title: 'Désinfection et réglementation',
    body: 'Lorsque l\'activité l\'exige (restauration, locaux de santé, copropriété après sinistre), nous utilisons des désinfectants professionnels adaptés à l\'usage — distincts de l\'entretien courant.',
  },
  {
    title: 'Déchets de nettoyage',
    body: (
      <>
        Tri des emballages et déchets générés en intervention selon les consignes du site client et du prestataire de
        collecte.
      </>
    ),
  },
];

const PRO_SERVICES = [
  { label: 'Entretien de bureaux', href: '/services/entretien-bureaux' },
  { label: 'Nettoyage de copropriétés', href: '/services/nettoyage-coproprietes' },
  { label: 'Nettoyage de commerces', href: '/services/nettoyage-commerces' },
  { label: 'Nettoyage de vitres', href: '/services/nettoyage-vitre' },
  { label: 'Nettoyage fin de chantier', href: '/services/nettoyage-chantiers' },
  { label: 'Remise en état des sols', href: '/services/remise-etat-sols' },
] as const;

const SPECIAL_SERVICES = [
  { label: 'Enlèvement de graffitis', href: '/services/nettoyage-graffitis' },
  { label: 'Nettoyage événementiel', href: '/services/nettoyage-evenementiel' },
  { label: 'Nettoyage syndrome de Diogène', href: '/services/nettoyage-diogene' },
] as const;

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Quelle est votre démarche « éco » ?',
    answer:
      'Microfibres réutilisables, dosage adapté, tri des déchets et eau limitée lorsque c\'est possible. Produits professionnels adaptés à chaque chantier ; labels et marques précisés au devis sur demande.',
  },
  {
    question: 'Intervenez-vous où ?',
    answer: `À ${SERVED_CITIES_SHORT.join(', ')} — ${ZONE_LABEL}. Détail sur la page Zones d'intervention.`,
  },
  {
    question: 'Quels délais pour un devis ?',
    answer:
      'Prise en charge sous 4 h ouvrées en horaires d\'ouverture (lundi–vendredi, 9 h–18 h), devis détaillé après étude. La date d\'intervention dépend du service et du planning.',
  },
];

export function NatureCleanEcoPage() {
  return (
    <>
      <SEO_Guardian
        currentSection="about"
        title="Notre démarche éco-responsable | Nettoyage Marseille – Nature Clean"
        description="Pratiques responsables de Nature Clean à Marseille : microfibres, dosage, tri. Matériel professionnel. 22 Traverse Pupat, 13008. Devis détaillé après étude."
        keywords="nettoyage responsable Marseille, entreprise nettoyage 13, pratiques entretien professionnel, Nature Clean Marseille"
        faqItems={FAQ_ITEMS}
      />

      <section className="relative bg-gradient-to-r from-green-700 to-green-800 text-white py-16 md:py-24 overflow-hidden">
        <ImageWithFallback
          src={IMAGES.equipeCamionnette}
          alt="Équipe Nature Clean et matériel de nettoyage professionnel à Marseille"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
          width={1200}
          height={600}
          // @ts-ignore
          fetchpriority="high"
          decoding="async"
        />
        <div className="container mx-auto px-4 relative z-10 max-w-4xl">
          <nav className="text-sm mb-6 text-green-100" aria-label="Fil d'Ariane">
            <Link to="/" className="hover:underline">
              Accueil
            </Link>
            <span aria-hidden="true"> / </span>
            <span>Notre démarche éco-responsable</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black mb-4 leading-tight">
            Notre démarche éco-responsable à Marseille
          </h1>
          <p className="text-lg md:text-xl text-green-50 max-w-2xl leading-relaxed">
            Nature Clean accompagne syndics, entreprises, commerçants et particuliers dans le{' '}
            {ZONE_LABEL}. {RESPONSIBLE_PRACTICES_LINE}
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <ScrollReveal>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Notre siège est à Marseille 8e ({OFFICE_ADDRESS_LINE}). Nous ne promettons pas de certification environnementale
                générique, ni d&apos;objectif chiffré type « 80 % en 2027 » : nous détaillons produits, usages et
                limites au devis.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Zone desservie :{' '}
                <Link to="/zones-intervention" className="text-green-700 font-semibold hover:underline">
                  {SERVED_CITIES_SHORT.join(', ')}
                </Link>
                .
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.08}>
              <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
                <ImageWithFallback
                  src={IMAGES.produitsEcoBrosses}
                  alt="Matériel de nettoyage professionnel Nature Clean"
                  className="w-full h-64 object-cover"
                  width={600}
                  height={320}
                  loading="lazy"
                  decoding="async"
                />
                <p className="text-xs text-gray-500 bg-gray-50 px-4 py-2">
                  Photo d&apos;illustration — matériel professionnel utilisé sur nos chantiers.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <ScrollReveal>
            <h2 className="text-3xl font-black text-gray-900 mb-8 text-center flex items-center justify-center gap-2">
              <Leaf className="w-8 h-8 text-green-600" aria-hidden="true" />
              Ce que nous faisons concrètement
            </h2>
          </ScrollReveal>
          <ul className="space-y-6">
            {PRACTICES.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.05}>
                <li className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                  <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{item.body}</p>
                </li>
              </ScrollReveal>
            ))}
          </ul>
          <p className="text-sm text-gray-500 mt-8 text-center max-w-2xl mx-auto">
            Nous n&apos;utilisons pas le terme « bio » pour des produits d&apos;entretien, ni l&apos;expression « démarche
            certifiée » sans nom de certification vérifiable.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl font-black text-gray-900 mb-10 text-center">Nos services</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-green-600" aria-hidden="true" />
                Services professionnels
              </h3>
              <ul className="space-y-2">
                {PRO_SERVICES.map((s) => (
                  <li key={s.href}>
                    <Link to={s.href} className="text-sm text-green-700 font-semibold hover:underline">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-gray-200 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <HardHat className="w-5 h-5 text-green-600" aria-hidden="true" />
                Services spécialisés
              </h3>
              <ul className="space-y-2">
                {SPECIAL_SERVICES.map((s) => (
                  <li key={s.href}>
                    <Link to={s.href} className="text-sm text-green-700 font-semibold hover:underline">
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-center mt-8">
            <Link to="/services" className="text-green-700 font-bold inline-flex items-center gap-1 hover:underline">
              Tous nos services
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>

      <section className="py-16 bg-green-50 border-y border-green-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="bg-white rounded-2xl border border-green-200 p-8 shadow-sm">
            <h2 className="text-2xl font-black text-gray-900 mb-6">Coordonnées (identiques sur tout le site)</h2>
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  <strong>{OFFICE_ADDRESS_LINE}</strong>
                  <br />
                  <span className="text-sm text-gray-500">Siège — même adresse que Google Business Profile et mentions légales</span>
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                <a href={PHONE_HREF} className="font-semibold text-green-700 hover:underline" aria-label={ARIA_PHONE}>
                  {PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Recycle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                <span>
                  Accueil téléphonique : <strong>lundi–vendredi, 9 h–18 h</strong>
                  <br />
                  <span className="text-sm text-gray-600">
                    Interventions en horaires décalés (6 h–22 h, créneaux sur organisation spécifique) selon contrat — créneaux confirmés au devis
                  </span>
                </span>
              </li>
            </ul>
            <p className="text-xs text-gray-500 mt-6">SIRET {SIRET}</p>
            <div className="flex flex-wrap gap-3 mt-6">
              <Button asChild className="bg-green-700 hover:bg-green-800">
                <Link to="/contact">Contact</Link>
              </Button>
              <Button asChild variant="outline" className="border-green-600 text-green-700">
                <a href={EMAIL_HREF}>{EMAIL}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <ServiceSeoContentSection
        title="Nettoyage professionnel responsable à Marseille : ce que promet Nature Clean"
        lead="Pas de pourcentage « éco » marketing : des gestes concrets, des produits adaptés au chantier."
        className="bg-white border-y border-gray-100"
      >
        <p>
          Sur le marché marseillais, beaucoup d&apos;offres affichent un label ou un taux de produits « verts » sans
          préciser l&apos;usage réel. Chez Nature Clean, la démarche repose sur {RESPONSIBLE_PRACTICES_SHORT} Nous
          n&apos;affichons pas de ratio fixe : les références et fiches techniques sont communiquées au{' '}
          <strong>devis</strong> lorsque vous le demandez.
        </p>
        <p>
          L&apos;entretien courant (bureaux, copropriétés, commerces) privilégie le <strong>dosage maîtrisé</strong> et
          les <strong>microfibres réutilisables</strong> pour limiter l&apos;eau et les résidus chimiques. Lorsque la
          réglementation l&apos;impose — restauration, locaux de santé, remise en état après sinistre — nous mobilisons
          des <strong>désinfectants professionnels</strong> distincts du nettoyage standard, en respectant les protocoles
          du site.
        </p>
        <p>
          Tri des emballages et déchets générés en intervention, selon vos consignes et le filière locale. Zone
          d&apos;intervention : {ZONE_LABEL}.{' '}
          <Link to="/zones-intervention" className="text-green-700 font-semibold underline">
            Voir toutes les communes desservies
          </Link>
          .
        </p>
      </ServiceSeoContentSection>

      <FAQSection
        items={FAQ_ITEMS}
        title="Questions fréquentes"
        subtitle="Engagement environnemental et zone d'intervention"
      />

      <section className="py-16 md:py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-4">Un devis détaillé après étude</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            {ZONE_LABEL}. Prise en charge sous 4 h ouvrées en horaires d&apos;ouverture.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-white font-black">
              <Link to="/devis">Demander un devis gratuit</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
              <Link to="/services">Voir nos services</Link>
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" aria-hidden="true" />
              RC Pro
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" aria-hidden="true" />
              {PHONE_RECEPTION_HOURS}
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" aria-hidden="true" />
              Personnel déclaré
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
