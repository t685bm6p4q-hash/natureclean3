import { useSearchParams } from 'react-router';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { QuoteExpressWizard } from '@/app/components/QuoteExpressWizard';
import { CheckCircle2, ShieldCheck, Phone, MessageCircle } from 'lucide-react';
import {
  PHONE_DISPLAY,
  PHONE_HREF,
  WHATSAPP_URL,
  ARIA_PHONE,
  ARIA_WHATSAPP,
} from '@/app/utils/constants';

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
  vitres: { label: 'Nettoyage de Vitres', subtitle: 'Vitrines, bureaux, façades — perche et eau déminéralisée.' },
  sols: { label: 'Remise en état sols', subtitle: 'Lustrage et nettoyage profond de vos sols.' },
};

export function QuotePage() {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get('service') ?? '';
  const ctxInfo: CtxInfo | null = PARAM_CONTEXT[serviceParam] ?? null;

  return (
    <>
      <SEO_Guardian currentSection="quote" />

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
                Devis express · 3 étapes
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
                  <span className="text-emerald-400">3 étapes.</span>
                </>
              )}
            </h1>

            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Besoin → lieu & volume → coordonnées. Notre équipe vous rappelle sous 24 h avec une proposition
              personnalisée.
            </p>

            <ol className="mt-8 space-y-3 text-sm text-white/70">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black flex items-center justify-center">
                  1
                </span>
                Type de prestation (cartes visuelles)
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black flex items-center justify-center">
                  2
                </span>
                Ville, surface et fréquence
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-black flex items-center justify-center">
                  3
                </span>
                Coordonnées + photo optionnelle
              </li>
            </ol>
          </div>

          <div className="relative z-10 flex items-center gap-2 text-white/30 text-xs">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500/60" />
            Gratuit · Sans engagement · RGPD
          </div>
        </div>

        <div className="flex-1 flex flex-col bg-white min-h-0 lg:overflow-y-auto">
          <div className="flex-shrink-0 px-5 sm:px-7 pt-6 pb-3 border-b border-gray-100">
            <h2 className="text-lg font-bold text-gray-900">Devis express en 3 étapes</h2>
            <p className="text-gray-400 text-xs mt-0.5">
              Estimation sous 24 h · Préférez le téléphone ? Utilisez les boutons ci-dessus.
            </p>
          </div>

          <div className="flex-1 px-5 sm:px-7 py-5 pb-28 lg:pb-8">
            <QuoteExpressWizard />
          </div>
        </div>
      </div>
    </>
  );
}
