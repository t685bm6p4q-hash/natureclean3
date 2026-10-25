import { Link } from 'react-router';
import { BulletList } from '@/app/components/BulletList';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { IMAGES } from '@/app/utils/images';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { ArrowRight, Phone } from 'lucide-react';

export function CasCabinetMedicalMarseillePage() {
  return (
    <>
      <SEO_Guardian
        currentSection="realisations"
        title="Nettoyage cabinet médical Marseille 13005 | Cas client"
        description="Cas client : nettoyage d'un cabinet médical à Marseille 13005 après fermeture — salle d'attente, consultation, surfaces de contact."
      />

      <ServicePageHero
        title="Nettoyage d'un cabinet médical à Marseille (13005)"
        subtitle="Cas client — après la fermeture, avant la réouverture"
        badge="Cas client · Locaux de santé"
        imageSrc={IMAGES.cabinetMedical}
        imageAlt="Salle d'attente d'un cabinet médical"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Réalisations', to: '/realisations' },
          { label: 'Cabinet médical' },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl space-y-8 text-gray-700 leading-relaxed">
          <ScrollReveal>
            <h2 className="text-2xl font-black text-gray-900 mb-4">Contexte</h2>
            <p>
              Cabinet médical dans le 5<sup>e</sup> arrondissement de Marseille. Intervention après
              la fermeture pour ne pas perturber les consultations du lendemain.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Intervention</h2>
            <BulletList
              lines={[
                "Salle d'attente et salles de consultation",
                'Surfaces de contact et poignées',
                'Produits professionnels adaptés aux supports du cabinet',
              ]}
            />
            <p className="text-sm mt-4 text-gray-600">
              Nous n&apos;effectuons pas la stérilisation des instruments ni la gestion des DASRI :
              le périmètre est défini au devis avec le praticien ou le gestionnaire de site.
            </p>
          </ScrollReveal>

          <div className="rounded-2xl overflow-hidden border border-gray-200">
            <ImageWithFallback
              src={IMAGES.cabinetMedical}
              alt="Salle d'attente, sols et sièges"
              className="w-full h-64 object-cover"
              loading="lazy"
              width={800}
              height={400}
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button asChild className="bg-green-700 hover:bg-green-800 font-bold">
              <Link to="/services/nettoyage-cabinet-medical-marseille">
                Nettoyage de cabinets médicaux à Marseille
                <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="font-bold">
              <Link to="/realisations">Retour aux réalisations</Link>
            </Button>
            <Button asChild variant="outline" className="font-bold">
              <a href={PHONE_HREF} aria-label={ARIA_PHONE}>
                <Phone className="w-4 h-4 mr-2" aria-hidden="true" />
                {PHONE_DISPLAY}
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
