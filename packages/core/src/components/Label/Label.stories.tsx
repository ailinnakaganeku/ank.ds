import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta = {
  title: 'ank.ds/Components/Label',
  component: Label,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    children: 'Email',
    required: false,
    disabled: false,
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Required: Story = { args: { required: true } };
export const Disabled: Story = { args: { disabled: true } };

export const AllStates: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 32 }}>
      <Label>Email</Label>
      <Label required>Email</Label>
      <Label disabled>Email</Label>
      <Label htmlFor="demo">Tied to input</Label>
    </div>
  ),
};
