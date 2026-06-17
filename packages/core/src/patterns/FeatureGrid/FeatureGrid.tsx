import {
  createContext,
  forwardRef,
  useContext,
  useMemo,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import './FeatureGrid.css';

export type FeatureGridItemSize = 'sm' | 'md' | 'lg' | 'hero';
export type FeatureGridGap = '2' | '3' | '4' | '5' | '6';

export interface FeatureGridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: FeatureGridGap;
  children: ReactNode;
}

interface CSSWithVar extends CSSProperties {
  '--ank-feature-grid-columns'?: string;
  '--ank-feature-grid-gap'?: string;
}

const FeatureGridContext = createContext<{ columns: number }>({ columns: 3 });

const FeatureGridRoot = forwardRef<HTMLDivElement, FeatureGridProps>(function FeatureGrid(
  { columns = 3, gap = '4', className, children, style, ...rest },
  ref,
) {
  const mergedStyle: CSSWithVar = {
    '--ank-feature-grid-columns': String(columns),
    '--ank-feature-grid-gap': `var(--ank-space-${gap})`,
    ...style,
  };

  const ctx = useMemo(() => ({ columns }), [columns]);

  return (
    <FeatureGridContext.Provider value={ctx}>
      <div ref={ref} className={clsx('ank-feature-grid', className)} style={mergedStyle} {...rest}>
        {children}
      </div>
    </FeatureGridContext.Provider>
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
  const { columns } = useContext(FeatureGridContext);
  const requested = span ?? (size ? sizeToSpan[size] : undefined);
  const effectiveSpan = requested ? Math.min(requested, columns) : undefined;
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

const Spotlight = forwardRef<HTMLDivElement, FeatureGridSpotlightProps>(
  function FeatureGridSpotlight({ className, children, style, ...rest }, ref) {
    const { columns } = useContext(FeatureGridContext);
    const span = Math.min(sizeToSpan.hero, columns);
    return (
      <div
        ref={ref}
        data-size="hero"
        data-span={span}
        style={{ gridColumn: `span ${span}`, ...style }}
        className={clsx('ank-feature-grid__item', 'ank-feature-grid__spotlight', className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

export const FeatureGrid = Object.assign(FeatureGridRoot, { Item, Spotlight });
