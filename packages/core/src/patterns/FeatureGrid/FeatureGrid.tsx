import { forwardRef, type HTMLAttributes, type ReactNode, type CSSProperties } from 'react';
import clsx from 'clsx';
import './FeatureGrid.css';

export type FeatureGridItemSize = 'sm' | 'md' | 'lg' | 'hero';

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

const sizeToSpan: Record<FeatureGridItemSize, number> = {
  sm: 1,
  md: 1,
  lg: 2,
  hero: 3,
};

export interface FeatureGridItemProps extends HTMLAttributes<HTMLDivElement> {
  size?: FeatureGridItemSize;
  span?: number;
  rowSpan?: number;
  children: ReactNode;
}

const Item = forwardRef<HTMLDivElement, FeatureGridItemProps>(function FeatureGridItem(
  { size, span, rowSpan, className, style, children, ...rest },
  ref,
) {
  const effectiveSpan = span ?? (size ? sizeToSpan[size] : undefined);
  const mergedStyle: CSSProperties = {
    ...(effectiveSpan ? { gridColumn: `span ${effectiveSpan}` } : {}),
    ...(rowSpan ? { gridRow: `span ${rowSpan}` } : {}),
    ...style,
  };

  return (
    <div
      ref={ref}
      data-span={effectiveSpan}
      data-size={size}
      className={clsx('ank-feature-grid__item', className)}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </div>
  );
});

export interface FeatureGridSpotlightProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

const Spotlight = forwardRef<HTMLDivElement, FeatureGridSpotlightProps>(function FeatureGridSpotlight(
  { className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      data-size="hero"
      style={{ gridColumn: `span ${sizeToSpan.hero}` }}
      className={clsx(
        'ank-feature-grid__item',
        'ank-feature-grid__spotlight',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

export const FeatureGrid = Object.assign(FeatureGridRoot, { Item, Spotlight });
