import { IMAGES } from '@/app/utils/images';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Heart, ShieldCheck, Clock, Trash2, Sparkles, Phone, Mail, CheckCircle2, Home } from 'lucide-react';
import { Link } from 'react-router';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { ConversionBreak } from '@/app/components/ConversionBreak';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';

const FAQ_DIOGENE: FAQItem[] = [
  { question: 'Qu\'est-ce que le syndrome de Diogène ?', answer: 'Le syndrome de Diogène est un trouble du comportement se manifestant par une accumulation compulsive d\'objets (syllogomanie), une négligence de l\'hygiène corporelle et domestique, et souvent un isolement social sévère. Notre rôle n\'est pas de juger — c\'est de restaurer la salubrité du logement de façon professionnelle, discrète et humaine.' },
  { question: 'Comment se déroule une intervention ?', answer: 'On procède en 4 étapes : diagnostic gratuit et confidentiel, tri sélectif des objets de valeur et documents importants, évacuation des encombrants vers des centres de tri agréés (conformément au décret 2016-288), et nettoyage approfondi avec désinfection totale — désinfectant virucide conforme EN 14476, bactéricide EN 1276, fongicide EN 1650.' },
  { question: 'Garantissez-vous la discrétion de l\'intervention ?', answer: 'Absolument. Nos équipes arrivent en véhicules banalisés si vous le souhaitez. On travaille sans bruit inutile, et on ne communique sur aucun dossier. Sur les interventions en copropriété à Marseille, on coordonne avec le gardien ou le syndic pour minimiser la visibilité. La discrétion n\'est pas une option chez nous — c\'est une exigence professionnelle.' },
  { question: 'Combien de temps dure un nettoyage Diogène ?', answer: 'Ça dépend du volume d\'encombrement et de la surface. Un logement modérément encombré (T3, degré modéré) prend généralement 2 à 3 jours. Les cas sévères ou très sévères peuvent nécessiter une semaine complète. On s\'engage sur un délai précis lors du devis — c\'est contractuel.' },
];

const steps = [
  {
    icon: Trash2,
    title: 'Désencombrement & Tri',
    description: 'Évacuation des déchets et encombrants vers des centres de tri agréés (conformément au décret 2016-288 sur les déchets ménagers). Chaque objet est trié avec soin — documents importants, souvenirs, objets de valeur sont mis de côté avant tout déplacement.',
    color: 'bg-amber-50 text-amber-600'
  },
  {
    icon: ShieldCheck,
    title: 'Désinfection & Traitement',
    description: 'Application de désinfectants virucides conformes EN 14476, bactéricides EN 1276 et fongicides EN 1650. Traitement anti-nuisibles si nécessaire avec des biocides homologués. Neutralisation des odeurs par nébulisation ou générateur d\'ozone O3.',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    icon: Sparkles,
    title: 'Nettoyage Approfondi',
    description: 'Lessivage complet des murs, plafonds, sols et sanitaires avec agents dégraissants professionnels. Nettoyage vapeur haute température (140°C) pour les sanitaires et les zones à biofilm. Remise à neuf des surfaces pour un logement à nouveau habitable.',
    color: 'bg-green-50 text-green-600'
  }
];

