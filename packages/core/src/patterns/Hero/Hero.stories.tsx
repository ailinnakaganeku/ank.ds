import type { Meta, StoryObj } from '@storybook/react';
import { Hero } from './Hero';
import { Button } from '../../components/Button';

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

export const TitleBleed: Story = {
  args: {
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

export const SplitWithImage: Story = {
  args: {
    title: 'Built in public for builders.',
    description:
      'Every component documented in Storybook, every decision explained in commits. Fork it, learn it, ship it.',
    actions: (
      <>
        <Button iconRight={<ArrowRight />}>Read the case study</Button>
        <Button variant="ghost">Subscribe</Button>
      </>
    ),
    decoration: (
      <div
        role="img"
        aria-label="A neubrutalist gradient block placeholder"
        style={{
          aspectRatio: '4 / 5',
          background:
            'linear-gradient(135deg, var(--ank-secondary) 0%, var(--ank-sand) 60%, var(--ank-accent) 100%)',
          border: '3px solid var(--ank-ink)',
          boxShadow: '8px 8px 0 var(--ank-shadow-color)',
        }}
      />
    ),
  },
};
