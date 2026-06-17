import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Radio } from './Radio';

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: 32 }}>{children}</div>
);

const meta = {
  title: 'ank.ds/Components/Radio',
  component: Radio,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    children: 'Option',
    size: 'md',
    disabled: false,
    name: 'demo',
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const DisabledChecked: Story = { args: { disabled: true, defaultChecked: true } };

export const Sizes: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Stack>
      <Radio name="size-demo" size="sm">
        Small
      </Radio>
      <Radio name="size-demo" size="md">
        Medium
      </Radio>
      <Radio name="size-demo" size="lg">
        Large
      </Radio>
    </Stack>
  ),
};

export const Group: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => {
    const Demo = () => {
      const [plan, setPlan] = useState('pro');
      return (
        <Stack>
          {(['free', 'pro', 'enterprise'] as const).map((value) => (
            <Radio
              key={value}
              name="plan"
              value={value}
              checked={plan === value}
              onChange={(e) => setPlan(e.target.value)}
            >
              {value[0].toUpperCase() + value.slice(1)}
            </Radio>
          ))}
          <div
            style={{
              fontFamily: 'var(--ank-mono)',
              fontSize: 12,
              color: 'var(--ank-gray-500)',
              marginTop: 8,
            }}
          >
            selected: {plan}
          </div>
        </Stack>
      );
    };
    return <Demo />;
  },
};
