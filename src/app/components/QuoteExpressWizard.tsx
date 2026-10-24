import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
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
  Loader2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Ruler,
  CalendarClock,
  User,
  Camera,
  X,
} from 'lucide-react';
import { storeDevisLeadForMerci } from '@/app/utils/devisLeadSession';
import { PHONE_DISPLAY } from '@/app/utils/constants';
import { getPageJourney, formatJourneyForWhatsApp } from '@/app/hooks/usePageJourney';
import {
  validateLeadExpressForm,
  validateLeadExpressStep,
  SURFACE_RANGE_OPTIONS,
  FREQUENCE_EXPRESS_OPTIONS,
} from '@/utils/validation';

const SECTORS = [
  { id: 'Copros', label: 'Copropriété & immeuble', icon: Building2 },
  { id: 'Bureaux', label: 'Bureaux & entreprises', icon: Building },
  { id: 'Particuliers', label: 'Particuliers', icon: Home },
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

const STEPS = [
  { n: 1, title: 'Votre besoin', subtitle: 'Type de prestation' },
  { n: 2, title: 'Lieu & volume', subtitle: 'Ville, surface, fréquence' },
  { n: 3, title: 'Vos coordonnées', subtitle: 'Estimation sous 24 h' },
] as const;

const MAX_PHOTO_BYTES = 800_000;
const ACCEPT_PHOTO = 'image/jpeg,image/png,image/webp';

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

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ''));
    reader.onerror = () => reject(new Error('LECTURE_FICHIER'));
    reader.readAsDataURL(file);
  });
}

function buildSummaryMessage(form: {
  secteur: string;
  localisation: string;
  surface: string;
  frequence: string;
  hasPhoto: boolean;
}): string {
  const sectorLabel = SECTORS.find((s) => s.id === form.secteur)?.label ?? form.secteur;
  const surfaceLabel =
    SURFACE_RANGE_OPTIONS.find((o) => o.id === form.surface)?.label ?? form.surface;
  const freqLabel =
    FREQUENCE_EXPRESS_OPTIONS.find((o) => o.id === form.frequence)?.label ?? form.frequence;
  const lines = [
    'Demande devis express (3 étapes).',
    `Prestation : ${sectorLabel}.`,
    `Lieu : ${form.localisation.trim()}.`,
    `Surface : ${surfaceLabel}.`,
    `Fréquence : ${freqLabel}.`,
  ];
  if (form.hasPhoto) {
    lines.push('Photo du chantier : jointe à cet email.');
  }
  return lines.join('\n');
}

