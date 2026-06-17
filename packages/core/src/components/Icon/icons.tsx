import { Icon, type IconProps } from './Icon';

export const CheckIcon = (props: IconProps) => (
  <Icon viewBox="0 0 20 20" strokeWidth={2.5} {...props}>
    <path d="M4 10l4 4 8-8" strokeLinecap="square" strokeLinejoin="miter" />
  </Icon>
);

export const WarningIcon = (props: IconProps) => (
  <Icon viewBox="0 0 20 20" strokeWidth={2.5} {...props}>
    <path d="M10 4v8" strokeLinecap="square" />
    <circle cx="10" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
  </Icon>
);

export const ErrorIcon = (props: IconProps) => (
  <Icon viewBox="0 0 20 20" strokeWidth={2.5} {...props}>
    <path d="M5 5l10 10M15 5L5 15" strokeLinecap="square" />
  </Icon>
);

export const InfoIcon = (props: IconProps) => (
  <Icon viewBox="0 0 20 20" strokeWidth={2.5} {...props}>
    <path d="M10 9v6" strokeLinecap="square" />
    <circle cx="10" cy="5.5" r="1.2" fill="currentColor" stroke="none" />
  </Icon>
);

export const CloseIcon = (props: IconProps) => (
  <Icon viewBox="0 0 14 14" strokeWidth={2.5} {...props}>
    <path d="M3 3l8 8M11 3l-8 8" strokeLinecap="square" />
  </Icon>
);

export const MenuIcon = (props: IconProps) => (
  <Icon viewBox="0 0 20 20" strokeWidth={2.5} {...props}>
    <path d="M3 5h14M3 10h14M3 15h14" strokeLinecap="square" />
  </Icon>
);

export const ChevronLeftIcon = (props: IconProps) => (
  <Icon viewBox="0 0 14 14" strokeWidth={2.5} {...props}>
    <path d="M9 3L5 7l4 4" strokeLinecap="square" strokeLinejoin="miter" />
  </Icon>
);

export const ChevronRightIcon = (props: IconProps) => (
  <Icon viewBox="0 0 14 14" strokeWidth={2.5} {...props}>
    <path d="M5 3l4 4-4 4" strokeLinecap="square" strokeLinejoin="miter" />
  </Icon>
);

export const CaretDownIcon = (props: IconProps) => (
  <Icon viewBox="0 0 10 6" width={10} height={6} fill="currentColor" stroke="none" {...props}>
    <path d="M0 0h10L5 6z" />
  </Icon>
);
