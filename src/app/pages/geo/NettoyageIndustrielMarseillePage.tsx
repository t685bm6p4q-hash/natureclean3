import { GeoLandingPage } from '@/app/components/GeoLandingPage';
import { GEO_PAGES } from '@/app/utils/geoData';

export function NettoyageIndustrielMarseillePage() {
  return <GeoLandingPage data={GEO_PAGES['nettoyage-industriel-marseille']} />;
}
