import coreConfig from '../core/tailwind.config.js';

/** @type {import('tailwindcss').Config} */
export default {
  ...coreConfig,
  content: [
    './.storybook/**/*.{ts,tsx,mdx}',
    './src/**/*.{ts,tsx,mdx}',
    '../core/src/**/*.{ts,tsx,mdx}',
  ],
};
