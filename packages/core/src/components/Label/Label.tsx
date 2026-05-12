import { forwardRef, type LabelHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import './Label.css';

export interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  disabled?: boolean;
  children?: ReactNode;
}

export const Label = forwardRef<HTMLLabelElement, LabelProps>(function Label(
  { required, disabled, className, children, ...rest },
  ref,
) {
  return (
    <label
      ref={ref}
      className={clsx('ank-label', disabled && 'ank-label--disabled', className)}
      {...rest}
    >
      {children}
      {required && (
        <span aria-hidden className="ank-label__required">
          *
        </span>
      )}
    </label>
  );
});
