/**
 * Types pour les Services Nature Clean
 * Utilisé dans ServiceCarousel, Services, pages de détail
 */

import type { LucideIcon } from 'lucide-react';

/** Service affiché dans le carrousel et les cartes */
export interface ServiceCard {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  link: string;
}