import { useEffect, useRef, useState } from 'react';
import { Turnstile } from '@marsidev/react-turnstile';

/** Clé publique Turnstile, exposée au navigateur via Vite. */
export const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY ?? '';

type WidgetSize = 'normal' | 'compact';

type TurnstileFieldProps = {
  /** Reçoit le jeton, ou une chaîne vide s'il expire ou échoue. */
  onToken: (token: string) => void;
  /** Incrémenter pour forcer un nouveau défi (jeton à usage unique). */
  resetKey?: number;
};

/**
 * Widget Cloudflare Turnstile.
 * Le format normal exige 300 px de large. En dessous, on passe en compact
 * sans transformation CSS : un scale ou un overflow caché empêche l'iframe de s'afficher.
 */
export function TurnstileField({ onToken, resetKey = 0 }: TurnstileFieldProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<WidgetSize | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;

    const apply = () => {
      const available = el.clientWidth;
      if (!available) return;
      const next: WidgetSize = available < 300 ? 'compact' : 'normal';
      setSize((current) => (current === next ? current : next));
    };

    apply();
    const observer = new ResizeObserver(apply);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!TURNSTILE_SITE_KEY) {
    if (import.meta.env.DEV) {
      return (
        <p
          className="text-xs text-amber-800 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2"
          role="status"
        >
          Anti-robot inactif : ajoutez VITE_TURNSTILE_SITE_KEY dans .env.local, puis redémarrez Vite.
        </p>
      );
    }
    return null;
  }

  return (
    <div ref={wrapRef} className="w-full min-w-0 min-h-[65px]">
      {size && (
        <Turnstile
          key={`${resetKey}-${size}`}
          siteKey={TURNSTILE_SITE_KEY}
          options={{
            theme: 'light',
            size,
            language: 'fr',
            appearance: 'always',
          }}
          onSuccess={(token) => {
            setErrorCode(null);
            onToken(token);
          }}
          onExpire={() => onToken('')}
          onError={(code) => {
            onToken('');
            setErrorCode(String(code ?? ''));
          }}
        />
      )}
      {errorCode && (
        <p className="mt-2 text-xs text-red-600" role="alert">
          {errorCode === '400020' || errorCode === '110100' || errorCode === '110110'
            ? 'Cloudflare refuse la Site Key. Copiez à nouveau la clé publique du widget (pas la Secret Key) dans .env.local, puis redémarrez Vite.'
            : errorCode === '110200'
              ? 'Ce domaine n’est pas autorisé. Ajoutez localhost et natureclean.fr dans Cloudflare Turnstile, puis rechargez.'
              : 'Le contrôle anti-robot ne s’affiche pas. Rechargez la page.'}
        </p>
      )}
    </div>
  );
}
