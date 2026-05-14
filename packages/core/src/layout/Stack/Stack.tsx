import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import { resolveSpace, type SpaceValue } from '../_resolve';
import './Stack.css';

export type StackAlign = 'start' | 'center' | 'end' | 'stretch';

export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: SpaceValue;
  align?: StackAlign;
  divided?: boolean;
  children: ReactNode;
}

interface CSSWithVar extends CSSProperties {
  '--ank-stack-gap'?: string;
}

export const Stack = forwardRef<HTMLDivElement, StackProps>(function Stack(
  { gap, align = 'stretch', divided, className, style, children, ...rest },
  ref,
) {
  const merged: CSSWithVar = { ...style };
  const resolvedGap = resolveSpace(gap);
  if (resolvedGap) merged['--ank-stack-gap'] = resolvedGap;

  return (
    <div
      ref={ref}
      data-align={align}
      className={clsx('ank-stack', divided && 'ank-stack--divided', className)}
      style={merged}
      {...rest}
    >
      {children}
    </div>
  );
});
