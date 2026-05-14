import type { Meta, StoryObj } from '@storybook/react';
import { Separator } from './Separator';

const meta = {
  title: 'ank.ds/Components/Separator',
  component: Separator,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { orientation: 'horizontal', decorative: true },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
  },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div style={{ width: 360, fontFamily: 'var(--ank-body)' }}>
      <p style={{ margin: 0 }}>Above</p>
      <Separator />
      <p style={{ margin: 0 }}>Below</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, height: 60, fontFamily: 'var(--ank-body)' }}>
      <span>Left</span>
      <Separator orientation="vertical" />
      <span>Middle</span>
      <Separator orientation="vertical" />
      <span>Right</span>
    </div>
  ),
};

export const Semantic: Story = {
  render: () => (
    <div style={{ width: 360, fontFamily: 'var(--ank-body)' }}>
      <p style={{ margin: 0 }}>Section A</p>
      <Separator decorative={false} aria-label="End of section A" />
      <p style={{ margin: 0 }}>Section B</p>
    </div>
  ),
};
