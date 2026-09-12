/**
 * 🎯 FOCUS TRAP - Accessibilité A11Y Elite
 * 
 * Piège le focus clavier dans un élément (menu, modal).
 * Requis pour Lighthouse 100/100 Accessibility.
 * 
 * Usage :
 * const trapRef = useFocusTrap(isOpen);
 * <div ref={trapRef}>...</div>
 */

import { useEffect, useRef } from 'react';

export function useFocusTrap(isActive: boolean) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isActive || !elementRef.current) return;

    const element = elementRef.current;
    
    // Récupère tous les éléments focusables
    const focusableSelector = 
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';
    
    const focusableElements = element.querySelectorAll(focusableSelector);
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Focus automatique sur le premier élément
    firstFocusable?.focus();

    // Gestion du Tab/Shift+Tab
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      // Shift + Tab depuis le premier → focus sur le dernier
      if (e.shiftKey && document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable?.focus();
      }
      // Tab depuis le dernier → focus sur le premier
      else if (!e.shiftKey && document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable?.focus();
      }
    };

    element.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      element.removeEventListener('keydown', handleKeyDown);
    };
  }, [isActive]);

  return elementRef;
}
