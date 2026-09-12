import { GeoLandingPage } from '@/app/components/GeoLandingPage';
import { GEO_PAGES } from '@/app/utils/geoData';

export function NettoyageBureauxAixPage() {
  return <GeoLandingPage data={GEO_PAGES['nettoyage-bureaux-aix-en-provence']} />;
}
