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
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, InputVariants {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size,
    state,
    fullWidth,
    id: idProp,
    className,
    type = 'text',
    disabled,
    'aria-describedby': describedByProp,
    ...rest
  },
  ref,
) {
  const field = useContext(FieldContext);
  const generatedId = useId();
  const id = idProp ?? field?.id ?? generatedId;
  const resolvedState = state ?? (field?.invalid ? 'error' : 'default');
  const resolvedDisabled = disabled ?? field?.disabled;
  const ariaDescribedBy = describedByProp ?? field?.describedBy;

  return (
    <input
      ref={ref}
      id={id}
      type={type}
      disabled={resolvedDisabled}
      aria-describedby={ariaDescribedBy}
      aria-invalid={resolvedState === 'error' || undefined}
      className={clsx(inputVariants({ size, state: resolvedState, fullWidth }), className)}
      {...rest}
    />
  );
});
