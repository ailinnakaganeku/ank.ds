import { forwardRef, useContext, useId, type TextareaHTMLAttributes } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { FieldContext } from '../FieldWrapper/FieldContext';
import '../Input/Input.css';
import './Textarea.css';

const textareaVariants = cva('ank-input ank-textarea', {
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

export type TextareaVariants = VariantProps<typeof textareaVariants>;

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>, TextareaVariants {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    size,
    state,
    fullWidth,
    invalid,
    id: idProp,
    className,
    rows = 4,
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
  const resolvedInvalid = invalid ?? field?.invalid ?? state === 'error';
  const resolvedState = state ?? (resolvedInvalid ? 'error' : 'default');
  const resolvedDisabled = disabled ?? field?.disabled;
  const ariaDescribedBy = describedByProp ?? field?.describedBy;
  const ariaInvalid = ariaInvalidProp ?? (resolvedInvalid || undefined);

  return (
    <textarea
      ref={ref}
      id={id}
      rows={rows}
      disabled={resolvedDisabled}
      aria-describedby={ariaDescribedBy}
      aria-invalid={ariaInvalid}
      className={clsx(textareaVariants({ size, state: resolvedState, fullWidth }), className)}
      {...rest}
    />
  );
});
