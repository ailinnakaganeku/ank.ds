import { forwardRef, useId, type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import './Hero.css';

export type HeroAlign = 'start' | 'center';

export interface HeroProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
  title: ReactNode;
  titleBleed?: boolean;
  description?: ReactNode;
  actions?: ReactNode;
  decoration?: ReactNode;
  align?: HeroAlign;
}

export const Hero = forwardRef<HTMLElement, HeroProps>(function Hero(
  {
    title,
    titleBleed = false,
    description,
    actions,
    decoration,
    align = 'start',
    className,
    ...rest
  },
  ref,
) {
  const titleId = useId();
  const split = Boolean(decoration);

  return (
    <section
      ref={ref}
      aria-labelledby={titleId}
      className={clsx(
        'ank-hero',
        split && 'ank-hero--split',
        align === 'center' && 'ank-hero--center',
        className,
      )}
      {...rest}
    >
      <div className="ank-hero__content">
        <h1
          id={titleId}
          className={clsx('ank-hero__title', titleBleed && 'ank-hero__title--bleed')}
        >
          {title}
        </h1>
        {description && <p className="ank-hero__description">{description}</p>}
        {actions && <div className="ank-hero__actions">{actions}</div>}
      </div>
      {decoration && <div className="ank-hero__decoration">{decoration}</div>}
    </section>
  );
});
