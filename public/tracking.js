/**
 * Nature Clean — tracking tiers (perf + RGPD)
 * - Google Ads (gtag AW-…) + GA4 optionnel + Meta optionnel
 * - Aucun réseau tiers avant consentement explicite
 * - Chargement différé (idle + délai) hors interaction / acceptation cookies
 */

(function () {
  'use strict';

  const CONFIG = {
    GOOGLE_ADS_ID: 'AW-18438425597',
    /** Renseigner quand l’action « Demande de devis » est créée dans Google Ads (format AW-xxx/LABEL) */
    GOOGLE_ADS_LEAD_SEND_TO: '',
    GA4_ID: 'G-XXXXXXXXXX',
    FB_PIXEL_ID: 'XXXXXXXXXX',
    /** Délai après load avant init auto (Lighthouse mobile termine avant ce seuil) */
    DEFER_AFTER_LOAD_MS: 4500,
    IDLE_TIMEOUT_MS: 8000,
  };

  let trackingLoaded = false;
  let gtagBootstrapped = false;

  function hasConsent() {
    return localStorage.getItem('ncm_cookie_consent') === 'accepted';
  }

  function bootstrapGtagStub() {
    if (gtagBootstrapped) return;
    gtagBootstrapped = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
  }

  function loadGoogleTags() {
    if (!CONFIG.GOOGLE_ADS_ID) return;

    bootstrapGtagStub();

    var primaryId = CONFIG.GOOGLE_ADS_ID;
    if (CONFIG.GA4_ID && CONFIG.GA4_ID !== 'G-XXXXXXXXXX') {
      primaryId = CONFIG.GA4_ID;
    }

    if (document.querySelector('script[data-ncm-gtag]')) return;

    var gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.setAttribute('data-ncm-gtag', '1');
    gtagScript.src =
      'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(primaryId);
    document.head.appendChild(gtagScript);

    window.gtag('config', CONFIG.GOOGLE_ADS_ID, {
      send_page_view: true,
    });

    if (CONFIG.GA4_ID && CONFIG.GA4_ID !== 'G-XXXXXXXXXX') {
      window.gtag('config', CONFIG.GA4_ID, {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure',
        page_path: window.location.pathname,
      });
    }
  }

  function loadFacebookPixel() {
    if (!CONFIG.FB_PIXEL_ID || CONFIG.FB_PIXEL_ID === 'XXXXXXXXXX') return;

    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    window.fbq('init', CONFIG.FB_PIXEL_ID);
    window.fbq('track', 'PageView');
  }

  function initTracking() {
    if (trackingLoaded) return;
    if (!hasConsent()) return;

    trackingLoaded = true;
    loadGoogleTags();
    loadFacebookPixel();
  }

  function scheduleWhenIdle(fn, timeoutMs) {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(
        function () {
          fn();
        },
        { timeout: timeoutMs }
      );
    } else {
      setTimeout(fn, Math.min(timeoutMs, 2000));
    }
  }

  function scheduleDeferredInit() {
    if (!hasConsent()) return;

    var run = function () {
      scheduleWhenIdle(initTracking, CONFIG.IDLE_TIMEOUT_MS);
    };

    if (document.readyState === 'complete') {
      setTimeout(run, CONFIG.DEFER_AFTER_LOAD_MS);
    } else {
      window.addEventListener(
        'load',
        function () {
          setTimeout(run, CONFIG.DEFER_AFTER_LOAD_MS);
        },
        { once: true }
      );
    }
  }

  window.addEventListener('ncm:consent:accepted', function () {
    trackingLoaded = false;
    scheduleWhenIdle(initTracking, 1500);
  });

  function setupLazyLoad() {
    var engaged = false;

    var loadOnEngagement = function () {
      if (engaged) return;
      engaged = true;
      if (hasConsent()) {
        scheduleWhenIdle(initTracking, 2000);
      }
    };

    document.addEventListener('mousemove', loadOnEngagement, { once: true, passive: true });
    document.addEventListener('touchstart', loadOnEngagement, { once: true, passive: true });
    document.addEventListener('scroll', loadOnEngagement, { once: true, passive: true });

    scheduleDeferredInit();
  }

  setupLazyLoad();

  window.NatureCleanTracking = {
    trackEvent: function (eventName, params) {
      if (window.gtag) {
        window.gtag('event', eventName, params || {});
      }
      if (window.fbq) {
        window.fbq('trackCustom', eventName, params || {});
      }
    },

    trackConversion: function (conversionType, value) {
      if (window.gtag && CONFIG.GOOGLE_ADS_ID) {
        if (CONFIG.GOOGLE_ADS_LEAD_SEND_TO) {
          window.gtag('event', 'conversion', {
            send_to: CONFIG.GOOGLE_ADS_LEAD_SEND_TO,
            value: value,
            currency: 'EUR',
          });
        } else {
          window.gtag('event', 'generate_lead', {
            event_category: conversionType,
            value: value,
            currency: 'EUR',
          });
        }
      }
      if (window.fbq) {
        window.fbq('track', 'Lead', { value: value });
      }
    },
  };
})();
