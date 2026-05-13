import {
  forwardRef,
  useContext,
  useId,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import { FieldContext } from '../FieldWrapper/FieldContext';
import './Radio.css';

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
  size?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(function Radio(
  {
    size = 'md',
    id: idProp,
    className,
    children,
    disabled,
    ...rest
  },
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
        'ank-radio',
        size !== 'md' && `ank-radio--${size}`,
        resolvedDisabled && 'ank-radio--disabled',
        className,
      )}
    >
      <input
        ref={ref}
        id={id}
        type="radio"
        className="ank-radio__input"
        disabled={resolvedDisabled}
        {...rest}
      />
      <span className="ank-radio__box" aria-hidden>
        <span className="ank-radio__dot" />
      </span>
      {children && <span className="ank-radio__label">{children}</span>}
    </label>
  );
});
