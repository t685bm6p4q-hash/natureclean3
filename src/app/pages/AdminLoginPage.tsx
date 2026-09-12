import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '@/app/contexts/AuthContext';
import { ShieldCheck, Smartphone, ArrowRight, Loader2, Lock } from 'lucide-react';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/app/components/ui/input-otp';

/**
 * PAGE DE LOGIN ADMIN - AUTHENTIFICATION 2FA
 * 
 * Flux :
 * 1. Admin clique sur "Recevoir code OTP"
 * 2. Code envoyé par WhatsApp
 * 3. Admin saisit le code à 6 chiffres
 * 4. Validation et redirection vers /admin/pilotage
 */

export function AdminLoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated, login, sendOTP, otpSent } = useAuth();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [devOtp, setDevOtp] = useState<string | undefined>();
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | undefined>();
  const [lockedUntil, setLockedUntil] = useState<number | undefined>();

  // Si déjà connecté, rediriger vers le dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/pilotage');
    }
  }, [isAuthenticated, navigate]);

  const handleSendOTP = async () => {
    setIsLoading(true);
    setError('');
    setDevOtp(undefined);

    const result = await sendOTP();

    if (result.success) {
      if (result.devOtp) setDevOtp(result.devOtp);
    } else {
      setError('Erreur lors de l\'envoi du code. Réessayez dans quelques minutes.');
    }

    setIsLoading(false);
  };

  const handleSubmit = async (value: string) => {
    if (value.length !== 6) return;

    setIsLoading(true);
    setError('');

    const result = await login(value);

    if (result.success) {
      navigate('/admin/pilotage');
    } else if (result.retryAfter) {
      const unlockTime = Date.now() + result.retryAfter * 1000;
      setLockedUntil(unlockTime);
      setError(`Trop de tentatives. Réessayez dans ${Math.ceil(result.retryAfter / 60)} min.`);
      setOtp('');
    } else {
      const remaining = result.attemptsRemaining;
      setAttemptsRemaining(remaining);
      setError(
        remaining !== undefined && remaining <= 2
          ? `Code incorrect. ${remaining} tentative${remaining > 1 ? 's' : ''} restante${remaining > 1 ? 's' : ''}.`
          : 'Code incorrect. Vérifiez votre WhatsApp.'
      );
      setOtp('');
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Card principale */}
        <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
          {/* Header avec dégradé */}
          <div className="bg-gradient-to-br from-green-600 to-green-700 p-8 text-white relative overflow-hidden">
            <div className="absolute -right-10 -top-10 w-40 h-40 bg-green-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-green-400/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck size={32} className="text-white" />
              </div>
              <h1 className="text-2xl font-black mb-2">
                Admin Dashboard
              </h1>
              <p className="text-green-100 text-sm font-medium">
                Nature Clean Marseille
              </p>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-8">
            {!otpSent ? (
              // Étape 1 : Demander l'envoi du code
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    Authentification sécurisée
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    Un code à 6 chiffres sera envoyé sur votre WhatsApp professionnel. 
                    Valide pendant <strong>5 minutes</strong>.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Smartphone size={20} className="text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-xs font-bold text-slate-900 mb-1">
                        WhatsApp Professionnel
                      </div>
                      <div className="text-xs text-slate-500">
                        +33 7 •• •• •• 04
                      </div>
                    </div>
                  </div>
                </div>

                {/* Affichage OTP dev uniquement si API sans WhatsApp */}
                {devOtp && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                    <p className="text-xs text-amber-700 font-medium">
                      Mode dev — WhatsApp non configuré
                    </p>
                    <p className="text-sm font-black text-amber-900 mt-1 tracking-widest">
                      {devOtp}
                    </p>
                  </div>
                )}

                <button
                  onClick={handleSendOTP}
                  disabled={isLoading}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-200 hover:shadow-xl disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Recevoir le code OTP
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>

                <div className="text-center">
                  <p className="text-xs text-slate-400">
                    🔒 Connexion sécurisée SSL/TLS
                  </p>
                </div>
              </div>
            ) : (
              // Étape 2 : Saisir le code OTP
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2">
                    Entrez le code reçu
                  </h2>
                  <p className="text-slate-500 text-sm">
                    Code envoyé sur votre WhatsApp. Vérifiez vos messages.
                  </p>
                </div>

                <div className="flex justify-center">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => {
                      setOtp(value);
                      if (value.length === 6) {
                        handleSubmit(value);
                      }
                    }}
                    disabled={isLoading}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
                    <div className="p-1 bg-red-100 rounded-lg">
                      <Lock size={16} className="text-red-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-bold text-red-900 mb-1">
                        Erreur d'authentification
                      </div>
                      <div className="text-xs text-red-600">
                        {error}
                      </div>
                    </div>
                  </div>
                )}

                {isLoading && (
                  <div className="text-center">
                    <Loader2 className="w-8 h-8 text-green-600 animate-spin mx-auto mb-2" />
                    <p className="text-sm text-slate-500 font-medium">
                      Vérification en cours...
                    </p>
                  </div>
                )}

                <button
                  onClick={() => {
                    setOtp('');
                    handleSendOTP();
                  }}
                  className="w-full py-3 text-slate-600 hover:text-slate-900 text-sm font-medium transition-colors"
                >
                  Renvoyer le code
                </button>

                {/* Affichage des tentatives restantes */}
                {attemptsRemaining !== undefined && attemptsRemaining <= 3 && !error.includes('min') && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-center">
                    <p className="text-xs text-amber-700">
                      ⚠️ {attemptsRemaining} tentative{attemptsRemaining > 1 ? 's' : ''} avant verrouillage
                    </p>
                  </div>
                )}

                <div className="text-center">
                  <p className="text-xs text-slate-400">
                    Code valide 5 minutes — vérifiez votre WhatsApp
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <a 
            href="/"
            className="text-sm text-slate-500 hover:text-green-600 transition-colors font-medium"
          >
            ← Retour au site
          </a>
        </div>
      </div>
    </div>
  );
}