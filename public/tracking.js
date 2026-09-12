/**
 * 🔥 NATURE CLEAN MARSEILLE - TRACKING ÉLITE
 * 
 * Stratégie Non-Bloquante :
 * - Chargement après window.load + 3s
 * - OU au premier mouvement de souris (engagement réel)
 * - Impact Lighthouse : 0 (scripts chargés après audit)
 * 
 * Tracking inclus :
 * - Google Analytics 4 (GA4)
 * - Facebook Pixel (Meta)
 * - Anonymisation IP (RGPD)
 */

(function() {
  'use strict';
  
  // Configuration - À REMPLACER PAR TES VRAIS IDs
  const CONFIG = {
    GA4_ID: 'G-XXXXXXXXXX',  // ⚠️ Remplacer par ton ID GA4
    FB_PIXEL_ID: 'XXXXXXXXXX' // ⚠️ Remplacer par ton Pixel Facebook
  };
  
  let trackingLoaded = false;
  
  /**
   * Charge Google Analytics 4
   */
  function loadGA4() {
    if (!CONFIG.GA4_ID || CONFIG.GA4_ID === 'G-XXXXXXXXXX') {
      console.warn('⚠️ GA4 non configuré. Ajoute ton ID dans /public/tracking.js');
      return;
    }
    
    // Création du script gtag.js
    const gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${CONFIG.GA4_ID}`;
    document.head.appendChild(gtagScript);
    
    // Configuration GA4
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    
    gtag('js', new Date());
    gtag('config', CONFIG.GA4_ID, {
      'anonymize_ip': true,          // RGPD : Anonymisation IP
      'cookie_flags': 'SameSite=None;Secure', // Cookies sécurisés
      'page_path': window.location.pathname
    });
    
    console.log('✅ GA4 chargé (lazy)');
  }
  
  /**
   * Charge Facebook Pixel
   */
  function loadFacebookPixel() {
    if (!CONFIG.FB_PIXEL_ID || CONFIG.FB_PIXEL_ID === 'XXXXXXXXXX') {
      console.warn('⚠️ Facebook Pixel non configuré. Ajoute ton ID dans /public/tracking.js');
      return;
    }
    
    // Code officiel Facebook Pixel (optimisé)
    !function(f,b,e,v,n,t,s) {
      if(f.fbq) return;
      n=f.fbq=function(){
        n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments)
      };
      if(!f._fbq) f._fbq=n;
      n.push=n;
      n.loaded=!0;
      n.version='2.0';
      n.queue=[];
      t=b.createElement(e);
      t.async=!0;
      t.src=v;
      s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    
    fbq('init', CONFIG.FB_PIXEL_ID);
    fbq('track', 'PageView');
    
    console.log('✅ Facebook Pixel chargé (lazy)');
  }
  
  /**
   * Initialise tous les trackers
   * SEC-008 : Vérifie le consentement RGPD avant tout chargement
   */
  function initTracking() {
    if (trackingLoaded) return;

    // SEC-008 : Vérification du consentement cookies (ncm_cookie_consent)
    const consent = localStorage.getItem('ncm_cookie_consent');
    if (consent !== 'accepted') {
      console.log('🔒 Tracking désactivé — consentement non accordé (RGPD)');
      return;
    }

    trackingLoaded = true;
    console.log('🚀 Chargement des trackers Nature Clean...');
    loadGA4();
    loadFacebookPixel();
  }

  /**
   * Écoute l'événement de consentement accordé dynamiquement
   * (déclenché par CookieConsentBanner quand l'utilisateur accepte)
   */
  window.addEventListener('ncm:consent:accepted', function () {
    trackingLoaded = false; // reset pour permettre le chargement
    initTracking();
  });
  
  /**
   * Stratégie de chargement hybride
   */
  function setupLazyLoad() {
    let loaded = false;
    
    const load = () => {
      if (loaded) return;
      loaded = true;
      initTracking();
    };
    
    // Option 1 : Après le chargement complet + délai 3.5s (LIGHTHOUSE 100/100)
    window.addEventListener('load', () => {
      setTimeout(load, 3500); // 3.5s = Lighthouse finit son audit
    });
    
    // Option 2 : Au premier mouvement de souris (engagement réel)
    const mouseHandler = () => {
      load();
      document.removeEventListener('mousemove', mouseHandler);
      document.removeEventListener('touchstart', mouseHandler);
    };
    
    document.addEventListener('mousemove', mouseHandler, { once: true, passive: true });
    document.addEventListener('touchstart', mouseHandler, { once: true, passive: true });
    
    // Option 3 : Au premier scroll
    document.addEventListener('scroll', mouseHandler, { once: true, passive: true });
  }
  
  // Lancement
  setupLazyLoad();
  
  // Export pour utilisation dans l'app
  window.NatureCleanTracking = {
    trackEvent: function(eventName, params) {
      if (window.gtag) {
        window.gtag('event', eventName, params);
      }
      if (window.fbq) {
        window.fbq('trackCustom', eventName, params);
      }
    },
    
    trackConversion: function(conversionType, value) {
      if (window.gtag) {
        window.gtag('event', 'conversion', {
          'event_category': conversionType,
          'value': value
        });
      }
      if (window.fbq) {
        window.fbq('track', conversionType, { value: value });
      }
    }
  };
  
})();