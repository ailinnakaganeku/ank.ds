import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useMemo,
  useRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import { useControllableState } from '../../hooks/useControllableState';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { mergeRefs } from '../../utils/mergeRefs';
import './Popover.css';

export type PopoverSide = 'top' | 'right' | 'bottom' | 'left';
export type PopoverAlign = 'start' | 'center' | 'end';

interface PopoverContextValue {
  open: boolean;
  setOpen: (next: boolean) => void;
  toggle: () => void;
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>;
  contentRef: React.MutableRefObject<HTMLDivElement | null>;
  contentId: string;
  triggerId: string;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

const usePopoverContext = (component: string) => {
  const ctx = useContext(PopoverContext);
  if (!ctx) {
    throw new Error(`${component} must be rendered inside <Popover>`);
  }
  return ctx;
};

export interface PopoverProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

const PopoverRoot = forwardRef<HTMLDivElement, PopoverProps>(function Popover(
  { open: openProp, defaultOpen = false, onOpenChange, className, children, ...rest },
  ref,
) {
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const contentId = useId();
  const triggerId = useId();

  const toggle = useCallback(() => setOpen(!open), [open, setOpen]);

  useOutsideClick(open, [contentRef, triggerRef], () => setOpen(false));

  const value = useMemo<PopoverContextValue>(
    () => ({ open, setOpen, toggle, triggerRef, contentRef, contentId, triggerId }),
    [open, setOpen, toggle, contentId, triggerId],
  );

  return (
    <PopoverContext.Provider value={value}>
      <div ref={ref} className={clsx('ank-popover', className)} {...rest}>
        {children}
      </div>
    </PopoverContext.Provider>
  );
});

export interface PopoverTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Trigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(function PopoverTrigger(
  { children, className, onClick, ...rest },
  ref,
) {
  const ctx = usePopoverContext('<Popover.Trigger>');

  return (
    <button
      ref={mergeRefs(ref, ctx.triggerRef)}
      type="button"
      id={ctx.triggerId}
      aria-haspopup="dialog"
      aria-expanded={ctx.open}
      aria-controls={ctx.contentId}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) ctx.toggle();
      }}
      className={clsx('ank-popover__trigger', className)}
      {...rest}
    >
      {children}
    </button>
  );
});

export interface PopoverContentProps extends HTMLAttributes<HTMLDivElement> {
  side?: PopoverSide;
  align?: PopoverAlign;
  children: ReactNode;
}

const Content = forwardRef<HTMLDivElement, PopoverContentProps>(function PopoverContent(
  { side = 'bottom', align = 'start', className, children, ...rest },
  ref,
) {
  const ctx = usePopoverContext('<Popover.Content>');

  useFocusTrap({
    active: ctx.open,
    containerRef: ctx.contentRef,
    onEscape: () => ctx.setOpen(false),
    lockScroll: false,
  });

  if (!ctx.open) return null;

  return (
    <div
      ref={mergeRefs(ref, ctx.contentRef)}
      id={ctx.contentId}
      role="dialog"
      aria-labelledby={ctx.triggerId}
      data-side={side}
      data-align={align}
      tabIndex={-1}
      className={clsx('ank-popover__content', className)}
      {...rest}
    >
      {children}
    </div>
  );
});

export const Popover = Object.assign(PopoverRoot, { Trigger, Content });
