import { User, CalendarClock } from 'lucide-react';

interface BlogArticleBylineProps {
  publishedLabel: string;
  updatedLabel?: string;
  authorName?: string;
  authorRole?: string;
}

/** Auteur et dates visibles — crédibilité E-E-A-T sur les articles. */
export function BlogArticleByline({
  publishedLabel,
  updatedLabel,
  authorName = 'Nature Clean',
  authorRole = 'Équipe terrain et direction — Marseille 8e',
}: BlogArticleBylineProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 text-sm text-gray-500 border-b border-gray-100 pb-6 mb-8">
      <span className="flex items-center gap-2">
        <User className="w-4 h-4 text-green-600 shrink-0" aria-hidden="true" />
        <span>
          <span className="font-semibold text-gray-800">{authorName}</span>
          <span className="text-gray-500"> — {authorRole}</span>
        </span>
      </span>
      <span className="flex items-center gap-2">
        <CalendarClock className="w-4 h-4 text-green-600 shrink-0" aria-hidden="true" />
        <span>Publié le {publishedLabel}</span>
        {updatedLabel && updatedLabel !== publishedLabel ? (
          <span className="text-gray-600"> · Mis à jour le {updatedLabel}</span>
        ) : null}
      </span>
    </div>
  );
}
