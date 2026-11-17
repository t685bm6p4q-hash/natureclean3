import { IMAGES } from '@/app/utils/images';
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  ARIA_PHONE,
  LEAD_RESPONSE_SLA_SHORT,
  MOBILIZATION_AFTER_QUOTE,
  RESPONSIBLE_PRACTICES_LINE,
  ZONE_LABEL,
} from '@/app/utils/constants';
import { ServiceSeoContentSection } from '@/app/components/ServiceSeoContentSection';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import { BulletList } from '@/app/components/BulletList';
import { Sparkles, Construction, CheckCircle2, Phone, Calendar, Ruler, Box, Key } from 'lucide-react';
import { Link } from 'react-router';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

const FAQ_CHANTIERS: FAQItem[] = [
  {
    question: 'Qu’est-ce qu’un nettoyage « gros chantier » pour un particulier ?',
    answer:
      'Nettoyage lourd après rénovation (voile de ciment, poussière fine), remise en état avant vente ou location, ou grand ménage ponctuel. Le périmètre est détaillé au devis après visite ou photos.',
  },
  {
    question: 'Intervenez-vous pour les états des lieux de sortie ?',
    answer:
      'Oui, en prestation ponctuelle. Nous ne garantissons pas la récupération d’une caution : nous remettons un logement nettoyé selon le devis, sans promettre le résultat de l’état des lieux.',
  },
  {
    question: 'Fournissez-vous le matériel et les produits ?',
    answer:
      'Oui. Aspirateurs, monobrosses, matériel adapté et produits professionnels inclus. ' + RESPONSIBLE_PRACTICES_LINE,
  },
  {
    question: 'Comment obtenir un devis pour un grand nettoyage ?',
    answer: `${LEAD_RESPONSE_SLA_SHORT}. ${MOBILIZATION_AFTER_QUOTE} après validation. Visite sur place si le volume ou l’accès le justifie.`,
  },
];

const features = [
  {
    icon: Construction,
    title: 'Après Travaux',
    description: 'Élimination de la poussière fine de chantier, traces de peinture, voile de ciment et résidus de colle.',
    color: 'bg-orange-50 text-orange-600'
  },
  {
    icon: Key,
    title: 'Fin de Bail / Vente',
    description: 'Remise à neuf stratégique pour valoriser votre bien immobilier ou sécuriser votre caution locative.',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    icon: Calendar,
    title: 'Printemps Extrême',
    description: 'Le grand ménage annuel poussé à son maximum : intérieur de meubles, radiateurs, luminaires et lavage de vitres.',
    color: 'bg-green-50 text-green-600'
  }
];

