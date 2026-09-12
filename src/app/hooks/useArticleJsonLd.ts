/**
 * useArticleJsonLd — Hook d'injection JSON-LD Article
 * =====================================================
 * Loi VI (DRY) : encapsule le pattern useEffect + createElement
 * duplique dans les 6 articles blog.
 */
import { useEffect } from 'react';
import { buildArticleJsonLd } from '../utils/jsonld';
import type { ArticleJsonLdParams } from '../utils/jsonld';

/**
 * Injecte un script JSON-LD Article dans <head> au mount,
 * le retire au unmount. Zero side-effect residuel.
 */
export function useArticleJsonLd(params: ArticleJsonLdParams): void {
  useEffect(() => {
    const jsonLd = buildArticleJsonLd(params);
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(jsonLd);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
