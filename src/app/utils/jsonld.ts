/**
 * JSON-LD Builder — Articles Blog
 * ================================
 * Loi VI (DRY) : factorise author/publisher/mainEntityOfPage
 * communs aux 6 articles blog.
 *
 * Utilise les constantes Loi VII pour eviter tout hardcoding.
 */
import { BASE_URL, COMPANY_FULL_NAME, LOGO_PNG_URL } from './constants';

export interface ArticleJsonLdParams {
  /** Titre de l'article (headline schema.org) */
  readonly headline: string;
  /** Meta description de l'article */
  readonly description: string;
  /** URL absolue de l'image principale */
  readonly image: string;
  /** Date ISO de publication (YYYY-MM-DD) */
  readonly datePublished: string;
  /** Date ISO de derniere modification (YYYY-MM-DD) */
  readonly dateModified: string;
  /** Slug de l'article (ex: "etat-des-lieux-sortie-marseille") */
  readonly slug: string;
  /** Mots-cles SEO separes par des virgules */
  readonly keywords: string;
  /** Section editoriale (ex: "Guides Pratiques") */
  readonly articleSection?: string;
  /** Nombre de mots approximatif */
  readonly wordCount?: number;
}

/**
 * Construit un objet JSON-LD Article conforme a schema.org.
 * Les blocs author/publisher/mainEntityOfPage sont centralises ici.
 */
export function buildArticleJsonLd(params: ArticleJsonLdParams): Record<string, unknown> {
  const base: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: params.headline,
    description: params.description,
    image: params.image,
    author: {
      '@type': 'Organization',
      name: COMPANY_FULL_NAME,
      url: BASE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: COMPANY_FULL_NAME,
      logo: {
        '@type': 'ImageObject',
        url: LOGO_PNG_URL,
      },
    },
    datePublished: params.datePublished,
    dateModified: params.dateModified,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${BASE_URL}/blog/${params.slug}`,
    },
    keywords: params.keywords,
  };

  if (params.articleSection) {
    base.articleSection = params.articleSection;
  }
  if (params.wordCount) {
    base.wordCount = params.wordCount;
  }

  return base;
}
