import { forwardRef, useContext, useId, type InputHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { FieldContext } from '../FieldWrapper/FieldContext';
import './Input.css';

const inputVariants = cva('ank-input', {
  variants: {
    size: {
      sm: 'ank-input--sm',
      md: 'ank-input--md',
      lg: 'ank-input--lg',
    },
    state: {
      default: '',
      error: 'ank-input--error',
      success: 'ank-input--success',
    },
    fullWidth: {
      true: '',
      false: 'ank-input--auto',
    },
  },
  defaultVariants: {
    size: 'md',
    state: 'default',
    fullWidth: true,
  },
});

export type InputVariants = VariantProps<typeof inputVariants>;

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>,
    InputVariants {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size,
    state,
    fullWidth,
    invalid,
    id: idProp,
    className,
    type = 'text',
    disabled,
    'aria-describedby': describedByProp,
    'aria-invalid': ariaInvalidProp,
    ...rest
  },
  ref,
) {
  const field = useContext(FieldContext);
  const generatedId = useId();
  const id = idProp ?? field?.id ?? generatedId;
  const resolvedInvalid =
    invalid ?? field?.invalid ?? (state === 'error') ?? false;
  const resolvedState = state ?? (resolvedInvalid ? 'error' : 'default');
  const resolvedDisabled = disabled ?? field?.disabled;
  const ariaDescribedBy = describedByProp ?? field?.describedBy;
  const ariaInvalid = ariaInvalidProp ?? (resolvedInvalid || undefined);

  return (
    <input
      ref={ref}
      id={id}
      type={type}
      disabled={resolvedDisabled}
      aria-describedby={ariaDescribedBy}
      aria-invalid={ariaInvalid}
      className={clsx(
        inputVariants({ size, state: resolvedState, fullWidth }),
        className,
      )}
      {...rest}
    />
  );
});
