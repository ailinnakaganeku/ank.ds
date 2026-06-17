import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Checkbox } from './Checkbox';

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 32 }}>{children}</div>
);

const meta = {
  title: 'ank.ds/Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    children: 'Accept terms',
    size: 'md',
    disabled: false,
    indeterminate: false,
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = { args: { indeterminate: true, defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const DisabledChecked: Story = { args: { disabled: true, defaultChecked: true } };

export const Sizes: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Stack>
      <Checkbox size="sm">Small</Checkbox>
      <Checkbox size="md">Medium</Checkbox>
      <Checkbox size="lg">Large</Checkbox>
    </Stack>
  ),
};

export const Controlled: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => {
    const Demo = () => {
      const [checked, setChecked] = useState(false);
      return (
        <Stack>
          <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>
            Subscribe to updates
          </Checkbox>
          <div
            style={{ fontFamily: 'var(--ank-mono)', fontSize: 12, color: 'var(--ank-gray-500)' }}
          >
            checked: {String(checked)}
          </div>
        </Stack>
      );
    };
    return <Demo />;
  },
};

export const ChecklistExample: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => {
    const Demo = () => {
      const [items, setItems] = useState([
        { id: 'a', label: 'Set up monorepo', done: true },
        { id: 'b', label: 'Add design tokens', done: true },
        { id: 'c', label: 'Build Button', done: true },
        { id: 'd', label: 'Build form primitives', done: true },
        { id: 'e', label: 'Build Select, Checkbox, Radio, Toggle', done: false },
      ]);
      return (
        <Stack>
          {items.map((item) => (
            <Checkbox
              key={item.id}
              checked={item.done}
              onChange={(e) =>
                setItems((prev) =>
                  prev.map((it) => (it.id === item.id ? { ...it, done: e.target.checked } : it)),
                )
              }
            >
              {item.label}
            </Checkbox>
          ))}
        </Stack>
      );
    };
    return <Demo />;
  },
};
