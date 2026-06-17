import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import './Badge.css';

const badgeVariants = cva('ank-badge', {
  variants: {
    variant: {
      primary: 'ank-badge--primary',
      secondary: 'ank-badge--secondary',
      accent: 'ank-badge--accent',
      sand: 'ank-badge--sand',
      success: 'ank-badge--success',
      warning: 'ank-badge--warning',
      error: 'ank-badge--error',
      outline: 'ank-badge--outline',
      dark: 'ank-badge--dark',
    },
    size: {
      sm: 'ank-badge--sm',
      md: 'ank-badge--md',
    },
  },
  defaultVariants: {
    variant: 'outline',
    size: 'md',
  },
});

export type BadgeVariants = VariantProps<typeof badgeVariants>;
export type BadgeVariant = NonNullable<BadgeVariants['variant']>;
export type BadgeSize = NonNullable<BadgeVariants['size']>;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, BadgeVariants {
  children?: ReactNode;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  { variant, size, className, children, ...rest },
  ref,
) {
  return (
    <span ref={ref} className={clsx(badgeVariants({ variant, size }), className)} {...rest}>
      {children}
    </span>
  );
});
