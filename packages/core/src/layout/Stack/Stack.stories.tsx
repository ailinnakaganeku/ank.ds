import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';

const Item = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      padding: 16,
      background: 'var(--ank-surface)',
      border: '2.5px solid var(--ank-ink)',
      fontFamily: 'var(--ank-body)',
    }}
  >
    {children}
  </div>
);

const meta = {
  title: 'ank.ds/Layout/Stack',
  component: Stack,
  tags: ['autodocs'],
  parameters: { layout: 'padded' },
  args: { children: 'Stack' },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Stack gap="4">
      <Item>One</Item>
      <Item>Two</Item>
      <Item>Three</Item>
    </Stack>
  ),
};

export const TightThenLoose: Story = {
  render: () => (
    <Stack gap="2">
      <Item>Tight stack — gap=2 (8px)</Item>
      <Item>Item</Item>
      <Item>Item</Item>
    </Stack>
  ),
};

export const Divided: Story = {
  render: () => (
    <Stack gap="4" divided>
      <Item>Divided sections share a 2px ink rule.</Item>
      <Item>Item two</Item>
      <Item>Item three</Item>
    </Stack>
  ),
};

export const Centered: Story = {
  render: () => (
    <Stack gap="3" align="center">
      <Item>Centered</Item>
      <Item>Aligned center</Item>
    </Stack>
  ),
};
