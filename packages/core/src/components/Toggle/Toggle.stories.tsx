import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Toggle } from './Toggle';

const Stack = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: 32 }}>
    {children}
  </div>
);

const meta = {
  title: 'ank.ds/Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    children: 'Enable notifications',
    size: 'md',
    disabled: false,
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const On: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };
export const DisabledOn: Story = { args: { disabled: true, defaultChecked: true } };

export const Sizes: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <Stack>
      <Toggle size="sm" defaultChecked>Small</Toggle>
      <Toggle size="md" defaultChecked>Medium</Toggle>
      <Toggle size="lg" defaultChecked>Large</Toggle>
    </Stack>
  ),
};

export const SettingsList: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => {
    const Demo = () => {
      const [settings, setSettings] = useState({
        notifications: true,
        marketing: false,
        beta: true,
        twoFactor: false,
      });
      const toggle = (key: keyof typeof settings) =>
        setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
      return (
        <Stack>
          <Toggle checked={settings.notifications} onChange={() => toggle('notifications')}>
            Email notifications
          </Toggle>
          <Toggle checked={settings.marketing} onChange={() => toggle('marketing')}>
            Marketing updates
          </Toggle>
          <Toggle checked={settings.beta} onChange={() => toggle('beta')}>
            Beta features
          </Toggle>
          <Toggle checked={settings.twoFactor} onChange={() => toggle('twoFactor')}>
            Two-factor authentication
          </Toggle>
        </Stack>
      );
    };
    return <Demo />;
  },
};
