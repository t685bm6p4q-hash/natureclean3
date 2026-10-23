import { useMemo, useState } from 'react';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import { Link } from 'react-router';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { IMAGES } from '@/app/utils/images';

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  dateIso: string;
  updatedIso?: string;
  readTime: string;
  category: string;
  slug: string;
}

const articles: BlogArticle[] = [
  {
    id: '10',
    title: 'Devis nettoyage Marseille : guide gratuit et réponse sous 2 h',
    excerpt:
      'Comment obtenir un devis de nettoyage professionnel à Marseille ? Infos à préparer, délais (réponse 2 h, devis 24 h), contenu d\'un bon devis.',
    image: IMAGES.poigneeMainDevis,
    date: '5 octobre 2026',
    dateIso: '2026-10-05',
    readTime: '6 min',
    category: 'Devis',
    slug: '/blog/devis-nettoyage-marseille-guide',
  },
  {
    id: '2',
    title: 'Nettoyage après dégât des eaux : ce que nous pouvons prendre en charge',
    excerpt:
      'Humidité, salissures et remise en propreté après fuite : périmètre d\'intervention Nature Clean à Marseille. Incendie et suies : prestations spécialisées à part.',
    image: IMAGES.degatDesEaux,
    date: '27 janvier 2025',
    dateIso: '2025-01-27',
    updatedIso: '2026-10-24',
    readTime: '6 min',
    category: 'Professionnels',
    slug: '/blog/nettoyage-apres-sinistre',
  },
  {
    id: '3',
    title: 'Nettoyage de fin de chantier : obligations et bonnes pratiques',
    excerpt:
      'Ce que promoteurs et artisans vérifient avant livraison : propreté des locaux, points de contrôle. Informations générales — à confronter à votre cahier des charges et à un conseil juridique si besoin.',
    image: IMAGES.normesChantier2025,
    date: '27 janvier 2025',
    dateIso: '2025-01-27',
    updatedIso: '2026-10-24',
    readTime: '7 min',
    category: 'BTP & Chantiers',
    slug: '/blog/normes-nettoyage-chantier-2025',
  },
  {
    id: '4',
    title: 'Checklist nettoyage copropriété : le guide complet pour les syndics',
    excerpt:
      'Les 8 zones à inclure dans votre cahier des charges, les fréquences recommandées et les 5 critères pour bien choisir votre prestataire de nettoyage.',
    image: IMAGES.hallMarbreAscenseurs,
    date: '10 février 2026',
    dateIso: '2026-02-10',
    readTime: '8 min',
    category: 'Syndics',
    slug: '/blog/checklist-nettoyage-copropriete-syndic',
  },
  {
    id: '5',
    title: 'Ce qui fait varier le prix d\'un nettoyage de bureaux à Marseille',
    excerpt:
      'Surface, fréquence, horaires, type de locaux et prestations : les critères de devis sans grille tarifaire publique. Bouches-du-Rhône.',
    image: IMAGES.grandOpenSpaceModerne,
    date: '15 février 2026',
    dateIso: '2026-02-15',
    updatedIso: '2026-10-24',
    readTime: '7 min',
    category: 'Guides pratiques',
    slug: '/blog/budget-nettoyage-bureaux-marseille-2026',
  },
  {
    id: '6',
    title: 'Nettoyage éco-responsable en entreprise : produits éco-labellisés',
    excerpt:
      'Pourquoi choisir des produits éco-labellisés pour l\'entretien courant, ce que recouvre notre « environ 50 % », et les limites (désinfection réglementée).',
    image: IMAGES.produitsEcoHero,
    date: '20 février 2026',
    dateIso: '2026-02-20',
    updatedIso: '2026-10-24',
    readTime: '6 min',
    category: 'Éco-responsable',
    slug: '/blog/nettoyage-ecologique-produits-bio-entreprise',
  },
  {
    id: '7',
    title: 'FAQ : entretien de terrasse à Marseille avant l\'été',
    excerpt:
      'Questions fréquentes sur l\'entretien des terrasses à Marseille : haute pression, fréquence, faire appel à un professionnel.',
    image: 'https://res.cloudinary.com/dc9xmxpvv/image/upload/v1777394246/nettoyage-terrasse-professionnel-marseille-nature-clean_vgosk1.jpg',
    date: '5 mai 2026',
    dateIso: '2026-05-05',
    readTime: '4 min',
    category: 'Conseils',
    slug: '/blog/faq-nettoyage-terrasse-marseille',
  },
  {
    id: '9',
    title: 'Entretien d\'une galerie d\'art à Marseille : protocole et retour de terrain',
    excerpt:
      'Sols lustrés, vitrines et cimaises sans risque pour les œuvres. Fiche complète aussi sur nos réalisations.',
    image: IMAGES.galerieArtMarseille,
    date: '11 septembre 2026',
    dateIso: '2026-09-11',
    readTime: '4 min',
    category: 'Cas clients',
    slug: '/blog/nettoyage-galerie-art-marseille',
  },
  {
    id: '8',
    title: 'Effacement de graffitis sur façade commerciale à Marseille',
    excerpt:
      'Retour d\'intervention en urgence sur une grande surface : diagnostic, techniques et remise en état. Détails sur la page réalisations et la fiche graffitis.',
    image: IMAGES.graffitiCarrefourAvant,
    date: '9 juin 2026',
    dateIso: '2026-06-09',
    readTime: '5 min',
    category: 'Cas clients',
    slug: '/blog/nettoyage-graffitis-grande-surface-marseille',
  },
];

