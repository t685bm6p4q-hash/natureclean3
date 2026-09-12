import { MessageCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { WHATSAPP_URL, ARIA_WHATSAPP } from '@/app/utils/constants';

export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  // Delay apparition pour ne pas distraire au chargement
  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-0 group max-sm:bottom-20"
      aria-label={ARIA_WHATSAPP}
    >
      {/* Label qui apparait au hover desktop, toujours visible mobile */}
      <span className="bg-white text-gray-800 text-sm font-bold px-4 py-2.5 rounded-l-full shadow-lg border border-r-0 border-gray-200 hidden sm:group-hover:flex items-center transition-all">
        WhatsApp
      </span>
      <span className="sm:hidden bg-white text-gray-800 text-xs font-bold px-3 py-2 rounded-l-full shadow-lg border border-r-0 border-gray-200 flex items-center">
        Discuter
      </span>

      {/* Bouton rond */}
      <div className="relative">
        {/* Pulse — 3 pulsations puis stop, pas de GPU idle infini */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-20" style={{ animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) 3' }} />
        <div className="relative bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-3.5 sm:p-4 shadow-2xl transition-all duration-300 hover:scale-105">
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
      </div>
    </a>
  );
}