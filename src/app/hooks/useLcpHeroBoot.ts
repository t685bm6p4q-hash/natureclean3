import { useCallback, useLayoutEffect, useState } from 'react';
import { dismissNcmLcpBoot } from '@/app/utils/dismissNcmLcpBoot';

const REACT_HERO_ID = 'ncm-hero-react';

/** Retire #ncm-lcp-hero après load de l’img React (montée client uniquement). */
export function useLcpHeroBoot(reactHeroMounted: boolean) {
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
    if (!reactHeroMounted) return;

    const hero = document.getElementById(REACT_HERO_ID) as HTMLImageElement | null;
    if (!hero) return;
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
  }, [onHeroReady, reactHeroMounted]);

  return { heroReady, onHeroReady };
}
