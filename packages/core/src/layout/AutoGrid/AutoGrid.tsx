import { forwardRef, type CSSProperties, type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import { resolveSpace, type SpaceValue } from '../_resolve';
import './AutoGrid.css';

export type AutoGridFlow = 'fit' | 'fill';
export type AutoGridAlign = 'start' | 'center' | 'end' | 'stretch';

export interface AutoGridProps extends HTMLAttributes<HTMLDivElement> {
  min?: string;
  gap?: SpaceValue;
  flow?: AutoGridFlow;
  align?: AutoGridAlign;
  children: ReactNode;
}

interface CSSWithVar extends CSSProperties {
  '--ank-autogrid-min'?: string;
  '--ank-autogrid-gap'?: string;
}

export const AutoGrid = forwardRef<HTMLDivElement, AutoGridProps>(function AutoGrid(
  { min = '240px', gap, flow = 'fit', align = 'stretch', className, style, children, ...rest },
  ref,
) {
  const merged: CSSWithVar = {
    ...style,
    '--ank-autogrid-min': min,
  };
  const resolvedGap = resolveSpace(gap);
  if (resolvedGap) merged['--ank-autogrid-gap'] = resolvedGap;

  return (
    <div
      ref={ref}
      data-align={align}
      className={clsx('ank-autogrid', flow === 'fill' && 'ank-autogrid--fill', className)}
      style={merged}
      {...rest}
    >
      {children}
    </div>
  );
});
