import {
  forwardRef,
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import './Footer.css';

export type FooterVariant = 'dark' | 'light';

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  variant?: FooterVariant;
  children: ReactNode;
}

const FooterRoot = forwardRef<HTMLElement, FooterProps>(function Footer(
  { variant = 'dark', className, children, ...rest },
  ref,
) {
  return (
    <footer
      ref={ref}
      className={clsx('ank-footer', variant === 'light' && 'ank-footer--light', className)}
      {...rest}
    >
      {children}
    </footer>
  );
});

const Top = ({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('ank-footer__top', className)} {...rest}>
    {children}
  </div>
);

const Brand = ({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('ank-footer__brand', className)} {...rest}>
    {children}
  </div>
);

const Columns = ({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('ank-footer__columns', className)} {...rest}>
    {children}
  </div>
);

export interface FooterColumnProps extends HTMLAttributes<HTMLDivElement> {
  title?: ReactNode;
  children: ReactNode;
}

const Column = forwardRef<HTMLDivElement, FooterColumnProps>(function FooterColumn(
  { title, className, children, ...rest },
  ref,
) {
  return (
    <div ref={ref} className={clsx('ank-footer__column', className)} {...rest}>
      {title && <p className="ank-footer__column-title">{title}</p>}
      <ul className="ank-footer__column-links">{children}</ul>
    </div>
  );
});

export interface FooterLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  external?: boolean;
  children: ReactNode;
}

const Link = forwardRef<HTMLAnchorElement, FooterLinkProps>(function FooterLink(
  { external, className, children, ...rest },
  ref,
) {
  const externalAttrs = external
    ? { target: '_blank' as const, rel: 'noopener noreferrer' }
    : {};
  return (
    <li>
      <a
        ref={ref}
        className={clsx('ank-footer__column-link', className)}
        {...externalAttrs}
        {...rest}
      >
        {children}
      </a>
    </li>
  );
});

const Bottom = ({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('ank-footer__bottom', className)} {...rest}>
    {children}
  </div>
);

export const Footer = Object.assign(FooterRoot, {
  Top,
  Brand,
  Columns,
  Column,
  Link,
  Bottom,
});
