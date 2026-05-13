import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import './Alert.css';

const alertVariants = cva('ank-alert', {
  variants: {
    variant: {
      success: 'ank-alert--success',
      warning: 'ank-alert--warning',
      error:   'ank-alert--error',
      info:    'ank-alert--info',
    },
  },
  defaultVariants: { variant: 'info' },
});

export type AlertVariants = VariantProps<typeof alertVariants>;
export type AlertVariant = NonNullable<AlertVariants['variant']>;

export interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'title'>,
    AlertVariants {
  title?: ReactNode;
  icon?: ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  children?: ReactNode;
}

const SuccessIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M4 10l4 4 8-8" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

const WarningIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M10 4v8" strokeLinecap="square" />
    <circle cx="10" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const ErrorIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M5 5l10 10M15 5L5 15" strokeLinecap="square" />
  </svg>
);

const InfoIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M10 9v6" strokeLinecap="square" />
    <circle cx="10" cy="5.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);

const CloseIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path d="M3 3l8 8M11 3l-8 8" strokeLinecap="square" />
  </svg>
);

const defaultIcons: Record<AlertVariant, ReactNode> = {
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error:   <ErrorIcon />,
  info:    <InfoIcon />,
};

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    variant = 'info',
    title,
    icon,
    onClose,
    closeLabel = 'Dismiss',
    className,
    children,
    ...rest
  },
  ref,
) {
  const resolvedIcon = icon ?? defaultIcons[variant];

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
