import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const Stack = ({ children, maxWidth = 360 }: { children: React.ReactNode; maxWidth?: number }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 32, maxWidth }}>
    {children}
  </div>
);

const meta = {
  title: 'ank.ds/Components/Input',
  component: Input,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    placeholder: 'you@example.com',
    size: 'md',
    state: 'default',
    disabled: false,
    fullWidth: true,
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    state: { control: 'inline-radio', options: ['default', 'error', 'success'] },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search', 'url', 'tel'],
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 320 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Error: Story = { args: { state: 'error', defaultValue: 'not-an-email' } };
export const Success: Story = { args: { state: 'success', defaultValue: 'hello@ank.ds' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'cannot edit' } };

export const Sizes: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <Story />],
  render: () => (
    <Stack>
      <Input size="sm" placeholder="Small (32px)" />
      <Input size="md" placeholder="Medium (42px)" />
      <Input size="lg" placeholder="Large (52px)" />
    </Stack>
  ),
};

export const States: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <Story />],
  render: () => (
    <Stack>
      <Input placeholder="Default" />
      <Input state="error" defaultValue="Invalid value" />
      <Input state="success" defaultValue="Looks good" />
      <Input disabled defaultValue="Disabled" />
    </Stack>
  ),
};

export const Types: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <Story />],
  render: () => (
    <Stack>
      <Input type="text" placeholder="Text" />
      <Input type="email" placeholder="you@example.com" />
      <Input type="password" placeholder="••••••••" defaultValue="secret123" />
      <Input type="number" placeholder="42" />
      <Input type="search" placeholder="Search" />
      <Input type="url" placeholder="https://" />
      <Input type="tel" placeholder="+1 555 010 2030" />
    </Stack>
  ),
};
