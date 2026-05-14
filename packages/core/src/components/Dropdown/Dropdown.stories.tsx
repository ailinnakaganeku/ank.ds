import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const meta = {
  title: 'ank.ds/Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const TriggerStyle = {
  padding: '10px 16px',
  background: 'var(--ank-primary)',
  color: 'var(--ank-white)',
  border: '2.5px solid var(--ank-ink)',
  boxShadow: '4px 4px 0 var(--ank-shadow-color)',
  cursor: 'pointer',
  fontFamily: 'var(--ank-body)',
  fontWeight: 700,
  fontSize: 14,
};

export const Default: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger style={TriggerStyle}>Actions ▾</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item onSelect={() => alert('edit')}>Edit</Dropdown.Item>
        <Dropdown.Item onSelect={() => alert('duplicate')}>Duplicate</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item destructive onSelect={() => alert('delete')}>
          Delete
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const WithLabelsAndDisabled: Story = {
  render: () => (
    <Dropdown>
      <Dropdown.Trigger style={TriggerStyle}>Menu ▾</Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Label>Account</Dropdown.Label>
        <Dropdown.Item onSelect={() => {}}>Profile</Dropdown.Item>
        <Dropdown.Item onSelect={() => {}}>Settings</Dropdown.Item>
        <Dropdown.Item disabled>Billing (soon)</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Label>Workspace</Dropdown.Label>
        <Dropdown.Item onSelect={() => {}}>Team</Dropdown.Item>
        <Dropdown.Item onSelect={() => {}}>Integrations</Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item destructive onSelect={() => {}}>
          Sign out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ),
};

export const AlignEnd: Story = {
  render: () => (
    <div style={{ width: 400, display: 'flex', justifyContent: 'flex-end' }}>
      <Dropdown>
        <Dropdown.Trigger style={TriggerStyle}>Right ▾</Dropdown.Trigger>
        <Dropdown.Menu align="end">
          <Dropdown.Item onSelect={() => {}}>Option one</Dropdown.Item>
          <Dropdown.Item onSelect={() => {}}>Option two</Dropdown.Item>
          <Dropdown.Item onSelect={() => {}}>Option three</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  ),
};
