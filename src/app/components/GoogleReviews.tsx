import { useState, useEffect, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, ExternalLink } from 'lucide-react';
import { ScrollReveal } from '@/app/components/ScrollReveal';

/* ──────────────────────────────────────────────
   TYPES
   ────────────────────────────────────────────── */
interface GoogleReview {
  id: string;
  author: string;
  role: string;
  rating: 5;
  text: string;
  date: string;
  service: string;
  verified: boolean;
}

/* ──────────────────────────────────────────────
   DATA : Avis réels Google (Textes et noms exacts)
   ────────────────────────────────────────────── */
const reviews: GoogleReview[] = [
  {
    id: 'rev-1',
    author: 'Olivier Courtois',
    role: 'Avis Google',
    rating: 5,
    text: 'Service très pro, merci à Sarah. Boîte très sérieuse et dynamique, super réactivité ! Rien à redire. Je recommande les yeux fermés !',
    date: '2026-05-02', // "il y a 6 jours" — Visité en avril 2026
    service: 'Nettoyage',
    verified: true,
  },
  {
    id: 'rev-2',
    author: 'Chloé Statue',
    role: 'Avis Google',
    rating: 5,
    text: 'Équipe de nettoyage très sérieuse, je recommande les yeux fermés ! Que ça soit après un événement ou pour un état des lieux, ils sont très efficaces et professionnels.',
    date: '2026-04-28', // "il y a une semaine" — Visité en avril 2026
    service: 'État des lieux',
    verified: true,
  },
  {
    id: 'rev-3',
    author: 'Christophe Alliey',
    role: 'Avis Google',
    rating: 5,
    text: 'Prestation et personnel au top, je recommande vivement.',
    date: '2026-04-28', // "il y a une semaine" — Visité en avril 2026
    service: 'Nettoyage Professionnel',
    verified: true,
  },
  {
    id: 'rev-4',
    author: 'Camille Paris',
    role: 'Avis Google',
    rating: 5,
    text: 'Satisfait de la prestation. Une équipe ponctuelle, sérieuse et d\'un grand professionnalisme. Le travail est soigné, merci pour votre efficacité !',
    date: '2026-01-15', // "il y a 3 mois" — Visité en janvier 2026
    service: 'Nettoyage',
    verified: true,
  },
  {
    id: 'rev-5',
    author: 'Li PO',
    role: 'Avis Google',
    rating: 5,
    text: 'Sérieux et efficace ! Je referrais appel à eux prochainement. Agréablement surprise, j\'ai fait appel à cette société pour deux fins de chantiers, au top ! Arrangeants, professionnels et efficaces. Génial !',
    date: '2024-02-10', // Visité en février 2024
    service: 'Fin de Chantier',
    verified: true,
  },
  {
    id: 'rev-6',
    author: 'Edwige Dominique',
    role: 'Avis Google · Local Guide',
    rating: 5,
    text: 'Très satisfaite de la prestation lors du nettoyage de ma boutique. Je recommande fortement l\'entreprise pour son sérieux et surtout son efficacité.',
    date: '2023-05-15', // Visité en mai 2023
    service: 'Boutique',
    verified: true,
  },
  {
    id: 'rev-7',
    author: 'Guintelex',
    role: 'Avis Google',
    rating: 5,
    text: 'Société efficace et professionnelle.',
    date: '2023-05-15', // Visité en mai 2023
    service: 'Nettoyage Professionnel',
    verified: true,
  },
];

/* ──────────────────────────────────────────────
   SOUS-COMPOSANT : Étoiles
   ────────────────────────────────────────────── */
