import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import { useFocusTrap } from '../../hooks/useFocusTrap';
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
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internalOpen;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const contentId = useId();
  const triggerId = useId();

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const toggle = useCallback(() => setOpen(!open), [open, setOpen]);

  useEffect(() => {
    if (!open) return;
    const handleMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!target) return;
      if (contentRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [open, setOpen]);

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

const setComposedRef = <T,>(
  externalRef: React.Ref<T> | undefined,
  internalRef: React.MutableRefObject<T | null>,
  node: T | null,
) => {
  internalRef.current = node;
  if (typeof externalRef === 'function') externalRef(node);
  else if (externalRef && 'current' in externalRef) {
    (externalRef as React.MutableRefObject<T | null>).current = node;
  }
};

const Trigger = forwardRef<HTMLButtonElement, PopoverTriggerProps>(function PopoverTrigger(
  { children, className, onClick, ...rest },
  ref,
) {
  const ctx = usePopoverContext('<Popover.Trigger>');

  return (
    <button
      ref={(node) => setComposedRef(ref, ctx.triggerRef, node)}
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
      ref={(node) => setComposedRef(ref, ctx.contentRef, node)}
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
