import { IMAGES } from '@/app/utils/images';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import { Sparkles, Construction, CheckCircle2, Phone, Calendar, Ruler, Box, Key } from 'lucide-react';
import { Link } from 'react-router';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

const FAQ_CHANTIERS: FAQItem[] = [
  { question: 'Qu\'est-ce qu\'un nettoyage "gros chantier" pour un particulier ?', answer: 'C\'est une intervention lourde qui va au-delà du ménage classique. Elle concerne le nettoyage après des travaux de rénovation (élimination du voile de ciment, poussière fine), une remise en état complète avant une vente immobilière, ou un nettoyage de printemps extrême (incluant intérieur de placards, vitrerie complète, lessivage murs).' },
  { question: 'Intervenez-vous pour les états des lieux de sortie ?', answer: 'Oui, nous proposons une formule "Garantie Caution" pour les locataires sortants. Nous effectuons une remise au propre intégrale du logement pour vous assurer de récupérer l\'intégralité de votre dépôt de garantie.' },
  { question: 'Fournissez-vous le matériel et les produits ?', answer: 'Absolument. Nos équipes arrivent avec tout le matériel nécessaire : aspirateurs industriels HEPA, monobrosses pour sols, nettoyeurs vapeur haute pression et l\'intégralité des produits professionnels éco-responsables.' },
  { question: 'Comment obtenir un devis pour un grand nettoyage ?', answer: 'Vous pouvez nous appeler directement ou remplir notre formulaire en ligne. Pour les gros volumes, nous pouvons nous déplacer gratuitement pour évaluer précisément le travail à effectuer et vous remettre un devis ferme sous 24h.' },
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
    description: 'Le grand ménage annuel poussé à son maximum : intérieur de meubles, radiateurs, luminaires et vitrerie.',
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
        subtitle="Nettoyage après travaux, fin de bail et grands projets résidentiels haute performance"
        badge="Performance & Résultat"
        badgeIcon={<Sparkles className="w-4 h-4" />}
        imageSrc={IMAGES.remiseEtatAppartMarseille}
        imageAlt="Remise en état appartement Marseille — nettoyage après travaux Nature Clean"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Nettoyage Particuliers', to: '/nettoyage-particuliers' },
          { label: 'Gros Chantiers' },
        ]}
        devisLink="/devis?service=gros-chantier"
      />

      {/* Hero Stats / Trust */}
      <section className="py-12 bg-emerald-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">100%</div>
              <div className="text-sm opacity-80 text-emerald-100 uppercase tracking-widest">Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">48h</div>
              <div className="text-sm opacity-80 text-emerald-100 uppercase tracking-widest">Délai Max</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">ECO</div>
              <div className="text-sm opacity-80 text-emerald-100 uppercase tracking-widest">Responsable</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">PRO</div>
              <div className="text-sm opacity-80 text-emerald-100 uppercase tracking-widest">Équipements</div>
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
                Nature Clean Marseille déploie des équipes spécialisées dans les <strong>interventions lourdes</strong>. Nous utilisons des techniques de nettoyage industrielles adaptées au résidentiel pour un résultat <strong>immédiat et spectaculaire</strong>.
              </p>
              <div className="space-y-4 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-gray-900">Aspiration HEPA (anti-poussière fine)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-gray-900">Nettoyage vapeur 150°C (désinfection)</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-gray-900">Produits dégraissants professionnels bio</span>
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
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                  {[
                    'Dépoussiérage intégral sols, murs, plafonds',
                    'Lessivage des plinthes et prises',
                    'Détartrage complet des sanitaires',
                    'Nettoyage intérieur/extérieur placards',
                    'Dégraissage cuisine et électroménager',
                    'Nettoyage des rails de fenêtres',
                    'Nettoyage des luminaires et radiateurs',
                    'Désinfection des poignées et points de contact',
                    'Lavage des vitres (recto/verso)',
                    'Nettoyage des encadrements de portes',
                    'Shampooing moquette (sur demande)',
                    'Cristallisation du marbre (sur demande)'
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
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
              <h2 className="text-3xl font-bold text-gray-900 leading-tight">Valorisez votre bien <span className="text-emerald-700 italic">instantanément</span></h2>
              <p className="text-gray-700 leading-relaxed">
                Une maison qui brille, c'est un bien qui se vend plus vite ou une caution récupérée sans stress. Notre expertise en <strong>gros chantiers</strong> transforme radicalement l'aspect de votre intérieur.
              </p>
              <div className="bg-emerald-50 p-6 rounded-2xl border-l-4 border-emerald-600">
                <p className="text-emerald-900 font-medium italic">
                  "Après 6 mois de travaux, nous pensions ne jamais nous débarrasser de cette fine poussière blanche. L'équipe de Nature Clean a rendu notre maison étincelante en une seule journée. Magique !"
                </p>
                <p className="text-emerald-700 text-sm mt-3 font-bold">— Sophie D., Marseille 8ème</p>
              </div>
              <div className="flex gap-4">
                <Button asChild className="bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-6 rounded-full">
                  <Link to="/devis">Calculer mon tarif</Link>
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
      <section className="relative py-20 bg-gray-900 overflow-hidden">
        <ImageWithFallback
          src={IMAGES.chantierBrut}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          loading="lazy" decoding="async" width={1920} height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/75 to-gray-900/80" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Un projet de grand nettoyage ?</h2>
            <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
              Qu'il s'agisse de 50m² ou d'une villa de 300m², nous avons les ressources et l'expertise pour un résultat impeccable.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-3 bg-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-500 transition-colors shadow-xl"
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

      <FAQSection items={FAQ_CHANTIERS} title="Questions fréquentes sur nos grands nettoyages" />
    </>
  );
}