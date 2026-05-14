import type { Meta, StoryObj } from '@storybook/react';
import { Popover } from './Popover';
import { Button } from '../Button';
import { Input } from '../Input';
import { FieldWrapper } from '../FieldWrapper';

const meta = {
  title: 'ank.ds/Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

const TriggerButton = ({ children }: { children: React.ReactNode }) => (
  <Popover.Trigger
    style={{
      padding: '10px 16px',
      background: 'var(--ank-primary)',
      color: 'var(--ank-white)',
      border: '2.5px solid var(--ank-ink)',
      boxShadow: '4px 4px 0 var(--ank-shadow-color)',
      cursor: 'pointer',
      fontFamily: 'var(--ank-body)',
      fontWeight: 700,
      fontSize: 14,
    }}
  >
    {children}
  </Popover.Trigger>
);

export const Default: Story = {
  render: () => (
    <Popover>
      <TriggerButton>Open</TriggerButton>
      <Popover.Content>
        <div style={{ fontFamily: 'var(--ank-body)', fontSize: 14 }}>
          A popover holds quick actions or contextual info. Press Escape or click outside to dismiss.
        </div>
      </Popover.Content>
    </Popover>
  ),
};

export const WithForm: Story = {
  render: () => (
    <Popover>
      <TriggerButton>Filter</TriggerButton>
      <Popover.Content side="bottom" align="start">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 240 }}>
          <FieldWrapper label="Search">
            <Input placeholder="Find..." />
          </FieldWrapper>
          <Button size="sm">Apply</Button>
        </div>
      </Popover.Content>
    </Popover>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', gap: 24, padding: 80 }}>
      {(['top', 'right', 'bottom', 'left'] as const).map((side) => (
        <Popover key={side}>
          <TriggerButton>{side}</TriggerButton>
          <Popover.Content side={side}>
            <div style={{ fontFamily: 'var(--ank-body)' }}>side: {side}</div>
          </Popover.Content>
        </Popover>
      ))}
    </div>
  ),
};
