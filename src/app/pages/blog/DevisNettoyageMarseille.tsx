import { Link } from 'react-router';
import { ArrowLeft, Clock, FileCheck, Phone, ClipboardList, CheckCircle2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { useArticleJsonLd } from '@/app/hooks/useArticleJsonLd';
import { IMAGES } from '@/app/utils/images';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Le devis de nettoyage à Marseille est-il gratuit chez Nature Clean ?',
    answer:
      'Oui, le devis est gratuit et sans engagement. Après votre demande (formulaire, téléphone ou WhatsApp), nous vous rappelons sous 24 h pour préciser le besoin et vous envoyer une proposition écrite.',
  },
  {
    question: 'Quelles informations faut-il pour obtenir un devis nettoyage à Marseille ?',
    answer:
      'Type de locaux (bureaux, copropriété, chantier, industriel), ville ou code postal, surface approximative, fréquence souhaitée et un moyen de contact. Un court message sur l\'état des lieux ou les délais accélère la réponse.',
  },
  {
    question: 'En combien de temps recevez-vous un devis pour un nettoyage professionnel ?',
    answer:
      'Pour la majorité des demandes à Marseille et dans le 13, nous répondons sous 24 h ouvrées. Les urgences fin de chantier ou sinistre peuvent être traitées le jour même si vous appelez avant 14 h.',
  },
  {
    question: 'Intervenez-vous uniquement à Marseille intra-muros ?',
    answer:
      'Non. Nous couvrons Marseille (13001-13016), Aubagne, Aix-en-Provence, La Ciotat, Vitrolles et la métropole. Le devis précise les zones et les créneaux d\'intervention.',
  },
];

const steps = [
  {
    title: '1. Décrivez votre besoin',
    detail: 'Bureaux, copropriété, fin de chantier, industriel ou particulier — indiquez la ville et la surface si vous la connaissez.',
  },
  {
    title: '2. Rappel sous 24 h',
    detail: 'Un conseiller Nature Clean vous contacte pour affiner le périmètre (fréquence, horaires, protocoles spécifiques).',
  },
  {
    title: '3. Devis détaillé',
    detail: 'Proposition écrite avec prestations incluses, planning type et coordonnées de votre interlocuteur unique.',
  },
  {
    title: '4. Démarrage',
    detail: 'Après validation, planification sous 48 h pour l\'entretien courant ; plus rapide pour les urgences chantier.',
  },
];

const prestations = [
  { label: 'Bureaux & open spaces', href: '/nettoyage-bureaux-marseille' },
  { label: 'Copropriétés & syndics', href: '/services/nettoyage-coproprietes' },
  { label: 'Fin de chantier', href: '/nettoyage-fin-chantier-marseille' },
  { label: 'Industriel & entrepôts', href: '/nettoyage-industriel-marseille' },
  { label: 'Cabinets médicaux', href: '/nettoyage-medical-marseille' },
];

