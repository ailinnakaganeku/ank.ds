import { forwardRef, type SVGProps } from 'react';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const Icon = forwardRef<SVGSVGElement, IconProps>(function Icon(
  { size, width = size, height = size, fill = 'none', stroke = 'currentColor', children, ...rest },
  ref,
) {
  return (
    <svg ref={ref} width={width} height={height} fill={fill} stroke={stroke} aria-hidden {...rest}>
      {children}
    </svg>
  );
});
