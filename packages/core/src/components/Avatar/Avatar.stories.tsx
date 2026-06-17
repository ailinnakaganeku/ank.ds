import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'ank.ds/Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { size: 'md', tone: 'neutral', children: 'AB' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
    tone: { control: 'select', options: ['neutral', 'primary', 'secondary', 'accent', 'sand'] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InitialsFallback: Story = {
  render: (args) => (
    <Avatar {...args}>
      <Avatar.Fallback>AL</Avatar.Fallback>
    </Avatar>
  ),
};

export const WithImage: Story = {
  render: (args) => (
    <Avatar {...args}>
      <Avatar.Image
        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop"
        alt="Ada Lovelace"
      />
      <Avatar.Fallback>AL</Avatar.Fallback>
    </Avatar>
  ),
};

export const FailedImageFallsBack: Story = {
  render: (args) => (
    <Avatar {...args}>
      <Avatar.Image src="https://does-not-exist.example.com/avatar.jpg" alt="Ada Lovelace" />
      <Avatar.Fallback>AL</Avatar.Fallback>
    </Avatar>
  ),
};

export const Sizes: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: 32 }}>
      <Avatar size="sm" tone="primary">
        <Avatar.Fallback>S</Avatar.Fallback>
      </Avatar>
      <Avatar size="md" tone="secondary">
        <Avatar.Fallback>M</Avatar.Fallback>
      </Avatar>
      <Avatar size="lg" tone="accent">
        <Avatar.Fallback>L</Avatar.Fallback>
      </Avatar>
      <Avatar size="xl" tone="sand">
        <Avatar.Fallback>XL</Avatar.Fallback>
      </Avatar>
    </div>
  ),
};

export const Tones: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, padding: 32 }}>
      {(['neutral', 'primary', 'secondary', 'accent', 'sand'] as const).map((tone) => (
        <Avatar key={tone} tone={tone}>
          <Avatar.Fallback>{tone[0].toUpperCase()}</Avatar.Fallback>
        </Avatar>
      ))}
    </div>
  ),
};
