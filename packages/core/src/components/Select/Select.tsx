import { forwardRef, useContext, useId, type SelectHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import { FieldContext } from '../FieldWrapper/FieldContext';
import '../Input/Input.css';
import './Select.css';
import { CaretDownIcon } from '../Icon';

const selectVariants = cva('ank-input ank-select', {
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

export type SelectVariants = VariantProps<typeof selectVariants>;

export interface SelectProps
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>, SelectVariants {
  invalid?: boolean;
  children?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  {
    size = 'md',
    state,
    fullWidth = true,
    invalid,
    id: idProp,
    className,
    disabled,
    children,
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
    <span
      className={clsx(
        'ank-select-wrapper',
        size !== 'md' && `ank-select-wrapper--${size}`,
        fullWidth === false && 'ank-input--auto',
        className,
      )}
    >
      <select
        ref={ref}
        id={id}
        disabled={resolvedDisabled}
        aria-describedby={ariaDescribedBy}
        aria-invalid={ariaInvalid}
        className={selectVariants({ size, state: resolvedState, fullWidth })}
        {...rest}
      >
        {children}
      </select>
      <span className="ank-select-wrapper__arrow">
        <CaretDownIcon />
      </span>
    </span>
  );
});
