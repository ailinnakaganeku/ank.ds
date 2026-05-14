import type { Meta, StoryObj } from '@storybook/react';
import { Spinner } from './Spinner';

const meta = {
  title: 'ank.ds/Components/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { size: 'md', variant: 'ink', label: 'Loading', showLabel: false },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    variant: { control: 'select', options: ['ink', 'primary', 'secondary', 'accent', 'white'] },
  },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLabel: Story = {
  args: { showLabel: true, label: 'Saving' },
};

export const Sizes: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 32, padding: 32 }}>
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  ),
};

export const Variants: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: 32 }}>
      <Spinner variant="ink" />
      <Spinner variant="primary" />
      <Spinner variant="secondary" />
      <Spinner variant="accent" />
      <span style={{ background: 'var(--ank-ink)', padding: 12, display: 'inline-flex' }}>
        <Spinner variant="white" />
      </span>
    </div>
  ),
};

export const InsideButton: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ padding: 32 }}>
      <button
        type="button"
        disabled
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          padding: '12px 18px',
          background: 'var(--ank-primary)',
          color: 'var(--ank-white)',
          border: '2.5px solid var(--ank-ink)',
          boxShadow: '4px 4px 0 var(--ank-shadow-color)',
          fontFamily: 'var(--ank-body)',
          fontWeight: 700,
          fontSize: 15,
        }}
      >
        <Spinner size="sm" variant="white" label="Saving" />
        Saving
      </button>
    </div>
  ),
};