export function QuoteExpressWizard() {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service') ?? '';
  const matchedSector = SERVICE_PARAM_MAP[serviceParam] ?? '';

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState({
    secteur: matchedSector,
    localisation: '',
    nom: '',
    email: '',
    telephone: '',
    surface: 'inconnu' as string,
    frequence: '' as string,
    message: '',
    rgpd: false,
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState('');

  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, secteur: matchedSector || prev.secteur }));
    if (matchedSector) {
      setStep(1);
    }
  }, [serviceParam, matchedSector]);

  const inp = (field: string) =>
    `w-full px-3 py-2.5 rounded-lg border text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400 ${
      errors[field]
        ? 'border-red-300 bg-red-50 focus:ring-red-500/20 focus:border-red-500'
        : 'border-gray-200 bg-gray-50 focus:ring-emerald-500/20 focus:border-emerald-500'
    }`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target as HTMLInputElement;
    const value =
      type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const selectSector = (id: string) => {
    setFormData((prev) => ({ ...prev, secteur: id }));
    setErrors((prev) => ({ ...prev, secteur: '' }));
    setStep(2);
  };

  const selectSurface = (id: string) => {
    setFormData((prev) => ({ ...prev, surface: id }));
  };

  const selectFrequence = (id: string) => {
    setFormData((prev) => ({ ...prev, frequence: id }));
    setErrors((prev) => ({ ...prev, frequence: '' }));
  };

  const goNext = () => {
    const check = validateLeadExpressStep(step, formData);
    if (!check.success) {
      setErrors(check.errors ?? {});
      return;
    }
    setErrors({});
    setStep((s) => (s < 3 ? ((s + 1) as 1 | 2 | 3) : s));
  };

  const goBack = () => {
    setErrors({});
    setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s));
  };

  const onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhotoError('');
    const file = e.target.files?.[0];
    if (!file) return;
    if (!ACCEPT_PHOTO.split(',').includes(file.type)) {
      setPhotoError('Format accepté : JPG, PNG ou WebP.');
      return;
    }
    if (file.size > MAX_PHOTO_BYTES) {
      setPhotoError('Photo trop lourde (max. ~800 Ko). Compressez ou choisissez une autre image.');
      return;
    }
    setPhotoFile(file);
    const url = URL.createObjectURL(file);
    setPhotoPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return url;
    });
    e.target.value = '';
  };

  const clearPhoto = () => {
    setPhotoFile(null);
    setPhotoPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setPhotoError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const stepCheck = validateLeadExpressStep(3, formData);
    if (!stepCheck.success) {
      setErrors(stepCheck.errors ?? {});
      return;
    }

    const payloadForm = {
      ...formData,
      message: buildSummaryMessage({
        secteur: formData.secteur,
        localisation: formData.localisation,
        surface: formData.surface,
        frequence: formData.frequence,
        hasPhoto: Boolean(photoFile),
      }),
    };

    const validation = validateLeadExpressForm(payloadForm);
    if (!validation.success) {
      setErrors(validation.errors ?? {});
      return;
    }

    const data = validation.data!;
    const { codePostal, adresse } = splitLocalisation(data.localisation);
    const freqApi =
      FREQUENCE_EXPRESS_OPTIONS.find((o) => o.id === data.frequence)?.apiValue ?? data.frequence;

    setErrors({});
    setIsSubmitting(true);

    try {
      let photoBase64: string | undefined;
      let photoName: string | undefined;
      if (photoFile) {
        photoBase64 = await readFileAsDataUrl(photoFile);
        photoName = photoFile.name;
      }

      const payload = {
        nom: data.nom.trim(),
        prenom: '',
        email: data.email.trim(),
        telephone: data.telephone.trim(),
        codePostal,
        adresse,
        typeNettoyage: data.secteur,
        typeSurfaceGraffiti: '',
        surface: data.surface,
        frequence: freqApi,
        message: data.message,
        source: 'Page Devis — Lead Express 3 étapes',
        sourcePage: `/devis${serviceParam ? `?service=${serviceParam}` : ''}`,
        referrer: typeof document !== 'undefined' ? document.referrer || 'Direct' : 'Direct',
        journey: formatJourneyForWhatsApp(getPageJourney()),
        timestamp: new Date().toISOString(),
        ...(photoBase64 ? { photoBase64, photoName } : {}),
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
          form_name: 'devis_express_3_steps',
          service: data.secteur,
          source_page: payload.sourcePage,
        });
      }

      const serviceLabel =
        SECTORS.find((s) => s.id === data.secteur)?.label ?? data.secteur;
      storeDevisLeadForMerci(data.secteur);
      const qs = serviceLabel ? `?service=${encodeURIComponent(serviceLabel)}` : '';
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

  return (
    <div className="max-w-xl w-full mx-auto">
      <nav aria-label="Progression du devis" className="mb-6">
        <ol className="flex gap-2">
          {STEPS.map((s) => {
            const active = step === s.n;
            const done = step > s.n;
            return (
              <li key={s.n} className="flex-1">
                <div
                  className={`rounded-xl border px-2 py-2 text-center transition-colors ${
                    active
                      ? 'border-emerald-500 bg-emerald-50'
                      : done
                        ? 'border-emerald-200 bg-emerald-50/50'
                        : 'border-gray-100 bg-gray-50'
                  }`}
                >
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wide ${
                      active ? 'text-emerald-700' : done ? 'text-emerald-600' : 'text-gray-400'
                    }`}
                  >
                    Étape {s.n}
                  </span>
                  <p
                    className={`text-xs font-semibold mt-0.5 leading-tight ${
                      active ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {s.title}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </nav>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {step === 1 && (
          <div className="space-y-3">
            <div>
              <h3 className="text-base font-bold text-gray-900">Quel type de prestation ?</h3>
              <p className="text-xs text-gray-500 mt-0.5">Un clic sur une carte pour continuer.</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {SECTORS.map((s) => {
                const Icon = s.icon;
                const selected = formData.secteur === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => selectSector(s.id)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 text-center transition-all min-h-[88px] ${
                      selected
                        ? 'border-emerald-500 bg-emerald-50 shadow-sm shadow-emerald-500/10'
                        : 'border-gray-100 bg-white hover:border-emerald-300 hover:bg-emerald-50/40'
                    }`}
                  >
                    <Icon
                      className={`w-6 h-6 ${selected ? 'text-emerald-600' : 'text-gray-500'}`}
                      aria-hidden="true"
                    />
                    <span
                      className={`text-[11px] sm:text-xs font-semibold leading-tight ${
                        selected ? 'text-emerald-900' : 'text-gray-700'
                      }`}
                    >
                      {s.label}
                    </span>
                    {selected && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 -mt-1" aria-hidden="true" />
                    )}
                  </button>
                );
              })}
            </div>
            {errors.secteur && (
              <p className="flex items-center gap-1 text-xs text-red-500">
                <AlertCircle className="w-3 h-3" /> {errors.secteur}
              </p>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">Où et quelle envergure ?</h3>
              <p className="text-xs text-gray-500 mt-0.5">Champs rapides — pas de calcul au centime près.</p>
            </div>

            <div>
              <label htmlFor="localisation" className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                Ville / code postal <span className="text-emerald-600">*</span>
              </label>
              <input
                type="text"
                id="localisation"
                name="localisation"
                value={formData.localisation}
                onChange={handleChange}
                placeholder="Ex. Marseille 13008, Aix, Aubagne…"
                className={inp('localisation')}
                autoComplete="address-level2"
              />
              {errors.localisation && (
                <p className="flex items-center gap-1 mt-1 text-xs text-red-500">
                  <AlertCircle className="w-3 h-3" /> {errors.localisation}
                </p>
              )}
            </div>

            <div>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-2">
                <Ruler className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                Surface approximative
              </span>
              <div className="grid grid-cols-2 gap-2">
                {SURFACE_RANGE_OPTIONS.map((o) => {
                  const selected = formData.surface === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => selectSurface(o.id)}
                      className={`px-3 py-2.5 rounded-lg border text-xs font-semibold text-left transition-all ${
                        selected
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-emerald-300'
                      }`}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-2">
                <CalendarClock className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                Fréquence souhaitée <span className="text-emerald-600">*</span>
              </span>
              <div className="grid grid-cols-2 gap-2">
                {FREQUENCE_EXPRESS_OPTIONS.map((o) => {
                  const selected = formData.frequence === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      onClick={() => selectFrequence(o.id)}
                      className={`px-3 py-3 rounded-lg border text-sm font-bold transition-all ${
                        selected
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-900'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-emerald-300'
                      }`}
                    >
                      {o.label}
                    </button>
                  );
                })}
              </div>
              {errors.frequence && (
                <p className="flex items-center gap-1 mt-1 text-xs text-red-500">
                  <AlertCircle className="w-3 h-3" /> {errors.frequence}
                </p>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-bold text-gray-900">Recevoir votre estimation sous 24 h</h3>
              <p className="text-xs text-gray-500 mt-0.5">Nous vous rappelons en priorité sur le mobile.</p>
            </div>

            <div>
              <label htmlFor="nom" className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-1">
                <User className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                Nom & prénom ou entreprise <span className="text-emerald-600">*</span>
              </label>
              <input
                type="text"
                id="nom"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                placeholder="Ex. Dupont ou Résidence Les Pins"
                className={inp('nom')}
                autoComplete="name"
              />
              {errors.nom && (
                <p className="text-xs text-red-500 mt-1">{errors.nom}</p>
              )}
            </div>

            <div>
              <label htmlFor="telephone" className="block text-xs font-semibold text-gray-600 mb-1">
                Téléphone <span className="text-emerald-600">*</span>
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
                E-mail <span className="text-gray-400 font-normal">(optionnel)</span>
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

            <div>
              <span className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 mb-2">
                <Camera className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
                Photo du chantier <span className="text-gray-400 font-normal">(optionnel)</span>
              </span>
              <p className="text-[11px] text-gray-400 mb-2">
                Utile pour les remises en état urgentes (JPG, PNG, WebP — max. ~800 Ko).
              </p>
              {photoPreview ? (
                <div className="relative rounded-xl border border-gray-200 overflow-hidden bg-gray-50">
                  <img src={photoPreview} alt="Aperçu photo chantier" className="w-full max-h-40 object-cover" />
                  <button
                    type="button"
                    onClick={clearPhoto}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80"
                    aria-label="Retirer la photo"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center gap-2 px-4 py-6 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/30 transition-colors">
                  <Camera className="w-8 h-8 text-gray-400" aria-hidden="true" />
                  <span className="text-xs font-semibold text-gray-600">Ajouter une photo</span>
                  <input
                    type="file"
                    accept={ACCEPT_PHOTO}
                    className="sr-only"
                    onChange={onPhotoChange}
                  />
                </label>
              )}
              {photoError && (
                <p className="text-xs text-red-500 mt-1">{photoError}</p>
              )}
            </div>

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
            {errors.rgpd && <p className="text-xs text-red-500">{errors.rgpd}</p>}
          </div>
        )}

        {errors.submit && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {errors.submit}
          </p>
        )}

        <div className="flex flex-col-reverse sm:flex-row gap-2 pt-2">
          {step > 1 && (
            <button
              type="button"
              onClick={goBack}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-700 hover:bg-gray-50"
            >
              <ArrowLeft className="w-4 h-4" /> Retour
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={goNext}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/25 transition-all shadow-lg shadow-emerald-600/20"
            >
              Continuer <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-sm bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/25 transition-all disabled:opacity-70 shadow-lg shadow-emerald-600/20"
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
          )}
        </div>
      </form>
    </div>
  );
}
