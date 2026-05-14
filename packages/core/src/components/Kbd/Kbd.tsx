import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import './Kbd.css';

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { className, children, ...rest },
  ref,
) {
  return (
    <kbd ref={ref} className={clsx('ank-kbd', className)} {...rest}>
      {children}
    </kbd>
  );
});