function StarRating({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${count} étoiles sur 5`}>
      {Array.from({ length: count }, (_, i) => (
        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

/* ──────────────────────────────────────────────
   SOUS-COMPOSANT : Carte avis (réutilisée mobile + desktop)
   ────────────────────────────────────────────── */
function ReviewCard({ review }: { review: GoogleReview }) {
  return (
    <article className="bg-white rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-white font-bold text-sm">
              {review.author.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="font-bold text-gray-900 text-sm">{review.author}</div>
            <div className="text-xs text-gray-500">{review.role}</div>
          </div>
        </div>
        {review.verified && (
          <div className="flex items-center gap-1 bg-blue-50 text-blue-600 px-2 py-1 rounded-md text-[10px] font-bold flex-shrink-0">
            <svg className="w-3 h-3" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </div>
        )}
      </div>

      {/* Étoiles + Service */}
      <div className="flex items-center justify-between mb-3">
        <StarRating count={review.rating} />
        <span className="text-[10px] font-medium text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
          {review.service}
        </span>
      </div>

      {/* Texte */}
      <div className="flex-1 relative">
        <Quote className="w-6 h-6 text-gray-100 absolute -top-1 -left-1" aria-hidden="true" />
        <p className="text-sm text-gray-700 leading-relaxed relative z-10 pl-2">
          {review.text}
        </p>
      </div>

      {/* Date */}
      <div className="mt-4 pt-3 border-t border-gray-50 text-xs text-gray-500">
        {new Date(review.date).toLocaleDateString('fr-FR', {
          year: 'numeric',
          month: 'long',
        })}
      </div>
    </article>
  );
}

/* ────────────────────────────────────────────
   COMPOSANT PRINCIPAL
   ────────────────────────────────────────────── */
export function GoogleReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const totalSlides = reviews.length;

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext]);

  const handleInteraction = () => {
    setIsAutoPlaying(false);
    const timer = setTimeout(() => setIsAutoPlaying(true), 10000);
    return () => clearTimeout(timer);
  };

  // Desktop : 3 avis visibles en rotation
  const getVisibleReviews = () => {
    const visible: GoogleReview[] = [];
    for (let i = 0; i < 3; i++) {
      visible.push(reviews[(currentIndex + i) % totalSlides]);
    }
    return visible;
  };

  return (
    <section className="py-16 md:py-20 bg-white" aria-labelledby="reviews-heading">
      <div className="container mx-auto px-4">

        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              Avis Google vérifiés
            </div>
            <h2 id="reviews-heading" className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Nos clients témoignent
            </h2>
            <p className="text-gray-600 max-w-xl mx-auto">
              Syndics, gestionnaires et professionnels de Marseille nous font confiance au quotidien
            </p>
            <div className="flex items-center justify-center gap-3 mt-5">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="font-black text-2xl text-gray-900">4.7</span>
              <span className="text-sm text-gray-500">(12 avis)</span>
            </div>
          </div>
        </ScrollReveal>

        {/* ─── MOBILE : scroll horizontal natif (tous les avis) ─── */}
        <ScrollReveal delay={0.1}>
          <div className="md:hidden -mx-4 px-4 pb-4 flex overflow-x-auto snap-x snap-mandatory gap-4">
            {reviews.map((review) => (
              <div key={review.id} className="flex-shrink-0 w-[85vw] snap-start">
                <ReviewCard review={review} />
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* ─── DESKTOP : slider rotatif 3 par 3 avec nav ─── */}
        <ScrollReveal delay={0.15}>
          <div className="hidden md:block relative">
            <button
              onClick={() => { goToPrev(); handleInteraction(); }}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 bg-white shadow-lg border border-gray-200 rounded-full p-2.5 text-gray-600 hover:text-green-600 hover:border-green-300 transition-all flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label="Avis précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => { goToNext(); handleInteraction(); }}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 bg-white shadow-lg border border-gray-200 rounded-full p-2.5 text-gray-600 hover:text-green-600 hover:border-green-300 transition-all flex items-center justify-center min-w-[44px] min-h-[44px]"
              aria-label="Avis suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {getVisibleReviews().map((review, index) => (
                <ReviewCard key={`${review.id}-${index}`} review={review} />
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Points de navigation (desktop uniquement) */}
        <div className="hidden md:flex items-center justify-center gap-2 mt-8" role="group" aria-label="Navigation des avis">
          {reviews.map((_, index) => (
            <button
              key={index}
              onClick={() => { setCurrentIndex(index); handleInteraction(); }}
              className={`rounded-full transition-all duration-300 p-1.5 ${
                index === currentIndex
                  ? 'bg-green-600'
                  : 'bg-transparent hover:bg-gray-100'
              }`}
              aria-label={`Avis ${index + 1} sur ${reviews.length}`}
              aria-current={index === currentIndex ? 'true' : undefined}
              style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'w-8 h-2.5 bg-white'
                    : 'w-2.5 h-2.5 bg-gray-300'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Lien Google */}
        <div className="text-center mt-6">
          <a
            href="https://g.page/r/CfUqF3S0FzRlEAI/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-green-600 transition-colors font-medium"
          >
            Voir tous nos avis sur Google
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}