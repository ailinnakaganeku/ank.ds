import { create } from '@storybook/theming/create';

export default create({
  base: 'light',
  brandTitle: 'ank.ds',
  brandUrl: '#',
  brandTarget: '_self',

  colorPrimary: '#1C3D4F',
  colorSecondary: '#C4714A',

  appBg: '#F7F3ED',
  appContentBg: '#FDFAF6',
  appPreviewBg: '#F7F3ED',
  appBorderColor: '#0D0F0E',
  appBorderRadius: 0,

  textColor: '#0D0F0E',
  textInverseColor: '#FDFAF6',
  textMutedColor: '#6E706F',

  barTextColor: '#4A4C4B',
  barSelectedColor: '#1C3D4F',
  barHoverColor: '#1C3D4F',
  barBg: '#EEE9E1',

  inputBg: '#FDFAF6',
  inputBorder: '#0D0F0E',
  inputTextColor: '#0D0F0E',
  inputBorderRadius: 0,

  fontBase: '"Space Grotesk", system-ui, sans-serif',
  fontCode: '"JetBrains Mono", monospace',

  booleanBg: '#EEE9E1',
  booleanSelectedBg: '#1C3D4F',
});
