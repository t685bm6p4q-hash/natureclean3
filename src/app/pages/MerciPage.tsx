import { useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Button } from '@/app/components/ui/button';
import {
  CheckCircle2,
  Phone,
  MessageCircle,
  Clock,
  ArrowRight,
  Home,
} from 'lucide-react';
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_URL,
  ARIA_PHONE,
  ARIA_WHATSAPP,
} from '@/app/utils/constants';
import { consumeDevisLeadForMerci } from '@/app/utils/devisLeadSession';

export function MerciPage() {
  const [searchParams] = useSearchParams();
  const serviceLabel = searchParams.get('service') ?? '';
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    const lead = consumeDevisLeadForMerci();
    const isConfirmedLead = lead !== null;

    if (window.NatureCleanTracking) {
      window.NatureCleanTracking.trackEvent('devis_merci_view', {
        page_path: '/merci',
        lead_confirmed: isConfirmedLead,
        service: lead?.service || serviceLabel || 'unknown',
      });
      if (isConfirmedLead) {
        window.NatureCleanTracking.trackConversion('Lead', 1);
      }
    }
  }, [serviceLabel]);

  return (
    <>
      <SEO_Guardian
        currentSection="merci"
        noindex
        title="Demande bien reçue | Nature Clean Marseille"
        description="Votre demande de devis a bien été enregistrée. Nature Clean vous rappelle sous 24 h."
      />

      <section className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-lg w-full text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <CheckCircle2 className="w-10 h-10 text-emerald-600" aria-hidden="true" />
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
            Merci, votre demande est bien enregistrée
          </h1>

          <p className="text-gray-600 text-lg leading-relaxed mb-2">
            Notre équipe vous <strong>rappelle sous 24 h</strong> (souvent bien plus vite en journée)
            pour affiner votre besoin et vous envoyer un devis personnalisé.
          </p>

          {serviceLabel && (
            <p className="text-sm text-emerald-700 font-medium mb-6">
              Prestation concernée : {serviceLabel}
            </p>
          )}

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-8">
            <Clock className="w-4 h-4 text-emerald-600" aria-hidden="true" />
            Lun–Sam · 8h–18h · Marseille &amp; PACA
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Button asChild size="lg" className="bg-emerald-700 hover:bg-emerald-800 font-bold">
              <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-emerald-600 text-emerald-800 font-bold">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" aria-label={ARIA_WHATSAPP}>
                <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
                WhatsApp
              </a>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm">
            <Button asChild variant="ghost" className="text-gray-600">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" aria-hidden="true" />
                Retour à l&apos;accueil
              </Link>
            </Button>
            <Button asChild variant="ghost" className="text-emerald-700">
              <Link to="/services">
                Nos services
                <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
