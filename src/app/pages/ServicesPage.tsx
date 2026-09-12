import { Services } from '@/app/components/Services';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';

export function ServicesPage() {
  return (
    <>
      <SEO_Guardian currentSection="services" disableReviews={true} />
      <div className="pt-8">
        <Services />
      </div>
    </>
  );
}
