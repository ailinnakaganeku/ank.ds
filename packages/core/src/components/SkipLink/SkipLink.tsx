import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import './SkipLink.css';

export interface SkipLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  targetId?: string;
  children?: ReactNode;
}

export const SkipLink = forwardRef<HTMLAnchorElement, SkipLinkProps>(function SkipLink(
  { targetId = 'main', children = 'Skip to content', className, ...rest },
  ref,
) {
  return (
    <a ref={ref} href={`#${targetId}`} className={clsx('ank-skip-link', className)} {...rest}>
      {children}
    </a>
  );
});
