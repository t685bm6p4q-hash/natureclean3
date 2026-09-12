import { useState } from 'react';
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
 * FAQSection — Accordéon accessible et SEO-friendly.
 * Le contenu texte est indexable (rendu dans le DOM, masqué par CSS).
 * Compatible JSON-LD FAQPage via SEO_Guardian.faqItems.
 */
export function FAQSection({
  items,
  title = 'Questions fréquentes',
  subtitle,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

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

          <div className="space-y-3" role="list">
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              const panelId = `faq-panel-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <ScrollReveal key={item.question} delay={index * 0.05}>
                  <div
                    className="bg-white rounded-xl border border-gray-200 overflow-hidden transition-shadow hover:shadow-md"
                    role="listitem"
                  >
                    <button
                      id={buttonId}
                      type="button"
                      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2 rounded-xl"
                      onClick={() => toggle(index)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                    >
                      <span className="font-bold text-gray-900 pr-2">
                        {item.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-green-600 flex-shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 pb-5 text-gray-600 leading-relaxed">
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
