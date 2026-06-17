# ank.ds

A neo-brutalist, editorial React design system — hard offset shadows, thick ink borders, a warm earthen palette, and Cormorant Garamond / Space Grotesk / JetBrains Mono type.

Monorepo · React 18 + TypeScript + Storybook 8. The published library ships as pure CSS (no Tailwind runtime); Tailwind is a Storybook-only authoring tool.

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

- **31 components** — Button, Input, Select, Modal, Tabs, Toast, Table, Accordion, an `Icon` set, and more.
- **3 layout primitives** — `Container`, `Stack`, `AutoGrid` (responsive without media queries).
- **5 patterns** — `Hero`, `FeatureGrid`, `Footer`, `CodeDemo`, plus their subcomponents.
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
npm run storybook        # docs + component playground
npm run build            # tsup → dist (ESM + CJS + types + CSS)
npm run lint
npm run typecheck
npm test
```

## License

MIT
