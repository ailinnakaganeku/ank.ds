import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
  type SyntheticEvent,
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
  'aria-describedby'?: string;
}

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

  const hideRef = useRef(hide);
  useEffect(() => {
    hideRef.current = hide;
  });

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') hideRef.current();
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
    'aria-describedby': open ? tooltipId : triggerProps['aria-describedby'],
  } as TriggerProps);

  const showUnlessPrevented = (event: SyntheticEvent) => {
    if (!event.defaultPrevented) show();
  };

  const hideUnlessPrevented = (event: SyntheticEvent) => {
    if (!event.defaultPrevented) hide();
  };

  return (
    <span
      className="ank-tooltip-wrapper"
      onMouseEnter={showUnlessPrevented}
      onMouseLeave={hideUnlessPrevented}
      onFocus={showUnlessPrevented}
      onBlur={hideUnlessPrevented}
    >
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
