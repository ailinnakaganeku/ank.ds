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
import { useEscapeKey } from '../../hooks/useEscapeKey';
import './Tooltip.css';

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left';

export interface TooltipProps {
  content: ReactNode;
  side?: TooltipSide;
  delayMs?: number;
  className?: string;
  children: ReactElement<TriggerProps>;
}

interface TriggerProps {
  'aria-describedby'?: string;
}

export const Tooltip = ({
  content,
  side = 'top',
  delayMs = 200,
  className,
  children,
}: TooltipProps) => {
  const child = Children.only(children);
  if (!isValidElement(child)) {
    throw new Error('<Tooltip> requires a single React element child.');
  }
  const [open, setOpen] = useState(false);
  const tooltipId = useId();
  const timerRef = useRef<number | null>(null);

  const show = () => {
    if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    if (delayMs === 0) {
      setOpen(true);
      return;
    }
    timerRef.current = window.setTimeout(() => setOpen(true), delayMs);
  };

  const hide = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setOpen(false);
  };

  useEscapeKey(open, hide);

  useEffect(
    () => () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    },
    [],
  );

  const cloned = cloneElement(child, {
    'aria-describedby': open ? tooltipId : child.props['aria-describedby'],
  });

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