export function NettoyageGrosChantiersPage() {
  return (
    <>
      <SEO_Guardian
        currentSection="nettoyage-gros-chantiers"
        faqItems={FAQ_CHANTIERS}

      />

      <ServicePageHero
        title="Gros Chantiers & Remise en État Marseille"
        subtitle="Après travaux, fin de bail ou remise en état résidentielle lourde — Marseille et 13"
        badge="Volume & remise en état"
        badgeIcon={<Sparkles className="w-4 h-4" />}
        imageSrc={IMAGES.remiseEtatAppartMarseille}
        imageAlt="Remise en état appartement Marseille — nettoyage après travaux Nature Clean"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Gros Chantiers' },
        ]}
        devisLink="/devis?service=gros-chantier"
      />

      {/* Hero Stats / Trust */}
      <section className="py-12 bg-emerald-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">4 h</div>
              <div className="text-sm opacity-80 text-emerald-100 uppercase tracking-widest">Prise en charge ouvrée</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">48 h</div>
              <div className="text-sm opacity-80 text-emerald-100 uppercase tracking-widest">Mobilisation courante</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">RC Pro</div>
              <div className="text-sm opacity-80 text-emerald-100 uppercase tracking-widest">Assurance</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">13</div>
              <div className="text-sm opacity-80 text-emerald-100 uppercase tracking-widest">Bouches-du-Rhône</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
            <ScrollReveal direction="left" className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Quand le ménage classique ne suffit plus, faites appel aux <span className="text-emerald-700">experts</span>.
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Vous venez de terminer des travaux de rénovation ? Vous déménagez et voulez laisser votre appartement impeccable ? Ou vous souhaitez simplement offrir une nouvelle jeunesse à votre maison ?
              </p>
              <p className="text-gray-700 leading-relaxed">
                Nature Clean intervient sur les <strong>gros volumes</strong> et les remises en état lourdes : après travaux, avant vente ou sortie de bail. Méthode et matériel adaptés au logement — résultat réaliste annoncé au devis.
              </p>
              <p className="text-gray-700 leading-relaxed border-l-4 border-emerald-600 pl-4">
                Ce n&apos;est pas la même prestation que la{' '}
                <Link to="/services/nettoyage-chantiers" className="font-semibold text-emerald-800 underline">
                  fin de chantier livraison
                </Link>
                : ici volumes importants, remise en état résidentielle lourde ou chantier étendu — durée, équipes et matériel dimensionnés au projet.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-gray-900">Aspiration poussières fines après travaux</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-gray-900">Monobrosse et matériel professionnel</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-gray-900">Produits professionnels adaptés au chantier</span>
                </div>
              </div>
            </ScrollReveal>

            <div className="lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <ScrollReveal
                  key={idx}
                  delay={idx * 0.1}
                  className="p-8 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-emerald-50 hover:border-emerald-100 transition-all cursor-default"
                >
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Checklist Section */}
      <section className="py-20 bg-emerald-50/50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-emerald-100">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2 bg-emerald-900 p-12 text-white flex flex-col justify-between">
                <div>
                  <h2 className="text-3xl font-bold mb-6">Notre Checklist "Zéro Défaut"</h2>
                  <p className="opacity-80 mb-8">Nous ne quittons pas les lieux tant que chaque point n'est pas validé par notre chef d'équipe.</p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Ruler className="w-6 h-6 text-emerald-400" />
                    <span className="text-sm font-medium">Contrôle qualité rigoureux</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Box className="w-6 h-6 text-emerald-400" />
                    <span className="text-sm font-medium">Tous produits fournis</span>
                  </div>
                </div>
              </div>
              <div className="md:col-span-3 p-12">
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-0">
                  <BulletList
                    bulletClassName="text-emerald-600"
                    lines={[
                      'Dépoussiérage intégral sols, murs, plafonds',
                      'Lessivage des plinthes et prises',
                      'Détartrage complet des sanitaires',
                      'Nettoyage intérieur/extérieur placards',
                      'Dégraissage cuisine et électroménager',
                      'Nettoyage des rails de fenêtres',
                    ]}
                  />
                  <BulletList
                    bulletClassName="text-emerald-600"
                    lines={[
                      'Nettoyage des luminaires et radiateurs',
                      'Désinfection des poignées et points de contact',
                      'Lavage des vitres (recto/verso)',
                      'Nettoyage des encadrements de portes',
                      'Shampooing moquette (sur demande)',
                      'Remise en état de sol (sur demande, étude du support)',
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ConversionBreak mid-page */}
      <ConversionBreak
        image={IMAGES.nettoyageFinChantier}
        imageAlt="Nettoyage fin de chantier professionnel Nature Clean Marseille"
        title="Prêt à remettre votre bien en état ?"
        subtitle="De 50m² à une villa de 300m², nous avons les ressources et l'expertise pour un résultat impeccable."
        devisLink="/devis?service=gros-chantier"
      />

      {/* Before/After Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row-reverse gap-16 items-center">
            <ScrollReveal direction="right" className="lg:w-1/2 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900 leading-tight">
                Remise en état <span className="text-emerald-700 italic">lourde</span>, pas livraison clés en main
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Après rénovation lourde, sortie de bail ou grand ménage : volumes, durée et équipes
                dimensionnés au logement. Pour une <strong>livraison de chantier</strong> type promoteur
                ou artisan, voir la fiche{' '}
                <Link to="/services/nettoyage-chantiers" className="font-semibold text-emerald-800 underline">
                  fin de chantier
                </Link>
                .
              </p>
              <p className="text-gray-600 text-sm">
                Chiffrage après visite ou photos : surface, état, accès et délai souhaité.
              </p>
              <div className="flex gap-4">
                <Button asChild className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-6 rounded-full">
                  <Link to="/devis?service=gros-chantier">Demander un devis gratuit</Link>
                </Button>
                <Button asChild variant="outline" className="border-emerald-700 text-emerald-700 px-8 py-6 rounded-full hover:bg-emerald-50">
                  <Link to="/realisations">Voir nos résultats</Link>
                </Button>
              </div>
            </ScrollReveal>
            <ScrollReveal direction="left" className="lg:w-1/2 relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <ImageWithFallback
                  src="https://res.cloudinary.com/dc9xmxpvv/image/upload/f_auto,q_auto/v1777394479/nettoyage-fin-de-chantier-appartement_upfmyt.jpg"
                  alt="Appartement remis à neuf après nettoyage intensif gros chantier Marseille — Nature Clean"
                  className="w-full h-full object-cover"
                  loading="lazy" decoding="async" width={700} height={525}
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl border border-gray-100 hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Emménagez serein</div>
                    <div className="text-xs text-gray-500 uppercase tracking-widest">Hygiène Garantie</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Un projet de grand nettoyage ?</h2>
            <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
              Qu'il s'agisse de 50m² ou d'une villa de 300m², nous avons les ressources et l'expertise pour un résultat impeccable.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-3 bg-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-800 transition-colors shadow-xl"
                aria-label={ARIA_PHONE}
              >
                <Phone className="w-6 h-6" />
                {PHONE_DISPLAY}
              </a>
              <Link
                to="/devis"
                className="flex items-center justify-center gap-3 bg-white text-gray-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
              >
                <Sparkles className="w-6 h-6" />
                Devis en ligne
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <ServiceSeoContentSection
        title="Remise en état et gros chantier à Marseille"
        lead="Après rénovation lourde, sortie de bail ou logement longtemps inoccupé : autre échelle que la fin de chantier « livraison clés »."
        className="bg-white border-t border-gray-100"
      >
        <p>
          Le <strong>nettoyage gros chantier à Marseille</strong> (ou remise en état résidentielle lourde) vise les
          logements et maisons qui nécessitent plusieurs journées, du matériel adapté et parfois une équipe
          renforcée : poussières fines après rénovation, cuisine et sanitaires encrassés, placards, vitres, sols.
          C&apos;est distinct de la{' '}
          <Link to="/services/nettoyage-chantiers" className="text-emerald-800 font-semibold underline">
            fin de chantier livraison
          </Link>{' '}
          pour promoteur ou artisan.
        </p>
        <p>
          Chaque projet est chiffré après <strong>visite ou photos</strong> : surface, état de départ, accès
          (étage, ascenseur, stationnement) et délai souhaité. {MOBILIZATION_AFTER_QUOTE} Intervention sur{' '}
          {ZONE_LABEL} et communes du 13.
        </p>
        <p>
          Monobrosse, aspiration fine, produits professionnels adaptés au support — pas de promesse de vapeur à
          150 °C, de cristallisation marbre ni de « garantie caution » : des prestations listées au devis, avec un
          résultat réaliste annoncé avant engagement.
        </p>
      </ServiceSeoContentSection>

      <FAQSection items={FAQ_CHANTIERS} title="Questions fréquentes sur nos grands nettoyages" />
    </>
  );
}