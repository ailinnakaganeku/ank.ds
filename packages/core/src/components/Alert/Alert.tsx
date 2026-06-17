import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import './Alert.css';
import { CheckIcon, WarningIcon, ErrorIcon, InfoIcon, CloseIcon } from '../Icon';

const alertVariants = cva('ank-alert', {
  variants: {
    variant: {
      success: 'ank-alert--success',
      warning: 'ank-alert--warning',
      error: 'ank-alert--error',
      info: 'ank-alert--info',
    },
  },
  defaultVariants: { variant: 'info' },
});

export type AlertVariants = VariantProps<typeof alertVariants>;
export type AlertVariant = NonNullable<AlertVariants['variant']>;

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>, AlertVariants {
  title?: ReactNode;
  icon?: ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  children?: ReactNode;
}

const defaultIcons: Record<AlertVariant, ReactNode> = {
  success: <CheckIcon />,
  warning: <WarningIcon />,
  error: <ErrorIcon />,
  info: <InfoIcon />,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  { variant = 'info', title, icon, onClose, closeLabel = 'Dismiss', className, children, ...rest },
  ref,
) {
  const resolvedIcon = icon ?? defaultIcons[variant ?? 'info'];

  return (
    <div
      ref={ref}
      role={variant === 'error' ? 'alert' : 'status'}
      className={clsx(alertVariants({ variant }), className)}
      {...rest}
    >
      <span className="ank-alert__icon" aria-hidden>
        {resolvedIcon}
      </span>
      <div className="ank-alert__body">
        {title && <div className="ank-alert__title">{title}</div>}
        {children && <div className="ank-alert__description">{children}</div>}
      </div>
      {onClose && (
        <button
          type="button"
          className="ank-alert__close"
          onClick={onClose}
          aria-label={closeLabel}
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
});
