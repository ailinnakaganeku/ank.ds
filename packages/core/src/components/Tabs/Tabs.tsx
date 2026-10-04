import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useMemo,
  useRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import { useControllableState } from '../../hooks/useControllableState';
import { mergeRefs } from '../../utils/mergeRefs';
import './Tabs.css';

export type ActivationMode = 'automatic' | 'manual';

interface TabsContextValue {
  value: string;
  setValue: (next: string) => void;
  baseId: string;
  activationMode: ActivationMode;
}

const TabsContext = createContext<TabsContextValue | null>(null);

const useTabsContext = (component: string) => {
  const ctx = useContext(TabsContext);
  if (!ctx) {
    throw new Error(`${component} must be rendered inside <Tabs>`);
  }
  return ctx;
};

type TabsSelection =
  | { value: string; defaultValue?: undefined }
  | { value?: undefined; defaultValue: string };

export type TabsProps = Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> &
  TabsSelection & {
    onChange?: (value: string) => void;
    activationMode?: ActivationMode;
    children: ReactNode;
  };

const TabsRoot = forwardRef<HTMLDivElement, TabsProps>(function Tabs(
  { value, defaultValue, onChange, activationMode = 'automatic', className, children, ...rest },
  ref,
) {
  const [current, setValue] = useControllableState({
    value,
    defaultValue: defaultValue ?? '',
    onChange,
  });
  const baseId = useId();

  const contextValue = useMemo<TabsContextValue>(
    () => ({ value: current, setValue, baseId, activationMode }),
    [current, setValue, baseId, activationMode],
  );

  return (
    <TabsContext.Provider value={contextValue}>
      <div ref={ref} className={clsx('ank-tabs', className)} {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  );
});

export interface TabsListProps extends HTMLAttributes<HTMLDivElement> {
  'aria-label'?: string;
}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(function TabsList(
  { className, children, onKeyDown, ...rest },
  ref,
) {
  const ctx = useTabsContext('<Tabs.List>');
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;

    const list = listRef.current;
    if (!list) return;

    const tabs = Array.from(
      list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
    );
    if (tabs.length === 0) return;

    const active = document.activeElement;
    const activeButton = active instanceof HTMLButtonElement ? active : null;
    const index = activeButton ? tabs.indexOf(activeButton) : -1;
    if (index === -1) return;

    let next: number;
    switch (event.key) {
      case 'ArrowRight':
        next = (index + 1) % tabs.length;
        break;
      case 'ArrowLeft':
        next = (index - 1 + tabs.length) % tabs.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = tabs.length - 1;
        break;
      default:
        return;
    }

    event.preventDefault();
    const target = tabs[next];
    target.focus();

    if (ctx.activationMode === 'automatic') {
      const value = target.dataset.value;
      if (value) ctx.setValue(value);
    }
  };

  return (
    <div
      ref={mergeRefs(ref, listRef)}
      role="tablist"
      onKeyDown={handleKeyDown}
      className={clsx('ank-tabs__list', className)}
      {...rest}
    >
      {children}
    </div>
  );
});

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  children: ReactNode;
}

const Tab = forwardRef<HTMLButtonElement, TabProps>(function Tab(
  { value, children, className, disabled, onClick, ...rest },
  ref,
) {
  const ctx = useTabsContext('<Tabs.Tab>');
  const selected = ctx.value === value;
  const tabId = `${ctx.baseId}-tab-${value}`;
  const panelId = `${ctx.baseId}-panel-${value}`;

  return (
    <button
      ref={ref}
      type="button"
      role="tab"
      id={tabId}
      data-value={value}
      aria-selected={selected}
      aria-controls={panelId}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !disabled) {
          ctx.setValue(value);
        }
      }}
      className={clsx('ank-tab', className)}
      {...rest}
    >
      {children}
    </button>
  );
});

export interface TabsPanelProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  children: ReactNode;
}

const Panel = forwardRef<HTMLDivElement, TabsPanelProps>(function TabsPanel(
  { value, children, className, ...rest },
  ref,
) {
  const ctx = useTabsContext('<Tabs.Panel>');
  if (ctx.value !== value) return null;

  const tabId = `${ctx.baseId}-tab-${value}`;
  const panelId = `${ctx.baseId}-panel-${value}`;

  return (
    <div
      ref={ref}
      role="tabpanel"
      id={panelId}
      aria-labelledby={tabId}
      tabIndex={0}
      className={clsx('ank-tabs__panel', className)}
      {...rest}
    >
      {children}
    </div>
  );
});

export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Tab,
  Panel,
});
