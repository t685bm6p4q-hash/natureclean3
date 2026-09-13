import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { Button } from '@/app/components/ui/button';
import { Link } from 'react-router';
import { Phone, ArrowLeft, Clock, CheckCircle2, Sparkles } from 'lucide-react';
import { useArticleJsonLd } from '@/app/hooks/useArticleJsonLd';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { IMAGES, getOptimizedCldUrl, cldSrcSet } from '@/app/utils/images';

export function NettoyageGalerieArtMarseille() {
  const heroImageUrl = getOptimizedCldUrl(IMAGES.galerieArtMarseille, 1200);

  useArticleJsonLd({
    headline: "Nettoyage de galerie d'art à Marseille : préserver les œuvres et valoriser les expositions",
    description: "Spécialiste du nettoyage de galeries d'art et lieux d'exposition à Marseille. Entretien minutieux des sols, vitrines et cimaises sans risque pour vos œuvres. Devis sous 24h.",
    image: heroImageUrl,
    datePublished: '2026-09-11',
    dateModified: '2026-09-11',
    slug: 'nettoyage-galerie-art-marseille',
    keywords: "nettoyage galerie art marseille, entretien espace exposition, nettoyage lieu culturel paca, propreté vernissage marseille, entretien cimaise vitrine",
    articleSection: 'Cas clients',
    wordCount: 500,
  });

  return (
    <>
      <SEO_Guardian
        title="Nettoyage Galerie d'Art Marseille | Espaces d'Exposition | Nature Clean"
        description="Spécialiste du nettoyage de galeries d'art et lieux d'exposition à Marseille. Entretien minutieux des sols, vitrines et cimaises sans risque pour vos œuvres. Devis sous 24h."
        keywords="nettoyage galerie art marseille, entretien espace exposition, nettoyage lieu culturel paca, propreté vernissage marseille"
        currentSection="blog"

      />

      <article className="bg-white">

        {/* ── HERO ─────────────────────────────────────────────── */}
        <div className="relative h-96 md:h-[500px] overflow-hidden">
          <img
            src={heroImageUrl}
            srcSet={cldSrcSet(IMAGES.galerieArtMarseille, [600, 900, 1200])}
            sizes="100vw"
            alt="Nettoyage et entretien des sols d'une galerie d'art à Marseille"
            width="1200"
            height="500"
            // @ts-ignore — fetchpriority: attribut HTML valide, non typé en minuscules dans React 18
            fetchpriority="high"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="container mx-auto">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-white hover:text-green-300 mb-4 transition-colors text-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour au blog
              </Link>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="inline-flex items-center gap-1.5 bg-green-600/90 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  <Sparkles className="w-3 h-3" />
                  Cas clients
                </span>
                <span className="flex items-center gap-1.5 text-green-300 text-sm">
                  <Clock className="w-4 h-4" />
                  4 min de lecture • 11 septembre 2026
                </span>
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-white max-w-4xl leading-tight">
                Nettoyage de galerie d'art à Marseille : préserver les œuvres et valoriser les expositions
              </h1>
            </div>
          </div>
        </div>

        {/* ── CONTENU ──────────────────────────────────────────── */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">

            {/* ── Section 1 ── */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                L'exigence de la propreté au service de l'art
              </h2>
              <p className="text-xl text-gray-700 leading-relaxed mb-5">
                Accueillir le public, des collectionneurs ou des artistes dans un espace d'exposition exige une propreté irréprochable. La moindre poussière sur un socle, une trace de doigt sur une vitrine de protection ou un sol terni détourne le regard de l'essentiel : les œuvres exposées.
              </p>
              <p className="text-gray-700 leading-relaxed">
                L'entretien d'une galerie d'art ne s'improvise pas. Contrairement à un local commercial standard, chaque intervention nécessite des protocoles stricts pour garantir la sécurité des pièces exposées tout en offrant un cadre lumineux et épuré.
              </p>
            </section>

            {/* ── Section 2 + photo ── */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Nos protocoles d'intervention pour les espaces d'exposition
              </h2>
              <p className="text-gray-700 leading-relaxed mb-8">
                Nos équipes interviennent avec des méthodes adaptées aux contraintes techniques et esthétiques des galeries marseillaises :
              </p>

              <div className="space-y-4 mb-10">
                {[
                  {
                    title: "Dépoussiérage et soin des abords des œuvres",
                    desc: "Utilisation d'aspirateurs équipés de filtres HEPA et de microfibres électrostatiques pour capturer la poussière sans la remettre en suspension dans l'air.",
                  },
                  {
                    title: "Entretien des sols à fort passage",
                    desc: "Lavage, décapage et lustrage des bétons cirés, parquets massifs ou résines époxy pour garantir une brillance homogène sous les projecteurs.",
                  },
                  {
                    title: "Nettoyage des vitrages et cimaises",
                    desc: "Élimination des traces sur les surfaces vitrées, cloisons modulaires et socles de présentation pour une transparence totale.",
                  },
                  {
                    title: "Produits neutres et éco-responsables",
                    desc: "Application exclusive de solutions sans émanations agressives ni composés volatils risquant d'altérer les toiles, sculptures ou photographies.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-xl p-5">
                    <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Photo espace culturel */}
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={getOptimizedCldUrl(IMAGES.espaceCulturelMarseille, 900)}
                  srcSet={cldSrcSet(IMAGES.espaceCulturelMarseille, [400, 700, 900])}
                  sizes="(max-width: 768px) 100vw, 896px"
                  alt="Dépoussiérage méticuleux d'espace d'exposition et galerie d'art"
                  width="900"
                  height="500"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-72 md:h-96 object-cover"
                />
                <div className="bg-gray-900 text-white px-6 py-3 text-sm text-center">
                  Entretien et propreté d'un espace culturel à Marseille — Nature Clean
                </div>
              </div>
            </section>

            {/* ── Section 3 ── */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                Préparation avant vernissage et remise en état après démontage
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                La vie d'une galerie est rythmée par les rotations d'expositions. Entre deux accrochages, les travaux de réaménagement et de retouche de peinture laissent souvent des résidus.
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {[
                  {
                    label: 'Avant vernissage',
                    desc: "Grand nettoyage complet pour une ouverture au public parfaite : sols lustrés, vitrines sans trace, cimaises impeccables.",
                    color: 'bg-green-50 border-green-200',
                    badge: 'bg-green-600',
                  },
                  {
                    label: 'Après démontage',
                    desc: "Remise en état des sols et murs pour préparer l'arrivée de la prochaine scénographie, sans résidus ni marques.",
                    color: 'bg-slate-50 border-slate-200',
                    badge: 'bg-slate-700',
                  },
                ].map((item) => (
                  <div key={item.label} className={`border rounded-xl p-6 ${item.color}`}>
                    <span className={`inline-block text-white text-xs font-bold px-3 py-1 rounded-full mb-3 ${item.badge}`}>
                      {item.label}
                    </span>
                    <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-6">
                <p className="text-gray-700 leading-relaxed">
                  Pour assurer la continuité de vos événements à Marseille et dans toute la région PACA, nos interventions s'adaptent à vos <strong>horaires d'ouverture</strong> et à vos <strong>plannings de montage</strong>.
                </p>
              </div>
            </section>

            {/* ── CTA ── */}
            <section className="mb-12">
              <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-8 text-center shadow-lg">
                <h3 className="text-2xl font-bold mb-3">
                  Vous gérez une galerie ou un espace culturel à Marseille ?
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  Devis gratuit sous 24h. Interventions en horaires décalés pour ne pas perturber vos expositions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-white text-green-700 hover:bg-gray-100 font-bold">
                    <Link to="/devis">Demander un devis gratuit</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="!bg-transparent border-2 border-white !text-white hover:!bg-white/10 [&>*]:!text-white">
                    <a href={PHONE_HREF} className="flex items-center gap-2" aria-label={ARIA_PHONE}>
                      <Phone className="w-5 h-5" />
                      {PHONE_DISPLAY}
                    </a>
                  </Button>
                </div>
              </div>
            </section>

            {/* ── Articles connexes ── */}
            <section className="mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Articles connexes</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Link
                  to="/blog/nettoyage-graffitis-carrefour-marseille"
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-green-700 mb-2">
                    Nettoyage graffitis chez Carrefour →
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Retour sur notre intervention d'urgence sur une façade commerciale à fort trafic.
                  </p>
                </Link>
                <Link
                  to="/blog/nettoyage-ecologique-produits-bio-entreprise"
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-lg font-semibold text-green-700 mb-2">
                    Nettoyage écologique en entreprise →
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Pourquoi passer aux produits bio ? Labels fiables et impact RSE.
                  </p>
                </Link>
              </div>
            </section>

          </div>
        </div>
      </article>
    </>
  );
}
