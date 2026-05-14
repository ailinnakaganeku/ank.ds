import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Progress } from './Progress';

const meta = {
  title: 'ank.ds/Components/Progress',
  component: Progress,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    value: 50,
    max: 100,
    indeterminate: false,
    size: 'md',
    variant: 'primary',
    label: 'Uploading',
    showValue: true,
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'accent', 'success', 'warning', 'error'],
    },
  },
  decorators: [(Story) => <div style={{ width: 360 }}><Story /></div>],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Determinate: Story = {};

export const WithoutLabel: Story = {
  args: { label: undefined, showValue: false, 'aria-label': 'Sync progress' },
};

export const Indeterminate: Story = {
  args: { indeterminate: true, label: 'Working', showValue: false },
};

export const Sizes: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <Story />],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, padding: 32, maxWidth: 360 }}>
      <Progress size="sm" value={30} label="Small" showValue />
      <Progress size="md" value={60} label="Medium" showValue />
      <Progress size="lg" value={90} label="Large" showValue />
    </div>
  ),
};

export const Variants: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <Story />],
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, padding: 32, maxWidth: 360 }}>
      {(['primary', 'secondary', 'accent', 'success', 'warning', 'error'] as const).map((variant) => (
        <Progress key={variant} variant={variant} value={70} label={variant} showValue />
      ))}
    </div>
  ),
};

export const Live: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <Story />],
  render: () => {
    const Demo = () => {
      const [value, setValue] = useState(0);
      useEffect(() => {
        const id = window.setInterval(() => {
          setValue((v) => (v >= 100 ? 0 : v + 5));
        }, 200);
        return () => window.clearInterval(id);
      }, []);
      return (
        <div style={{ padding: 32, maxWidth: 360 }}>
          <Progress value={value} label="Uploading" showValue />
        </div>
      );
    };
    return <Demo />;
  },
};
