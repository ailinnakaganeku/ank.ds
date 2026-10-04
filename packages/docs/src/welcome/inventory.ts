const components = import.meta.glob('../../../core/src/components/*/index.ts');
const patterns = import.meta.glob('../../../core/src/patterns/*/index.ts');
const layout = import.meta.glob('../../../core/src/layout/*/index.ts');

export const inventory = {
  components: Object.keys(components).length,
  patterns: Object.keys(patterns).length,
  layout: Object.keys(layout).length,
};
