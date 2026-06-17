import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import './Accordion.css';

type AccordionType = 'single' | 'multiple';

interface AccordionContextValue {
  type: AccordionType;
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
  baseId: string;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordionContext = (component: string) => {
  const ctx = useContext(AccordionContext);
  if (!ctx) {
    throw new Error(`${component} must be rendered inside <Accordion>`);
  }
  return ctx;
};

interface ItemContextValue {
  value: string;
  triggerId: string;
  panelId: string;
}

const ItemContext = createContext<ItemContextValue | null>(null);

const useItemContext = (component: string) => {
  const ctx = useContext(ItemContext);
  if (!ctx) {
    throw new Error(`${component} must be rendered inside <Accordion.Item>`);
  }
  return ctx;
};

export interface AccordionProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange' | 'defaultValue'
> {
  type?: AccordionType;
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  collapsible?: boolean;
  children: ReactNode;
}

const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  {
    type = 'single',
    value,
    defaultValue,
    onChange,
    collapsible = true,
    className,
    children,
    ...rest
  },
  ref,
) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<string | string[]>(() => {
    if (defaultValue !== undefined) return defaultValue;
    return type === 'multiple' ? [] : '';
  });
  const baseId = useId();

  const current = isControlled ? value : internalValue;

  const update = useCallback(
    (next: string | string[]) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const isOpen = useCallback(
    (itemValue: string) => {
      if (type === 'multiple') return Array.isArray(current) && current.includes(itemValue);
      return current === itemValue;
    },
    [current, type],
  );

  const toggle = useCallback(
    (itemValue: string) => {
      if (type === 'multiple') {
        const list = Array.isArray(current) ? current : [];
        const next = list.includes(itemValue)
          ? list.filter((v) => v !== itemValue)
          : [...list, itemValue];
        update(next);
        return;
      }
      if (current === itemValue) {
        if (collapsible) update('');
      } else {
        update(itemValue);
      }
    },
    [current, type, collapsible, update],
  );

  const ctxValue = useMemo<AccordionContextValue>(
    () => ({ type, isOpen, toggle, baseId }),
    [type, isOpen, toggle, baseId],
  );

  return (
    <AccordionContext.Provider value={ctxValue}>
      <div ref={ref} className={clsx('ank-accordion', className)} {...rest}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
});

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
}

const Item = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { value, children, className, ...rest },
  ref,
) {
  const ctx = useAccordionContext('<Accordion.Item>');
  const triggerId = `${ctx.baseId}-trigger-${value}`;
  const panelId = `${ctx.baseId}-panel-${value}`;

  const itemValue = useMemo<ItemContextValue>(
    () => ({ value, triggerId, panelId }),
    [value, triggerId, panelId],
  );

  return (
    <ItemContext.Provider value={itemValue}>
      <div ref={ref} className={clsx('ank-accordion__item', className)} {...rest}>
        {children}
      </div>
    </ItemContext.Provider>
  );
});

export interface AccordionTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: ReactNode;
}

const Trigger = forwardRef<HTMLButtonElement, AccordionTriggerProps>(function AccordionTrigger(
  { level = 3, className, children, onClick, ...rest },
  ref,
) {
  const ctx = useAccordionContext('<Accordion.Trigger>');
  const item = useItemContext('<Accordion.Trigger>');
  const Heading = `h${level}` as 'h3';
  const expanded = ctx.isOpen(item.value);

  return (
    <Heading className="ank-accordion__heading">
      <button
        ref={ref}
        type="button"
        id={item.triggerId}
        aria-expanded={expanded}
        aria-controls={item.panelId}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) ctx.toggle(item.value);
        }}
        className={clsx('ank-accordion__trigger', className)}
        {...rest}
      >
        <span>{children}</span>
        <span className="ank-accordion__icon" aria-hidden>
          <span className="ank-accordion__icon-wrapper">
            <span className="ank-accordion__icon-line" />
            <span className="ank-accordion__icon-line ank-accordion__icon-line--vertical" />
          </span>
        </span>
      </button>
    </Heading>
  );
});

export interface AccordionPanelProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Panel = forwardRef<HTMLDivElement, AccordionPanelProps>(function AccordionPanel(
  { className, children, ...rest },
  ref,
) {
  const ctx = useAccordionContext('<Accordion.Panel>');
  const item = useItemContext('<Accordion.Panel>');
  const expanded = ctx.isOpen(item.value);

  return (
    <div
      ref={ref}
      role="region"
      id={item.panelId}
      aria-labelledby={item.triggerId}
      hidden={!expanded}
      className={clsx('ank-accordion__panel', className)}
      {...rest}
    >
      {children}
    </div>
  );
});

export const Accordion = Object.assign(AccordionRoot, { Item, Trigger, Panel });
