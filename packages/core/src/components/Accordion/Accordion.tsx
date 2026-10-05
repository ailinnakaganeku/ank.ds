import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useMemo,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import './Accordion.css';

interface ItemContextValue {
  open: boolean;
  toggle: () => void;
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

export interface AccordionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const AccordionRoot = forwardRef<HTMLDivElement, AccordionProps>(function Accordion(
  { className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={clsx('ank-accordion', className)} {...rest}>
      {children}
    </div>
  );
});

export interface AccordionItemProps extends HTMLAttributes<HTMLDivElement> {
  defaultOpen?: boolean;
  children: ReactNode;
}

const Item = forwardRef<HTMLDivElement, AccordionItemProps>(function AccordionItem(
  { defaultOpen = false, children, className, ...rest },
  ref,
) {
  const [open, setOpen] = useState(defaultOpen);
  const id = useId();

  const item = useMemo<ItemContextValue>(
    () => ({
      open,
      toggle: () => setOpen((current) => !current),
      triggerId: `${id}-trigger`,
      panelId: `${id}-panel`,
    }),
    [open, id],
  );

  return (
    <ItemContext.Provider value={item}>
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
  const item = useItemContext('<Accordion.Trigger>');
  const Heading = `h${level}` as const;

  return (
    <Heading className="ank-accordion__heading">
      <button
        ref={ref}
        type="button"
        id={item.triggerId}
        aria-expanded={item.open}
        aria-controls={item.panelId}
        onClick={(event) => {
          onClick?.(event);
          if (!event.defaultPrevented) item.toggle();
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
  const item = useItemContext('<Accordion.Panel>');

  return (
    <div
      ref={ref}
      role="region"
      id={item.panelId}
      aria-labelledby={item.triggerId}
      hidden={!item.open}
      className={clsx('ank-accordion__panel', className)}
      {...rest}
    >
      {children}
    </div>
  );
});

export const Accordion = Object.assign(AccordionRoot, { Item, Trigger, Panel });
