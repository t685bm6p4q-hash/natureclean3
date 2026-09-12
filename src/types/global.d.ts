/**
 * Types TypeScript globaux pour Nature Clean Marseille
 * Zero-Any Policy : tous les types sont explicites
 */

/** Paramètres d'événement tracking */
type TrackingParams = Record<string, string | number | boolean>;

/** Arguments gtag() - cf. Google Analytics 4 API */
type GtagCommand = 'config' | 'event' | 'js' | 'set' | 'consent';

/** Arguments fbq() - cf. Facebook Pixel API */
type FbqCommand = 'init' | 'track' | 'trackCustom' | 'trackSingle' | 'trackSingleCustom';

interface NatureCleanTracking {
  trackEvent: (eventName: string, params?: TrackingParams) => void;
  trackConversion: (conversionType: string, value: number) => void;
}

/** Événement dataLayer (Google Tag Manager) */
interface DataLayerEvent {
  event?: string;
  [key: string]: string | number | boolean | undefined;
}

interface Window {
  NatureCleanTracking?: NatureCleanTracking;
  dataLayer?: DataLayerEvent[];
  gtag?: (command: GtagCommand, ...args: (string | TrackingParams | Date)[]) => void;
  fbq?: (command: FbqCommand, ...args: (string | TrackingParams)[]) => void;
  _fbq?: typeof Window.prototype.fbq;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.webp' {
  const value: string;
  export default value;
}

declare module '*.svg' {
  const value: string;
  export default value;
}
