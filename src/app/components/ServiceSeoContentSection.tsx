import type { ReactNode } from 'react';
import { ScrollReveal } from '@/app/components/ScrollReveal';

interface ServiceSeoContentSectionProps {
  title: string;
  /** Court chapô sous le H2 (optionnel) */
  lead?: string;
  children: ReactNode;
  className?: string;
}

/**
 * Bloc éditorial long pour fiches services : profondeur de contenu + maillage sémantique (Marseille, 13).
 */
export function ServiceSeoContentSection({
  title,
  lead,
  children,
  className = 'bg-slate-50 border-y border-slate-100',
}: ServiceSeoContentSectionProps) {
  return (
    <section className={`py-16 md:py-20 ${className}`}>
      <div className="container mx-auto px-4 max-w-3xl">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{title}</h2>
          {lead ? <p className="text-lg text-gray-600 mb-6 leading-relaxed">{lead}</p> : null}
          <div className="space-y-4 text-gray-700 leading-relaxed text-[1.05rem]">{children}</div>
        </ScrollReveal>
      </div>
    </section>
  );
}