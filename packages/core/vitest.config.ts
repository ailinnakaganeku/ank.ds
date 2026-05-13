import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/components/**/*.{ts,tsx}', 'src/hooks/**/*.ts'],
      exclude: ['**/*.stories.tsx', '**/*.test.tsx', '**/index.ts'],
    },
  },
});
