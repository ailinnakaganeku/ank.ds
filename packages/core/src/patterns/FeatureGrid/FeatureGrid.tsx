import { forwardRef, type HTMLAttributes, type ReactNode, type CSSProperties } from 'react';
import clsx from 'clsx';
import './FeatureGrid.css';

export interface FeatureGridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number;
  inverted?: boolean;
  children: ReactNode;
}

interface CSSWithVar extends CSSProperties {
  '--ank-feature-grid-columns'?: string;
}

const FeatureGridRoot = forwardRef<HTMLDivElement, FeatureGridProps>(function FeatureGrid(
  { columns = 3, inverted, className, children, style, ...rest },
  ref,
) {
  const mergedStyle: CSSWithVar = {
    '--ank-feature-grid-columns': String(columns),
    ...style,
  };

  return (
    <div
      ref={ref}
      className={clsx('ank-feature-grid', inverted && 'ank-feature-grid--inverted', className)}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </div>
  );
});

export interface FeatureGridItemProps extends HTMLAttributes<HTMLDivElement> {
  span?: number;
  rowSpan?: number;
  children: ReactNode;
}

const Item = forwardRef<HTMLDivElement, FeatureGridItemProps>(function FeatureGridItem(
  { span, rowSpan, className, style, children, ...rest },
  ref,
) {
  const mergedStyle: CSSProperties = {
    ...(span ? { gridColumn: `span ${span}` } : {}),
    ...(rowSpan ? { gridRow: `span ${rowSpan}` } : {}),
    ...style,
  };

  return (
    <div
      ref={ref}
      data-span={span}
      className={clsx('ank-feature-grid__item', className)}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </div>
  );
});

export const FeatureGrid = Object.assign(FeatureGridRoot, { Item });
