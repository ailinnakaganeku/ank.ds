import { useId, type ReactNode } from 'react';
import clsx from 'clsx';
import { Label } from '../Label';
import { FieldContext } from './FieldContext';
import './FieldWrapper.css';

export interface FieldWrapperProps {
  label: ReactNode;
  children: ReactNode;
  helper?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  className?: string;
}

export const FieldWrapper = ({
  label,
  children,
  helper,
  error,
  required,
  disabled,
  id: providedId,
  className,
}: FieldWrapperProps) => {
  const generatedId = useId();
  const id = providedId ?? generatedId;
  const helperId = `${id}-helper`;
  const errorId = `${id}-error`;
  const invalid = Boolean(error);
  const describedBy = error ? errorId : helper ? helperId : undefined;

  return (
    <FieldContext.Provider value={{ id, invalid, describedBy, disabled }}>
      <div className={clsx('ank-field', className)}>
        <Label htmlFor={id} required={required} disabled={disabled}>
          {label}
        </Label>
        {children}
        {error && (
          <div id={errorId} className="ank-field__error" role="alert">
            {error}
          </div>
        )}
        {!error && helper && (
          <div id={helperId} className="ank-field__helper">
            {helper}
          </div>
        )}
      </div>
    </FieldContext.Provider>
  );
};