export function NettoyageDiogenePage() {
  return (
    <>
      <SEO_Guardian
        currentSection="nettoyage-diogene"
        faqItems={FAQ_DIOGENE}
        disableReviews={true}
      />

      <ServicePageHero
        title="Nettoyage Syndrome de Diogène Marseille"
        subtitle="Désencombrement, désinfection et accompagnement humain pour un nouveau départ"
        badge="Discrétion & Bienveillance"
        badgeIcon={<Heart className="w-4 h-4" />}
        imageSrc={IMAGES.appartVideLumineux}
        imageAlt="Nettoyage Diogène Marseille - Remise en état logement insalubre et désencombrement Nature Clean"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Services', to: '/services' },
          { label: 'Nettoyage Particuliers', to: '/nettoyage-particuliers' },
          { label: 'Syndrome de Diogène' },
        ]}
        devisLink="/devis?service=diogene"
      />

      {/* Introduction Empathique */}
      <section className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-6xl mx-auto">
            <ScrollReveal
              direction="left"
              className="lg:w-1/2 space-y-6"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Plus qu'un simple nettoyage, un <span className="text-emerald-700 italic">accompagnement humain</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Le syndrome de Diogène nécessite une approche qui allie <strong>technicité professionnelle</strong> et <strong>sensibilité humaine</strong>. On ne vide pas un logement — on dénoue une situation complexe, souvent héritée par la famille ou signalée par un voisin ou un médecin.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Nos équipes sont formées aux interventions en milieu insalubre et à la psychologie du comportement d'accumulation. On intervient <strong>sans jugement</strong>, avec des EPI adaptés — combinaisons de protection de type 5/6 et masques FFP3 — et des produits virucides conformes <strong>EN 14476</strong>. Chaque objet est traité avec respect lors de la phase de tri.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full text-emerald-700 font-medium">
                  <ShieldCheck className="w-5 h-5" />
                  Certifié Certibiocide
                </div>
                <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full text-blue-700 font-medium">
                  <Clock className="w-5 h-5" />
                  Intervention 7j/7
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal
              direction="right"
              className="lg:w-1/2"
            >
              <Card className="border-2 border-emerald-100 shadow-xl overflow-hidden">
                <CardContent className="p-0">
                  <ImageWithFallback
                    src={IMAGES.degatDesEaux}
                    alt="Logement avant intervention spécialisée Nature Clean Diogène"
                    className="w-full h-64 object-cover"
                    loading="lazy" decoding="async" width={700} height={400}
                  />
                  <div className="p-6 bg-emerald-900 text-white">
                    <p className="italic text-sm">
                      "Notre équipe est formée spécifiquement aux interventions en milieu insalubre et à la psychologie du syndrome de Diogène."
                    </p>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Le Processus en 3 Étapes */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Notre méthodologie éprouvée</h2>
              <p className="text-gray-600">Nous suivons un protocole rigoureux pour assurer une remise en état pérenne et sécurisée du logement.</p>
            </ScrollReveal>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {steps.map((step, idx) => (
              <ScrollReveal
                key={idx}
                delay={idx * 0.2}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className={`w-14 h-14 rounded-xl ${step.color} flex items-center justify-center mb-6`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ConversionBreak mid-page */}
      <ConversionBreak
        image={IMAGES.appartVideLumineux}
        imageAlt="Logement remis en état après intervention Diogène Nature Clean"
        title="Besoin d'une intervention discrète et bienveillante ?"
        subtitle="Diagnostic gratuit et confidentiel. Nos équipes interviennent 7j/7 à Marseille et dans toute la région PACA."
        urgencyText="Intervention sous 48h"
        devisLink="/devis?service=diogene"
      />

      {/* Section Services Complémentaires */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <ScrollReveal delay={0}>
                    <div className="bg-emerald-50 p-4 rounded-xl aspect-square flex flex-col items-center justify-center text-center">
                      <Trash2 className="w-10 h-10 text-emerald-600 mb-2" />
                      <span className="text-sm font-bold text-gray-900">Évacuation Encombrants</span>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={0.15}>
                    <div className="bg-blue-50 p-4 rounded-xl aspect-square flex flex-col items-center justify-center text-center">
                      <ShieldCheck className="w-10 h-10 text-blue-600 mb-2" />
                      <span className="text-sm font-bold text-gray-900">Désinfection Virucide</span>
                    </div>
                  </ScrollReveal>
                </div>
                <div className="space-y-4 pt-8">
                  <ScrollReveal delay={0.1}>
                    <div className="bg-amber-50 p-4 rounded-xl aspect-square flex flex-col items-center justify-center text-center">
                      <CheckCircle2 className="w-10 h-10 text-amber-600 mb-2" />
                      <span className="text-sm font-bold text-gray-900">Traitement Nuisibles</span>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={0.25}>
                    <div className="bg-purple-50 p-4 rounded-xl aspect-square flex flex-col items-center justify-center text-center">
                      <Home className="w-10 h-10 text-purple-600 mb-2" />
                      <span className="text-sm font-bold text-gray-900">Remise en état Sols</span>
                    </div>
                  </ScrollReveal>
                </div>
              </div>
            </div>
            <ScrollReveal direction="right" className="order-1 lg:order-2 space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Une solution de nettoyage <span className="text-emerald-700">360°</span></h2>
              <p className="text-gray-700 leading-relaxed">
                Intervenir sur un cas de syndrome de Diogène ne s'arrête pas au ménage. Nous gérons l'intégralité de la chaîne logistique :
              </p>
              <ul className="space-y-4">
                {[
                  'Location et remplissage de bennes agréées — évacuation vers centres de tri déclarés préfecture',
                  'Neutralisation des odeurs par nébulisation ou génération d\'ozone O3 (3 à 6h selon volume)',
                  'Lessivage des murs avec agents dégraissants professionnels pH alcalin',
                  'Remise en état des vitreries et encadrements',
                  'Nettoyage vapeur haute température (140°C) pour sanitaires et zones à biofilm'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="mt-4 bg-emerald-700 hover:bg-emerald-800 text-white px-8 py-6 text-lg rounded-full shadow-lg">
                <Link to="/devis?service=diogene">Demander un diagnostic gratuit</Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 bg-gray-900 overflow-hidden">
        <ImageWithFallback
          src={IMAGES.appartVidePropre}
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          loading="lazy" decoding="async" width={1920} height={600}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/95 via-gray-900/75 to-gray-900/80" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 text-white">Besoin d'une intervention discrète ?</h2>
            <p className="text-xl mb-12 text-gray-300 max-w-2xl mx-auto">
              Contactez-nous pour un devis gratuit et personnalisé. Nous intervenons sous 48h à Marseille et dans toute la région PACA.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <a
                href={PHONE_HREF}
                className="flex items-center justify-center gap-3 bg-white text-emerald-900 px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-50 transition-colors shadow-xl"
                aria-label={ARIA_PHONE}
              >
                <Phone className="w-6 h-6" />
                {PHONE_DISPLAY}
              </a>
              <Link
                to="/contact"
                className="flex items-center justify-center gap-3 bg-emerald-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-emerald-600 border border-emerald-500 transition-colors shadow-xl"
              >
                <Mail className="w-6 h-6" />
                Nous écrire
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FAQSection items={FAQ_DIOGENE} title="Questions fréquentes sur le nettoyage Diogène" />
    </>
  );
}