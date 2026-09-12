import { logger } from '@/utils/logger';
import { validateQuoteForm } from '@/utils/validation';
import { getPageJourney, formatJourneyForWhatsApp } from '@/app/hooks/usePageJourney';
import { PHONE_DISPLAY, PHONE_HREF } from '@/app/utils/constants';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Textarea } from '@/app/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Phone, CheckCircle2, Building2, Home, HardHat, User, Maximize2, Calendar, Loader2 } from 'lucide-react';
import type { QuoteFormData, ServiceType, SurfaceRange, FrequenceType, QuoteSubmissionPayload } from '@/types/quote';

/* ──────────────────────────────────────────────
   STEPPER ANIME — Indicateur de progression 3 etapes
   CSS pur (transition spring-like via cubic-bezier)
   ────────────────────────────────────────────── */
interface StepperProps {
  currentStep: number; // 0, 1, 2 (index)
  labels: string[];
}

function AnimatedStepper({ currentStep, labels }: StepperProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {labels.map((label, i) => {
        const isCompleted = i < currentStep;
        const isActive = i === currentStep;
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            {/* Cercle + label */}
            <div className="flex flex-col items-center relative z-10">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center shadow-sm"
                style={{
                  transform: isActive ? 'scale(1.15)' : 'scale(1)',
                  backgroundColor: isCompleted || isActive ? '#16a34a' : '#e5e7eb',
                  transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s ease-out',
                }}
              >
                {isCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : (
                  <span className={`text-sm font-bold ${isActive ? 'text-white' : 'text-gray-400'}`}>
                    {i + 1}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-1.5 font-semibold whitespace-nowrap ${
                isActive || isCompleted ? 'text-green-700' : 'text-gray-400'
              }`}>
                {label}
              </span>
            </div>

            {/* Barre de connexion */}
            {i < labels.length - 1 && (
              <div className="flex-1 h-1 mx-2 bg-gray-200 rounded-full overflow-hidden relative -mt-4">
                <div
                  className="absolute inset-y-0 left-0 bg-green-500 rounded-full"
                  style={{
                    width: isCompleted ? '100%' : '0%',
                    transition: 'width 0.4s ease-out',
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedService, setSelectedService] = useState<ServiceType | ''>('');
  const [selectedSurface, setSelectedSurface] = useState<SurfaceRange | ''>('');
  const [selectedFrequence, setSelectedFrequence] = useState<FrequenceType | ''>('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { register, handleSubmit, formState: { errors }, reset } = useForm<QuoteFormData>();
  const location = useLocation();

  const onSubmit = async (data: QuoteFormData) => {
    if (isSubmitting) return; // Anti double-clic
    
    // COUCHE 3 : Validation Zod paranoïaque (sanitize + validate)
    const validation = validateQuoteForm(data);
    if (!validation.success) {
      setValidationErrors(validation.errors || {});
      logger.warn('Validation Zod echouee', validation.errors as Record<string, unknown>);
      return;
    }
    setValidationErrors({});

    const sanitizedData = validation.data!;
    const fullData: QuoteSubmissionPayload = {
      ...data,
      nom: sanitizedData.nom,
      prenom: sanitizedData.prenom,
      email: sanitizedData.email,
      telephone: sanitizedData.telephone,
      codePostal: sanitizedData.codePostal,
      message: sanitizedData.message ?? '',
      typeNettoyage: selectedService,
      surface: selectedSurface,
      frequence: selectedFrequence,
      timestamp: new Date().toISOString(),
      source: 'Site web Nature Clean',
      sourcePage: location.pathname,
      referrer: document.referrer || 'Direct',
      journey: formatJourneyForWhatsApp(getPageJourney()),
    };
    
    logger.info('Formulaire devis soumis', fullData as unknown as Record<string, unknown>);
    
    // Tracking de conversion (si les scripts sont chargés)
    if (window.NatureCleanTracking) {
      window.NatureCleanTracking.trackConversion('Lead', 1);
      window.NatureCleanTracking.trackEvent('form_submit', {
        form_name: 'devis',
        service: selectedService,
        surface: selectedSurface
      });
    }
    
    // Envoyer l'alerte WhatsApp via Vercel Serverless Function
    setIsSubmitting(true);
    try {
      await fetch('/api/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fullData)
      });
    } catch (error) {
      logger.warn('Envoi devis echoue', { error });
    } finally {
      setIsSubmitting(false);
    }
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      reset();
      setSelectedService('');
      setSelectedSurface('');
      setSelectedFrequence('');
    }, 5000);
  };

  if (submitted) {
    return (
      <section id="devis" className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto text-center border-green-200">
            <CardContent className="pt-12 pb-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Demande envoyée avec succès !
              </h3>
              <p className="text-gray-700 mb-6">
                Merci pour votre demande de devis. Notre équipe vous contactera dans les plus brefs délais pour échanger sur vos besoins en nettoyage.
              </p>
              <p className="text-sm text-gray-600">
                Besoin d'une réponse urgente ? Appelez-nous au <a href={PHONE_HREF} className="font-semibold text-green-700 hover:text-green-800 underline">{PHONE_DISPLAY}</a>
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section id="devis" className="py-16 md:py-24 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900">
                Demandez Votre Devis Gratuit
              </CardTitle>
              <CardDescription className="text-lg mt-2">
                Remplissez ce formulaire et recevez une estimation personnalisée pour vos besoins de nettoyage à Marseille et sa région
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
                {/* Alerte Zod globale */}
                {Object.keys(validationErrors).length > 0 && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg" role="alert">
                    <p className="text-sm text-red-700 font-semibold mb-1">Certaines donnees n'ont pas passe la validation de securite :</p>
                    <ul className="list-disc list-inside text-sm text-red-600">
                      {Object.entries(validationErrors).map(([field, msg]) => (
                        <li key={field}>{msg}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Vos coordonnées */}
                <fieldset className="space-y-4 border-l-4 border-green-600 pl-6">
                  <legend className="text-xl font-semibold text-gray-900 mb-4">
                    Vos coordonnées
                  </legend>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nom" className="required">
                        Nom <span className="text-red-500" aria-hidden="true">*</span>
                      </Label>
                      <Input
                        id="nom"
                        type="text"
                        placeholder="Votre nom"
                        autoComplete="family-name"
                        {...register('nom', { required: 'Le nom est obligatoire' })}
                        aria-invalid={errors.nom ? 'true' : 'false'}
                        aria-describedby={errors.nom ? 'nom-error' : undefined}
                        className="border-gray-300 focus:border-green-600 focus:ring-green-600"
                      />
                      {errors.nom && (
                        <p id="nom-error" className="text-sm text-red-600" role="alert">
                          {errors.nom.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="prenom" className="required">
                        Prénom <span className="text-red-500" aria-hidden="true">*</span>
                      </Label>
                      <Input
                        id="prenom"
                        type="text"
                        placeholder="Votre prénom"
                        autoComplete="given-name"
                        {...register('prenom', { required: 'Le prénom est obligatoire' })}
                        aria-invalid={errors.prenom ? 'true' : 'false'}
                        aria-describedby={errors.prenom ? 'prenom-error' : undefined}
                        className="border-gray-300 focus:border-green-600 focus:ring-green-600"
                      />
                      {errors.prenom && (
                        <p id="prenom-error" className="text-sm text-red-600" role="alert">
                          {errors.prenom.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="required">
                      Email <span className="text-red-500" aria-hidden="true">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="votre.email@exemple.fr"
                      autoComplete="email"
                      {...register('email', {
                        required: 'L\'email est obligatoire',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Adresse email invalide'
                        }
                      })}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className="border-gray-300 focus:border-green-600 focus:ring-green-600"
                    />
                    {errors.email && (
                      <p id="email-error" className="text-sm text-red-600" role="alert">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="telephone" className="required">
                        Téléphone <span className="text-red-500" aria-hidden="true">*</span>
                      </Label>
                      <Input
                        id="telephone"
                        type="tel"
                        inputMode="tel"
                        placeholder="06 12 34 56 78"
                        autoComplete="tel"
                        enterKeyHint="next"
                        {...register('telephone', {
                          required: 'Le téléphone est obligatoire',
                          pattern: {
                            value: /^[0-9\s.+-]{10,}$/,
                            message: 'Numéro de téléphone invalide'
                          }
                        })}
                        aria-invalid={errors.telephone ? 'true' : 'false'}
                        aria-describedby={errors.telephone ? 'telephone-error' : undefined}
                        className="border-gray-300 focus:border-green-600 focus:ring-green-600"
                      />
                      {errors.telephone && (
                        <p id="telephone-error" className="text-sm text-red-600" role="alert">
                          {errors.telephone.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="codePostal" className="required">
                        Code Postal <span className="text-red-500" aria-hidden="true">*</span>
                      </Label>
                      <Input
                        id="codePostal"
                        type="text"
                        inputMode="numeric"
                        placeholder="13001"
                        autoComplete="postal-code"
                        enterKeyHint="done"
                        {...register('codePostal', {
                          required: 'Le code postal est obligatoire',
                          pattern: {
                            value: /^[0-9]{5}$/,
                            message: 'Code postal invalide (5 chiffres)'
                          }
                        })}
                        aria-invalid={errors.codePostal ? 'true' : 'false'}
                        aria-describedby={errors.codePostal ? 'codePostal-error' : undefined}
                        className="border-gray-300 focus:border-green-600 focus:ring-green-600"
                      />
                      {errors.codePostal && (
                        <p id="codePostal-error" className="text-sm text-red-600" role="alert">
                          {errors.codePostal.message}
                        </p>
                      )}
                    </div>
                  </div>
                </fieldset>

                {/* SIMULATEUR VISUEL - Étape par étape */}
                <fieldset className="space-y-6 bg-gradient-to-br from-green-50 to-white p-6 rounded-lg border-2 border-green-200">
                  <legend className="text-xl font-semibold text-gray-900 mb-2 px-2">
                    ✨ Simulateur de devis rapide
                  </legend>
                  <p className="text-sm text-gray-600 mb-6">
                    Sélectionnez vos besoins en 3 clics pour une estimation personnalisée
                  </p>

                  {/* Stepper anime */}
                  <AnimatedStepper
                    currentStep={
                      selectedFrequence ? 3 :
                      selectedSurface ? 2 :
                      selectedService ? 1 : 0
                    }
                    labels={['Secteur', 'Surface', 'Frequence']}
                  />

                  {/* Étape 1 : Type de service */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-7 h-7 bg-green-700 text-white rounded-full text-sm font-bold">1</span>
                      <Label className="text-base font-semibold text-gray-900">
                        Quel est votre secteur ? <span className="text-red-500">*</span>
                      </Label>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedService('bureaux')}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                          selectedService === 'bureaux'
                            ? 'border-green-600 bg-green-50 shadow-md'
                            : 'border-gray-300 bg-white hover:border-green-400 hover:bg-green-50'
                        }`}
                      >
                        <Building2 className={`w-8 h-8 ${selectedService === 'bureaux' ? 'text-green-600' : 'text-gray-600'}`} />
                        <span className="text-sm font-medium text-gray-900">Bureaux</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedService('coproprietes')}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                          selectedService === 'coproprietes'
                            ? 'border-green-600 bg-green-50 shadow-md'
                            : 'border-gray-300 bg-white hover:border-green-400 hover:bg-green-50'
                        }`}
                      >
                        <Home className={`w-8 h-8 ${selectedService === 'coproprietes' ? 'text-green-600' : 'text-gray-600'}`} />
                        <span className="text-sm font-medium text-gray-900">Copropriété</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedService('fin-chantier')}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                          selectedService === 'fin-chantier'
                            ? 'border-green-600 bg-green-50 shadow-md'
                            : 'border-gray-300 bg-white hover:border-green-400 hover:bg-green-50'
                        }`}
                      >
                        <HardHat className={`w-8 h-8 ${selectedService === 'fin-chantier' ? 'text-green-600' : 'text-gray-600'}`} />
                        <span className="text-sm font-medium text-gray-900">Chantier</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedService('particuliers')}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                          selectedService === 'particuliers'
                            ? 'border-green-600 bg-green-50 shadow-md'
                            : 'border-gray-300 bg-white hover:border-green-400 hover:bg-green-50'
                        }`}
                      >
                        <User className={`w-8 h-8 ${selectedService === 'particuliers' ? 'text-green-600' : 'text-gray-600'}`} />
                        <span className="text-sm font-medium text-gray-900">Particulier</span>
                      </button>
                    </div>
                  </div>

                  {/* Étape 2 : Surface */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-7 h-7 bg-green-700 text-white rounded-full text-sm font-bold">2</span>
                      <Label className="text-base font-semibold text-gray-900">
                        Quelle est la surface environ ?
                      </Label>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedSurface('moins-50')}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                          selectedSurface === 'moins-50'
                            ? 'border-green-600 bg-green-50 shadow-md'
                            : 'border-gray-300 bg-white hover:border-green-400 hover:bg-green-50'
                        }`}
                      >
                        <Maximize2 className={`w-6 h-6 ${selectedSurface === 'moins-50' ? 'text-green-600' : 'text-gray-600'}`} />
                        <span className="text-sm font-medium text-gray-900">- 50m²</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedSurface('50-100')}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                          selectedSurface === '50-100'
                            ? 'border-green-600 bg-green-50 shadow-md'
                            : 'border-gray-300 bg-white hover:border-green-400 hover:bg-green-50'
                        }`}
                      >
                        <Maximize2 className={`w-6 h-6 ${selectedSurface === '50-100' ? 'text-green-600' : 'text-gray-600'}`} />
                        <span className="text-sm font-medium text-gray-900">50-100m²</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedSurface('100-300')}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                          selectedSurface === '100-300'
                            ? 'border-green-600 bg-green-50 shadow-md'
                            : 'border-gray-300 bg-white hover:border-green-400 hover:bg-green-50'
                        }`}
                      >
                        <Maximize2 className={`w-6 h-6 ${selectedSurface === '100-300' ? 'text-green-600' : 'text-gray-600'}`} />
                        <span className="text-sm font-medium text-gray-900">100-300m²</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedSurface('plus-300')}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                          selectedSurface === 'plus-300'
                            ? 'border-green-600 bg-green-50 shadow-md'
                            : 'border-gray-300 bg-white hover:border-green-400 hover:bg-green-50'
                        }`}
                      >
                        <Maximize2 className={`w-6 h-6 ${selectedSurface === 'plus-300' ? 'text-green-600' : 'text-gray-600'}`} />
                        <span className="text-sm font-medium text-gray-900">300m²+</span>
                      </button>
                    </div>
                  </div>

                  {/* Étape 3 : Fréquence */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <span className="flex items-center justify-center w-7 h-7 bg-green-700 text-white rounded-full text-sm font-bold">3</span>
                      <Label className="text-base font-semibold text-gray-900">
                        Fréquence souhaitée ?
                      </Label>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      <button
                        type="button"
                        onClick={() => setSelectedFrequence('ponctuel')}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                          selectedFrequence === 'ponctuel'
                            ? 'border-green-600 bg-green-50 shadow-md'
                            : 'border-gray-300 bg-white hover:border-green-400 hover:bg-green-50'
                        }`}
                      >
                        <Calendar className={`w-6 h-6 ${selectedFrequence === 'ponctuel' ? 'text-green-600' : 'text-gray-600'}`} />
                        <span className="text-sm font-medium text-gray-900">Ponctuel</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedFrequence('hebdomadaire')}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                          selectedFrequence === 'hebdomadaire'
                            ? 'border-green-600 bg-green-50 shadow-md'
                            : 'border-gray-300 bg-white hover:border-green-400 hover:bg-green-50'
                        }`}
                      >
                        <Calendar className={`w-6 h-6 ${selectedFrequence === 'hebdomadaire' ? 'text-green-600' : 'text-gray-600'}`} />
                        <span className="text-sm font-medium text-gray-900">Hebdomadaire</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setSelectedFrequence('quotidien')}
                        className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                          selectedFrequence === 'quotidien'
                            ? 'border-green-600 bg-green-50 shadow-md'
                            : 'border-gray-300 bg-white hover:border-green-400 hover:bg-green-50'
                        }`}
                      >
                        <Calendar className={`w-6 h-6 ${selectedFrequence === 'quotidien' ? 'text-green-600' : 'text-gray-600'}`} />
                        <span className="text-sm font-medium text-gray-900">Quotidien</span>
                      </button>
                    </div>
                  </div>

                  {/* Récapitulatif visuel */}
                  {(selectedService || selectedSurface || selectedFrequence) && (
                    <div className="mt-6 p-4 bg-white rounded-lg border border-green-300 shadow-sm">
                      <p className="text-sm font-semibold text-gray-700 mb-2">📋 Votre sélection :</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedService && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            <CheckCircle2 className="w-3 h-3" />
                            {selectedService === 'bureaux' && 'Bureaux'}
                            {selectedService === 'coproprietes' && 'Copropriété'}
                            {selectedService === 'fin-chantier' && 'Chantier'}
                            {selectedService === 'particuliers' && 'Particulier'}
                          </span>
                        )}
                        {selectedSurface && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                            <CheckCircle2 className="w-3 h-3" />
                            {selectedSurface === 'moins-50' && '- 50m²'}
                            {selectedSurface === '50-100' && '50-100m²'}
                            {selectedSurface === '100-300' && '100-300m²'}
                            {selectedSurface === 'plus-300' && '300m²+'}
                          </span>
                        )}
                        {selectedFrequence && (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                            <CheckCircle2 className="w-3 h-3" />
                            {selectedFrequence === 'ponctuel' && 'Ponctuel'}
                            {selectedFrequence === 'hebdomadaire' && 'Hebdomadaire'}
                            {selectedFrequence === 'quotidien' && 'Quotidien'}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </fieldset>

                {/* Message optionnel */}
                <fieldset className="space-y-4 border-l-4 border-green-600 pl-6">
                  <legend className="text-lg font-semibold text-gray-900 mb-4">
                    Précisions complémentaires (optionnel)
                  </legend>

                  <div className="space-y-2">
                    <Label htmlFor="message">
                      Message / Détails supplémentaires
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Décrivez vos besoins spécifiques, la fréquence souhaitée, les horaires préférés..."
                      rows={4}
                      {...register('message')}
                      className="border-gray-300 focus:border-green-600 focus:ring-green-600"
                    />
                  </div>
                </fieldset>

                <div className="pt-4" role="status" aria-live="polite" aria-atomic="true">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        id="rgpd"
                        className="w-5 h-5 mt-0.5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 flex-shrink-0 cursor-pointer"
                        {...register('rgpd', { required: 'Vous devez accepter la politique de confidentialité' })}
                        aria-invalid={errors.rgpd ? 'true' : 'false'}
                        aria-describedby={errors.rgpd ? 'rgpd-error' : undefined}
                      />
                      <Label htmlFor="rgpd" className="text-sm text-gray-600 font-normal leading-relaxed cursor-pointer">
                        J'accepte que mes données soient traitées par Nature Clean Marseille pour répondre à ma demande de devis, conformément à la{' '}
                        <Link to="/politique-de-confidentialite" className="text-green-700 underline underline-offset-4 hover:text-green-800 font-medium" target="_blank">
                          politique de confidentialité
                        </Link>. <span className="text-red-500" aria-hidden="true">*</span>
                      </Label>
                    </div>
                    {errors.rgpd && (
                      <p id="rgpd-error" className="text-sm text-red-600" role="alert">
                        {errors.rgpd.message}
                      </p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-green-700 hover:bg-green-800 text-lg shadow-lg hover:shadow-xl transition-all"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" aria-hidden="true" />
                        Traitement en cours...
                      </>
                    ) : (
                      'Obtenir mon estimation gratuite →'
                    )}
                  </Button>
                  
                  {/* Urgence CTA */}
                  <div className="mt-6 p-4 bg-white rounded-lg border-2 border-green-300 shadow-sm text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Phone className="w-5 h-5 text-green-600" />
                      <p className="text-sm font-semibold text-gray-700">
                        Besoin d'une réponse urgente ?
                      </p>
                    </div>
                    <a 
                      href={PHONE_HREF} 
                      className="text-lg font-bold text-green-600 hover:text-green-700 transition-colors"
                    >
                      Appelez-nous au {PHONE_DISPLAY}
                    </a>
                    <p className="text-xs text-gray-500 mt-1">
                      Réponse garantie sous 24h ouvrées
                    </p>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}