import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import { cn } from './utils';

interface AnimatedTabsProps {
  tabs: readonly string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  className?: string;
  /** ID stable pour l’animation du pill (plusieurs instances sur la page). */
  layoutId?: string;
  ariaLabel?: string;
  /** Onglets avec menu déroulant — affiche une flèche vers le bas. */
  dropdownTabs?: readonly string[];
  /** Indique si le menu déroulant de l’onglet est ouvert (rotation de la flèche). */
  isDropdownOpen?: (tab: string) => boolean;
}

export function AnimatedTabs({
  tabs,
  activeTab,
  onTabChange,
  className,
  layoutId = 'ncm-animated-tabs-pill',
  ariaLabel = 'Sections',
  dropdownTabs,
  isDropdownOpen,
}: AnimatedTabsProps) {
  const reduceMotion = useReducedMotion();
  const dropdownSet = dropdownTabs ? new Set(dropdownTabs) : null;

  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex max-w-full flex-wrap items-center gap-1 rounded-xl bg-gray-100/90 p-1',
        className,
      )}
    >
      {tabs.map((tab) => {
        const selected = activeTab === tab;
        const hasDropdown = dropdownSet?.has(tab) ?? false;
        const menuOpen = hasDropdown && (isDropdownOpen?.(tab) ?? false);

        return (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-haspopup={hasDropdown ? 'menu' : undefined}
            aria-expanded={hasDropdown ? menuOpen : undefined}
            onClick={() => onTabChange(tab)}
            className={cn(
              'relative z-10 inline-flex min-h-[48px] min-w-[48px] items-center justify-center rounded-lg px-3 py-2.5 text-[12px] font-medium whitespace-nowrap transition-colors xl:px-3.5 xl:text-sm',
              selected ? 'text-green-800' : 'text-gray-600 hover:text-green-700',
            )}
          >
            {selected &&
              (reduceMotion ? (
                <span
                  className="absolute inset-0 rounded-lg bg-white shadow-sm ring-1 ring-green-100"
                  aria-hidden="true"
                />
              ) : (
                <motion.span
                  layoutId={layoutId}
                  className="absolute inset-0 rounded-lg bg-white shadow-sm ring-1 ring-green-100"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  aria-hidden="true"
                />
              ))}
            <span className="relative inline-flex items-center gap-1">
              {tab}
              {hasDropdown && (
                <ChevronDown
                  className={cn(
                    'size-3.5 shrink-0 text-green-700/80 transition-transform duration-200',
                    menuOpen && 'rotate-180',
                  )}
                  aria-hidden="true"
                />
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
