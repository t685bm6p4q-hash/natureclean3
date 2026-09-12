import { GeoLandingPage } from '@/app/components/GeoLandingPage';
import { GEO_PAGES } from '@/app/utils/geoData';

export function NettoyageBureauxMarseillePage() {
  return <GeoLandingPage data={GEO_PAGES['nettoyage-bureaux-marseille']} />;
}
