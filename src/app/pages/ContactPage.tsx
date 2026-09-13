import { useState } from 'react';
import { EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF, ARIA_PHONE, ARIA_EMAIL } from '@/app/utils/constants';
import { SEO_Guardian } from '@/app/components/SEO_Guardian';
import { Phone, Mail, MapPin, Clock, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Link } from 'react-router';
import { IMAGES } from '@/app/utils/images';

export function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulation d'envoi (matching QuoteForm logic)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (error) {
      console.error('Erreur lors de l\'envoi du message', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEO_Guardian currentSection="contact" />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 to-green-700 text-white py-20 md:py-28 overflow-hidden">
        <img
          src={IMAGES.poigneeMainDevis}
          alt="Service client Nature Clean Marseille - Contact et communication pour nettoyage professionnel"
          width="1920"
          height="1080"
          // @ts-ignore — fetchpriority: attribut HTML valide, non typé en minuscules dans React 18
          fetchpriority="high"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay CLAIR */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/60 to-green-800/50"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <nav className="text-sm mb-6 opacity-90 drop-shadow-md">
            <Link to="/" className="hover:underline">Accueil</Link> &gt; <span>Contact</span>
          </nav>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Contactez-nous
          </h1>
          <p className="text-xl md:text-2xl drop-shadow-md">
            Nature Clean Marseille est à votre écoute pour tous vos besoins de nettoyage professionnel
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Informations de contact */}
              <div className="bg-white rounded-lg shadow-lg p-8 space-y-6">
                <h2 className="text-2xl font-bold text-green-700 mb-6">Nos coordonnées</h2>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Téléphone</h3>
                    <a href={PHONE_HREF} className="text-green-600 hover:text-green-700 text-lg font-semibold" aria-label={ARIA_PHONE}>
                      {PHONE_DISPLAY}
                    </a>
                    <p className="text-sm text-gray-600 mt-1">Disponible 7j/7</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a href={EMAIL_HREF} className="text-green-600 hover:text-green-700" aria-label={ARIA_EMAIL}>
                      {EMAIL}
                    </a>
                    <p className="text-sm text-gray-600 mt-1">Réponse sous 24h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Zone d'intervention</h3>
                    <p className="text-gray-700">Marseille et Bouches-du-Rhône</p>
                    <p className="text-sm text-gray-600 mt-1">13001 - 13016, Aubagne, Aix-en-Provence</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Horaires</h3>
                    <p className="text-gray-700">Lundi - Dimanche</p>
                    <p className="text-sm text-gray-600 mt-1">7h00 - 20h00</p>
                  </div>
                </div>
              </div>

              {/* Formulaire de contact rapide */}
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-green-700 mb-6">Envoyez-nous un message</h2>
                
                {isSubmitted ? (
                  <div className="text-center py-10 animate-in fade-in duration-500">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Message envoyé !</h3>
                    <p className="text-gray-600 mb-6">Merci pour votre message. Notre équipe vous répondra sous 24h.</p>
                    <Button 
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-green-600 text-green-700 hover:bg-green-50"
                    >
                      Envoyer un autre message
                    </Button>
                  </div>
                ) : (
                  <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Nom complet <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        placeholder="Votre nom"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        autoComplete="email"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        placeholder="votre@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Téléphone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        autoComplete="tel"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                        placeholder="06 12 34 56 78"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none"
                        placeholder="Décrivez votre besoin..."
                      />
                    </div>

                    {/* Consentement RGPD */}
                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="rgpd-contact"
                        name="rgpd"
                        required
                        className="w-4 h-4 mt-0.5 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 focus:ring-2 flex-shrink-0 cursor-pointer"
                      />
                      <label htmlFor="rgpd-contact" className="text-sm text-gray-600 cursor-pointer">
                        J'accepte que mes données soient utilisées pour traiter ma demande, conformément à la{' '}
                        <a href="/politique-de-confidentialite" className="text-green-600 underline underline-offset-2 hover:text-green-700 font-medium" target="_blank" rel="noopener noreferrer">
                          politique de confidentialité
                        </a>{' '}
                        de Nature Clean Marseille. <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-green-700 hover:bg-green-800 text-white py-3 shadow-md hover:shadow-lg transition-all"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        'Envoyer le message'
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Zones d'intervention détaillées */}
            <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">
                Nos zones d'intervention à Marseille
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  '13001', '13002', '13003', '13004', '13005', '13006', '13007', '13008',
                  '13009', '13010', '13011', '13012', '13013', '13014', '13015', '13016'
                ].map((code) => (
                  <div key={code} className="py-2 px-4 bg-green-50 rounded-lg text-green-700 font-semibold">
                    {code}
                  </div>
                ))}
              </div>
              <p className="text-center text-gray-600 mt-6">
                Également : <span className="font-semibold text-green-700">Aubagne</span>, <span className="font-semibold text-green-700">Aix-en-Provence</span>, <span className="font-semibold text-green-700">Alpes-Maritimes</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}