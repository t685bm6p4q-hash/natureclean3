/**
 * InputOTP — implémentation native HTML
 * La dépendance "input-otp" a été supprimée (zéro import détecté dans le projet).
 * Ce composant propose un remplacement fonctionnel avec des <input> natifs,
 * compatible avec react-hook-form et les formulaires existants.
 */
import * as React from 'react';
import { MinusIcon } from 'lucide-react';
import { cn } from './utils';

// ─── Contexte interne ────────────────────────────────────────────────────────

interface OTPContextValue {
  slots: { char: string | null; isActive: boolean; hasFakeCaret: boolean }[];
}

const OTPInputContext = React.createContext<OTPContextValue>({ slots: [] });

// ─── InputOTP ────────────────────────────────────────────────────────────────

interface InputOTPProps extends React.ComponentProps<'input'> {
  maxLength?: number;
  containerClassName?: string;
  /** Appelé avec la valeur complète à chaque changement */
  onValueChange?: (value: string) => void;
}

function InputOTP({
  className,
  containerClassName,
  maxLength = 6,
  value,
  onChange,
  onValueChange,
  ...props
}: InputOTPProps) {
  const strValue = typeof value === 'string' ? value : '';

  const slots = Array.from({ length: maxLength }, (_, i) => ({
    char: strValue[i] ?? null,
    isActive: strValue.length === i,
    hasFakeCaret: strValue.length === i,
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value.replace(/\D/g, '').slice(0, maxLength);
    const synthetic = { ...e, target: { ...e.target, value: next } };
    onChange?.(synthetic as React.ChangeEvent<HTMLInputElement>);
    onValueChange?.(next);
  };

  return (
    <OTPInputContext.Provider value={{ slots }}>
      <div className={cn('relative flex items-center gap-2', containerClassName)}>
        {/* Input caché qui reçoit le focus et capture la saisie */}
        <input
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          autoComplete="one-time-code"
          maxLength={maxLength}
          value={strValue}
          onChange={handleChange}
          className={cn(
            'absolute inset-0 opacity-0 w-full h-full cursor-default z-10',
            'disabled:cursor-not-allowed',
            className,
          )}
          {...props}
        />
        {/* Affichage visuel des slots (rendu par InputOTPSlot) */}
        {props.children}
      </div>
    </OTPInputContext.Provider>
  );
}

// ─── InputOTPGroup ───────────────────────────────────────────────────────────

function InputOTPGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-otp-group"
      className={cn('flex items-center gap-1', className)}
      {...props}
    />
  );
}

// ─── InputOTPSlot ────────────────────────────────────────────────────────────

function InputOTPSlot({
  index,
  className,
  ...props
}: React.ComponentProps<'div'> & { index: number }) {
  const { slots } = React.useContext(OTPInputContext);
  const slot = slots[index] ?? { char: null, isActive: false, hasFakeCaret: false };

  return (
    <div
      data-slot="input-otp-slot"
      data-active={slot.isActive}
      className={cn(
        'data-[active=true]:border-ring data-[active=true]:ring-ring/50',
        'data-[active=true]:aria-invalid:ring-destructive/20',
        'dark:data-[active=true]:aria-invalid:ring-destructive/40',
        'aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive',
        'dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center',
        'border-y border-r text-sm bg-input-background transition-all outline-none',
        'first:rounded-l-md first:border-l last:rounded-r-md',
        'data-[active=true]:z-10 data-[active=true]:ring-[3px]',
        className,
      )}
      {...props}
    >
      {slot.char}
      {slot.hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

// ─── InputOTPSeparator ───────────────────────────────────────────────────────

function InputOTPSeparator({ ...props }: React.ComponentProps<'div'>) {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
