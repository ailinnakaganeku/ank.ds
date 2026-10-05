import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const SRC_DIR = join(dirname(fileURLToPath(import.meta.url)), '..');
const OPT_IN_SHEETS = new Set([join('styles', 'base.css')]);

const sheets = readdirSync(SRC_DIR, { recursive: true, encoding: 'utf8' })
  .filter((path) => path.endsWith('.css') && !OPT_IN_SHEETS.has(path))
  .map((path) => [path, readFileSync(join(SRC_DIR, path), 'utf8')] as const);

const KEYFRAMES = /@keyframes[^{]*\{(?:[^{}]*\{[^{}]*\})*[^{}]*\}/g;
const COMMENTS = /\/\*[\s\S]*?\*\//g;
const SCOPED_ROOT = /^\.ank-|^:where\(\[class/;

const splitSelectorList = (list: string) => {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (const char of list) {
    if (char === '(') depth += 1;
    if (char === ')') depth -= 1;
    if (char === ',' && depth === 0) {
      parts.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  return [...parts, current.trim()];
};

const isScoped = (selector: string) => SCOPED_ROOT.test(selector.split(/[\s>+~]/)[0]);

const unscopedSelectors = (css: string) =>
  [
    ...css
      .replace(COMMENTS, '')
      .replace(KEYFRAMES, '')
      .matchAll(/([^{};]+)\{/g),
  ]
    .map(([, selector]) => selector.trim())
    .filter((selector) => !selector.startsWith('@'))
    .flatMap(splitSelectorList)
    .filter((selector) => !isScoped(selector));

describe('default stylesheet', () => {
  it('finds the component stylesheets', () => {
    expect(sheets.length).toBeGreaterThan(30);
  });

  it.each(sheets)('%s only styles design system elements', (_, css) => {
    expect(unscopedSelectors(css)).toEqual([]);
  });
});