const sortedArticles = [...articles].sort((a, b) => b.dateIso.localeCompare(a.dateIso));

const ALL_CATEGORIES = ['Tous', ...Array.from(new Set(articles.map((a) => a.category))).sort()] as const;

export function Blog() {
  const [activeCategory, setActiveCategory] = useState<string>('Tous');

  const filtered = useMemo(() => {
    if (activeCategory === 'Tous') return sortedArticles;
    return sortedArticles.filter((a) => a.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <SEO_Guardian
        title="Blog Nettoyage Pro Marseille | Conseils & Guides – Nature Clean"
        description="Guides pratiques et retours de terrain de Nature Clean : devis, copropriétés, fin de chantier, commerces, graffitis. Conseils pour professionnels à Marseille."
        keywords="blog nettoyage marseille, conseils nettoyage 13, guide copropriété syndic, devis nettoyage professionnel"
        currentSection="blog"
      />

      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-8 h-8" aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-wider">Blog</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Guides et conseils de nettoyage professionnel à Marseille
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Des conseils concrets pour les syndics, entreprises, commerçants et promoteurs des Bouches-du-Rhône.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div
            className="flex flex-wrap justify-center gap-2 mb-10 max-w-4xl mx-auto"
            role="tablist"
            aria-label="Filtrer les articles par catégorie"
          >
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? 'bg-green-700 text-white'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-green-400'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {filtered.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col"
              >
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                    width={600}
                    height={400}
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-green-700 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" aria-hidden="true" />
                      {article.date}
                    </span>
                    {article.updatedIso && article.updatedIso > article.dateIso ? (
                      <span className="text-xs text-green-700 font-medium">Mis à jour oct. 2026</span>
                    ) : null}
                    <span>• {article.readTime} de lecture</span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors">
                    <Link to={article.slug}>{article.title}</Link>
                  </h2>

                  <p className="text-gray-600 mb-6 flex-grow leading-relaxed">{article.excerpt}</p>

                  <Button
                    asChild
                    variant="outline"
                    className="w-full group border-green-600 text-green-700 hover:bg-green-700 hover:text-white"
                  >
                    <Link to={article.slug} className="flex items-center justify-center gap-2">
                      Lire l&apos;article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 mt-8">Aucun article dans cette catégorie.</p>
          ) : null}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Une question sur nos services ?</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Réponse sous 2 h en horaires d&apos;ouverture, devis gratuit sous 24 h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-green-700 hover:bg-green-800">
              <Link to="/devis">Demander un devis gratuit</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              <Link to="/contact">Nous contacter</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
