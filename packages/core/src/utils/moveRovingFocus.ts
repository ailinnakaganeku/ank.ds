import type { KeyboardEvent } from 'react';

export type Orientation = 'horizontal' | 'vertical';

const ARROWS = {
  horizontal: { next: 'ArrowRight', previous: 'ArrowLeft' },
  vertical: { next: 'ArrowDown', previous: 'ArrowUp' },
} as const satisfies Record<Orientation, { next: string; previous: string }>;

// https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex
export const moveRovingFocus = <T extends HTMLElement>(
  event: KeyboardEvent,
  items: T[],
  orientation: Orientation,
): T | undefined => {
  if (items.length === 0) return undefined;

  const current = items.findIndex((item) => item === document.activeElement);
  const last = items.length - 1;
  const { next, previous } = ARROWS[orientation];

  let index: number;
  if (event.key === next) index = current === last ? 0 : current + 1;
  else if (event.key === previous) index = current <= 0 ? last : current - 1;
  else if (event.key === 'Home') index = 0;
  else if (event.key === 'End') index = last;
  else return undefined;

  event.preventDefault();
  const target = items[index];
  target.focus();
  return target;
};
