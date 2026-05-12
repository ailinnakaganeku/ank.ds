export const colors = {
  primary: '#1C3D4F',
  primaryDark: '#0F2535',
  primaryLight: '#2E5870',
  secondary: '#C4714A',
  secondaryDark: '#A05838',
  secondaryLight: '#D68E6A',
  accent: '#4A7A5C',
  accentDark: '#345847',
  accentLight: '#629E77',
  sand: '#D4B896',
  sandDark: '#B89B78',
  sandLight: '#E8D5B5',
  ink: '#0D0F0E',
  inkSoft: '#1A1C1B',
  gray900: '#2C2E2D',
  gray700: '#4A4C4B',
  gray500: '#6E706F',
  gray300: '#A8AAAA',
  gray100: '#D8DADA',
  bg: '#F7F3ED',
  surface: '#EEE9E1',
  surfaceRaised: '#F2EDE5',
  white: '#FDFAF6',
  success: '#3D6B4A',
  successBg: '#EBF4EE',
  warning: '#C9973A',
  warningBg: '#FDF6E8',
  error: '#B85C3A',
  errorBg: '#FDF0EC',
  info: '#1C3D4F',
  infoBg: '#E8EFF3',
} as const;

export const typography = {
  display: "'Cormorant Garamond', Georgia, serif",
  body: "'Space Grotesk', system-ui, sans-serif",
  mono: "'JetBrains Mono', 'Courier New', monospace",
  size: {
    xs: '11px',
    sm: '13px',
    base: '15px',
    lg: '18px',
    xl: '22px',
    '2xl': '30px',
    '3xl': '42px',
    '4xl': '60px',
    hero: '84px',
  },
} as const;

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  5: '24px',
  6: '32px',
  7: '48px',
  8: '64px',
  9: '96px',
  10: '128px',
} as const;

export const shadows = {
  sm: '3px 3px 0px #0D0F0E',
  md: '4px 4px 0px #0D0F0E',
  lg: '6px 6px 0px #0D0F0E',
  xl: '8px 8px 0px #0D0F0E',
  primary: '4px 4px 0px #1C3D4F',
  secondary: '4px 4px 0px #C4714A',
  accent: '4px 4px 0px #4A7A5C',
} as const;

export const borders = {
  thick: '3px solid #0D0F0E',
  base: '2px solid #0D0F0E',
  thin: '1.5px solid #0D0F0E',
} as const;

export const radius = {
  none: '0px',
  sm: '2px',
  md: '4px',
} as const;

export const transitions = {
  fast: '80ms ease',
  base: '150ms ease',
  slow: '300ms ease',
} as const;

export const zIndex = {
  base: 1,
  dropdown: 100,
  sticky: 200,
  modal: 300,
  toast: 400,
} as const;

export const tokens = {
  colors,
  typography,
  spacing,
  shadows,
  borders,
  radius,
  transitions,
  zIndex,
} as const;

export type Tokens = typeof tokens;
