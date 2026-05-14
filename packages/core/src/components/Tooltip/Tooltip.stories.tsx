import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
import { Button } from '../Button';

const meta = {
  title: 'ank.ds/Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="4" y="4" width="8" height="8" />
    <path d="M2 10V2h8" />
  </svg>
);

export const Default: Story = {
  render: () => (
    <Tooltip content="Copy to clipboard">
      <Button iconLeft={<CopyIcon />} aria-label="Copy" />
    </Tooltip>
  ),
};

export const Sides: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 32, padding: 64 }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Tooltip key={side} content={`Side: ${side}`} side={side}>
          <Button>{side}</Button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const NoDelay: Story = {
  render: () => (
    <Tooltip content="Instant tooltip" delayMs={0}>
      <Button>Hover me</Button>
    </Tooltip>
  ),
};
