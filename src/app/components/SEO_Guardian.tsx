import { useEffect, useLayoutEffect } from 'react';
import { SEO_DATA } from '@/app/config/seo-data';
import { BASE_URL, LOGO_URL, EMAIL, SIRET, FOUNDING_YEAR, COMPANY_FULL_NAME, COMPANY_NAME } from '@/app/utils/constants';

interface SEOGuardianProps {
  currentSection?: string;
  title?: string;
  description?: string;
  keywords?: string;
  faqItems?: Array<{ question: string; answer: string }>;
}

/**
 * SEO_Guardian - Composant invisible qui gère toute la stratégie SEO technique
 * 
 * Fonctionnalités:
 * 1. JSON-LD LocalBusiness enrichi avec tous les arrondissements de Marseille
 * 2. Gestion dynamique Title + Meta Description par section
 * 3. Injection automatique aria-invalid sur les inputs en erreur
 * 4. Structured Data additionnelles (FAQ, Breadcrumb)
 */
export function SEO_Guardian({ currentSection = 'home', title: overrideTitle, description: overrideDesc, keywords: overrideKeywords, faqItems }: SEOGuardianProps) {

  // useLayoutEffect : meta tags disponibles avant paint → capturés par le prerender Puppeteer
  useLayoutEffect(() => {
    // ============================================
    // 1. GESTION DYNAMIQUE DES META TAGS PAR SECTION
    // ============================================

    const currentSEO = SEO_DATA[currentSection] ?? SEO_DATA.home;

    // Mise à jour du titre
    document.title = overrideTitle || currentSEO.title;

    // 🎯 CANONICAL URL - Source de vérité = window.location.pathname
    // ─────────────────────────────────────────────────────────────────
    // Pourquoi window.location et PAS un pathMap statique ?
    //   • Ce fichier index.html est servi pour TOUTES les routes SPA par Vercel.
    //   • Un pathMap manuel nécessite une maintenance à chaque nouvelle route.
    //   • window.location.pathname retourne TOUJOURS l'URL réelle de la page courante,
    //     sans aucun risque de mismatch → 0 "Autre page avec balise canonique correcte"
    //     en Search Console.
    // Note : trailing slash sur "/" uniquement (la racine), pas sur les sous-pages.
    const rawPath = window.location.pathname;
    const canonicalPath = rawPath === '/' ? '/' : rawPath.replace(/\/$/, ''); // supprime trailing slash sauf racine
    const canonicalURL = `${BASE_URL}${canonicalPath}`;
    
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalURL;

    // 🚀 PRELOAD HERO IMAGES
    // Note: En mode figma:asset, les images sont bundlées par Vite.
    // Le preload est géré nativement via fetchpriority="high" sur les <img> hero.
    // On nettoie tout ancien preload link orphelin.
    const existingPreload = document.querySelector('link[rel="preload"][as="image"][data-seo-guardian]');
    if (existingPreload) {
      existingPreload.remove();
    }

    // OG image statique — logo haute résolution (seul fichier garanti en prod)
    const ogImageURL = `${BASE_URL}/logo.png`;

    // Helper pour mettre à jour les meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Meta tags de base
    updateMetaTag('description', overrideDesc || currentSEO.description);
    updateMetaTag('keywords', overrideKeywords || currentSEO.keywords);
    updateMetaTag('robots', 'index, follow');
    updateMetaTag('language', 'fr');
    updateMetaTag('geo.region', 'FR-13');
    updateMetaTag('geo.placename', 'Marseille');
    updateMetaTag('geo.position', '43.2965;5.3698');
    updateMetaTag('ICBM', '43.2965, 5.3698');

    // Open Graph
    updateMetaTag('og:title', overrideTitle || currentSEO.title, true);
    updateMetaTag('og:description', overrideDesc || currentSEO.description, true);
    updateMetaTag('og:type', 'website', true);
    updateMetaTag('og:locale', 'fr_FR', true);
    updateMetaTag('og:site_name', 'Nature Clean Marseille', true);
    updateMetaTag('og:url', canonicalURL, true);
    updateMetaTag('og:image', ogImageURL, true);
    updateMetaTag('og:image:width', '1200', true);
    updateMetaTag('og:image:height', '630', true);

    // Twitter Card
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', overrideTitle || currentSEO.title);
    updateMetaTag('twitter:description', overrideDesc || currentSEO.description);
    updateMetaTag('twitter:image', ogImageURL);

    // ============================================
    // 2. JSON-LD LOCALBUSINESS ENRICHI
    // ============================================
    
    const existingLocalBusiness = document.getElementById('jsonld-local-business');
    if (existingLocalBusiness) {
      existingLocalBusiness.remove();
    }

    // Génération dynamique de tous les arrondissements de Marseille
    const marseilleDistricts = Array.from({ length: 16 }, (_, i) => {
      const district = String(i + 1).padStart(2, '0');
      return {
        '@type': 'City',
        'name': `Marseille ${district} (13${district})`,
        'addressRegion': 'Bouches-du-Rhône'
      };
    });

    const localBusinessJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CleaningService',
      '@id': BASE_URL,
      'name': COMPANY_FULL_NAME,
      'alternateName': COMPANY_NAME,
      'image': LOGO_URL,
      'logo': LOGO_URL,
      'description': 'Entreprise d\'entretien et de nettoyage professionnel éco-responsable à Marseille. Ménage de bureaux, copropriétés, fin de chantier et particuliers. Propreté et hygiène garanties sur tous les arrondissements de Marseille (13001-13016), Aubagne, Aix-en-Provence et les Alpes-Maritimes.',
      'url': BASE_URL,
      'telephone': '+33484896875',
      'email': EMAIL,
      'priceRange': '$$',
      'currenciesAccepted': 'EUR',
      'paymentAccepted': 'Virement, Chèque, Espèces',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '22 Traverse Pupat',
        'addressLocality': 'Marseille',
        'postalCode': '13008',
        'addressRegion': 'Bouches-du-Rhône',
        'addressCountry': 'FR'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 43.2965,
        'longitude': 5.3698
      },
      'openingHoursSpecification': [
        {
          '@type': 'OpeningHoursSpecification',
          'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          'opens': '09:00',
          'closes': '18:00'
        }
      ],
      'areaServed': [
        ...marseilleDistricts,
        {
          '@type': 'City',
          'name': 'Aubagne',
          'addressRegion': 'Bouches-du-Rhône'
        },
        {
          '@type': 'City',
          'name': 'Aix-en-Provence',
          'addressRegion': 'Bouches-du-Rhône'
        },
        {
          '@type': 'City',
          'name': 'La Ciotat',
          'addressRegion': 'Bouches-du-Rhône'
        }
      ],
      'serviceType': [
        'Entretien de bureaux',
        'Ménage de copropriétés',
        'Nettoyage fin de chantier',
        'Ménage particuliers',
        'Nettoyage industriel',
        'Propreté commerciale',
        'Nettoyage événementiel',
        'Remise en état de sols',
        'Hygiène et désinfection professionnelle',
        'Entretien vitrerie',
        'Entretien espaces verts communs'
      ],
      'hasOfferCatalog': {
        '@type': 'OfferCatalog',
        'name': 'Services de nettoyage professionnel',
        'itemListElement': [
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Nettoyage de Bureaux & Locaux Professionnels',
              'description': 'Entretien régulier ou ponctuel des espaces de travail, magasins et restaurants à Marseille et sa région',
              'areaServed': 'Marseille, Bouches-du-Rhône'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Nettoyage de Copropriétés & Parties Communes',
              'description': 'Service dédié aux syndics et gestionnaires de copropriétés sur Marseille',
              'areaServed': 'Marseille, Bouches-du-Rhône'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Nettoyage Fin de Chantier',
              'description': 'Intervention après construction, rénovation ou déménagement. Remise en état complète.',
              'areaServed': 'Marseille, Aubagne, Aix-en-Provence'
            }
          },
          {
            '@type': 'Offer',
            'itemOffered': {
              '@type': 'Service',
              'name': 'Nettoyage pour Particuliers & Seniors',
              'description': 'Entretien de maisons particulières et accompagnement personnalisé pour seniors',
              'areaServed': 'Marseille, Bouches-du-Rhône'
            }
          }
        ]
      },
      'identifier': {
        '@type': 'PropertyValue',
        'propertyID': 'SIRET',
        'value': SIRET
      },
      'foundingDate': FOUNDING_YEAR,
      'slogan': 'Entretien et nettoyage éco-responsable à Marseille',
      'sameAs': [
        'https://share.google/LGuTIovk5ovTXGzuc',
        'https://www.pagesjaunes.fr/pros/61828182',
        'https://www.instagram.com/natureclean13/',
        'https://www.linkedin.com/in/nature-clean-612261285/'
      ]
    };

    const scriptLocalBusiness = document.createElement('script');
    scriptLocalBusiness.id = 'jsonld-local-business';
    scriptLocalBusiness.type = 'application/ld+json';
    scriptLocalBusiness.text = JSON.stringify(localBusinessJsonLd);
    document.head.appendChild(scriptLocalBusiness);

    // ============================================
    // 3. JSON-LD BREADCRUMBLIST (DYNAMIQUE)
    // ============================================
    
    const existingBreadcrumb = document.getElementById('jsonld-breadcrumb');
    if (existingBreadcrumb) {
      existingBreadcrumb.remove();
    }

    // Construire le breadcrumb dynamiquement selon la section
    const breadcrumbNameMap: Record<string, string> = {
      home: 'Accueil',
      services: 'Services',
      about: 'À Propos',
      quote: 'Devis Gratuit',
      contact: 'Contact',
      realisations: 'Réalisations',
      actualites: 'Actualités',
      'nettoyage-particuliers': 'Nettoyage Particuliers',
      'entretien-bureaux': 'Entretien Bureaux',
      'nettoyage-commerces': 'Nettoyage Commerces',
      'nettoyage-coproprietes': 'Nettoyage Copropriétés',
      'nettoyage-chantiers': 'Nettoyage Fin de Chantier',
      'nettoyage-evenementiel': 'Nettoyage Événementiel',
      'nettoyage-graffitis': 'Enlèvement de Graffitis',
      'nettoyage-diogene': 'Nettoyage Syndrome de Diogène',
      'remise-etat-sols': 'Remise en État Sols',
      'nettoyage-vitre': 'Nettoyage Vitres',
      'zones-intervention': 'Zones d\'intervention',
    };

    const breadcrumbItems: Array<{name: string; url: string}> = [
      { name: 'Accueil', url: BASE_URL },
    ];

    // Ajouter la section parente si c'est un sous-service
    const isSubService = ['entretien-bureaux', 'nettoyage-commerces', 'nettoyage-coproprietes', 'nettoyage-chantiers', 'nettoyage-evenementiel', 'nettoyage-graffitis', 'nettoyage-diogene', 'remise-etat-sols', 'nettoyage-vitre'].includes(currentSection);
    const isGeoPage = currentSection.startsWith('geo-');
    if (isSubService) {
      breadcrumbItems.push({ name: 'Services', url: `${BASE_URL}/services` });
    }
    if (isGeoPage) {
      breadcrumbItems.push({ name: 'Zones d\'intervention', url: `${BASE_URL}/zones-intervention` });
    }

    // Ajouter la page actuelle (sauf accueil)
    if (currentSection !== 'home') {
      breadcrumbItems.push({
        name: breadcrumbNameMap[currentSection] || currentSEO.title,
        url: canonicalURL,
      });
    }

    const breadcrumbJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': breadcrumbItems.map((item, index) => ({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url,
      })),
    };

    const scriptBreadcrumb = document.createElement('script');
    scriptBreadcrumb.id = 'jsonld-breadcrumb';
    scriptBreadcrumb.type = 'application/ld+json';
    scriptBreadcrumb.text = JSON.stringify(breadcrumbJsonLd);
    document.head.appendChild(scriptBreadcrumb);

    // ============================================
    // 4. JSON-LD FAQ — Uniquement sur les pages pertinentes (home + services)
    // ============================================
    
    const existingFAQ = document.getElementById('jsonld-faq');
    if (existingFAQ) {
      existingFAQ.remove();
    }

    // Pages où la FAQ est pertinente (évite le spam structured data sur blog, contact, etc.)
    const faqPages = ['home', 'services', 'entretien-bureaux', 'nettoyage-commerces', 'nettoyage-coproprietes', 'nettoyage-chantiers', 'nettoyage-evenementiel', 'nettoyage-graffitis', 'nettoyage-diogene', 'remise-etat-sols', 'nettoyage-vitre', 'nettoyage-particuliers', 'quote'];

    if (faqPages.includes(currentSection) || currentSection.startsWith('geo-') || currentSection === 'zones-intervention' || (currentSection === 'blog' && faqItems)) {
      // Construire les questions FAQ — soit depuis le prop faqItems (contextuel), soit fallback générique
      const faqQuestions = faqItems
        ? faqItems.map(item => ({
            '@type': 'Question' as const,
            'name': item.question,
            'acceptedAnswer': {
              '@type': 'Answer' as const,
              'text': item.answer,
            },
          }))
        : [
          {
            '@type': 'Question' as const,
            'name': 'Quels sont les tarifs de nettoyage à Marseille ?',
            'acceptedAnswer': {
              '@type': 'Answer' as const,
              'text': 'Nos tarifs varient selon le type de service, la surface et la fréquence d\'intervention. Demandez un devis gratuit au 04 84 89 68 75 pour obtenir une estimation personnalisée pour votre projet de nettoyage à Marseille.'
            }
          },
          {
            '@type': 'Question' as const,
            'name': 'Intervenez-vous dans tous les arrondissements de Marseille ?',
            'acceptedAnswer': {
              '@type': 'Answer' as const,
              'text': 'Oui, Nature Clean intervient dans tous les arrondissements de Marseille (13001 à 13016), ainsi qu\'à Aubagne, Aix-en-Provence et dans les Alpes-Maritimes.'
            }
          },
          {
            '@type': 'Question' as const,
            'name': 'Utilisez-vous des produits écologiques ?',
            'acceptedAnswer': {
              '@type': 'Answer' as const,
              'text': 'Oui, nous utilisons 50% de produits écologiques dans nos prestations de nettoyage, dans une démarche éco-responsable et respectueuse de l\'environnement.'
            }
          },
          {
            '@type': 'Question' as const,
            'name': 'Quel est votre délai d\'intervention pour un nettoyage fin de chantier ?',
            'acceptedAnswer': {
              '@type': 'Answer' as const,
              'text': 'Nous proposons des interventions rapides pour les nettoyages fin de chantier à Marseille. Contactez-nous au 04 84 89 68 75 pour connaître nos disponibilités et planifier votre remise en état.'
            }
          },
          {
            '@type': 'Question' as const,
            'name': 'Proposez-vous des contrats d\'entretien régulier ?',
            'acceptedAnswer': {
              '@type': 'Answer' as const,
              'text': 'Oui, nous proposons des contrats d\'entretien régulier pour les bureaux, commerces et copropriétés sur Marseille et sa région. Nous adaptons la fréquence selon vos besoins (quotidien, hebdomadaire, mensuel).'
            }
          }
        ];

      const faqJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqQuestions,
      };

      const scriptFAQ = document.createElement('script');
      scriptFAQ.id = 'jsonld-faq';
      scriptFAQ.type = 'application/ld+json';
      scriptFAQ.text = JSON.stringify(faqJsonLd);
      document.head.appendChild(scriptFAQ);
    }

    return () => {
      const scriptToRemove1 = document.getElementById('jsonld-local-business');
      const scriptToRemove2 = document.getElementById('jsonld-breadcrumb');
      const scriptToRemove3 = document.getElementById('jsonld-faq');

      if (scriptToRemove1) scriptToRemove1.remove();
      if (scriptToRemove2) scriptToRemove2.remove();
      if (scriptToRemove3) scriptToRemove3.remove();
    };
  }, [currentSection, overrideTitle, overrideDesc, overrideKeywords, faqItems]);

  useEffect(() => {
    const formObserver = new MutationObserver(() => {
      const errorMessages = document.querySelectorAll('[id$="-error"][role="alert"]');

      errorMessages.forEach((errorMsg) => {
        const errorId = errorMsg.id;
        const fieldId = errorId.replace('-error', '');
        const field = document.getElementById(fieldId);

        if (field && !field.getAttribute('aria-invalid')) {
          field.setAttribute('aria-invalid', 'true');
          field.setAttribute('aria-describedby', errorId);
        }
      });

      const allInputs = document.querySelectorAll('input[aria-invalid="true"], textarea[aria-invalid="true"], select[aria-invalid="true"]');
      allInputs.forEach((input) => {
        const describedBy = input.getAttribute('aria-describedby');
        if (describedBy) {
          const errorElement = document.getElementById(describedBy);
          if (!errorElement) {
            input.setAttribute('aria-invalid', 'false');
            input.removeAttribute('aria-describedby');
          }
        }
      });
    });

    formObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
    });

    return () => {
      formObserver.disconnect();
    };
  }, []);

  // Composant invisible
  return null;
}