export function DevisNettoyageMarseille() {
  useArticleJsonLd({
    headline: 'Devis nettoyage Marseille : guide gratuit et réponse sous 24 h',
    description:
      'Comment obtenir un devis de nettoyage professionnel à Marseille : informations à préparer, délais, types de prestations. Nature Clean, entreprise locale 8e.',
    image: IMAGES.poigneeMainDevis,
    datePublished: '2026-10-05',
    dateModified: '2026-10-05',
    slug: 'devis-nettoyage-marseille-guide',
    keywords:
      'devis nettoyage marseille, entreprise nettoyage marseille devis, devis gratuit nettoyage professionnel 13, demande devis entretien locaux marseille',
    articleSection: 'Guides pratiques',
    wordCount: 1100,
  });

  return (
    <>
      <SEO_Guardian
        title="Devis Nettoyage Marseille Gratuit | Réponse 24h | Nature Clean"
        description="Comment obtenir un devis nettoyage à Marseille ? Guide gratuit : infos à préparer, délais, bureaux, copros, chantiers. Entreprise locale · 4,7★ · 04 84 89 68 75."
        keywords="devis nettoyage marseille, devis gratuit nettoyage marseille, entreprise nettoyage marseille devis, nettoyage professionnel marseille prix, demande devis 13"
        currentSection="blog"
        faqItems={FAQ_ITEMS}
      />

      <article className="bg-white">
        <div className="relative h-80 md:h-96 overflow-hidden">
          <img
            src={IMAGES.poigneeMainDevis}
            alt="Demande de devis nettoyage professionnel à Marseille — Nature Clean"
            className="w-full h-full object-cover"
            width={1920}
            height={600}
            fetchPriority="high"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/45 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="container mx-auto">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-green-300 hover:text-green-200 mb-4 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Retour au blog
              </Link>
              <div className="flex flex-wrap items-center gap-4 text-gray-300 text-sm mb-3">
                <span className="bg-green-700 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Devis
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" aria-hidden="true" /> 6 min de lecture
                </span>
                <span>5 octobre 2026</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white max-w-3xl">
                Devis nettoyage Marseille : comment obtenir une réponse claire sous 24 h
              </h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Vous cherchez un <strong>devis nettoyage à Marseille</strong> pour vos bureaux, une copropriété
                ou un chantier ? Entre les prix au m² annoncés en ligne et les devis « sur catalogue », difficile
                de savoir quoi demander. Voici comment préparer votre demande et ce que vous recevez chez{' '}
                <strong>Nature Clean</strong>, entreprise basée dans le 8<sup>e</sup> arrondissement.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <ClipboardList className="w-6 h-6 text-green-600" aria-hidden="true" />
                Les 4 étapes de notre devis
              </h2>
              <ol className="space-y-4 mb-10">
                {steps.map((s) => (
                  <li
                    key={s.title}
                    className="flex gap-4 p-4 rounded-xl border border-gray-200 bg-gray-50"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-bold text-gray-900">{s.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{s.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-3">
                <FileCheck className="w-6 h-6 text-green-600" aria-hidden="true" />
                Ce que doit contenir un bon devis
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-10">
                <li>Prestations détaillées (sol, sanitaires, vitres, poubelles, parties communes…)</li>
                <li>Fréquence et plages horaires (avant ouverture, après fermeture, week-end)</li>
                <li>Prix mensuel ou forfait chantier, hors taxes, sans frais cachés</li>
                <li>Assurance RC Pro et coordonnées d’un interlocuteur unique</li>
                <li>Délai de validité et conditions de démarrage</li>
              </ul>
              <p className="text-gray-600 text-sm mb-10">
                Pour les budgets indicatifs bureaux, consultez aussi notre{' '}
                <Link to="/blog/budget-nettoyage-bureaux-marseille-2026" className="text-green-700 font-semibold underline">
                  guide tarifaire 2026
                </Link>
                .
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-black text-gray-900 mb-4">Prestations concernées</h2>
              <div className="flex flex-wrap gap-2 mb-10">
                {prestations.map((p) => (
                  <Link
                    key={p.href}
                    to={p.href}
                    className="px-4 py-2 rounded-full border border-green-200 bg-green-50 text-sm font-semibold text-green-800 hover:bg-green-100 transition-colors"
                  >
                    {p.label}
                  </Link>
                ))}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bg-gray-900 rounded-2xl p-8 text-center">
                <h2 className="text-2xl font-black text-white mb-3">Demandez votre devis express</h2>
                <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                  Formulaire en 1 minute — rappel sous 24 h. Ou appelez-nous pour une urgence chantier.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black">
                    <Link to="/devis">Demander un devis gratuit</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10 font-bold"
                  >
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
      </article>

      <FAQSection
        items={FAQ_ITEMS}
        title="FAQ — Devis nettoyage Marseille"
        subtitle="Les questions les plus fréquentes avant de nous contacter"
      />
    </>
  );
}
