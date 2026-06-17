import { forwardRef, type HTMLAttributes, type LiHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import './Breadcrumb.css';

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

const BreadcrumbRoot = forwardRef<HTMLElement, BreadcrumbProps>(function Breadcrumb(
  { className, children, 'aria-label': ariaLabel = 'Breadcrumb', ...rest },
  ref,
) {
  return (
    <nav ref={ref} aria-label={ariaLabel} className={clsx('ank-breadcrumb', className)} {...rest}>
      <ol className="ank-breadcrumb__list">{children}</ol>
    </nav>
  );
});

export interface BreadcrumbItemProps extends LiHTMLAttributes<HTMLLIElement> {
  href?: string;
  current?: boolean;
  children: ReactNode;
}

const Item = forwardRef<HTMLLIElement, BreadcrumbItemProps>(function BreadcrumbItem(
  { href, current, children, className, ...rest },
  ref,
) {
  return (
    <li ref={ref} className={clsx('ank-breadcrumb__item', className)} {...rest}>
      {current ? (
        <span aria-current="page" className="ank-breadcrumb__current">
          {children}
        </span>
      ) : href ? (
        <a href={href} className="ank-breadcrumb__link">
          {children}
        </a>
      ) : (
        <span className="ank-breadcrumb__link">{children}</span>
      )}
    </li>
  );
});

export const Breadcrumb = Object.assign(BreadcrumbRoot, { Item });
