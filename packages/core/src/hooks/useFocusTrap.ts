import { useEffect, type RefObject } from 'react';
import { lockBodyScroll, unlockBodyScroll } from '../utils/bodyScrollLock';
import { useLatestRef } from './useLatestRef';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

const isFocusable = (el: HTMLElement): boolean => {
  if (el.hasAttribute('aria-hidden')) return false;
  if (el.hidden) return false;
  if (typeof el.checkVisibility === 'function') {
    return el.checkVisibility({ checkOpacity: false, checkVisibilityCSS: true });
  }
  return true;
};

export const getFocusableElements = (root: HTMLElement): HTMLElement[] => {
  const nodes = root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
  return Array.from(nodes).filter(isFocusable);
};

const restoreFocus = (element: Element | null) => {
  if (element instanceof HTMLElement || element instanceof SVGElement) element.focus();
};

export interface UseFocusTrapOptions {
  active: boolean;
  containerRef: RefObject<HTMLElement>;
  onEscape?: () => void;
  lockScroll?: boolean;
}

export const useFocusTrap = ({
  active,
  containerRef,
  onEscape,
  lockScroll = true,
}: UseFocusTrapOptions) => {
  const latestOnEscape = useLatestRef(onEscape);

  useEffect(() => {
    if (!active) return;

    const previouslyFocused = document.activeElement;

    if (lockScroll) {
      lockBodyScroll();
    }

    const rafId = requestAnimationFrame(() => {
      const node = containerRef.current;
      if (!node) return;
      const target = getFocusableElements(node)[0] ?? node;
      target.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && latestOnEscape.current) {
        event.preventDefault();
        latestOnEscape.current();
        return;
      }
      if (event.key !== 'Tab') return;

      const node = containerRef.current;
      if (!node) return;

      const focusable = getFocusableElements(node);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        event.preventDefault();
        node.focus();
        return;
      }

      const activeEl = document.activeElement;

      if (event.shiftKey) {
        if (activeEl === first || !node.contains(activeEl)) {
          event.preventDefault();
          last.focus();
        }
      } else if (activeEl === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('keydown', handleKeyDown);
      if (lockScroll) {
        unlockBodyScroll();
      }
      restoreFocus(previouslyFocused);
    };
  }, [active, containerRef, latestOnEscape, lockScroll]);
};
