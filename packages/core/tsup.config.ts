import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/index.ts', base: 'src/styles/base.css' },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  treeshake: true,
  external: ['react', 'react-dom'],
  noExternal: ['@ankds/tokens'],
});
