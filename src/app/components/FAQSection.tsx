import type { ReactNode } from 'react';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/app/components/ui/accordion';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionListProps {
  items: FAQItem[];
  className?: string;
  defaultOpenFirst?: boolean;
}

/**
 * Liste FAQ en accordéon Radix (shadcn) — WAI-ARIA, contenu toujours dans le DOM (SEO).
 */
export function FAQAccordionList({
  items,
  className,
  defaultOpenFirst = true,
}: FAQAccordionListProps) {
  if (items.length === 0) return null;

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={defaultOpenFirst ? 'item-0' : undefined}
      className={className}
    >
      {items.map((item, index) => (
        <AccordionItem key={item.question} value={`item-${index}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

interface FAQSectionProps {
  items: FAQItem[];
  title?: string;
  subtitle?: string;
  defaultOpenFirst?: boolean;
  footer?: ReactNode;
}

export function FAQSection({
  items,
  title = 'Questions fréquentes',
  subtitle,
  defaultOpenFirst = false,
  footer,
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

          <ScrollReveal delay={0.05}>
            <FAQAccordionList items={items} defaultOpenFirst={defaultOpenFirst} />
            {footer ? <div className="mt-6 text-center">{footer}</div> : null}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
