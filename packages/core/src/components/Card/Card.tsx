import { forwardRef, type HTMLAttributes, type KeyboardEvent, type ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import clsx from 'clsx';
import './Card.css';

const cardVariants = cva('ank-card', {
  variants: {
    variant: {
      default: 'ank-card--default',
      primary: 'ank-card--primary',
      secondary: 'ank-card--secondary',
      dark: 'ank-card--dark',
      outlined: 'ank-card--outlined',
    },
    interactive: {
      true: 'ank-card--interactive',
    },
  },
  defaultVariants: { variant: 'default' },
});

export type CardVariants = VariantProps<typeof cardVariants>;

export interface CardProps extends HTMLAttributes<HTMLDivElement>, CardVariants {
  children?: ReactNode;
}

const CardRoot = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant, interactive, className, children, onKeyDown, ...rest },
  ref,
) {
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(event);
    if (!interactive || event.defaultPrevented) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.currentTarget.click();
    }
  };

  return (
    <div
      ref={ref}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? 'button' : undefined}
      onKeyDown={handleKeyDown}
      className={clsx(cardVariants({ variant, interactive }), className)}
      {...rest}
    >
      {children}
    </div>
  );
});

const Media = ({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('ank-card__media', className)} {...rest}>
    {children}
  </div>
);

const Eyebrow = ({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('ank-card__eyebrow', className)} {...rest}>
    {children}
  </div>
);

const Title = ({ children, className, ...rest }: HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={clsx('ank-card__title', className)} {...rest}>
    {children}
  </h3>
);

const Description = ({ children, className, ...rest }: HTMLAttributes<HTMLParagraphElement>) => (
  <p className={clsx('ank-card__description', className)} {...rest}>
    {children}
  </p>
);

const Footer = ({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('ank-card__footer', className)} {...rest}>
    {children}
  </div>
);

export const Card = Object.assign(CardRoot, {
  Media,
  Eyebrow,
  Title,
  Description,
  Footer,
});
