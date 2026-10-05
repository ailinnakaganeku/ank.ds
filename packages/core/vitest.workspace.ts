import { defineWorkspace } from 'vitest/config';

export default defineWorkspace([
  {
    extends: './vitest.config.ts',
    test: {
      name: 'jsdom',
      setupFiles: ['./src/test-setup.jsdom.ts'],
      exclude: ['**/node_modules/**', '**/*.browser.test.tsx'],
    },
  },
  {
    extends: './vitest.config.ts',
    test: {
      name: 'browser',
      setupFiles: ['./src/test-setup.browser.ts'],
      include: ['src/**/*.browser.test.tsx'],
      css: true,
      browser: {
        enabled: true,
        provider: 'playwright',
        name: 'chromium',
        headless: true,
        providerOptions: { launch: { channel: 'chromium' } },
      },
    },
  },
]);
