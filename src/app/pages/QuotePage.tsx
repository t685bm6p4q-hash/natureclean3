import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { z } from 'zod';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import {
  CheckCircle2, Building, Home, Building2, HardHat, Tent,
  Loader2, ShieldCheck, AlertCircle, CalendarDays, CalendarCheck,
  Eraser, MoreHorizontal, Trash2, Store, Zap, ChevronDown, ChevronUp,
  Users, Music, Sparkles, Layers, MoveVertical, Wrench, ArrowRight,
} from 'lucide-react';

const SECTORS = [
  { id: 'Bureaux',            label: 'Bureaux',      icon: Building       },
  { id: 'Particuliers',       label: 'Particuliers', icon: Home           },
  { id: 'Copros',             label: 'Copros',       icon: Building2      },
  { id: 'Chantier',           label: 'Chantier',     icon: HardHat        },
  { id: 'Festival/Événement', label: 'Événement',    icon: Tent           },
  { id: 'Graffitis',          label: 'Graffitis',    icon: Eraser         },
  { id: 'Vitres',             label: 'Vitres',       icon: Layers         },
  { id: 'Centre commercial',  label: 'Commerce',     icon: Store          },
  { id: 'Diogène',            label: 'Diogène',      icon: Trash2         },
  { id: 'Autres',             label: 'Autres',       icon: MoreHorizontal },
];

const FREQUENCES = [
  { id: 'Intervention Unique', label: 'Unique',       icon: Zap          },
  { id: 'Hebdomadaire',        label: 'Hebdo',        icon: CalendarDays  },
  { id: 'Quotidien',           label: 'Quotidien',    icon: CalendarCheck },
];

const PHASES_EVENEMENT = [
  { id: 'Avant (Pré-montage)',             label: "Avant",   sublabel: 'Pré-montage',     icon: HardHat  },
  { id: 'Pendant (Permanence/Sanitaires)', label: "Pendant", sublabel: 'Permanence',       icon: Music    },
  { id: 'Après (Remise en état complète)', label: "Après",   sublabel: 'Remise en état',   icon: Sparkles },
] as const;

const JAUGES_EVENEMENT = [
  { id: '< 1 000 personnes',       label: '< 1k',      sublabel: 'Petit' },
  { id: '1 000 – 5 000 personnes', label: '1k–5k',     sublabel: 'Moyen' },
  { id: '> 5 000 personnes',       label: '> 5k',      sublabel: 'Grand' },
] as const;

const TYPES_VITRAGE = [
  { id: 'Vitrines de magasin (plain-pied)',    label: 'Vitrines',      icon: Store    },
  { id: 'Baies vitrées (particuliers/bureau)', label: 'Baies vitrées', icon: Building },
  { id: 'Vérandas ou verrières',               label: 'Vérandas',      icon: Home     },
  { id: 'Murs-rideaux / Façades vitrées',      label: 'Façades',       icon: Building2},
] as const;

const HAUTEURS_VITRAGE = [
  { id: 'À hauteur d\'homme (< 3m)',          label: '< 3 m',      icon: CheckCircle2 },
  { id: 'Perche télescopique (jusqu\'à 12m)', label: 'Perche 12m', icon: MoveVertical },
  { id: 'Nacelle ou cordiste (grande hauteur)',label: 'Nacelle',    icon: ShieldCheck  },
] as const;

const ETATS_VITRAGE = [
  { id: 'Entretien courant', label: 'Entretien', sublabel: 'Salissures légères', icon: Sparkles },
  { id: 'Remise en état',    label: 'Remise en état', sublabel: 'Calcaire, chantier', icon: Wrench },
] as const;

const SERVICE_PARAM_MAP: Record<string, string> = {
  'bureaux': 'Bureaux', 'coproprietes': 'Copros', 'fin-chantier': 'Chantier',
  'gros-chantier': 'Chantier', 'particuliers': 'Particuliers', 'diogene': 'Diogène',
  'evenementiel': 'Festival/Événement', 'graffitis': 'Graffitis',
  'commerces': 'Centre commercial', 'vitres': 'Vitres', 'sols': 'Autres',
};

