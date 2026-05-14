import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';

const ArrowRight = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="square" strokeLinejoin="miter" />
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

export const PrimaryBackground: Story = {
  args: {
    eyebrow: <Badge variant="sand">v0.1.0</Badge>,
    title: 'Editorial weight, brutal frame.',
    description: 'Neubrutalist UI without the chaos. Calm typography, tight tokens, and components that test green.',
    actions: (
      <>
        <Button variant="sand" iconRight={<ArrowRight />}>Try the demo</Button>
        <Button variant="ghost" style={{ color: 'var(--ank-white)' }}>GitHub</Button>
      </>
    ),
    variant: 'primary',
  },
};

export const InkBackground: Story = {
  args: {
    eyebrow: <Badge variant="secondary">community</Badge>,
    title: 'Built in the open.',
    description: 'Every component is tested for behavior and screened for WCAG AA contrast before it ships.',
    actions: (
      <>
        <Button variant="sand" iconRight={<ArrowRight />}>Open repo</Button>
      </>
    ),
    variant: 'ink',
    align: 'center',
  },
};

export const WithDecoration: Story = {
  args: {
    eyebrow: <Badge variant="accent">launch week</Badge>,
    title: 'Five hand-picked primitives. Zero compromise.',
    description: 'Build pages with shapes that look intentional and components that hold up to a keyboard test.',
    actions: (
      <>
        <Button iconRight={<ArrowRight />}>Explore</Button>
        <Button variant="ghost">Read the brief</Button>
      </>
    ),
    decoration: (
      <div style={{ transform: 'rotate(-3deg)' }}>
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
