import type { Meta, StoryObj } from '@storybook/react';
import { FieldWrapper } from './FieldWrapper';
import { Input } from '../Input';
import { Textarea } from '../Textarea';

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 32, maxWidth: 420 }}>
    {children}
  </div>
);

const meta = {
  title: 'ank.ds/Components/FieldWrapper',
  component: FieldWrapper,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 360 }}>
        <Story />
      </div>
    ),
  ],
  args: { label: 'Label', children: 'Field' },
} satisfies Meta<typeof FieldWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInput: Story = {
  args: {
    label: 'Email',
    helper: 'We never share your email.',
    children: <Input type="email" placeholder="you@example.com" />,
  },
};

export const Required: Story = {
  args: {
    label: 'Email',
    required: true,
    children: <Input type="email" placeholder="you@example.com" />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    error: 'Password must be at least 8 characters.',
    children: <Input type="password" defaultValue="abc" />,
  },
};

export const WithTextarea: Story = {
  args: {
    label: 'Message',
    helper: 'Keep it under 500 characters.',
    children: <Textarea placeholder="Write a message…" />,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Username',
    helper: 'You cannot change this.',
    disabled: true,
    children: <Input defaultValue="ailinnakaganeku" />,
  },
};

export const FormExample: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <Story />],
  render: () => (
    <Stack>
      <FieldWrapper label="Full name" required>
        <Input placeholder="First Last" />
      </FieldWrapper>

      <FieldWrapper label="Email" required helper="We never share your email.">
        <Input type="email" placeholder="you@example.com" />
      </FieldWrapper>

      <FieldWrapper label="Password" required error="Password must be at least 8 characters.">
        <Input type="password" defaultValue="abc" />
      </FieldWrapper>

      <FieldWrapper label="Bio" helper="A short paragraph about you.">
        <Textarea placeholder="Tell us a bit about yourself." />
      </FieldWrapper>

      <FieldWrapper label="Company" disabled helper="Tied to your account.">
        <Input defaultValue="ank.ds" />
      </FieldWrapper>
    </Stack>
  ),
};
