import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import './Hero.css';

export type HeroVariant = 'default' | 'surface' | 'primary' | 'ink';
export type HeroAlign = 'start' | 'center';

export interface HeroProps extends HTMLAttributes<HTMLElement> {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  decoration?: ReactNode;
  variant?: HeroVariant;
  align?: HeroAlign;
}

export const Hero = forwardRef<HTMLElement, HeroProps>(function Hero(
  {
    eyebrow,
    title,
    description,
    actions,
    decoration,
    variant = 'default',
    align = 'start',
    className,
    ...rest
  },
  ref,
) {
  const split = Boolean(decoration);
  return (
    <section
      ref={ref}
      className={clsx(
        'ank-hero',
        `ank-hero--${variant}`,
        split && 'ank-hero--split',
        align === 'center' && 'ank-hero--center',
        className,
      )}
      {...rest}
    >
      <div className="ank-hero__content">
        {eyebrow && <div className="ank-hero__eyebrow">{eyebrow}</div>}
        <h1 className="ank-hero__title">{title}</h1>
        {description && <p className="ank-hero__description">{description}</p>}
        {actions && <div className="ank-hero__actions">{actions}</div>}
      </div>
      {decoration && <div className="ank-hero__decoration">{decoration}</div>}
    </section>
  );
});
