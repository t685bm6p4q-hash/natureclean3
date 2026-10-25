import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { Button } from '@/app/components/ui/button';
import { Link } from 'react-router';
import { ArrowLeft, Clock, Leaf, Droplets, Recycle, Heart, ShieldCheck, Phone } from 'lucide-react';
import { IMAGES } from '@/app/utils/images';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { FAQSection } from '@/app/components/FAQSection';
import type { FAQItem } from '@/app/components/FAQSection';
import { useArticleJsonLd } from '@/app/hooks/useArticleJsonLd';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { BlogArticleByline } from '@/app/components/BlogArticleByline';

const FAQ_ITEMS: FAQItem[] = [
  { question: 'Les produits de nettoyage ecologiques sont-ils aussi efficaces ?', answer: 'Oui, les produits eco-labellises actuels offrent une efficacite comparable aux produits conventionnels pour l\'entretien courant. Seuls certains cas extremes (decapage industriel, desinfection hospitaliere) peuvent necessiter des produits specifiques.' },
  { question: 'Le nettoyage ecologique coute-t-il plus cher ?', answer: 'Le surcout produit reste en general modere ; le devis compare eco-labellise et protocole standard. L\'interet principal est la qualite de l\'air interieur, l\'image RSE et l\'alignement avec vos engagements — sans promesse de ROI chiffre.' },
  { question: 'Quels labels garantissent un produit de nettoyage ecologique ?', answer: 'Les labels les plus fiables sont l\'Ecolabel Europeen, Nature & Progres, et Ecocert. Ils garantissent une formulation biodegradable, l\'absence de substances toxiques et un impact environnemental reduit.' },
];

