import { forwardRef, type HTMLAttributes } from 'react';
import clsx from 'clsx';
import './Separator.css';

export interface SeparatorProps extends HTMLAttributes<HTMLDivElement> {
  orientation?: 'horizontal' | 'vertical';
  decorative?: boolean;
}

export const Separator = forwardRef<HTMLDivElement, SeparatorProps>(function Separator(
  { orientation = 'horizontal', decorative = true, className, ...rest },
  ref,
) {
  const semanticProps = decorative
    ? { role: 'none' as const }
    : { role: 'separator' as const, 'aria-orientation': orientation };

  return (
    <div
      ref={ref}
      {...semanticProps}
      className={clsx(
        'ank-separator',
        orientation === 'vertical' && 'ank-separator--vertical',
        className,
      )}
      {...rest}
    />
  );
});
