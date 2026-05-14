import { forwardRef, type HTMLAttributes } from 'react';
import clsx from 'clsx';
import './Spinner.css';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'ink' | 'primary' | 'secondary' | 'accent' | 'white';

export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'role'> {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  label?: string;
  showLabel?: boolean;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(function Spinner(
  {
    size = 'md',
    variant = 'ink',
    label = 'Loading',
    showLabel = false,
    className,
    ...rest
  },
  ref,
) {
  return (
    <span
      ref={ref}
      role="status"
      aria-live="polite"
      className={clsx(
        'ank-spinner',
        `ank-spinner--${size}`,
        `ank-spinner--${variant}`,
        className,
      )}
      {...rest}
    >
      <span className="ank-spinner__dots" aria-hidden>
        <span />
        <span />
        <span />
      </span>
      {showLabel ? (
        <span className="ank-spinner__label">{label}</span>
      ) : (
        <span className="ank-spinner__sr-only">{label}</span>
      )}
    </span>
  );
});
