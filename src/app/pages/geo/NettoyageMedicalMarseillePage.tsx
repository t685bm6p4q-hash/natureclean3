import { GeoLandingPage } from '@/app/components/GeoLandingPage';
import { GEO_PAGES } from '@/app/utils/geoData';

export function NettoyageMedicalMarseillePage() {
  return <GeoLandingPage data={GEO_PAGES['nettoyage-medical-marseille']} />;
}
