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
  type KeyboardEvent,
  type LiHTMLAttributes,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import './Dropdown.css';

export type DropdownAlign = 'start' | 'end';

interface DropdownContextValue {
  open: boolean;
  setOpen: (next: boolean) => void;
  toggle: () => void;
  triggerRef: React.MutableRefObject<HTMLButtonElement | null>;
  menuRef: React.MutableRefObject<HTMLUListElement | null>;
  triggerId: string;
  menuId: string;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

const useDropdownContext = (component: string) => {
  const ctx = useContext(DropdownContext);
  if (!ctx) {
    throw new Error(`${component} must be rendered inside <Dropdown>`);
  }
  return ctx;
};

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

export interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
}

const DropdownRoot = forwardRef<HTMLDivElement, DropdownProps>(function Dropdown(
  { open: openProp, defaultOpen = false, onOpenChange, className, children, ...rest },
  ref,
) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = openProp !== undefined;
  const open = isControlled ? openProp : internalOpen;
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const triggerId = useId();
  const menuId = useId();

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
      if (menuRef.current?.contains(target)) return;
      if (triggerRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [open, setOpen]);

  const value = useMemo<DropdownContextValue>(
    () => ({ open, setOpen, toggle, triggerRef, menuRef, triggerId, menuId }),
    [open, setOpen, toggle, triggerId, menuId],
  );

  return (
    <DropdownContext.Provider value={value}>
      <div ref={ref} className={clsx('ank-dropdown', className)} {...rest}>
        {children}
      </div>
    </DropdownContext.Provider>
  );
});

export interface DropdownTriggerProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const Trigger = forwardRef<HTMLButtonElement, DropdownTriggerProps>(function DropdownTrigger(
  { children, className, onClick, onKeyDown, ...rest },
  ref,
) {
  const ctx = useDropdownContext('<Dropdown.Trigger>');

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    if (!ctx.open && (event.key === 'ArrowDown' || event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      ctx.setOpen(true);
    }
  };

  return (
    <button
      ref={(node) => setComposedRef(ref, ctx.triggerRef, node)}
      type="button"
      id={ctx.triggerId}
      aria-haspopup="menu"
      aria-expanded={ctx.open}
      aria-controls={ctx.menuId}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) ctx.toggle();
      }}
      onKeyDown={handleKeyDown}
      className={clsx('ank-dropdown__trigger', className)}
      {...rest}
    >
      {children}
    </button>
  );
});

export interface DropdownMenuProps extends HTMLAttributes<HTMLUListElement> {
  align?: DropdownAlign;
  children: ReactNode;
}

const focusableItemSelector = '[role="menuitem"]:not([aria-disabled="true"])';

const Menu = forwardRef<HTMLUListElement, DropdownMenuProps>(function DropdownMenu(
  { align = 'start', className, children, ...rest },
  ref,
) {
  const ctx = useDropdownContext('<Dropdown.Menu>');

  useEffect(() => {
    if (!ctx.open) return;
    const menu = ctx.menuRef.current;
    if (!menu) return;
    const first = menu.querySelector<HTMLElement>(focusableItemSelector);
    first?.focus();
  }, [ctx.open, ctx.menuRef]);

  useEffect(() => {
    if (!ctx.open) return;
    const handleKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        ctx.setOpen(false);
        ctx.triggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [ctx.open, ctx.setOpen, ctx.triggerRef]);

  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const menu = ctx.menuRef.current;
    if (!menu) return;
    const items = Array.from(menu.querySelectorAll<HTMLElement>(focusableItemSelector));
    if (items.length === 0) return;
    const active = document.activeElement as HTMLElement | null;
    const index = active ? items.indexOf(active) : -1;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      items[(index + 1 + items.length) % items.length].focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      items[(index - 1 + items.length) % items.length].focus();
    } else if (event.key === 'Home') {
      event.preventDefault();
      items[0].focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      items[items.length - 1].focus();
    } else if (event.key === 'Tab') {
      event.preventDefault();
      ctx.setOpen(false);
      ctx.triggerRef.current?.focus();
    }
  };

  const composedRef = useCallback(
    (node: HTMLUListElement | null) => setComposedRef(ref, ctx.menuRef, node),
    [ref, ctx.menuRef],
  );

  if (!ctx.open) return null;

  return (
    <ul
      ref={composedRef}
      role="menu"
      id={ctx.menuId}
      aria-labelledby={ctx.triggerId}
      aria-orientation="vertical"
      tabIndex={-1}
      data-align={align}
      onKeyDown={handleKeyDown}
      className={clsx('ank-dropdown__menu', className)}
      {...rest}
    >
      {children}
    </ul>
  );
});

export interface DropdownItemProps extends LiHTMLAttributes<HTMLLIElement> {
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  children: ReactNode;
}

const Item = forwardRef<HTMLLIElement, DropdownItemProps>(function DropdownItem(
  { onSelect, disabled, destructive, className, children, onClick, onKeyDown, ...rest },
  ref,
) {
  const ctx = useDropdownContext('<Dropdown.Item>');

  const select = () => {
    if (disabled) return;
    onSelect?.();
    ctx.setOpen(false);
    ctx.triggerRef.current?.focus();
  };

  return (
    <li
      ref={ref}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) select();
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (event.defaultPrevented) return;
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          select();
        }
      }}
      className={clsx(
        'ank-dropdown__item',
        destructive && 'ank-dropdown__item--destructive',
        className,
      )}
      {...rest}
    >
      {children}
    </li>
  );
});

const Separator = forwardRef<HTMLLIElement, LiHTMLAttributes<HTMLLIElement>>(function DropdownSeparator(
  { className, ...rest },
  ref,
) {
  return (
    <li
      ref={ref}
      role="separator"
      className={clsx('ank-dropdown__separator', className)}
      {...rest}
    />
  );
});

export interface DropdownLabelProps extends LiHTMLAttributes<HTMLLIElement> {
  children: ReactNode;
}

const Label = forwardRef<HTMLLIElement, DropdownLabelProps>(function DropdownLabel(
  { className, children, ...rest },
  ref,
) {
  return (
    <li
      ref={ref}
      role="presentation"
      className={clsx('ank-dropdown__label', className)}
      {...rest}
    >
      {children}
    </li>
  );
});

export const Dropdown = Object.assign(DropdownRoot, {
  Trigger,
  Menu,
  Item,
  Separator,
  Label,
});