interface CtxInfo { label: string; subtitle: string }
const PARAM_CONTEXT: Record<string, CtxInfo> = {
  'bureaux':       { label: 'Bureaux & Entreprises',  subtitle: 'Des locaux impeccables, des collaborateurs sereins.' },
  'coproprietes':  { label: 'Copropriétés',           subtitle: 'Des parties communes soignées pour une résidence valorisée.' },
  'fin-chantier':  { label: 'Fin de Chantier',        subtitle: 'Remise en état express avant livraison.' },
  'gros-chantier': { label: 'Gros Chantiers',         subtitle: 'Chantiers d\'envergure traités avec rigueur.' },
  'particuliers':  { label: 'Particuliers',           subtitle: 'Votre intérieur mérite une attention sur-mesure.' },
  'diogene':       { label: 'Nettoyage Diogène',      subtitle: 'Une intervention discrète, bienveillante et sans jugement.' },
  'evenementiel':  { label: 'Événementiel',           subtitle: 'Votre événement mérite un cadre impeccable.' },
  'graffitis':     { label: 'Dégraffitage',           subtitle: 'Effacement rapide et restauration de votre bien.' },
  'commerces':     { label: 'Commerces & Retail',     subtitle: 'Un espace de vente propre booste votre chiffre d\'affaires.' },
  'vitres':        { label: 'Nettoyage de Vitres',    subtitle: 'Des vitrages éclatants du sol au plafond, en toute sécurité.' },
  'sols':          { label: 'Remise en état sols',    subtitle: 'Lustrage, cristallisation et nettoyage profond de vos sols.' },
};

const quoteSchema = z.object({
  nom: z.string().min(2, 'Le nom doit contenir au moins 2 caractères.'),
  email: z.string().min(1, "L'email est requis.").email("Format d'email invalide.")
    .refine((v) => !v.includes('@gnail.') && !v.includes('@gamil.') && !v.includes('@hotmai.'), "Vérifiez l'orthographe de l'email."),
  telephone: z.string().min(1, 'Le téléphone est requis.')
    .regex(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/, 'Format invalide (ex: 06 12 34 56 78).'),
  adresse: z.string().min(5, "L'adresse complète est requise."),
  secteur: z.string().min(1, 'Veuillez sélectionner un secteur.'),
  typeSurfaceGraffiti: z.string().optional(),
  encombrement: z.string().optional(),
  nombrePostes: z.string().optional(),
  frequence: z.string(),
  phasesEvenement: z.array(z.string()).optional(),
  jaugeEvenement: z.string().optional(),
  typeVitrage: z.string().optional(),
  hauteurVitrage: z.string().optional(),
  etatVitrage: z.string().optional(),
  surface: z.string().min(1, 'La surface est requise.').transform(Number).refine((n) => n > 0, 'La surface doit être > 0.'),
  description: z.string().optional(),
  rgpd: z.literal(true, { errorMap: () => ({ message: 'Vous devez accepter la politique de confidentialité.' }) }),
}).superRefine((data, ctx) => {
  if (data.secteur === 'Graffitis' && !data.typeSurfaceGraffiti?.trim())
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: 'Précisez le type de surface.', path: ['typeSurfaceGraffiti'] });
  if (data.secteur === 'Diogène' && !data.encombrement?.trim())
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Précisez le degré d'encombrement.", path: ['encombrement'] });
  if (data.secteur === 'Festival/Événement') {
    if (!data.phasesEvenement?.length) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Sélectionnez au moins une phase.", path: ['phasesEvenement'] });
    if (!data.jaugeEvenement?.trim()) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Indiquez la jauge.", path: ['jaugeEvenement'] });
  } else if (data.secteur === 'Vitres') {
    if (!data.typeVitrage?.trim()) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Précisez le type de vitrage.", path: ['typeVitrage'] });
    if (!data.hauteurVitrage?.trim()) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Indiquez la hauteur.", path: ['hauteurVitrage'] });
    if (!data.etatVitrage?.trim()) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Indiquez l'état des vitres.", path: ['etatVitrage'] });
  } else {
    if (!data.frequence?.trim()) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Sélectionnez une fréquence.", path: ['frequence'] });
  }
});

const ENCOMBREMENT_LEVELS = [
  { id: 'léger',       emoji: '🟡', desc: 'Quelques pièces' },
  { id: 'modéré',      emoji: '🟠', desc: 'Majorité des pièces' },
  { id: 'sévère',      emoji: '🔴', desc: 'Logement encombré' },
  { id: 'très sévère', emoji: '⚫', desc: 'Insalubrité avancée' },
];

