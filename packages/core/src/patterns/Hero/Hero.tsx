import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import './Hero.css';

export type HeroVariant = 'default' | 'surface' | 'primary' | 'ink' | 'terminal';
export type HeroAlign = 'start' | 'center';

export interface HeroProps extends HTMLAttributes<HTMLElement> {
  announcement?: ReactNode;
  eyebrow?: ReactNode;
  title: ReactNode;
  titleBleed?: boolean;
  description?: ReactNode;
  actions?: ReactNode;
  decoration?: ReactNode;
  demo?: ReactNode;
  demoLabel?: string;
  variant?: HeroVariant;
  align?: HeroAlign;
  caret?: boolean;
}

export const Hero = forwardRef<HTMLElement, HeroProps>(function Hero(
  {
    announcement,
    eyebrow,
    title,
    titleBleed = false,
    description,
    actions,
    decoration,
    demo,
    demoLabel = 'preview',
    variant = 'default',
    align = 'start',
    caret = false,
    className,
    ...rest
  },
  ref,
) {
  const aside = demo ? (
    <div className="ank-hero__demo-frame">
      <div className="ank-hero__demo-bar">
        <span className="ank-hero__demo-dots" aria-hidden>
          <span />
          <span />
          <span />
        </span>
        <span>{demoLabel}</span>
      </div>
      <div className="ank-hero__demo-body">{demo}</div>
    </div>
  ) : (
    decoration
  );

  const split = Boolean(aside);

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
        {announcement && (
          <div className="ank-hero__announcement">{announcement}</div>
        )}
        {eyebrow && <div className="ank-hero__eyebrow">{eyebrow}</div>}
        <h1 className={clsx('ank-hero__title', titleBleed && 'ank-hero__title--bleed')}>
          {title}
          {caret && <span className="ank-hero__caret" aria-hidden />}
        </h1>
        {description && <p className="ank-hero__description">{description}</p>}
        {actions && <div className="ank-hero__actions">{actions}</div>}
      </div>
      {aside && <div className="ank-hero__decoration">{aside}</div>}
    </section>
  );
});
