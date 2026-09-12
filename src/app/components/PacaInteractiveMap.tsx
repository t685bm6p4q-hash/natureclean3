/**
 * PacaInteractiveMap — Carte schématique interactive de la région PACA.
 * Zéro dépendance externe, SVG + CSS pur.
 * Marqueurs cliquables vers les pages géo dédiées.
 */

import { useState } from 'react';
import { Link } from 'react-router';
import { MapPin, ArrowRight, Phone } from 'lucide-react';
import { ScrollReveal } from '@/app/components/ScrollReveal';
import { PHONE_DISPLAY, PHONE_HREF } from '@/app/utils/constants';

interface CityMarker {
  id: string;
  name: string;
  /** Position relative en % (x, y) sur le container */
  x: number;
  y: number;
  link?: string;
  postalCode: string;
  services: string;
  isMain?: boolean;
  department: '13' | '06' | '83';
}

const CITY_MARKERS: CityMarker[] = [
  { id: 'marseille', name: 'Marseille', x: 40, y: 55, link: '/nettoyage-bureaux-marseille', postalCode: '13001-13016', services: 'Tous services', isMain: true, department: '13' },
  { id: 'aix', name: 'Aix-en-Provence', x: 28, y: 35, link: '/nettoyage-bureaux-aix-en-provence', postalCode: '13100', services: 'Bureaux', department: '13' },
  { id: 'aubagne', name: 'Aubagne', x: 52, y: 58, link: '/nettoyage-coproprietes-aubagne', postalCode: '13400', services: 'Coproprietes', department: '13' },
  { id: 'laciotat', name: 'La Ciotat', x: 62, y: 72, link: '/nettoyage-coproprietes-la-ciotat', postalCode: '13600', services: 'Coproprietes', department: '13' },
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
              Couverture geographique
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">
              Marseille — Aix — Aubagne — La Ciotat
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Survolez ou touchez les marqueurs pour decouvrir nos services par ville.
            </p>
          </div>
        </ScrollReveal>

        <div className="max-w-5xl mx-auto">
          {/* ═══ CARTE ═══ */}
          <div className="relative bg-gray-800/50 rounded-2xl border border-gray-700/50 overflow-hidden">
            {/* Grille de fond subtile */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]" aria-hidden="true">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Légende départements */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
              <div className="flex items-center gap-2 bg-gray-900/80 px-3 py-1.5 rounded-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                <span className="text-[10px] text-gray-300 font-medium">Bouches-du-Rhone (13)</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-900/80 px-3 py-1.5 rounded-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <span className="text-[10px] text-gray-300 font-medium">Alpes-Maritimes (06)</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-900/80 px-3 py-1.5 rounded-lg">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="text-[10px] text-gray-300 font-medium">Var (83)</span>
              </div>
            </div>

            {/* Zone de la carte — aspect ratio fixe */}
            <div
              className="relative w-full"
              style={{ paddingBottom: '55%' }}
              role="img"
              aria-label="Carte interactive des zones d'intervention Nature Clean en region PACA"
            >
              {/* Liens routiers schématiques */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 55" preserveAspectRatio="none" aria-hidden="true">
                {/* A7/A51 Aix → Marseille */}
                <line x1="22" y1="21" x2="28" y2="37" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" strokeDasharray="1,1" />
                {/* A50 Marseille → Aubagne */}
                <line x1="28" y1="37" x2="36" y2="40" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" strokeDasharray="1,1" />
                {/* Aubagne → La Ciotat */}
                <line x1="36" y1="40" x2="46" y2="47" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" strokeDasharray="1,1" />
                {/* A8 Aix → Cannes → Nice (autoroute principale) */}
                <path d="M 22 21 Q 45 15 65 16 Q 75 18 85 18" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.4" strokeDasharray="1.5,1" />
                {/* Cannes → Nice côtier */}
                <line x1="68" y1="26" x2="85" y2="18" stroke="rgba(255,255,255,0.06)" strokeWidth="0.3" strokeDasharray="1,1" />
                {/* Cannes → Grasse */}
                <line x1="68" y1="26" x2="65" y2="16" stroke="rgba(255,255,255,0.05)" strokeWidth="0.25" strokeDasharray="0.8,0.8" />
              </svg>

              {/* Zone BDR — cercle diffus */}
              <div
                className="absolute rounded-full bg-green-500/[0.04] border border-green-500/10"
                style={{ left: '10%', top: '20%', width: '40%', height: '70%' }}
              />
              {/* Zone 06 — cercle diffus */}
              <div
                className="absolute rounded-full bg-sky-500/[0.04] border border-sky-500/10"
                style={{ left: '52%', top: '8%', width: '42%', height: '75%' }}
              />
              {/* Zone 83 — cercle diffus */}
              <div
                className="absolute rounded-full bg-amber-500/[0.04] border border-amber-500/10"
                style={{ left: '30%', top: '40%', width: '40%', height: '50%' }}
              />

              {/* Labels départements */}
              <span className="absolute text-[9px] text-gray-600 font-bold tracking-widest uppercase select-none" style={{ left: '14%', top: '12%' }}>
                13
              </span>
              <span className="absolute text-[9px] text-gray-600 font-bold tracking-widest uppercase select-none" style={{ left: '88%', top: '12%' }}>
                06
              </span>
              <span className="absolute text-[9px] text-gray-600 font-bold tracking-widest uppercase select-none" style={{ left: '54%', top: '50%' }}>
                83
              </span>

              {/* ═══ MARQUEURS ═══ */}
              {CITY_MARKERS.map((city, index) => {
                const isActive = activeCity === city.id;
                const hasLink = !!city.link;

                // Classes statiques pour éviter la purge Tailwind
                const pinClasses = city.isMain
                  ? city.department === '13'
                    ? 'w-4 h-4 md:w-5 md:h-5 bg-green-400 shadow-lg shadow-green-400/40'
                    : city.department === '06'
                      ? 'w-4 h-4 md:w-5 md:h-5 bg-sky-400 shadow-lg shadow-sky-400/40'
                      : 'w-4 h-4 md:w-5 md:h-5 bg-amber-400 shadow-lg shadow-amber-400/40'
                  : hasLink
                    ? city.department === '13'
                      ? 'w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500/80'
                      : city.department === '06'
                        ? 'w-2.5 h-2.5 md:w-3 md:h-3 bg-sky-500/80'
                        : 'w-2.5 h-2.5 md:w-3 md:h-3 bg-amber-500/80'
                    : city.department === '13'
                      ? 'w-2 h-2 md:w-2.5 md:h-2.5 bg-green-600/50'
                      : city.department === '06'
                        ? 'w-2 h-2 md:w-2.5 md:h-2.5 bg-sky-600/50'
                        : 'w-2 h-2 md:w-2.5 md:h-2.5 bg-amber-600/50';

                const hoverClasses = hasLink
                  ? city.department === '13'
                    ? 'hover:bg-green-300 hover:scale-150'
                    : city.department === '06'
                      ? 'hover:bg-sky-300 hover:scale-150'
                      : 'hover:bg-amber-300 hover:scale-150'
                  : '';

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
                    onFocus={() => setActiveCity(city.id)}
                    onBlur={() => setActiveCity(null)}
                  >
                    {/* Pulse pour les villes principales */}
                    {city.isMain && (
                      <span
                        className={`absolute inset-0 rounded-full animate-ping ${
                          city.department === '13' ? 'bg-green-400/30' : city.department === '06' ? 'bg-sky-400/30' : 'bg-amber-400/30'
                        }`}
                        style={{ animationDuration: '2.5s' }}
                      />
                    )}

                    {/* Le pin */}
                    {hasLink ? (
                      <Link
                        to={city.link!}
                        className={`relative block rounded-full transition-all duration-200 ${pinClasses} ${hoverClasses} ${isActive ? 'scale-150 ring-2 ring-white/30' : ''}`}
                        aria-label={`${city.name} — ${city.services}`}
                      />
                    ) : (
                      <button
                        className={`relative block rounded-full transition-all duration-200 cursor-default ${pinClasses} ${isActive ? 'scale-150' : ''}`}
                        aria-label={`${city.name} — ${city.services}`}
                        tabIndex={0}
                      />
                    )}

                    {/* Label ville — visible on hover ou pour les villes principales */}
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none transition-opacity duration-200 ${
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

            {/* ═══ INFO BAR — ville active ═══ */}
            <div className={`border-t border-gray-700/50 bg-gray-900/60 transition-all duration-300 ${activeCityData ? 'py-3 px-5' : 'py-2 px-5'}`}>
              {activeCityData ? (
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <span className={`w-3 h-3 rounded-full ${activeCityData.department === '13' ? 'bg-green-400' : activeCityData.department === '06' ? 'bg-sky-400' : 'bg-amber-400'}`} />
                    <div>
                      <span className="font-bold text-white text-sm">{activeCityData.name}</span>
                      <span className="text-gray-500 text-xs ml-2">({activeCityData.postalCode})</span>
                    </div>
                    <span className="text-[10px] text-gray-400 bg-gray-800 px-2 py-0.5 rounded-full">{activeCityData.services}</span>
                  </div>
                  {activeCityData.link ? (
                    <Link
                      to={activeCityData.link}
                      className="flex items-center gap-1.5 text-xs text-green-400 hover:text-green-300 font-bold transition-colors"
                    >
                      Voir la page dediee
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
                <p className="text-gray-500 text-xs text-center">
                  Survolez un marqueur pour voir les details
                </p>
              )}
            </div>
          </div>

          {/* ═══ LÉGENDE MOBILE ═══ */}
          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="w-3 h-3 rounded-full bg-green-400 shadow shadow-green-400/30" />
              Ville principale
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
              Page dediee disponible
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-gray-500/60" />
              Zone couverte
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}