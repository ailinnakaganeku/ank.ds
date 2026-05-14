import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import { resolveSpace, type SpaceValue } from '../_resolve';
import './Container.css';

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  padding?: SpaceValue;
  flush?: boolean;
  children: ReactNode;
}

interface CSSWithVar extends CSSProperties {
  '--ank-container-pad'?: string;
  '--ank-container-max'?: string;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(function Container(
  { size = 'lg', padding, flush, className, style, children, ...rest },
  ref,
) {
  const merged: CSSWithVar = {
    ...style,
  };
  const resolvedPad = resolveSpace(padding);
  if (resolvedPad) merged['--ank-container-pad'] = resolvedPad;

  return (
    <div
      ref={ref}
      className={clsx(
        'ank-container',
        `ank-container--${size}`,
        flush && 'ank-container--flush',
        className,
      )}
      style={merged}
      {...rest}
    >
      {children}
    </div>
  );
});
