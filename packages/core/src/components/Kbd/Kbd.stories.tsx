import type { Meta, StoryObj } from '@storybook/react';
import { Kbd } from './Kbd';

const meta = {
  title: 'ank.ds/Components/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { children: 'K' },
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Combination: Story = {
  render: () => (
    <div style={{ fontFamily: 'var(--ank-body)', fontSize: 14 }}>
      Press <Kbd>⌘</Kbd><Kbd>K</Kbd> to open the command palette.
    </div>
  ),
};

export const InlineWithText: Story = {
  render: () => (
    <p style={{ fontFamily: 'var(--ank-body)', fontSize: 15, maxWidth: 420 }}>
      Move between fields with <Kbd>Tab</Kbd> or jump directly with
      {' '}<Kbd>⌘</Kbd><Kbd>1</Kbd> through <Kbd>⌘</Kbd><Kbd>9</Kbd>.
    </p>
  ),
};
