/**
 * Nature Clean — Google Ads + Meta (RGPD Consent Mode v2)
 * - gtag configuré dans index.html (AW-18438425597)
 * - gtag.js chargé après load (idle) sans attendre les cookies
 * - Meta Pixel uniquement après consentement explicite
 */

(function () {
  'use strict';

  var CONFIG = {
    GOOGLE_ADS_ID: 'AW-18438425597',
    GOOGLE_ADS_LEAD_SEND_TO: '',
    GA4_ID: 'G-XXXXXXXXXX',
    FB_PIXEL_ID: 'XXXXXXXXXX',
    GTAG_IDLE_TIMEOUT_MS: 2500,
    FB_DEFER_AFTER_LOAD_MS: 4500,
  };

  var gtagScriptInjected = false;
  var fbLoaded = false;

  function hasConsent() {
    return localStorage.getItem('ncm_cookie_consent') === 'accepted';
  }

  function grantGoogleConsent() {
    if (!window.gtag) return;
    window.gtag('consent', 'update', {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      analytics_storage: 'granted',
    });
  }

  function injectGtagScript() {
    if (gtagScriptInjected || !CONFIG.GOOGLE_ADS_ID) return;
    if (document.querySelector('script[data-ncm-gtag]')) {
      gtagScriptInjected = true;
      return;
    }

    gtagScriptInjected = true;
    var primaryId = CONFIG.GOOGLE_ADS_ID;
    if (CONFIG.GA4_ID && CONFIG.GA4_ID !== 'G-XXXXXXXXXX') {
      primaryId = CONFIG.GA4_ID;
    }

    var gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.setAttribute('data-ncm-gtag', '1');
    gtagScript.src =
      'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(primaryId);
    document.head.appendChild(gtagScript);

    if (CONFIG.GA4_ID && CONFIG.GA4_ID !== 'G-XXXXXXXXXX' && window.gtag) {
      window.gtag('config', CONFIG.GA4_ID, {
        anonymize_ip: true,
        cookie_flags: 'SameSite=None;Secure',
        page_path: window.location.pathname,
      });
    }
  }

  function scheduleGtagLoad() {
    var run = function () {
      injectGtagScript();
      if (hasConsent()) {
        grantGoogleConsent();
      }
    };

    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(run, { timeout: CONFIG.GTAG_IDLE_TIMEOUT_MS });
    } else {
      setTimeout(run, 800);
    }
  }

  function loadFacebookPixel() {
    if (fbLoaded || !hasConsent()) return;
    if (!CONFIG.FB_PIXEL_ID || CONFIG.FB_PIXEL_ID === 'XXXXXXXXXX') return;

    fbLoaded = true;

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

  function scheduleFacebookLoad() {
    if (!hasConsent()) return;

    var run = function () {
      if (typeof window.requestIdleCallback === 'function') {
        window.requestIdleCallback(loadFacebookPixel, { timeout: 6000 });
      } else {
        loadFacebookPixel();
      }
    };

    if (document.readyState === 'complete') {
      setTimeout(run, CONFIG.FB_DEFER_AFTER_LOAD_MS);
    } else {
      window.addEventListener(
        'load',
        function () {
          setTimeout(run, CONFIG.FB_DEFER_AFTER_LOAD_MS);
        },
        { once: true }
      );
    }
  }

  window.addEventListener('ncm:consent:accepted', function () {
    grantGoogleConsent();
    injectGtagScript();
    loadFacebookPixel();
  });

  window.addEventListener(
    'load',
    function () {
      scheduleGtagLoad();
      scheduleFacebookLoad();
    },
    { once: true }
  );

  if (hasConsent()) {
    grantGoogleConsent();
  }

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