export function NettoyageEcologiqueEntreprise() {
  useArticleJsonLd({
    headline: 'Nettoyage eco-responsable en entreprise : produits eco-labellises',
    description: 'Pourquoi choisir des produits eco-labellises pour l\'entretien courant a Marseille. Labels, sante des occupants, RSE et engagement Nature Clean (~50 % eco-labellises).',
    image: IMAGES.produitsEcoHero,
    datePublished: '2026-02-20',
    dateModified: '2026-10-24',
    slug: 'nettoyage-ecologique-produits-bio-entreprise',
    keywords: 'nettoyage ecologique entreprise, produits eco-labellises nettoyage, nettoyage eco-responsable bureaux marseille, RSE nettoyage professionnel',
    articleSection: 'Eco-responsabilite',
    wordCount: 1300,
  });

  const avantages = [
    {
      icon: Heart,
      title: 'Sante des occupants',
      desc: 'Les produits conventionnels peuvent emettre des COV irritants. Les produits eco-labellises limitent ces expositions pour le personnel present pendant ou apres le nettoyage — un argument concret pour les bureaux occupes.',
    },
    {
      icon: Leaf,
      title: 'Impact environnemental',
      desc: 'Les produits biodegradables se decomposent naturellement sans polluer les eaux usees. A l\'echelle d\'une entreprise de 200 m2, c\'est 40 litres de produits chimiques en moins dans les canalisations chaque annee.',
    },
    {
      icon: ShieldCheck,
      title: 'Conformite RSE & image',
      desc: 'Le nettoyage ecologique s\'integre dans votre politique RSE. C\'est un argument concret pour vos rapports extra-financiers, vos certifications (ISO 14001, B Corp) et votre marque employeur.',
    },
    {
      icon: Recycle,
      title: 'Durabilite des surfaces',
      desc: 'Les produits agressifs deteriorent les revetements (sols, mobilier, vitres). Les alternatives ecologiques preservent les materiaux et allongent leur duree de vie — un gain financier sur le long terme.',
    },
  ];

  const labels = [
    { nom: 'Ecolabel Europeen', desc: 'Label officiel de l\'UE. Criteres stricts sur la biodegradabilite, la toxicite aquatique et les emballages.' },
    { nom: 'Nature & Progres', desc: 'Label francais exigeant : 100% d\'ingredients naturels, pas de petrochimie, emballages recyclables.' },
    { nom: 'Ecocert', desc: 'Certification internationale. Minimum 95% d\'ingredients d\'origine naturelle, sans OGM ni nanoparticules.' },
  ];

  return (
    <>
      <SEO_Guardian
        title="Nettoyage Eco-Responsable Entreprise | Produits Eco-Labellisés | Nature Clean"
        description="Produits eco-labellises pour l'entretien de bureaux a Marseille : labels, sante, RSE et ~50 % eco-labellises chez Nature Clean. Sans promesse ROI chiffre."
        keywords="nettoyage ecologique entreprise, produits eco-labellises nettoyage professionnel, nettoyage eco-responsable bureaux marseille, RSE nettoyage"
        currentSection="blog"
        faqItems={FAQ_ITEMS}

      />

      <article className="bg-white">
        {/* Hero */}
        <div>
          <div className="h-56 md:h-72 overflow-hidden">
          <img
            src={IMAGES.produitsEcoHero}
            alt="Produits de nettoyage ecologiques — guide entreprise"
            className="w-full h-full object-cover"
            width="1920"
            height="600"
            // @ts-ignore — fetchpriority: attribut HTML valide, non typé en minuscules dans React 18
            fetchpriority="high"
            decoding="async"
          />
          </div>
          <div className="bg-gray-900 text-white p-6 md:p-10">
            <div className="container mx-auto">
              <Link to="/blog" className="inline-flex items-center gap-2 text-green-300 hover:text-green-200 mb-4 transition-colors">
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                Retour au blog
              </Link>
              <div className="flex items-center gap-4 text-gray-300 text-sm mb-3">
                <span className="bg-green-700 text-white px-3 py-1 rounded-full text-xs font-semibold">Eco-responsable</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" aria-hidden="true" /> 6 min de lecture</span>
                <span>20 fevrier 2026</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white max-w-3xl">
                Nettoyage eco-responsable en entreprise : produits eco-labellises
              </h1>
            </div>
          </div>
        </div>

        {/* Contenu */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto">
            <BlogArticleByline publishedLabel="20 février 2026" updatedLabel="24 octobre 2026" />
            <ScrollReveal>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Vos salaries passent en moyenne <strong>8 heures par jour</strong> dans vos locaux. La qualite de l'air interieur depend directement des produits utilises pour le nettoyage. De plus en plus d'entreprises a Marseille font le choix de l'<strong>entretien avec produits eco-labellises</strong> — confort, image RSE et cohérence avec notre démarche sur{' '}
                <Link to="/a-propos" className="text-green-800 font-semibold underline">la page À propos</Link>.
              </p>
            </ScrollReveal>

            {/* 4 avantages */}
            <ScrollReveal>
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <Leaf className="w-6 h-6 text-green-600" aria-hidden="true" />
                4 raisons de passer au nettoyage ecologique
              </h2>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {avantages.map((item, i) => (
                <ScrollReveal key={item.title} delay={i * 0.06}>
                  <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 h-full">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                      <item.icon className="w-5 h-5 text-green-600" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Photo break */}
            <ScrollReveal>
              <div className="grid grid-cols-2 gap-4 mb-12">
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src={IMAGES.produitsEcoBrosses}
                    alt="Brosses et produits ecologiques pour le nettoyage professionnel"
                    className="w-full h-48 md:h-64 object-cover"
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={300}
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src={IMAGES.sprayMicrofibre}
                    alt="Spray ecologique et microfibre pour l'entretien de bureaux"
                    className="w-full h-48 md:h-64 object-cover"
                    loading="lazy"
                    decoding="async"
                    width={400}
                    height={300}
                  />
                </div>
              </div>
            </ScrollReveal>

            {/* Labels */}
            <ScrollReveal>
              <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center gap-3">
                <Droplets className="w-6 h-6 text-green-600" aria-hidden="true" />
                Les 3 labels a connaitre
              </h2>
            </ScrollReveal>

            <div className="space-y-4 mb-12">
              {labels.map((label, i) => (
                <ScrollReveal key={label.nom} delay={i * 0.06}>
                  <div className="flex items-start gap-3 bg-green-50 p-5 rounded-xl border border-green-100">
                    <Leaf className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <h3 className="font-bold text-gray-900">{label.nom}</h3>
                      <p className="text-sm text-gray-600">{label.desc}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* L'engagement Nature Clean */}
            <ScrollReveal>
              <div className="bg-gray-900 rounded-2xl p-8 mb-12">
                <span className="inline-flex items-center gap-2 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs font-bold mb-4">
                  <Leaf className="w-3 h-3" aria-hidden="true" />
                  Notre engagement
                </span>
                <h2 className="text-2xl font-black text-white mb-3">
                  Chez Nature Clean, environ 50 % de nos produits sont eco-labellises
                </h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Depuis notre creation en 2021, nous avons progressivement remplace nos produits conventionnels par des alternatives ecologiques certifiees. Notre objectif : atteindre 80% de produits eco-labellises d'ici 2027, sans compromis sur l'efficacite.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-green-500 hover:bg-green-400 text-gray-900 font-black">
                    <Link to="/devis">Devis eco-responsable gratuit</Link>
                  </Button>
                  <Button asChild size="lg" variant="outlineOnDark">
                    <a href={PHONE_HREF} className="flex items-center justify-center gap-2" aria-label={ARIA_PHONE}>
                      <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
                      {PHONE_DISPLAY}
                    </a>
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            {/* Checklist rapide */}
            <ScrollReveal>
              <h2 className="text-2xl font-black text-gray-900 mb-6">
                Checklist : votre prestataire est-il vraiment eco ?
              </h2>
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 mb-8">
                <ul className="space-y-3">
                  {[
                    'Peut fournir la liste des produits utilises avec les fiches techniques',
                    'Utilise au moins 50% de produits eco-labellises (Ecolabel, Ecocert, Nature & Progres)',
                    'Forme ses equipes aux dosages et aux bonnes pratiques environnementales',
                    'Propose des microfibres reutilisables plutot que des lingettes jetables',
                    'Minimise les emballages plastiques et privilegie les concentres rechargeables',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                      <ShieldCheck className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </article>

      {/* FAQ */}
      <FAQSection
        items={FAQ_ITEMS}
        title="Questions frequentes — Nettoyage ecologique"
        subtitle="Vos questions sur le nettoyage eco-responsable en entreprise"
      />
    </>
  );
}