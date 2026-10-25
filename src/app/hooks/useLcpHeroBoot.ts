import { useCallback, useLayoutEffect, useState } from 'react';
import { dismissNcmLcpBoot } from '@/app/utils/dismissNcmLcpBoot';

const REACT_HERO_ID = 'ncm-hero-react';

/** Retire #ncm-lcp-hero après load de #ncm-hero-react (transition sans flash). */
export function useLcpHeroBoot() {
  const [heroReady, setHeroReady] = useState(false);

  const dismissBoot = useCallback(() => {
    if (typeof window !== 'undefined' && (window as Window & { __NC_PRERENDER?: boolean }).__NC_PRERENDER) {
      return;
    }
    requestAnimationFrame(() => dismissNcmLcpBoot());
  }, []);

  const onHeroReady = useCallback(() => {
    setHeroReady(true);
    dismissBoot();
  }, [dismissBoot]);

  useLayoutEffect(() => {
    const hero = document.getElementById(REACT_HERO_ID) as HTMLImageElement | null;
    if (!hero) {
      if (!(window as Window & { __NC_PRERENDER?: boolean }).__NC_PRERENDER) {
        dismissNcmLcpBoot();
      }
      return;
    }
    if (hero.complete && hero.naturalWidth > 0) {
      onHeroReady();
      return;
    }
    hero.addEventListener('load', onHeroReady, { once: true });
    hero.addEventListener('error', onHeroReady, { once: true });
    return () => {
      hero.removeEventListener('load', onHeroReady);
      hero.removeEventListener('error', onHeroReady);
    };
  }, [onHeroReady]);

  return { heroReady, onHeroReady };
}
