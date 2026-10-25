/**
 * Carte schématique — Bouches-du-Rhône (13) uniquement.
 * Marqueurs cliquables + liste de liens en dessous (SEO / accessibilité).
 */

import { useState } from 'react';
import { Link } from 'react-router';
import { MapPin, ArrowRight, Phone } from 'lucide-react';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { PHONE_DISPLAY, PHONE_HREF } from '@/app/utils/constants';

interface CityMarker {
  id: string;
  name: string;
  x: number;
  y: number;
  link?: string;
  linkLabel?: string;
  postalCode: string;
  services: string;
  isMain?: boolean;
}

const CITY_MARKERS: CityMarker[] = [
  {
    id: 'marseille',
    name: 'Marseille',
    x: 40,
    y: 55,
    link: '/services/entretien-bureaux',
    linkLabel: 'Entretien de bureaux à Marseille',
    postalCode: '13001-13016',
    services: 'Tous services',
    isMain: true,
  },
  {
    id: 'aix',
    name: 'Aix-en-Provence',
    x: 28,
    y: 35,
    link: '/nettoyage-bureaux-aix-en-provence',
    linkLabel: 'Nettoyage de bureaux à Aix-en-Provence',
    postalCode: '13100',
    services: 'Bureaux',
  },
  {
    id: 'aubagne',
    name: 'Aubagne',
    x: 52,
    y: 58,
    link: '/nettoyage-coproprietes-aubagne',
    linkLabel: 'Nettoyage de copropriétés à Aubagne',
    postalCode: '13400',
    services: 'Copropriétés',
  },
  {
    id: 'laciotat',
    name: 'La Ciotat',
    x: 62,
    y: 72,
    link: '/nettoyage-coproprietes-la-ciotat',
    linkLabel: 'Nettoyage de copropriétés à La Ciotat',
    postalCode: '13600',
    services: 'Copropriétés',
  },
  { id: 'marignane', name: 'Marignane', x: 34, y: 48, postalCode: '13700', services: 'Sur devis' },
  { id: 'vitrolles', name: 'Vitrolles', x: 30, y: 42, postalCode: '13127', services: 'Sur devis' },
  { id: 'salon', name: 'Salon-de-Provence', x: 22, y: 28, postalCode: '13300', services: 'Sur devis' },
  { id: 'istres', name: 'Istres', x: 18, y: 38, postalCode: '13800', services: 'Sur devis' },
  { id: 'martigues', name: 'Martigues', x: 26, y: 52, postalCode: '13500', services: 'Sur devis' },
];

export function PacaInteractiveMap() {
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const activeCityData = CITY_MARKERS.find((c) => c.id === activeCity);

  return (
    <section className="py-16 md:py-20 bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-green-500/10 text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
              <MapPin className="w-3 h-3" aria-hidden="true" />
              Bouches-du-Rhône (13)
            </span>
            <h2 className="ncm-section-title text-3xl md:text-4xl text-white mb-3">Carte des villes desservies</h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Survolez un marqueur ou utilisez la liste de liens ci-dessous.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto">
          <div className="relative bg-gray-800/50 rounded-2xl border border-gray-700/50 overflow-hidden">
            <div
              className="relative w-full"
              style={{ paddingBottom: '55%' }}
              role="img"
              aria-label="Carte schématique des villes desservies dans les Bouches-du-Rhône"
            >
              <div
                className="absolute rounded-full bg-green-500/[0.06] border border-green-500/15"
                style={{ left: '8%', top: '15%', width: '55%', height: '75%' }}
              />

              {CITY_MARKERS.map((city, index) => {
                const isActive = activeCity === city.id;
                const hasLink = !!city.link;
                const pinClasses = city.isMain
                  ? 'w-4 h-4 md:w-5 md:h-5 bg-green-400 shadow-lg shadow-green-400/40'
                  : hasLink
                    ? 'w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500/80'
                    : 'w-2 h-2 md:w-2.5 md:h-2.5 bg-green-600/50';

                return (
                  <div
                    key={city.id}
                    className="absolute z-10 group ncm-map-marker"
                    style={{
                      left: `${city.x}%`,
                      top: `${city.y * 55 / 100}%`,
                      animationDelay: `${0.3 + index * 0.06}s`,
                    }}
                    onMouseEnter={() => setActiveCity(city.id)}
                    onMouseLeave={() => setActiveCity(null)}
                  >
                    {city.isMain && (
                      <span
                        className="absolute inset-0 rounded-full animate-ping bg-green-400/30"
                        style={{ animationDuration: '2.5s' }}
                      />
                    )}
                    {hasLink ? (
                      <Link
                        to={city.link!}
                        className={`relative block rounded-full transition-all duration-200 ${pinClasses} hover:bg-green-300 hover:scale-150 ${isActive ? 'scale-150 ring-2 ring-white/30' : ''}`}
                        aria-label={city.linkLabel ?? city.name}
                      />
                    ) : (
                      <span
                        className={`relative block rounded-full ${pinClasses} ${isActive ? 'scale-150' : ''}`}
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none ${
                        city.isMain
                          ? 'bottom-full mb-1.5 text-[10px] md:text-xs font-black text-white opacity-100'
                          : `bottom-full mb-1 text-[9px] md:text-[10px] font-bold text-gray-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`
                      }`}
                    >
                      {city.name}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className={`border-t border-gray-700/50 bg-gray-900/60 transition-all duration-300 ${activeCityData ? 'py-3 px-5' : 'py-2 px-5'}`}>
              {activeCityData ? (
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-green-400" />
                    <div>
                      <span className="font-bold text-white text-sm">{activeCityData.name}</span>
                      <span className="text-gray-500 text-xs ml-2">({activeCityData.postalCode})</span>
                    </div>
                    <span className="text-[10px] text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full">
                      {activeCityData.services}
                    </span>
                  </div>
                  {activeCityData.link ? (
                    <Link
                      to={activeCityData.link}
                      className="flex items-center gap-1.5 text-xs text-green-400 hover:text-green-300 font-bold transition-colors"
                    >
                      {activeCityData.linkLabel ?? 'Voir'}
                      <ArrowRight className="w-3 h-3" aria-hidden="true" />
                    </Link>
                  ) : (
                    <a
                      href={PHONE_HREF}
                      className="flex items-center gap-1.5 text-xs text-green-400 hover:text-green-300 font-bold transition-colors"
                    >
                      <Phone className="w-3 h-3" aria-hidden="true" />
                      {PHONE_DISPLAY}
                    </a>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-xs text-center">Survolez un marqueur pour les détails</p>
              )}
            </div>
          </div>

          <ul className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm" aria-label="Liens vers pages locales">
            {CITY_MARKERS.filter((c) => c.link).map((c) => (
              <li key={c.id}>
                <Link to={c.link!} className="text-green-400 hover:text-green-300 font-semibold underline-offset-2 hover:underline">
                  {c.linkLabel}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/services" className="text-gray-400 hover:text-green-300 font-semibold">
                Tous nos services
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
