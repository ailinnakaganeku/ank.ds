import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const ArrowRight = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

const Plus = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M7 2v10M2 7h10" strokeLinecap="square" />
  </svg>
);

const Download = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M7 2v8M3 7l4 4 4-4M2 13h10" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);

const Row = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>{children}</div>
);

const Stack = ({ children, gap = 24 }: { children: React.ReactNode; gap?: number }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap, padding: 32 }}>{children}</div>
);

const meta = {
  title: 'ank.ds/Components/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    disabled: false,
    fullWidth: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'sand', 'ghost', 'danger'],
    },
    size: {
      control: 'inline-radio',
      options: ['sm', 'md', 'lg'],
    },
    onClick: { action: 'clicked' },
    iconLeft: { control: false },
    iconRight: { control: false },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Accent: Story = { args: { variant: 'accent' } };
export const Sand: Story = { args: { variant: 'sand' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Danger: Story = { args: { variant: 'danger' } };

export const AllVariants: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Stack>
      <Row>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="accent">Accent</Button>
        <Button variant="sand">Sand</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="danger">Danger</Button>
      </Row>
    </Stack>
  ),
};

export const AllSizes: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Stack>
      <Row>
        <Button size="sm">Small</Button>
        <Button size="md">Medium</Button>
        <Button size="lg">Large</Button>
      </Row>
      <Row>
        <Button size="sm" variant="sand">
          Small
        </Button>
        <Button size="md" variant="sand">
          Medium
        </Button>
        <Button size="lg" variant="sand">
          Large
        </Button>
      </Row>
      <Row>
        <Button size="sm" variant="ghost">
          Small
        </Button>
        <Button size="md" variant="ghost">
          Medium
        </Button>
        <Button size="lg" variant="ghost">
          Large
        </Button>
      </Row>
    </Stack>
  ),
};

export const WithIcons: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Stack>
      <Row>
        <Button iconRight={<ArrowRight />}>Continue</Button>
        <Button variant="secondary" iconRight={<ArrowRight />}>
          Continue
        </Button>
        <Button variant="ghost" iconRight={<ArrowRight />}>
          Continue
        </Button>
      </Row>
      <Row>
        <Button iconLeft={<Plus />}>New</Button>
        <Button variant="accent" iconLeft={<Download />}>
          Download
        </Button>
        <Button variant="danger" iconLeft={<Plus />}>
          Add alert
        </Button>
      </Row>
      <Row>
        <Button size="sm" iconRight={<ArrowRight />}>
          Small
        </Button>
        <Button size="md" iconRight={<ArrowRight />}>
          Medium
        </Button>
        <Button size="lg" iconRight={<ArrowRight />}>
          Large
        </Button>
      </Row>
    </Stack>
  ),
};

export const IconOnly: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Stack>
      <Row>
        <Button size="sm" iconLeft={<Plus />} aria-label="Add" />
        <Button size="md" iconLeft={<Plus />} aria-label="Add" />
        <Button size="lg" iconLeft={<Plus />} aria-label="Add" />
        <Button size="md" variant="ghost" iconLeft={<Plus />} aria-label="Add" />
        <Button size="md" variant="danger" iconLeft={<Plus />} aria-label="Remove" />
      </Row>
    </Stack>
  ),
};

export const Disabled: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Stack>
      <Row>
        <Button disabled>Primary</Button>
        <Button disabled variant="secondary">
          Secondary
        </Button>
        <Button disabled variant="accent">
          Accent
        </Button>
        <Button disabled variant="sand">
          Sand
        </Button>
        <Button disabled variant="ghost">
          Ghost
        </Button>
        <Button disabled variant="danger">
          Danger
        </Button>
      </Row>
    </Stack>
  ),
};

export const FullWidth: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ padding: 32, maxWidth: 420 }}>
      <Stack gap={12}>
        <Button fullWidth iconRight={<ArrowRight />}>
          Continue
        </Button>
        <Button fullWidth variant="ghost">
          Cancel
        </Button>
      </Stack>
    </div>
  ),
};
