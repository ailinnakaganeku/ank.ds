import type { Meta, StoryObj } from '@storybook/react';
import { Badge } from './Badge';

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
    {children}
  </div>
);

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 32 }}>
    {children}
  </div>
);

const meta = {
  title: 'ank.ds/Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    children: 'Live',
    variant: 'outline',
    size: 'md',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'sand', 'success', 'warning', 'error', 'outline', 'dark'],
    },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Primary: Story   = { args: { variant: 'primary',   children: 'Primary' } };
export const Secondary: Story = { args: { variant: 'secondary', children: 'New' } };
export const Accent: Story    = { args: { variant: 'accent',    children: 'Live' } };
export const Sand: Story      = { args: { variant: 'sand',      children: 'Beta' } };
export const Success: Story   = { args: { variant: 'success',   children: 'Active' } };
export const Warning: Story   = { args: { variant: 'warning',   children: 'Pending' } };
export const Error: Story     = { args: { variant: 'error',     children: 'Failed' } };
export const Dark: Story      = { args: { variant: 'dark',      children: 'v1.0' } };

export const AllVariants: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Stack>
      <Row>
        <Badge variant="primary">Primary</Badge>
        <Badge variant="secondary">Secondary</Badge>
        <Badge variant="accent">Accent</Badge>
        <Badge variant="sand">Sand</Badge>
        <Badge variant="outline">Outline</Badge>
        <Badge variant="dark">Dark</Badge>
      </Row>
      <Row>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
      </Row>
    </Stack>
  ),
};

export const Sizes: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Stack>
      <Row>
        <Badge size="sm" variant="primary">Small</Badge>
        <Badge size="md" variant="primary">Medium</Badge>
      </Row>
      <Row>
        <Badge size="sm" variant="dark">v0.1</Badge>
        <Badge size="md" variant="dark">v0.1</Badge>
      </Row>
    </Stack>
  ),
};
