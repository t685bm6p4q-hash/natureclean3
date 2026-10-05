import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import { storeDevisLeadForMerci } from '@/app/utils/devisLeadSession';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import {
  Building,
  Home,
  Building2,
  HardHat,
  Tent,
  Eraser,
  Layers,
  Store,
  Trash2,
  MoreHorizontal,
  CircleDot,
  CheckCircle2,
  ShieldCheck,
  Loader2,
  AlertCircle,
  ArrowRight,
  Phone,
  MessageCircle,
  ChevronDown,
} from 'lucide-react';
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_URL,
  ARIA_PHONE,
  ARIA_WHATSAPP,
} from '@/app/utils/constants';
import { getPageJourney, formatJourneyForWhatsApp } from '@/app/hooks/usePageJourney';
import { validateLeadExpressForm, SURFACE_RANGE_OPTIONS } from '@/utils/validation';

const SECTORS = [
  { id: 'Bureaux', label: 'Bureaux', icon: Building },
  { id: 'Particuliers', label: 'Particuliers', icon: Home },
  { id: 'Copros', label: 'Copropriétés', icon: Building2 },
  { id: 'Chantier', label: 'Fin de chantier', icon: HardHat },
  { id: 'Festival/Événement', label: 'Événement', icon: Tent },
  { id: 'Graffitis', label: 'Graffitis', icon: Eraser },
  { id: 'Vitres', label: 'Vitres', icon: Layers },
  { id: 'Centre commercial', label: 'Commerce', icon: Store },
  { id: 'Diogène', label: 'Diogène', icon: Trash2 },
  { id: 'Remise en état sols', label: 'Sols', icon: CircleDot },
  { id: 'Autres', label: 'Autres', icon: MoreHorizontal },
] as const;

const SERVICE_PARAM_MAP: Record<string, string> = {
  bureaux: 'Bureaux',
  coproprietes: 'Copros',
  'fin-chantier': 'Chantier',
  'gros-chantier': 'Chantier',
  particuliers: 'Particuliers',
  diogene: 'Diogène',
  evenementiel: 'Festival/Événement',
  graffitis: 'Graffitis',
  commerces: 'Centre commercial',
  vitres: 'Vitres',
  sols: 'Remise en état sols',
};

interface CtxInfo {
  label: string;
  subtitle: string;
}

const PARAM_CONTEXT: Record<string, CtxInfo> = {
  bureaux: { label: 'Bureaux & Entreprises', subtitle: 'Des locaux impeccables, des collaborateurs sereins.' },
  coproprietes: { label: 'Copropriétés', subtitle: 'Des parties communes soignées pour une résidence valorisée.' },
  'fin-chantier': { label: 'Fin de Chantier', subtitle: 'Remise en état express avant livraison.' },
  'gros-chantier': { label: 'Gros Chantiers', subtitle: "Chantiers d'envergure traités avec rigueur." },
  particuliers: { label: 'Particuliers', subtitle: 'Votre intérieur mérite une attention sur-mesure.' },
  diogene: { label: 'Nettoyage Diogène', subtitle: 'Une intervention discrète, bienveillante et sans jugement.' },
  evenementiel: { label: 'Événementiel', subtitle: 'Votre événement mérite un cadre impeccable.' },
  graffitis: { label: 'Dégraffitage', subtitle: 'Effacement rapide et restauration de votre bien.' },
  commerces: { label: 'Commerces & Retail', subtitle: 'Un espace de vente propre booste votre chiffre.' },
  vitres: { label: 'Nettoyage de Vitres', subtitle: 'Des vitrages éclatants, en toute sécurité.' },
  sols: { label: 'Remise en état sols', subtitle: 'Lustrage et nettoyage profond de vos sols.' },
};

function splitLocalisation(localisation: string): { codePostal: string; adresse: string } {
  const trimmed = localisation.trim();
  if (/^[0-9]{5}$/.test(trimmed)) {
    return { codePostal: trimmed, adresse: '' };
  }
  const cpMatch = trimmed.match(/\b(\d{5})\b/);
  return {
    codePostal: cpMatch?.[1] ?? '',
    adresse: trimmed,
  };
}

