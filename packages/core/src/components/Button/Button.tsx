import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import './Button.css';

const buttonVariants = cva('ank-button', {
  variants: {
    variant: {
      primary:   'ank-button--primary',
      secondary: 'ank-button--secondary',
      accent:    'ank-button--accent',
      sand:      'ank-button--sand',
      ghost:     'ank-button--ghost',
      danger:    'ank-button--danger',
    },
    size: {
      sm: 'ank-button--sm',
      md: 'ank-button--md',
      lg: 'ank-button--lg',
    },
    fullWidth: {
      true: 'ank-button--full',
    },
    iconOnly: {
      true: 'ank-button--icon-only',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export type ButtonVariants = VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    ButtonVariants {
  children?: ReactNode;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant,
    size,
    fullWidth,
    iconOnly,
    iconLeft,
    iconRight,
    disabled = false,
    className,
    children,
    type = 'button',
    ...rest
  },
  ref,
) {
  const inferredIconOnly =
    iconOnly ?? (!children && (Boolean(iconLeft) || Boolean(iconRight)));

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      className={clsx(
        buttonVariants({ variant, size, fullWidth, iconOnly: inferredIconOnly }),
        className,
      )}
      {...rest}
    >
      {iconLeft && <span className="ank-button__icon">{iconLeft}</span>}
      {children && <span className="ank-button__label">{children}</span>}
      {iconRight && <span className="ank-button__icon">{iconRight}</span>}
    </button>
  );
});
