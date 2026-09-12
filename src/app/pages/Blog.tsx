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
  readTime: string;
  category: string;
  slug: string;
}

const articles: BlogArticle[] = [
  {
    id: '1',
    title: 'Comment préparer un état des lieux de sortie à Marseille',
    excerpt: 'Guide complet pour récupérer votre caution locative grâce à un nettoyage professionnel. Découvrez les zones critiques à nettoyer et les erreurs à éviter.',
    image: IMAGES.appartClesComplete,
    date: '27 janvier 2025',
    dateIso: '2025-01-27',
    readTime: '5 min',
    category: 'Particuliers',
    slug: '/blog/etat-des-lieux-sortie-marseille'
  },
  {
    id: '2',
    title: 'Protocole de nettoyage après sinistre : dégât des eaux et incendie',
    excerpt: 'Intervention rapide et protocole professionnel pour remettre en état vos locaux après un sinistre. Solutions adaptées pour Marseille et région PACA.',
    image: IMAGES.degatDesEaux,
    date: '27 janvier 2025',
    dateIso: '2025-01-27',
    readTime: '6 min',
    category: 'Professionnels',
    slug: '/blog/nettoyage-apres-sinistre'
  },
  {
    id: '3',
    title: 'Nettoyage de chantier : obligations légales et normes 2025',
    excerpt: 'Tout ce que les promoteurs et artisans doivent savoir sur les normes de nettoyage fin de chantier avant la livraison. Réglementation BTP mise à jour.',
    image: IMAGES.normesChantier2025,
    date: '27 janvier 2025',
    dateIso: '2025-01-27',
    readTime: '7 min',
    category: 'BTP & Chantiers',
    slug: '/blog/normes-nettoyage-chantier-2025'
  },
  {
    id: '4',
    title: 'Checklist nettoyage copropriété : le guide complet pour les syndics',
    excerpt: 'Les 8 zones à inclure dans votre cahier des charges, les fréquences recommandées et les 5 critères pour bien choisir votre prestataire de nettoyage.',
    image: IMAGES.hallMarbreAscenseurs,
    date: '10 février 2026',
    dateIso: '2026-02-10',
    readTime: '8 min',
    category: 'Syndics',
    slug: '/blog/checklist-nettoyage-copropriete-syndic'
  },
  {
    id: '5',
    title: 'Quel budget prévoir pour le nettoyage de bureaux à Marseille en 2026 ?',
    excerpt: 'Grille tarifaire actualisée, facteurs de prix et astuces pour optimiser votre budget d\'entretien de locaux professionnels à Marseille et en PACA.',
    image: IMAGES.grandOpenSpaceModerne,
    date: '15 février 2026',
    dateIso: '2026-02-15',
    readTime: '7 min',
    category: 'Tarifs',
    slug: '/blog/budget-nettoyage-bureaux-marseille-2026'
  },
  {
    id: '6',
    title: 'Nettoyage écologique en entreprise : pourquoi passer aux produits bio',
    excerpt: 'Avantages santé, labels fiables, impact RSE et retour sur investissement. Tout ce que les entreprises doivent savoir sur le nettoyage éco-responsable.',
    image: IMAGES.produitsEcoHero,
    date: '20 février 2026',
    dateIso: '2026-02-20',
    readTime: '6 min',
    category: 'Éco-responsable',
    slug: '/blog/nettoyage-ecologique-produits-bio-entreprise'
  },
  {
    id: '7',
    title: 'FAQ : Tout savoir sur le nettoyage de votre terrasse à Marseille avant l\'été',
    excerpt: 'Avec le retour des beaux jours en région PACA, découvrez nos réponses aux questions fréquentes sur l\'entretien de vos terrasses : haute pression, écologie, professionnels.',
    image: 'https://res.cloudinary.com/dc9xmxpvv/image/upload/v1777394246/nettoyage-terrasse-professionnel-marseille-nature-clean_vgosk1.jpg',
    date: '5 mai 2026',
    dateIso: '2026-05-05',
    readTime: '4 min',
    category: 'Conseils',
    slug: '/blog/faq-nettoyage-terrasse-marseille'
  },
  {
    id: '9',
    title: "Nettoyage de galerie d'art à Marseille : préserver les œuvres et valoriser les expositions",
    excerpt: "Entretien minutieux des sols lustrés, cimaises et vitrines d'exposition sans risque pour vos œuvres. Protocoles HEPA, produits neutres et interventions avant vernissage à Marseille.",
    image: IMAGES.galerieArtMarseille,
    date: '11 septembre 2026',
    dateIso: '2026-09-11',
    readTime: '4 min',
    category: 'Cas clients',
    slug: '/blog/nettoyage-galerie-art-marseille'
  },
  {
    id: '8',
    title: 'Quand la propreté fait partie de l\'expérience client : nettoyage de graffitis chez Carrefour à Marseille',
    excerpt: 'Retour sur notre intervention d\'urgence chez Carrefour à Marseille : effacement de tags, diagnostic de support, aérogommage et remise en état d\'une façade commerciale à fort trafic.',
    image: IMAGES.graffitiCarrefourAvant,
    date: '9 juin 2026',
    dateIso: '2026-06-09',
    readTime: '5 min',
    category: 'Cas clients',
    slug: '/blog/nettoyage-graffitis-carrefour-marseille'
  },
];

const sortedArticles = [...articles].sort((a, b) => b.dateIso.localeCompare(a.dateIso));

export function Blog() {
  return (
    <>
      <SEO_Guardian
        title="Blog Nettoyage Marseille | Conseils & Guides Experts | Nature Clean"
        description="Découvrez nos guides experts sur le nettoyage professionnel à Marseille : état des lieux, sinistres, chantiers. Conseils pratiques pour particuliers et professionnels."
        keywords="blog nettoyage marseille, conseils nettoyage 13, guide état des lieux, nettoyage après sinistre, normes chantier BTP"
        currentSection="blog"
        disableReviews={true}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-8 h-8" />
            <span className="text-sm font-semibold uppercase tracking-wider">Blog Expert</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Guides & Conseils Nettoyage Marseille
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Expertise professionnelle pour particuliers, entreprises et chantiers dans la région PACA
          </p>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {sortedArticles.map((article) => (
              <article key={article.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
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

                {/* Contenu */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {article.date}
                    </span>
                    <span>• {article.readTime} de lecture</span>
                  </div>

                  <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-green-600 transition-colors">
                    <Link to={article.slug}>{article.title}</Link>
                  </h2>

                  <p className="text-gray-600 mb-6 flex-grow leading-relaxed">
                    {article.excerpt}
                  </p>

                  <Button asChild variant="outline" className="w-full group border-green-600 text-green-700 hover:bg-green-700 hover:text-white">
                    <Link to={article.slug} className="flex items-center justify-center gap-2">
                      Lire l'article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Une question sur nos services ?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Notre équipe est à votre disposition pour vous conseiller et établir un devis gratuit adapté à vos besoins.
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