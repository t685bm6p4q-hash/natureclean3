import { Link } from 'react-router';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { ServicePageHero } from '@/app/components/ServicePageHero';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { Button } from '@/app/components/ui/button';
import { ImageWithFallback } from '@/app/components/figma/ImageWithFallback';
import { IMAGES } from '@/app/utils/images';
import { PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE } from '@/app/utils/constants';
import { ArrowRight, Phone } from 'lucide-react';

export function CasMagasinCentreVillePage() {
  return (
    <>
      <SEO_Guardian
        currentSection="realisations"
        title="Entretien magasin centre-ville Marseille | Cas client"
        description="Cas client : entretien des sols d'un magasin en centre-ville à Marseille, autolaveuse avant ouverture."
      />

      <ServicePageHero
        title="Entretien d'un magasin en centre-ville à Marseille"
        subtitle="Cas client — sols à l'autolaveuse avant ouverture"
        badge="Cas client · Commerces"
        imageSrc={IMAGES.jdSportMarseilleFloor}
        imageAlt="Salle de vente, sol carrelé après nettoyage"
        breadcrumbs={[
          { label: 'Accueil', to: '/' },
          { label: 'Réalisations', to: '/realisations' },
          { label: 'Magasin centre-ville' },
        ]}
      />

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl space-y-8 text-gray-700 leading-relaxed">
          <ScrollReveal>
            <h2 className="text-2xl font-black text-gray-900 mb-4">Contexte</h2>
            <p>
              Magasin de retail en centre-ville à Marseille. Contrat d&apos;entretien des sols avant
              l&apos;ouverture, avec autolaveuse et produits adaptés au trafic client.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.05}>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Intervention</h2>
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>Passage autolaveuse sur les zones de circulation</li>
              <li>Créneau avant l&apos;ouverture pour ne pas gêner la clientèle</li>
              <li>Matériel et produits fournis par Nature Clean</li>
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <p className="text-sm text-amber-800 bg-amber-50 border border-amber-100 rounded-lg p-4">
              Durée, taille d&apos;équipe et nom de l&apos;enseigne : communiquez-nous les chiffres
              réels pour compléter cette fiche et, si besoin, l&apos;accord de publication.
            </p>
          </ScrollReveal>

          <div className="rounded-2xl overflow-hidden border border-gray-200">
            <ImageWithFallback
              src={IMAGES.jdSportMarseilleFloor}
              alt="Sol de magasin après passage autolaveuse"
              className="w-full h-64 object-cover"
              loading="lazy"
              width={800}
              height={400}
            />
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button asChild className="bg-green-700 hover:bg-green-800 font-bold">
              <Link to="/services/nettoyage-commerces">
                Nettoyage de commerces à Marseille
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
