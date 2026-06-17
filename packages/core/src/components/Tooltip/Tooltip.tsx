import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type FocusEventHandler,
  type MouseEventHandler,
  type ReactElement,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import './Tooltip.css';

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  content: ReactNode;
  side?: TooltipSide;
  delayMs?: number;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  children: ReactElement;
}

interface TriggerProps {
  onMouseEnter?: MouseEventHandler<Element>;
  onMouseLeave?: MouseEventHandler<Element>;
  onFocus?: FocusEventHandler<Element>;
  onBlur?: FocusEventHandler<Element>;
  'aria-describedby'?: string;
}

const compose =
  <E extends React.SyntheticEvent>(
    userHandler: ((event: E) => void) | undefined,
    ourHandler: (event: E) => void,
  ) =>
  (event: E) => {
    userHandler?.(event);
    if (!event.defaultPrevented) ourHandler(event);
  };

export const Tooltip = ({
  content,
  side = 'top',
  delayMs = 200,
  defaultOpen = false,
  open: openProp,
  onOpenChange,
  className,
  children,
}: TooltipProps) => {
  const child = Children.only(children);
  if (!isValidElement(child)) {
    throw new Error('<Tooltip> requires a single React element child.');
  }
  const isControlled = openProp !== undefined;
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const open = isControlled ? openProp : internalOpen;
  const tooltipId = useId();
  const timerRef = useRef<number | null>(null);

  const update = (next: boolean) => {
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  };

  const show = () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    if (delayMs === 0) {
      update(true);
      return;
    }
    timerRef.current = window.setTimeout(() => update(true), delayMs);
  };

  const hide = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    update(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') hide();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const triggerProps = child.props as TriggerProps;

  const cloned = cloneElement(child, {
    onMouseEnter: compose(triggerProps.onMouseEnter, show),
    onMouseLeave: compose(triggerProps.onMouseLeave, hide),
    onFocus: compose(triggerProps.onFocus, show),
    onBlur: compose(triggerProps.onBlur, hide),
    'aria-describedby': open ? tooltipId : triggerProps['aria-describedby'],
  } as TriggerProps);

  return (
    <span className="ank-tooltip-wrapper">
      {cloned}
      {open && (
        <span
          id={tooltipId}
          role="tooltip"
          data-side={side}
          className={clsx('ank-tooltip', className)}
        >
          {content}
        </span>
      )}
    </span>
  );
};
