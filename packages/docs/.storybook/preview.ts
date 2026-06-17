import type { Preview } from '@storybook/react';
import { withThemeByDataAttribute } from '@storybook/addon-themes';
import '../src/styles.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: 'ank-bg',
      values: [
        { name: 'ank-bg', value: '#F7F3ED' },
        { name: 'ank-surface', value: '#EEE9E1' },
        { name: 'ank-white', value: '#FDFAF6' },
        { name: 'ank-ink', value: '#0D0F0E' },
        { name: 'ank-dark-bg', value: '#0F1412' },
      ],
    },
    layout: 'centered',
    options: {
      storySort: {
        order: ['ank.ds', ['Welcome', 'Foundations', 'Components', 'Patterns']],
      },
    },
  },
  decorators: [
    withThemeByDataAttribute({
      themes: { light: '', dark: 'dark' },
      defaultTheme: 'light',
      attributeName: 'data-theme',
    }),
  ],
};

export default preview;
