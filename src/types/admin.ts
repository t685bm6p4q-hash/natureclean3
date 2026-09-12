/**
 * Types pour le dashboard Admin Nature Clean
 * Utilisé dans AdminPilotagePage
 */

import type { LucideIcon } from 'lucide-react';

/** Soumission récente affichée dans le dashboard */
export interface RecentSubmission {
  id: number;
  name: string;
  service: string;
  date: string;
  status: string;
  city: string;
}

/** Stats complètes du dashboard */
export interface DashboardStats {
  total: number;
  today: number;
  thisWeek: number;
  thisMonth: number;
  byService: Record<string, number>;
  bySource: Record<string, number>;
  byCity: Record<string, number>;
  recentSubmissions: RecentSubmission[];
}

/** Props pour le composant StatCard */
export interface StatCardProps {
  title: string;
  value: string | number;
  trend?: string;
  icon: LucideIcon;
  color: string;
  subtitle?: string;
}

/** Props pour le composant LighthouseCircle */
export interface LighthouseCircleProps {
  score: number;
  label: string;
  color: string;
}

/** Signal de retargeting */
export interface RetargetingSignal {
  active: boolean;
  service: string;
  reason: string;
  potential: string;
  platform: string;
  visitors: number;
  conversions: number;
}

/** Lead dans le pipeline */
export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  service: string;
  status: 'Urgent' | 'Chaud' | 'En attente' | 'Traite';
  date: string;
  value: string;
  source: string;
}
