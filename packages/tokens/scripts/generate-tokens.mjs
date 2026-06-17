import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const cssPath = fileURLToPath(new URL('../src/tokens.css', import.meta.url));
const tsPath = fileURLToPath(new URL('../src/tokens.ts', import.meta.url));

const css = readFileSync(cssPath, 'utf8');

const rootBlock = css.slice(css.indexOf(':root {') + ':root {'.length, css.indexOf('}'));

const camel = (name) => name.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());

const entries = [];
for (const line of rootBlock.split('\n')) {
  const match = line.match(/^\s*--ank-([a-z0-9-]+):\s*(.+);\s*$/);
  if (match) entries.push([camel(match[1]), match[2].trim()]);
}

const body = entries.map(([key, value]) => `  ${key}: ${JSON.stringify(value)},`).join('\n');

const output = `export const tokens = {\n${body}\n} as const;\n\nexport type Tokens = typeof tokens;\n`;

writeFileSync(tsPath, output);
