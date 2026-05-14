import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import './Progress.css';

export type ProgressSize = 'sm' | 'md' | 'lg';
export type ProgressVariant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'error';

export interface ProgressProps extends Omit<HTMLAttributes<HTMLDivElement>, 'role'> {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  label?: ReactNode;
  showValue?: boolean;
  size?: ProgressSize;
  variant?: ProgressVariant;
}

const clamp = (n: number, min: number, max: number) => Math.min(Math.max(n, min), max);

export const Progress = forwardRef<HTMLDivElement, ProgressProps>(function Progress(
  {
    value = 0,
    max = 100,
    indeterminate = false,
    label,
    showValue = false,
    size = 'md',
    variant = 'primary',
    className,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledByProp,
    ...rest
  },
  ref,
) {
  const labelId = useId();
  const safeMax = max > 0 ? max : 100;
  const safeValue = clamp(value, 0, safeMax);
  const percent = (safeValue / safeMax) * 100;
  const labelledBy = label ? ariaLabelledByProp ?? labelId : ariaLabelledByProp;

  return (
    <div
      ref={ref}
      className={clsx(
        'ank-progress',
        `ank-progress--${size}`,
        `ank-progress--${variant}`,
        indeterminate && 'ank-progress--indeterminate',
        className,
      )}
      {...rest}
    >
      {(label || showValue) && (
        <div className="ank-progress__header">
          {label && (
            <span id={labelId} className="ank-progress__label">
              {label}
            </span>
          )}
          {showValue && !indeterminate && (
            <span className="ank-progress__value">
              {Math.round(percent)}%
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-label={!label && !ariaLabelledByProp ? ariaLabel ?? 'Progress' : undefined}
        aria-labelledby={labelledBy}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={indeterminate ? undefined : safeValue}
        className="ank-progress__track"
      >
        <div
          className="ank-progress__fill"
          style={indeterminate ? undefined : { width: `${percent}%` }}
        />
      </div>
    </div>
  );
});
