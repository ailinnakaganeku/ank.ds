import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Input } from '../../components/Input';
import { FieldWrapper } from '../../components/FieldWrapper';

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M7 1v4M7 9v4M1 7h4M9 7h4" strokeLinecap="square" />
  </svg>
);

const meta = {
  title: 'ank.ds/Patterns/Hero',
  component: Hero,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    eyebrow: <Badge variant="outline">v0.1.0 · beta</Badge>,
    title: 'A neubrutalist design system you can ship.',
    description:
      'Bold borders, hard shadows, refined palette. Built on top of accessible primitives so the look stays loud and the markup stays quiet.',
    actions: (
      <>
        <Button iconRight={<ArrowRight />}>Get started</Button>
        <Button variant="ghost">Read the docs</Button>
      </>
    ),
  },
};

export const Centered: Story = {
  args: {
    eyebrow: <Badge variant="dark">new</Badge>,
    title: 'Make something refined and loud.',
    description: 'Less time on tokens, more time on craft.',
    actions: (
      <>
        <Button iconRight={<ArrowRight />}>Start building</Button>
        <Button variant="ghost">Watch the tour</Button>
      </>
    ),
    align: 'center',
  },
};

export const WithAnnouncement: Story = {
  args: {
    announcement: <><SparkleIcon /> v1.0 is out — see what's new →</>,
    eyebrow: <Badge variant="accent">launch week</Badge>,
    title: 'Components that survive the keyboard test.',
    description: '30 primitives audited for ARIA, contrast, and focus management. WCAG AA across the board.',
    actions: (
      <>
        <Button iconRight={<ArrowRight />}>Try it</Button>
        <Button variant="ghost">View on GitHub</Button>
      </>
    ),
  },
};

export const TitleBleed: Story = {
  args: {
    eyebrow: <Badge variant="secondary">editorial</Badge>,
    title: 'Make it loud.',
    titleBleed: true,
    description: 'Headlines that escape the container. Pure neubrutalism — calculated chaos with consistent rhythm.',
    actions: (
      <>
        <Button variant="primary" iconRight={<ArrowRight />}>Read the brief</Button>
      </>
    ),
  },
};

export const WithDemo: Story = {
  args: {
    eyebrow: <Badge variant="accent">preview</Badge>,
    title: 'Compose with primitives.',
    description: 'Every page is a recipe of the same 30 components. The result looks intentional, not accidental.',
    actions: (
      <>
        <Button iconRight={<ArrowRight />}>Try the playground</Button>
        <Button variant="ghost">See the brief</Button>
      </>
    ),
    demoLabel: 'sign-in form',
    demo: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <FieldWrapper label="Email">
          <Input type="email" placeholder="you@example.com" />
        </FieldWrapper>
        <FieldWrapper label="Password">
          <Input type="password" defaultValue="••••••••" />
        </FieldWrapper>
        <Button fullWidth>Sign in</Button>
      </div>
    ),
  },
};

export const Terminal: Story = {
  args: {
    eyebrow: <Badge variant="accent">CLI · alpha</Badge>,
    title: 'ank install --everything',
    caret: true,
    description: 'A single command. 30 components, 4 patterns, every token. Ready to ship.',
    actions: (
      <>
        <Button variant="sand" iconRight={<ArrowRight />}>Read the install docs</Button>
      </>
    ),
    variant: 'terminal',
    align: 'center',
  },
};

export const PrimaryBackground: Story = {
  args: {
    eyebrow: <Badge variant="sand">v0.1.0</Badge>,
    title: 'Editorial weight, brutal frame.',
    description: 'Neubrutalist UI without the chaos. Calm typography, tight tokens, components that test green.',
    actions: (
      <>
        <Button variant="sand" iconRight={<ArrowRight />}>Try the demo</Button>
        <Button variant="ghost" style={{ color: 'var(--ank-white)' }}>GitHub</Button>
      </>
    ),
    variant: 'primary',
  },
};

export const WithDecorationCard: Story = {
  args: {
    eyebrow: <Badge variant="accent">launch week</Badge>,
    title: 'Five hand-picked primitives.',
    description: 'Build pages with shapes that look intentional and components that hold up to a keyboard test.',
    actions: (
      <>
        <Button iconRight={<ArrowRight />}>Explore</Button>
        <Button variant="ghost">Read the brief</Button>
      </>
    ),
    decoration: (
      <div style={{ transform: 'rotate(-3deg)', width: '100%', maxWidth: 360 }}>
        <Card variant="secondary">
          <Card.Eyebrow>tip</Card.Eyebrow>
          <Card.Title>Built on accessible primitives</Card.Title>
          <Card.Description>
            Every section is a composition of audited components: bordered inputs,
            sticky navs, focus-trapped modals, real ARIA semantics.
          </Card.Description>
          <Card.Footer>
            <Button size="sm" variant="ghost">See the code</Button>
          </Card.Footer>
        </Card>
      </div>
    ),
  },
};
