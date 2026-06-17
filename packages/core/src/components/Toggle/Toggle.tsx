import { forwardRef, useContext, useId, type InputHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import { FieldContext } from '../FieldWrapper/FieldContext';
import './Toggle.css';

export interface ToggleProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
}

export const Toggle = forwardRef<HTMLInputElement, ToggleProps>(function Toggle(
  { size = 'md', id: idProp, className, children, disabled, ...rest },
  ref,
) {
  const field = useContext(FieldContext);
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const resolvedDisabled = disabled ?? field?.disabled;

  return (
    <label
      htmlFor={id}
      className={clsx(
        'ank-toggle',
        size !== 'md' && `ank-toggle--${size}`,
        resolvedDisabled && 'ank-toggle--disabled',
        className,
      )}
    >
      <input
        ref={ref}
        id={id}
        type="checkbox"
        role="switch"
        className="ank-toggle__input"
        disabled={resolvedDisabled}
        {...rest}
      />
      <span className="ank-toggle__track" aria-hidden>
        <span className="ank-toggle__thumb" />
      </span>
      {children && <span className="ank-toggle__label">{children}</span>}
    </label>
  );
});
