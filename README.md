# ank.ds

Monorepo · React 18 + TypeScript + Storybook 8. The published library ships as pure CSS, with design tokens as custom properties.

## Install

```bash
npm install @ankds/core react react-dom
```

> Pre-release (`0.0.0`, private) — not yet published to a registry.

## Usage

```tsx
import { Button } from '@ankds/core';
import '@ankds/core/styles.css';

export const App = () => <Button variant="primary">Continue</Button>;
```

`styles.css` is a single self-contained stylesheet: design tokens, base reset, and every component's styles.

### Dark mode

Tokens flip on a `data-theme` attribute:

```html
<html data-theme="dark"></html>
```

## What's inside

- **30 components** — Button, Input, Select, Modal, Tabs, Toast, Table, Accordion, an Icon set, and more.
- **3 layout primitives** — Container, Stack, AutoGrid (responsive without media queries).
- **1 pattern** — CodeDemo, for terminal and code snippets.
- **Design tokens** — one source of truth in CSS custom properties; the TypeScript export is generated from it.
- Accessibility tested with `jest-axe`, focus traps, and roving tabindex.

## Structure

```
ank-ds/
├── packages/
│   ├── tokens/    Design tokens (CSS source → generated TS)
│   ├── core/      Components, layout, patterns
│   └── docs/      Storybook
└── apps/
    └── playground/
```

## Development

```bash
npm install
npx playwright install --no-shell chromium
npm run storybook
npm run build -w @ankds/core
npm run lint
npm run typecheck
npm test
```

`npm test` runs most tests in jsdom and the ones named `*.browser.test.tsx` in a real Chromium, for what jsdom does not implement (`<dialog>`, native focus). That is why Playwright's Chromium is installed once.

## License

MIT
