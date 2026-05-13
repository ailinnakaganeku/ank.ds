import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Select } from './Select';

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 32, maxWidth: 360 }}>
    {children}
  </div>
);

const meta = {
  title: 'ank.ds/Components/Select',
  component: Select,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    size: 'md',
    state: 'default',
    disabled: false,
    fullWidth: true,
    defaultValue: 'pro',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    state: { control: 'inline-radio', options: ['default', 'error', 'success'] },
  },
  render: (args) => (
    <Select {...args}>
      <option value="free">Free</option>
      <option value="pro">Pro</option>
      <option value="enterprise">Enterprise</option>
    </Select>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Error: Story = { args: { state: 'error' } };
export const Success: Story = { args: { state: 'success' } };
export const Disabled: Story = { args: { disabled: true } };

export const Sizes: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <Story />],
  render: () => (
    <Stack>
      <Select size="sm" defaultValue="b">
        <option value="a">Small</option>
        <option value="b">Small option</option>
      </Select>
      <Select size="md" defaultValue="b">
        <option value="a">Medium</option>
        <option value="b">Medium option</option>
      </Select>
      <Select size="lg" defaultValue="b">
        <option value="a">Large</option>
        <option value="b">Large option</option>
      </Select>
    </Stack>
  ),
};

export const States: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <Story />],
  render: () => (
    <Stack>
      <Select defaultValue="">
        <option value="" disabled>Pick a country</option>
        <option value="us">United States</option>
        <option value="ar">Argentina</option>
        <option value="jp">Japan</option>
      </Select>
      <Select state="error" defaultValue="">
        <option value="" disabled>Pick a country</option>
        <option value="us">United States</option>
      </Select>
      <Select state="success" defaultValue="us">
        <option value="us">United States</option>
      </Select>
      <Select disabled defaultValue="us">
        <option value="us">United States</option>
      </Select>
    </Stack>
  ),
};

export const Controlled: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <Story />],
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState('pro');
      return (
        <Stack>
          <Select value={value} onChange={(e) => setValue(e.target.value)}>
            <option value="free">Free</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </Select>
          <div style={{ fontFamily: 'var(--ank-mono)', fontSize: 12, color: 'var(--ank-gray-500)' }}>
            value: {value}
          </div>
        </Stack>
      );
    };
    return <Demo />;
  },
};