// ─── Composant ────────────────────────────────────────────────────────────────

export function QuotePage() {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service') ?? '';
  const matchedSector = SERVICE_PARAM_MAP[serviceParam] ?? '';
  const ctxInfo: CtxInfo | null = PARAM_CONTEXT[serviceParam] ?? null;

  const [formData, setFormData] = useState({
    nom: '', email: '', telephone: '', adresse: '',
    secteur: matchedSector,
    typeSurfaceGraffiti: '', encombrement: '', nombrePostes: '',
    frequence: '', phasesEvenement: [] as string[], jaugeEvenement: '',
    typeVitrage: '', hauteurVitrage: '', etatVitrage: '',
    surface: '', description: '', rgpd: false,
  });

  const [userExpandedSectors, setUserExpandedSectors] = useState(false);
  const showAllSectors = !matchedSector || userExpandedSectors;
  useEffect(() => { setUserExpandedSectors(false); }, [serviceParam]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, type } = e.target as HTMLInputElement;
    const value = type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSectorSelect = (id: string) => {
    setFormData((prev) => ({
      ...prev, secteur: id,
      encombrement: prev.secteur !== id ? '' : prev.encombrement,
      nombrePostes: prev.secteur !== id ? '' : prev.nombrePostes,
      phasesEvenement: prev.secteur !== id ? [] : prev.phasesEvenement,
      jaugeEvenement: prev.secteur !== id ? '' : prev.jaugeEvenement,
      typeVitrage: prev.secteur !== id ? '' : prev.typeVitrage,
      hauteurVitrage: prev.secteur !== id ? '' : prev.hauteurVitrage,
      etatVitrage: prev.secteur !== id ? '' : prev.etatVitrage,
    }));
    if (errors.secteur) setErrors((prev) => ({ ...prev, secteur: '' }));
  };

  const handleFrequenceSelect = (id: string) => { setFormData((p) => ({ ...p, frequence: id })); if (errors.frequence) setErrors((p) => ({ ...p, frequence: '' })); };
  const handleEncombrement = (id: string) => { setFormData((p) => ({ ...p, encombrement: id })); if (errors.encombrement) setErrors((p) => ({ ...p, encombrement: '' })); };
  const handlePhaseToggle = (id: string) => {
    setFormData((p) => ({ ...p, phasesEvenement: p.phasesEvenement.includes(id) ? p.phasesEvenement.filter((x) => x !== id) : [...p.phasesEvenement, id] }));
    if (errors.phasesEvenement) setErrors((p) => ({ ...p, phasesEvenement: '' }));
  };
  const handleJaugeSelect = (id: string) => { setFormData((p) => ({ ...p, jaugeEvenement: id })); if (errors.jaugeEvenement) setErrors((p) => ({ ...p, jaugeEvenement: '' })); };
  const handleTypeVitrageSelect = (id: string) => { setFormData((p) => ({ ...p, typeVitrage: id })); if (errors.typeVitrage) setErrors((p) => ({ ...p, typeVitrage: '' })); };
  const handleHauteurVitrageSelect = (id: string) => { setFormData((p) => ({ ...p, hauteurVitrage: id })); if (errors.hauteurVitrage) setErrors((p) => ({ ...p, hauteurVitrage: '' })); };
  const handleEtatVitrageSelect = (id: string) => { setFormData((p) => ({ ...p, etatVitrage: id })); if (errors.etatVitrage) setErrors((p) => ({ ...p, etatVitrage: '' })); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = quoteSchema.safeParse(formData);
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((i) => { if (i.path[0]) newErrors[i.path[0].toString()] = i.message; });
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      const payload = {
        nom: result.data.nom, prenom: '', email: result.data.email,
        telephone: result.data.telephone, codePostal: '', adresse: result.data.adresse,
        typeNettoyage: result.data.secteur,
        typeSurfaceGraffiti: result.data.typeSurfaceGraffiti ?? '',
        encombrement: result.data.encombrement ?? '',
        nombrePostes: result.data.nombrePostes ?? '',
        surface: String(result.data.surface),
        frequence: formData.secteur === 'Festival/Événement'
          ? `Phases : ${formData.phasesEvenement.join(', ')} | Jauge : ${formData.jaugeEvenement}`
          : formData.secteur === 'Vitres'
          ? `Vitrage : ${formData.typeVitrage} | Hauteur : ${formData.hauteurVitrage} | État : ${formData.etatVitrage}`
          : result.data.frequence,
        message: result.data.description ?? '',
        source: 'Page Devis',
        sourcePage: `/devis${serviceParam ? `?service=${serviceParam}` : ''}`,
        timestamp: new Date().toISOString(),
      };
      const response = await fetch('/api/send-quote', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 429) { const s = (errorData as { retryAfter?: number }).retryAfter ?? 60; throw new Error(`RATE_LIMITED:${s}`); }
        if (response.status === 400 && (errorData as { issues?: unknown[] }).issues?.length) {
          const d = (errorData as { issues: { field: string; message: string }[] }).issues.map((i) => `${i.field}: ${i.message}`).join(', ');
          throw new Error(`VALIDATION:${d}`);
        }
        throw new Error(`HTTP_${response.status}`);
      }
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ nom: '', email: '', telephone: '', adresse: '', secteur: matchedSector, typeSurfaceGraffiti: '', encombrement: '', nombrePostes: '', frequence: '', phasesEvenement: [], jaugeEvenement: '', typeVitrage: '', hauteurVitrage: '', etatVitrage: '', surface: '', description: '', rgpd: false });
      setUserExpandedSectors(false);
    } catch (error: unknown) {
      setIsSubmitting(false);
      const msg = error instanceof Error ? error.message : '';
      if (msg.startsWith('RATE_LIMITED:')) { const s = parseInt(msg.split(':')[1] || '60', 10); alert(`Trop de demandes. Réessayez dans ${Math.ceil(s / 60)} min.`); }
      else if (msg.startsWith('VALIDATION:')) { alert(`Données invalides : ${msg.replace('VALIDATION:', '')}`); }
      else { alert("Une erreur est survenue. Veuillez réessayer ou nous appeler directement."); }
    }
  };

  // ── Input style helper ─────────────────────────────────────────────────────
  const inp = (field: string) =>
    `w-full px-3 py-2 rounded-lg border text-sm focus:bg-white focus:outline-none focus:ring-2 transition-all placeholder:text-gray-400 ${
      errors[field] ? 'border-red-300 bg-red-50 focus:ring-red-500/20 focus:border-red-500' : 'border-gray-200 bg-gray-50 focus:ring-emerald-500/20 focus:border-emerald-500'
    }`;

  return (
    <>
      <SEO_Guardian currentSection="quote" />

      <div className="flex lg:h-[calc(100vh-80px)] w-full lg:overflow-hidden font-sans">

        {/* ══ COLONNE GAUCHE — Landing ══════════════════════════════════════ */}
        <div className="relative hidden lg:flex lg:w-[42%] xl:w-[38%] flex-col justify-between px-10 py-10 overflow-hidden flex-shrink-0">
          {/* Fond dégradé */}
          <div className="absolute inset-0 bg-[#0a2e1f]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(52,211,153,0.12),transparent_60%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Haut */}
          <div className="relative z-10">
            {/* Badge service contextuel */}
            {ctxInfo ? (
              <div className="inline-flex items-center gap-2 bg-emerald-400/15 border border-emerald-400/25 text-emerald-300 px-3 py-1.5 rounded-full text-xs font-semibold mb-6">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {ctxInfo.label}
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white/60 px-3 py-1.5 rounded-full text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Disponible maintenant · Marseille & PACA
              </div>
            )}

            <h1 className="text-4xl xl:text-[2.6rem] font-black text-white leading-[1.1] tracking-tight mb-4">
              {ctxInfo ? (
                <>
                  {ctxInfo.subtitle.split(',')[0]},<br />
                  <span className="text-emerald-400">{ctxInfo.subtitle.split(',').slice(1).join(',').trim() || 'la force du naturel.'}</span>
                </>
              ) : (
                <>
                  L'exigence du propre,<br />
                  <span className="text-emerald-400">la force du naturel.</span>
                </>
              )}
            </h1>

            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Nettoyage professionnel éco-responsable pour les entreprises, copropriétés et particuliers de la région PACA.
            </p>
          </div>

          <div className="relative z-10">

            <div className="flex items-center gap-2 mt-4 text-white/30 text-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/60" />
              Devis 100% gratuit · Sans engagement · RGPD compliant
            </div>
          </div>
        </div>

        {/* ══ COLONNE DROITE — Formulaire ═══════════════════════════════════ */}
        <div className="flex-1 flex flex-col bg-white lg:overflow-hidden">

          {/* En-tête formulaire */}
          <div className="flex-shrink-0 px-7 pt-7 pb-4 border-b border-gray-100">
            <div className="max-w-xl">
              <h2 className="text-lg font-bold text-gray-900">Demande de devis gratuit</h2>
              <p className="text-gray-400 text-xs mt-0.5">Réponse sous 24h · Intervention sur Marseille & PACA</p>
            </div>
          </div>

          {/* Corps */}
          <div className="flex-1 lg:overflow-hidden flex flex-col px-7 py-5">
            <div className="max-w-xl w-full flex flex-col flex-1">

              {isSuccess ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
                  <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Demande envoyée !</h3>
                    <p className="text-gray-500 text-sm mt-1 max-w-xs">Notre équipe vous contacte sous 24h avec une proposition sur-mesure.</p>
                  </div>
                  <button onClick={() => setIsSuccess(false)} className="text-emerald-600 text-sm font-medium hover:text-emerald-700 underline underline-offset-4">
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="flex flex-col flex-1 gap-3">

                  {/* Ligne 1 : Nom */}
                  <div>
                    <label htmlFor="nom" className="block text-xs font-semibold text-gray-600 mb-1">
                      Nom entreprise ou particulier <span className="text-emerald-600">*</span>
                    </label>
                    <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleChange}
                      placeholder="Ex: Résidence du Prado / Jean Dupont"
                      className={inp('nom')} />
                    {errors.nom && <p className="flex items-center gap-1 mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.nom}</p>}
                  </div>

                  {/* Ligne 2 : Email + Téléphone */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-gray-600 mb-1">
                        Email <span className="text-emerald-600">*</span>
                      </label>
                      <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                        placeholder="contact@entreprise.com"
                        className={inp('email')} />
                      {errors.email && <p className="flex items-center gap-1 mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.email}</p>}
                    </div>
                    <div>
                      <label htmlFor="telephone" className="block text-xs font-semibold text-gray-600 mb-1">
                        Téléphone <span className="text-emerald-600">*</span>
                      </label>
                      <input type="tel" id="telephone" name="telephone" value={formData.telephone} onChange={handleChange}
                        placeholder="06 12 34 56 78"
                        className={inp('telephone')} />
                      {errors.telephone && <p className="flex items-center gap-1 mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.telephone}</p>}
                    </div>
                  </div>

                  {/* Ligne 3 : Adresse + Surface */}
                  <div className="grid grid-cols-[1fr_auto] gap-3 items-start">
                    <div>
                      <label htmlFor="adresse" className="block text-xs font-semibold text-gray-600 mb-1">
                        Adresse d'intervention <span className="text-emerald-600">*</span>
                      </label>
                      <input type="text" id="adresse" name="adresse" value={formData.adresse} onChange={handleChange}
                        placeholder="12 rue de la République, 13001 Marseille"
                        className={inp('adresse')} />
                      {errors.adresse && <p className="flex items-center gap-1 mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.adresse}</p>}
                    </div>
                    <div className="w-28">
                      <label htmlFor="surface" className="block text-xs font-semibold text-gray-600 mb-1">
                        Surface m² <span className="text-emerald-600">*</span>
                      </label>
                      <input type="number" id="surface" name="surface" min="0" value={formData.surface} onChange={handleChange}
                        placeholder="150"
                        className={inp('surface')} />
                      {errors.surface && <p className="flex items-center gap-1 mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3 flex-shrink-0" /> {errors.surface}</p>}
                    </div>
                  </div>

                  {/* Ligne 4 : Secteur */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                      Type de prestation <span className="text-emerald-600">*</span>
                    </label>
                    {!showAllSectors && matchedSector ? (
                      <div className="flex items-center gap-3">
                        {(() => {
                          const s = SECTORS.find((x) => x.id === matchedSector);
                          if (!s) return null;
                          const Icon = s.icon;
                          return (
                            <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-lg flex-1">
                              <Icon className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                              <span className="text-sm font-semibold text-emerald-900">{s.label}</span>
                              <CheckCircle2 className="w-4 h-4 text-emerald-500 ml-auto flex-shrink-0" />
                            </div>
                          );
                        })()}
                        <button type="button" onClick={() => setUserExpandedSectors(true)}
                          className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-gray-200 bg-white text-xs font-semibold text-gray-600 hover:border-emerald-400 hover:text-emerald-700 hover:bg-emerald-50 transition-all whitespace-nowrap shadow-sm">
                          <ChevronDown className="w-3.5 h-3.5" /> Changer de service
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="grid grid-cols-5 gap-1.5">
                          {SECTORS.map((sector) => {
                            const Icon = sector.icon;
                            const isSelected = formData.secteur === sector.id;
                            return (
                              <button type="button" key={sector.id} onClick={() => handleSectorSelect(sector.id)}
                                className={`flex flex-col items-center py-2 px-1 rounded-lg border transition-all gap-1 ${
                                  isSelected
                                    ? 'border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100'
                                    : errors.secteur
                                      ? 'border-red-200 bg-red-50/50 text-gray-500'
                                      : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-emerald-300 hover:bg-emerald-50/50'
                                }`}
                              >
                                <Icon className={`w-4 h-4 ${isSelected ? 'text-emerald-600' : 'text-gray-400'}`} />
                                <span className="text-[10px] font-medium text-center leading-tight">{sector.label}</span>
                              </button>
                            );
                          })}
                        </div>
                        {matchedSector && userExpandedSectors && (
                          <button type="button" onClick={() => { setUserExpandedSectors(false); handleSectorSelect(matchedSector); }}
                            className="flex items-center gap-1 mt-1 text-xs text-gray-400 hover:text-emerald-600 transition-colors">
                            <ChevronUp className="w-3 h-3" /> Réduire
                          </button>
                        )}
                      </div>
                    )}
                    {errors.secteur && <p className="flex items-center gap-1 mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3" /> {errors.secteur}</p>}
                  </div>

                  {/* Champs conditionnels compacts ──────────────────────── */}

                  {formData.secteur === 'Graffitis' && (
                    <div>
                      <label htmlFor="typeSurfaceGraffiti" className="block text-xs font-semibold text-gray-600 mb-1">Type de surface <span className="text-emerald-600">*</span></label>
                      <select id="typeSurfaceGraffiti" name="typeSurfaceGraffiti" value={formData.typeSurfaceGraffiti} onChange={handleChange} className={inp('typeSurfaceGraffiti')}>
                        <option value="">Sélectionnez...</option>
                        <option>Brique / Pierre</option><option>Béton / Ciment</option>
                        <option>Verre / Vitrine</option><option>Métal / Rideau métallique</option>
                        <option>Bois</option><option value="Autre">Autre</option>
                      </select>
                      {errors.typeSurfaceGraffiti && <p className="flex items-center gap-1 mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3" /> {errors.typeSurfaceGraffiti}</p>}
                    </div>
                  )}

                  {formData.secteur === 'Diogène' && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">Degré d'encombrement <span className="text-emerald-600">*</span></label>
                      <div className="grid grid-cols-4 gap-1.5">
                        {ENCOMBREMENT_LEVELS.map((l) => (
                          <button type="button" key={l.id} onClick={() => handleEncombrement(l.id)}
                            className={`flex flex-col items-center p-2 rounded-lg border transition-all ${formData.encombrement === l.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-100 bg-gray-50 hover:border-emerald-200'}`}>
                            <span className="text-sm">{l.emoji}</span>
                            <span className="text-[10px] font-semibold capitalize mt-0.5">{l.id}</span>
                          </button>
                        ))}
                      </div>
                      {errors.encombrement && <p className="flex items-center gap-1 mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3" /> {errors.encombrement}</p>}
                    </div>
                  )}

                  {formData.secteur === 'Bureaux' && (
                    <div>
                      <label htmlFor="nombrePostes" className="block text-xs font-semibold text-gray-600 mb-1">Nombre de postes <span className="text-gray-400 font-normal">(optionnel)</span></label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                        <input type="number" id="nombrePostes" name="nombrePostes" min="1" value={formData.nombrePostes} onChange={handleChange}
                          placeholder="Ex: 12" className="w-full pl-8 pr-3 py-2 rounded-lg border border-gray-200 bg-gray-50 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 focus:bg-white focus:outline-none transition-all" />
                      </div>
                    </div>
                  )}

                  {formData.secteur === 'Festival/Événement' && (
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phases <span className="text-emerald-600">*</span></label>
                        <div className="space-y-1">
                          {PHASES_EVENEMENT.map((ph) => {
                            const Icon = ph.icon;
                            const checked = formData.phasesEvenement.includes(ph.id);
                            return (
                              <button type="button" key={ph.id} onClick={() => handlePhaseToggle(ph.id)} aria-pressed={checked}
                                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-lg border transition-all ${checked ? 'border-emerald-500 bg-emerald-50' : errors.phasesEvenement ? 'border-red-200 bg-red-50/50' : 'border-gray-100 bg-gray-50 hover:border-emerald-200'}`}>
                                <div className={`w-3.5 h-3.5 rounded border-2 flex items-center justify-center flex-shrink-0 ${checked ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'}`}>
                                  {checked && <svg width="7" height="6" viewBox="0 0 10 8" fill="none"><path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round"/></svg>}
                                </div>
                                <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${checked ? 'text-emerald-600' : 'text-gray-400'}`} />
                                <span className="text-xs font-medium">{ph.label}</span>
                              </button>
                            );
                          })}
                        </div>
                        {errors.phasesEvenement && <p className="flex items-center gap-1 mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3" /> {errors.phasesEvenement}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Jauge <span className="text-emerald-600">*</span></label>
                        <div className="space-y-1">
                          {JAUGES_EVENEMENT.map((j) => {
                            const sel = formData.jaugeEvenement === j.id;
                            return (
                              <button type="button" key={j.id} onClick={() => handleJaugeSelect(j.id)}
                                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded-lg border transition-all ${sel ? 'border-emerald-500 bg-emerald-50' : errors.jaugeEvenement ? 'border-red-200 bg-red-50/50' : 'border-gray-100 bg-gray-50 hover:border-emerald-200'}`}>
                                <Users className={`w-3.5 h-3.5 flex-shrink-0 ${sel ? 'text-emerald-600' : 'text-gray-400'}`} />
                                <span className="text-xs font-bold">{j.label}</span>
                                <span className="text-[10px] text-gray-400 ml-auto">{j.sublabel}</span>
                              </button>
                            );
                          })}
                        </div>
                        {errors.jaugeEvenement && <p className="flex items-center gap-1 mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3" /> {errors.jaugeEvenement}</p>}
                      </div>
                    </div>
                  )}

                  {formData.secteur === 'Vitres' && (
                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Type <span className="text-emerald-600">*</span></label>
                        <div className="space-y-1">
                          {TYPES_VITRAGE.map((t) => {
                            const Icon = t.icon;
                            const sel = formData.typeVitrage === t.id;
                            return (
                              <button type="button" key={t.id} onClick={() => handleTypeVitrageSelect(t.id)} aria-pressed={sel}
                                className={`flex items-center gap-1.5 w-full px-2 py-1.5 rounded-lg border text-left transition-all ${sel ? 'border-emerald-500 bg-emerald-50' : errors.typeVitrage ? 'border-red-200 bg-red-50/50' : 'border-gray-100 bg-gray-50 hover:border-emerald-200'}`}>
                                <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${sel ? 'text-emerald-600' : 'text-gray-400'}`} />
                                <span className="text-[11px] font-medium leading-tight">{t.label}</span>
                              </button>
                            );
                          })}
                        </div>
                        {errors.typeVitrage && <p className="flex items-center gap-1 mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3" /> {errors.typeVitrage}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">Hauteur <span className="text-emerald-600">*</span></label>
                        <div className="space-y-1">
                          {HAUTEURS_VITRAGE.map((h) => {
                            const Icon = h.icon;
                            const sel = formData.hauteurVitrage === h.id;
                            return (
                              <button type="button" key={h.id} onClick={() => handleHauteurVitrageSelect(h.id)} aria-pressed={sel}
                                className={`flex items-center gap-1.5 w-full px-2 py-1.5 rounded-lg border text-left transition-all ${sel ? 'border-emerald-500 bg-emerald-50' : errors.hauteurVitrage ? 'border-red-200 bg-red-50/50' : 'border-gray-100 bg-gray-50 hover:border-emerald-200'}`}>
                                <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${sel ? 'text-emerald-600' : 'text-gray-400'}`} />
                                <span className="text-[11px] font-medium leading-tight">{h.label}</span>
                              </button>
                            );
                          })}
                        </div>
                        {errors.hauteurVitrage && <p className="flex items-center gap-1 mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3" /> {errors.hauteurVitrage}</p>}
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">État <span className="text-emerald-600">*</span></label>
                        <div className="space-y-1">
                          {ETATS_VITRAGE.map((et) => {
                            const Icon = et.icon;
                            const sel = formData.etatVitrage === et.id;
                            return (
                              <button type="button" key={et.id} onClick={() => handleEtatVitrageSelect(et.id)} aria-pressed={sel}
                                className={`flex flex-col w-full px-2 py-1.5 rounded-lg border text-left transition-all ${sel ? 'border-emerald-500 bg-emerald-50' : errors.etatVitrage ? 'border-red-200 bg-red-50/50' : 'border-gray-100 bg-gray-50 hover:border-emerald-200'}`}>
                                <div className="flex items-center gap-1.5">
                                  <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${sel ? 'text-emerald-600' : 'text-gray-400'}`} />
                                  <span className="text-[11px] font-medium">{et.label}</span>
                                </div>
                                <span className="text-[10px] text-gray-400 mt-0.5 leading-tight">{et.sublabel}</span>
                              </button>
                            );
                          })}
                        </div>
                        {errors.etatVitrage && <p className="flex items-center gap-1 mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3" /> {errors.etatVitrage}</p>}
                      </div>
                    </div>
                  )}

                  {/* Fréquence */}
                  {formData.secteur !== 'Festival/Événement' && formData.secteur !== 'Vitres' && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                        Fréquence <span className="text-emerald-600">*</span>
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {FREQUENCES.map((freq) => {
                          const Icon = freq.icon;
                          const sel = formData.frequence === freq.id;
                          return (
                            <button type="button" key={freq.id} onClick={() => handleFrequenceSelect(freq.id)}
                              className={`relative flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${sel ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : errors.frequence ? 'border-red-200 bg-red-50/50 text-gray-500' : 'border-gray-100 bg-gray-50 text-gray-500 hover:border-emerald-300 hover:bg-emerald-50/50'}`}>
                              {freq.id === 'Intervention Unique' && (
                                <span className="absolute -top-2 -right-1 bg-amber-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10">⚡</span>
                              )}
                              <Icon className={`w-4 h-4 flex-shrink-0 ${sel ? 'text-emerald-600' : 'text-gray-400'}`} />
                              <span className="text-xs font-medium">{freq.label}</span>
                            </button>
                          );
                        })}
                      </div>
                      {errors.frequence && <p className="flex items-center gap-1 mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3" /> {errors.frequence}</p>}
                    </div>
                  )}

                  {/* RGPD + Submit */}
                  <div className="flex items-center justify-between gap-4 pt-1 mt-auto">
                    <label className="flex items-center gap-2 cursor-pointer flex-1">
                      <input type="checkbox" id="rgpd" name="rgpd" checked={formData.rgpd} onChange={handleChange}
                        className="w-4 h-4 rounded text-emerald-600 border-gray-300 focus:ring-emerald-500 flex-shrink-0" />
                      <span className="text-xs text-gray-500">
                        J'accepte la{' '}
                        <a href="/politique-de-confidentialite" className="text-emerald-600 underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                          politique de confidentialité
                        </a>
                      </span>
                    </label>
                    <button type="submit" disabled={isSubmitting}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-bold text-sm bg-emerald-600 hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-500/25 transition-all disabled:opacity-70 shadow-lg shadow-emerald-600/25 flex-shrink-0 whitespace-nowrap">
                      {isSubmitting
                        ? <><Loader2 className="w-4 h-4 animate-spin" /> Envoi...</>
                        : <><span>Envoyer ma demande</span><ArrowRight className="w-4 h-4" /></>}
                    </button>
                  </div>
                  {errors.rgpd && <p className="flex items-center gap-1 -mt-2 text-xs text-red-500"><AlertCircle className="w-3 h-3" /> {errors.rgpd}</p>}

                </form>
              )}
            </div>
          </div>
        </div>

      </div>
    </>
  );
}
