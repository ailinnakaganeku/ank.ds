import { useEffect, type RefObject } from 'react';

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

let bodyLockCount = 0;
let savedBodyOverflow: string | null = null;

const acquireBodyLock = () => {
  if (bodyLockCount === 0) {
    savedBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  bodyLockCount += 1;
};

const releaseBodyLock = () => {
  bodyLockCount = Math.max(0, bodyLockCount - 1);
  if (bodyLockCount === 0 && savedBodyOverflow !== null) {
    document.body.style.overflow = savedBodyOverflow;
    savedBodyOverflow = null;
  }
};

export const __resetBodyLockForTests = () => {
  bodyLockCount = 0;
  savedBodyOverflow = null;
  document.body.style.overflow = '';
};

export interface UseFocusTrapOptions {
  active: boolean;
  containerRef: RefObject<HTMLElement>;
  initialFocus?: RefObject<HTMLElement>;
  onEscape?: () => void;
  lockScroll?: boolean;
}

export const useFocusTrap = ({
  active,
  containerRef,
  initialFocus,
  onEscape,
  lockScroll = true,
}: UseFocusTrapOptions) => {
  useEffect(() => {
    if (!active) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;

    if (lockScroll) {
      acquireBodyLock();
    }

    const rafId = requestAnimationFrame(() => {
      const node = containerRef.current;
      if (!node) return;
      const target = initialFocus?.current ?? getFocusableElements(node)[0] ?? node;
      target.focus();
    });

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && onEscape) {
        event.preventDefault();
        onEscape();
        return;
      }
      if (event.key !== 'Tab') return;

      const node = containerRef.current;
      if (!node) return;

      const focusable = getFocusableElements(node);
      if (focusable.length === 0) {
        event.preventDefault();
        node.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeEl = document.activeElement as HTMLElement | null;

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
        releaseBodyLock();
      }
      previouslyFocused?.focus?.();
    };
  }, [active, containerRef, initialFocus, onEscape, lockScroll]);
};