export function QuotePage() {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service') ?? '';
  const matchedSector = SERVICE_PARAM_MAP[serviceParam] ?? '';
  const ctxInfo: CtxInfo | null = PARAM_CONTEXT[serviceParam] ?? null;

  const [formData, setFormData] = useState({
    secteur: matchedSector,
    localisation: '',
    email: '',
    telephone: '',
    surface: 'inconnu',
    message: '',
    rgpd: false,
  });

  const [userExpandedSectors, setUserExpandedSectors] = useState(false);
  const showAllSectors = !matchedSector || userExpandedSectors;

  useEffect(() => {
    setUserExpandedSectors(false);
    setFormData((prev) => ({ ...prev, secteur: matchedSector || prev.secteur }));
  }, [serviceParam, matchedSector]);

  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, type } = e.target as HTMLInputElement;
    const value =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
    if (name === 'email' || name === 'telephone') {
      setErrors((prev) => ({ ...prev, contact: '' }));
    }
  };

  const handleSectorSelect = (id: string) => {
    setFormData((prev) => ({ ...prev, secteur: id }));
    if (errors.secteur) setErrors((prev) => ({ ...prev, secteur: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLeadExpressForm(formData);
    if (!validation.success) {
      setErrors(validation.errors ?? {});
      return;
    }

    const data = validation.data!;
    const { codePostal, adresse } = splitLocalisation(data.localisation);
    setErrors({});
    setIsSubmitting(true);

    try {
      const payload = {
        nom: 'Lead Express',
        prenom: '',
        email: data.email.trim(),
        telephone: data.telephone.trim(),
        codePostal,
        adresse,
        typeNettoyage: data.secteur,
        typeSurfaceGraffiti: '',
        surface: data.surface,
        frequence: 'Intervention Unique',
        message: data.message,
        source: 'Page Devis — Lead Express',
        sourcePage: `/devis${serviceParam ? `?service=${serviceParam}` : ''}`,
        referrer: typeof document !== 'undefined' ? document.referrer || 'Direct' : 'Direct',
        journey: formatJourneyForWhatsApp(getPageJourney()),
        timestamp: new Date().toISOString(),
      };

      const response = await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 429) {
          const s = (errorData as { retryAfter?: number }).retryAfter ?? 60;
          throw new Error(`RATE_LIMITED:${s}`);
        }
        if (response.status === 400 && (errorData as { issues?: unknown[] }).issues?.length) {
          const d = (errorData as { issues: { field: string; message: string }[] }).issues
            .map((i) => `${i.field}: ${i.message}`)
            .join(', ');
          throw new Error(`VALIDATION:${d}`);
        }
        throw new Error(`HTTP_${response.status}`);
      }

      if (window.NatureCleanTracking) {
        window.NatureCleanTracking.trackEvent('form_submit', {
          form_name: 'devis_express',
          service: data.secteur,
          source_page: payload.sourcePage,
        });
      }

      const serviceLabel =
        SECTORS.find((s) => s.id === data.secteur)?.label ?? data.secteur;
      storeDevisLeadForMerci(data.secteur);
      const qs = serviceLabel
        ? `?service=${encodeURIComponent(serviceLabel)}`
        : '';
      navigate(`/merci${qs}`, { replace: true });
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : '';
      if (msg.startsWith('RATE_LIMITED:')) {
        const s = parseInt(msg.split(':')[1] || '60', 10);
        setErrors({
          submit: `Trop de demandes. Réessayez dans ${Math.ceil(s / 60)} min ou appelez-nous.`,
        });
      } else if (msg.startsWith('VALIDATION:')) {
        setErrors({ submit: `Données invalides : ${msg.replace('VALIDATION:', '')}` });
      } else {
        setErrors({
          submit: `Envoi impossible. Appelez le ${PHONE_DISPLAY} ou réessayez dans quelques minutes.`,
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const inp = (field: string) =>
    `w-full px-3 py-2.5 rounded-lg border text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400 ${
      errors[field]
        ? 'border-red-300 bg-red-50 focus:ring-red-500/20 focus:border-red-500'
        : 'border-gray-200 bg-gray-50 focus:ring-emerald-500/20 focus:border-emerald-500'
    }`;

  return (
    <>
      <SEO_Guardian currentSection="quote" />

      {/* Barre contact mobile + desktop (P0) */}
      <div className="sticky top-0 z-40 flex items-center justify-center gap-2 sm:gap-3 px-3 py-2.5 bg-emerald-800 text-white border-b border-emerald-900/30 shadow-sm">
        <a
          href={PHONE_HREF}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-emerald-900 font-bold text-sm hover:bg-emerald-50 transition-colors"
          aria-label={ARIA_PHONE}
        >
          <Phone className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          {PHONE_DISPLAY}
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366] text-white font-bold text-sm hover:bg-[#20BA5A] transition-colors"
          aria-label={ARIA_WHATSAPP}
        >
          <MessageCircle className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
          WhatsApp
        </a>
      </div>

      <div className="flex min-h-[calc(100vh-80px)] w-full font-sans lg:min-h-0 lg:h-[calc(100vh-80px)]">

        {/* Colonne gauche — desktop */}
        <div className="relative hidden lg:flex lg:w-[38%] xl:w-[34%] flex-col justify-between px-10 py-10 overflow-hidden flex-shrink-0">
          <div className="absolute inset-0 bg-[#0a2e1f]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(52,211,153,0.12),transparent_60%)]" />

          <div className="relative z-10">
            {ctxInfo ? (
              <div className="inline-flex items-center gap-2 bg-emerald-400/15 border border-emerald-400/25 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-semibold mb-6">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {ctxInfo.label}
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Devis express · 1 minute
              </div>
            )}

            <h1 className="text-4xl xl:text-[2.4rem] font-black text-white leading-[1.1] tracking-tight mb-4">
              {ctxInfo ? (
                <>
                  {ctxInfo.subtitle.split(',')[0]}
                  {ctxInfo.subtitle.includes(',') && (
                    <>
                      ,<br />
                      <span className="text-emerald-400">
                        {ctxInfo.subtitle.split(',').slice(1).join(',').trim()}
                      </span>
                    </>
                  )}
                </>
              ) : (
                <>
                  Votre devis en<br />
                  <span className="text-emerald-400">quelques clics.</span>
                </>
              )}
            </h1>

            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              4 champs essentiels — notre équipe vous rappelle sous 24h avec une proposition personnalisée.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-white/30 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/60" />
            Gratuit · Sans engagement · RGPD
          </div>
        </div>

        {/* Colonne formulaire — scroll corrigé (P0) */}
        <div className="flex-1 flex flex-col bg-white min-h-0 lg:overflow-y-auto">
          <div className="flex-shrink-0 px-5 sm:px-7 pt-6 pb-3 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Demande de devis express</h2>
            <p className="text-gray-400 text-xs mt-0.5">
              Réponse sous 24h · Préférez le téléphone ? Utilisez les boutons ci-dessus.
            </p>
          </div>

          <div className="flex-1 px-5 sm:px-7 py-5 pb-28 lg:pb-8">
            <div className="max-w-xl w-full mx-auto">
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Service */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Type de prestation <span className="text-emerald-600">*</span>
                    </label>
                    {!showAllSectors && matchedSector ? (
                      <div className="flex items-center gap-2 flex-wrap">
                        {(() => {
                          const s = SECTORS.find((x) => x.id === matchedSector);
                          if (!s) return null;
                          const Icon = s.icon;
                          return (
                            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg flex-1 min-w-[200px]">
                              <Icon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                              <span className="text-sm font-semibold text-emerald-900">{s.label}</span>
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto flex-shrink-0" />
                            </div>
                          );
                        })()}
                        <button
                          type="button"
                          onClick={() => setUserExpandedSectors(true)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:border-emerald-400 hover:text-emerald-700"
                        >
                          <ChevronDown className="w-3.5 h-3.5" /> Changer
                        </button>
                      </div>
                    ) : (
                      <select
                        id="secteur"
                        name="secteur"
                        value={formData.secteur}
                        onChange={handleChange}
                        className={inp('secteur')}
                      >
                        <option value="">Choisissez…</option>
                        {SECTORS.map((s) => (
                          <option key={s.id} value={s.id}>{s.label}</option>
                        ))}
                      </select>
                    )}
                    {errors.secteur && (
                      <p className="flex items-center gap-1 mt-1 text-xs text-red-500">
                        <AlertCircle className="w-3 h-3" /> {errors.secteur}
                      </p>
                    )}
                  </div>

                  {/* Localisation */}
                  <div>
                    <label htmlFor="localisation" className="block text-xs font-semibold text-gray-600 mb-1">
                      Ville ou code postal <span className="text-emerald-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="localisation"
                      name="localisation"
                      value={formData.localisation}
                      onChange={handleChange}
                      placeholder="Ex. Marseille, 13008 ou Aubagne"
                      className={inp('localisation')}
                      autoComplete="address-level2"
                    />
                    {errors.localisation && (
                      <p className="flex items-center gap-1 mt-1 text-xs text-red-500">
                        <AlertCircle className="w-3 h-3" /> {errors.localisation}
                      </p>
                    )}
                  </div>

                  {/* Surface (fourchettes) */}
                  <div>
                    <label htmlFor="surface" className="block text-xs font-semibold text-gray-600 mb-1">
                      Surface approximative <span className="text-gray-400 font-normal">(optionnel)</span>
                    </label>
                    <select
                      id="surface"
                      name="surface"
                      value={formData.surface}
                      onChange={handleChange}
                      className={inp('surface')}
                    >
                      {SURFACE_RANGE_OPTIONS.map((o) => (
                        <option key={o.id} value={o.id}>{o.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Contact */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="telephone" className="block text-xs font-semibold text-gray-600 mb-1">
                        Téléphone
                      </label>
                      <input
                        type="tel"
                        id="telephone"
                        name="telephone"
                        value={formData.telephone}
                        onChange={handleChange}
                        placeholder="06 12 34 56 78"
                        className={inp('telephone')}
                        autoComplete="tel"
                      />
                      {errors.telephone && (
                        <p className="text-xs text-red-500 mt-1">{errors.telephone}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-gray-600 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="vous@email.com"
                        className={inp('email')}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>
                  {errors.contact && (
                    <p className="flex items-center gap-1 text-xs text-red-500">
                      <AlertCircle className="w-3 h-3" /> {errors.contact}
                    </p>
                  )}
                  <p className="text-[11px] text-gray-400 -mt-2">
                    Au moins un moyen de contact (téléphone ou email) pour votre rappel.
                  </p>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-gray-600 mb-1">
                      Décrivez votre besoin <span className="text-emerald-600">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Ex. Fin de chantier T3 à Marseille, livraison dans 5 jours…"
                      className={`${inp('message')} resize-y min-h-[100px]`}
                    />
                    {errors.message && (
                      <p className="flex items-center gap-1 mt-1 text-xs text-red-500">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </p>
                    )}
                  </div>

                  {/* RGPD + submit */}
                  <div className="space-y-3 pt-2">
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        id="rgpd"
                        name="rgpd"
                        checked={formData.rgpd}
                        onChange={handleChange}
                        className="w-4 h-4 mt-0.5 rounded text-emerald-600 border-gray-300 focus:ring-emerald-500"
                      />
                      <span className="text-xs text-gray-500">
                        J&apos;accepte la{' '}
                        <Link
                          to="/politique-de-confidentialite"
                          className="text-emerald-600 underline underline-offset-2"
                          target="_blank"
                        >
                          politique de confidentialité
                        </Link>
                      </span>
                    </label>
                    {errors.rgpd && (
                      <p className="text-xs text-red-500">{errors.rgpd}</p>
                    )}

                    {errors.submit && (
                      <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                        {errors.submit}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/25 transition-all disabled:opacity-70 shadow-lg shadow-emerald-600/20"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" /> Envoi…
                        </>
                      ) : (
                        <>
                          Envoyer ma demande <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
