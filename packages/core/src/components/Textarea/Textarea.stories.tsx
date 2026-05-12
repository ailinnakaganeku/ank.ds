import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 32, maxWidth: 480 }}>
    {children}
  </div>
);

const meta = {
  title: 'ank.ds/Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    placeholder: 'Write a message…',
    size: 'md',
    state: 'default',
    disabled: false,
    fullWidth: true,
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    state: { control: 'inline-radio', options: ['default', 'error', 'success'] },
  },
  decorators: [
    (Story) => (
      <div style={{ width: 420 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Error: Story = { args: { state: 'error', defaultValue: 'Too short.' } };
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Cannot edit this message.' } };

export const Sizes: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <Story />],
  render: () => (
    <Stack>
      <Textarea size="sm" placeholder="Small" />
      <Textarea size="md" placeholder="Medium" />
      <Textarea size="lg" placeholder="Large" />
    </Stack>
  ),
};

export const States: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <Story />],
  render: () => (
    <Stack>
      <Textarea placeholder="Default" />
      <Textarea state="error" defaultValue="Something is off." />
      <Textarea state="success" defaultValue="All set." />
      <Textarea disabled defaultValue="Disabled." />
    </Stack>
  ),
};
