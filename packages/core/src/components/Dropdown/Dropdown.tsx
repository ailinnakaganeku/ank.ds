import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type LiHTMLAttributes,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import { useControllableState } from '../../hooks/useControllableState';
import { useEscapeKey } from '../../hooks/useEscapeKey';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import { mergeRefs } from '../../utils/mergeRefs';
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
  const [open, setOpen] = useControllableState({
    value: openProp,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLUListElement | null>(null);
  const triggerId = useId();
  const menuId = useId();

  const toggle = useCallback(() => setOpen(!open), [open, setOpen]);

  useOutsideClick(open, [menuRef, triggerRef], () => setOpen(false));

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
      ref={mergeRefs(ref, ctx.triggerRef)}
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
  const { open, setOpen, menuRef, triggerRef } = ctx;

  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    if (!menu) return;
    const first = menu.querySelector<HTMLElement>(focusableItemSelector);
    first?.focus();
  }, [open, menuRef]);

  useEscapeKey(open, (event) => {
    event.preventDefault();
    setOpen(false);
    triggerRef.current?.focus();
  });

  const handleKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    const menu = ctx.menuRef.current;
    if (!menu) return;
    const items = Array.from(menu.querySelectorAll<HTMLElement>(focusableItemSelector));
    if (items.length === 0) return;
    const index = items.findIndex((item) => item === document.activeElement);

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

  const composedRef = useMemo(() => mergeRefs(ref, menuRef), [ref, menuRef]);

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

const Separator = forwardRef<HTMLLIElement, LiHTMLAttributes<HTMLLIElement>>(
  function DropdownSeparator({ className, ...rest }, ref) {
    return (
      <li
        ref={ref}
        role="separator"
        className={clsx('ank-dropdown__separator', className)}
        {...rest}
      />
    );
  },
);

export interface DropdownLabelProps extends LiHTMLAttributes<HTMLLIElement> {
  children: ReactNode;
}

const Label = forwardRef<HTMLLIElement, DropdownLabelProps>(function DropdownLabel(
  { className, children, ...rest },
  ref,
) {
  return (
    <li ref={ref} role="presentation" className={clsx('ank-dropdown__label', className)} {...rest}>
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
