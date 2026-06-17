import type { Meta, StoryObj } from '@storybook/react';
import { AutoGrid } from './AutoGrid';

const Box = ({ n }: { n: number }) => (
  <div
    style={{
      aspectRatio: '1 / 1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--ank-white)',
      border: '2.5px solid var(--ank-ink)',
      boxShadow: '4px 4px 0 var(--ank-shadow-color)',
      fontFamily: 'var(--ank-display)',
      fontSize: 56,
      fontWeight: 700,
      color: 'var(--ank-ink)',
    }}
  >
    {n}
  </div>
);

const meta = {
  title: 'ank.ds/Layout/AutoGrid',
  component: AutoGrid,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { children: 'Grid' },
} satisfies Meta<typeof AutoGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

const boxes = (n: number) => Array.from({ length: n }).map((_, i) => <Box key={i} n={i + 1} />);

export const Default: Story = {
  render: () => (
    <AutoGrid min="200px" gap="4">
      {boxes(8)}
    </AutoGrid>
  ),
};

export const Tight: Story = {
  render: () => (
    <AutoGrid min="120px" gap="3">
      {boxes(16)}
    </AutoGrid>
  ),
};

export const Wide: Story = {
  render: () => (
    <AutoGrid min="320px" gap="5">
      {boxes(4)}
    </AutoGrid>
  ),
};

export const FillVsFit: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <div
          style={{
            fontFamily: 'var(--ank-mono)',
            fontSize: 12,
            color: 'var(--ank-gray-700)',
            marginBottom: 8,
          }}
        >
          flow="fit" — empty tracks collapse, items grow to fill the row.
        </div>
        <AutoGrid flow="fit" min="200px" gap="4">
          {boxes(3)}
        </AutoGrid>
      </div>
      <div>
        <div
          style={{
            fontFamily: 'var(--ank-mono)',
            fontSize: 12,
            color: 'var(--ank-gray-700)',
            marginBottom: 8,
          }}
        >
          flow="fill" — empty tracks remain, useful for stable column count.
        </div>
        <AutoGrid flow="fill" min="200px" gap="4">
          {boxes(3)}
        </AutoGrid>
      </div>
    </div>
  ),
};
