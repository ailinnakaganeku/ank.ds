import {
  forwardRef,
  useContext,
  useEffect,
  useId,
  useRef,
  type InputHTMLAttributes,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import { mergeRefs } from '../../utils/mergeRefs';
import { FieldContext } from '../FieldWrapper/FieldContext';
import './Checkbox.css';

export interface CheckboxProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size' | 'type'
> {
  size?: 'sm' | 'md' | 'lg';
  indeterminate?: boolean;
  children?: ReactNode;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(function Checkbox(
  { size = 'md', indeterminate = false, id: idProp, className, children, disabled, ...rest },
  forwardedRef,
) {
  const field = useContext(FieldContext);
  const generatedId = useId();
  const id = idProp ?? generatedId;
  const resolvedDisabled = disabled ?? field?.disabled;
  const innerRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (innerRef.current) {
      innerRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <label
      htmlFor={id}
      className={clsx(
        'ank-checkbox',
        size !== 'md' && `ank-checkbox--${size}`,
        resolvedDisabled && 'ank-checkbox--disabled',
        className,
      )}
    >
      <input
        ref={mergeRefs(forwardedRef, innerRef)}
        id={id}
        type="checkbox"
        className="ank-checkbox__input"
        disabled={resolvedDisabled}
        {...rest}
      />
      <span className="ank-checkbox__box" aria-hidden>
        <svg className="ank-checkbox__check" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 7l3 3 7-7"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
        <svg className="ank-checkbox__dash" viewBox="0 0 14 14" fill="none">
          <path d="M2 7h10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" />
        </svg>
      </span>
      {children && <span className="ank-checkbox__label">{children}</span>}
    </label>
  );
});
