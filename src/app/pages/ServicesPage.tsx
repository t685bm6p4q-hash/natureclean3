import { Services } from '@/app/components/Services';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';

export function ServicesPage() {
  return (
    <>
      <SEO_Guardian currentSection="services" />
      <div className="pt-8">
        <Services />
      </div>
    </>
  );
}
