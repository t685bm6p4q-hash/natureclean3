import { ChevronDown } from 'lucide-react';
import { ScrollReveal } from '@/app/components/ScrollReveal';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
}

/**
 * FAQSection — Accordéon natif (`details`/`summary`).
 * Les réponses restent dans le HTML même repliées : indexables sans clic.
 * Compatible JSON-LD FAQPage via SEO_Guardian.faqItems.
 */
export function FAQSection({
  items,
  title = 'Questions fréquentes',
  subtitle,
}: FAQSectionProps) {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 text-center">
              {title}
            </h2>
            {subtitle && (
              <p className="text-gray-500 text-center mb-10 max-w-xl mx-auto">
                {subtitle}
              </p>
            )}
          </ScrollReveal>

          <div className="space-y-3">
            {items.map((item, index) => (
              <ScrollReveal key={item.question} delay={index * 0.05}>
                <details
                  className="group bg-white rounded-xl border border-gray-200 overflow-hidden transition-shadow hover:shadow-md"
                  open={index === 0}
                >
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer list-none focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 rounded-xl [&::-webkit-details-marker]:hidden">
                    <span className="font-bold text-gray-900 pr-2">
                      {item.question}
                    </span>
                    <ChevronDown
                      className="w-5 h-5 text-green-600 flex-shrink-0 transition-transform duration-300 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
