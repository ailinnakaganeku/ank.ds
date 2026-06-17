import type { Meta, StoryObj } from '@storybook/react';
import {
  Icon,
  CheckIcon,
  WarningIcon,
  ErrorIcon,
  InfoIcon,
  CloseIcon,
  MenuIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CaretDownIcon,
} from './';

const meta = {
  title: 'ank.ds/Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { size: 24, viewBox: '0 0 14 14' },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

const entries = [
  ['CheckIcon', CheckIcon],
  ['WarningIcon', WarningIcon],
  ['ErrorIcon', ErrorIcon],
  ['InfoIcon', InfoIcon],
  ['CloseIcon', CloseIcon],
  ['MenuIcon', MenuIcon],
  ['ChevronLeftIcon', ChevronLeftIcon],
  ['ChevronRightIcon', ChevronRightIcon],
  ['CaretDownIcon', CaretDownIcon],
] as const;

export const Gallery: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, padding: 32 }}>
      {entries.map(([name, IconComponent]) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            fontFamily: 'var(--ank-mono)',
            fontSize: 12,
          }}
        >
          <IconComponent size={28} />
          <span>{name}</span>
        </div>
      ))}
    </div>
  ),
};
