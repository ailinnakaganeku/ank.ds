import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const TOKENS_SHEET = join(
  dirname(fileURLToPath(import.meta.url)),
  '../../../tokens/src/tokens.css',
);

// https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html
const TEXT = 4.5;
// https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html
const NON_TEXT = 3;

const PAIRS = [
  ['ink', 'bg', TEXT],
  ['ink', 'surface', TEXT],
  ['ink', 'surface-raised', TEXT],
  ['ink', 'white', TEXT],
  ['text-muted', 'bg', TEXT],
  ['text-muted', 'surface', TEXT],
  ['text-subtle', 'bg', TEXT],
  ['ink', 'success-bg', TEXT],
  ['ink', 'warning-bg', TEXT],
  ['ink', 'error-bg', TEXT],
  ['ink', 'info-bg', TEXT],
  ['focus-ring', 'bg', NON_TEXT],
  ['focus-ring', 'surface', NON_TEXT],
  ['focus-ring', 'surface-raised', NON_TEXT],
  ['focus-ring', 'white', NON_TEXT],
  ['success-fg', 'success-bg', NON_TEXT],
  ['success-fg', 'white', NON_TEXT],
  ['info-fg', 'info-bg', NON_TEXT],
  ['info-fg', 'white', NON_TEXT],
  ['warning-dark', 'warning-bg', NON_TEXT],
  ['warning-dark', 'white', NON_TEXT],
  ['error', 'error-bg', NON_TEXT],
  ['error-dark', 'white', NON_TEXT],
] as const;

const declarations = (css: string, selector: string) => {
  const start = css.indexOf(`${selector} {`);
  const block = css.slice(start, css.indexOf('}', start));
  return new Map(
    [...block.matchAll(/--ank-([a-z0-9-]+):\s*([^;]+);/g)].map(([, name = '', value = '']) => [
      name,
      value,
    ]),
  );
};

const css = readFileSync(TOKENS_SHEET, 'utf8');
const light = declarations(css, ':root');
const dark = new Map([...light, ...declarations(css, "[data-theme='dark']")]);

const resolve = (theme: Map<string, string>, name: string): string => {
  const value = theme.get(name);
  if (value === undefined) throw new Error(`--ank-${name} is not declared`);
  const [, referenced] = /^var\(--ank-([a-z0-9-]+)\)$/.exec(value) ?? [];
  return referenced ? resolve(theme, referenced) : value;
};

// https://www.w3.org/WAI/WCAG22/Techniques/general/G18#procedure
const luminance = (hex: string) => {
  const [red = 0, green = 0, blue = 0] = [1, 3, 5]
    .map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255)
    .map((channel) => (channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4));
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const contrast = (first: string, second: string) => {
  const luminances = [luminance(first), luminance(second)];
  return (Math.max(...luminances) + 0.05) / (Math.min(...luminances) + 0.05);
};

describe.each([
  ['light', light],
  ['dark', dark],
])('%s theme', (_, theme) => {
  it.each(PAIRS)('--ank-%s on --ank-%s reaches %s:1', (foreground, background, minimum) => {
    expect(contrast(resolve(theme, foreground), resolve(theme, background))).toBeGreaterThanOrEqual(
      minimum,
    );
  });
});
