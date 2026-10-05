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
  extends TextareaHTMLAttributes<HTMLTextAreaElement>, TextareaVariants {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  {
    size,
    state,
    fullWidth,
    id: idProp,
    className,
    rows = 4,
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
    <textarea
      ref={ref}
      id={id}
      rows={rows}
      disabled={resolvedDisabled}
      aria-describedby={ariaDescribedBy}
      aria-invalid={resolvedState === 'error' || undefined}
      className={clsx(textareaVariants({ size, state: resolvedState, fullWidth }), className)}
      {...rest}
    />
  );
});
