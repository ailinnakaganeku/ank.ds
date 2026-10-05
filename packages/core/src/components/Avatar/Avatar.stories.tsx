import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'ank.ds/Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: { size: 'md', tone: 'neutral', alt: 'Ada Lovelace', fallback: 'AL' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl'] },
    tone: { control: 'select', options: ['neutral', 'primary', 'secondary', 'accent', 'sand'] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const InitialsFallback: Story = {};

export const WithImage: Story = {
  args: {
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop',
  },
};

export const FailedImageFallsBack: Story = {
  args: { src: 'https://does-not-exist.example.com/avatar.jpg' },
};

export const Sizes: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20, padding: 32 }}>
      <Avatar size="sm" tone="primary" alt="Small" fallback="S" />
      <Avatar size="md" tone="secondary" alt="Medium" fallback="M" />
      <Avatar size="lg" tone="accent" alt="Large" fallback="L" />
      <Avatar size="xl" tone="sand" alt="Extra large" fallback="XL" />
    </div>
  ),
};

export const Tones: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => (
    <div style={{ display: 'flex', gap: 16, padding: 32 }}>
      {(['neutral', 'primary', 'secondary', 'accent', 'sand'] as const).map((tone) => (
        <Avatar key={tone} tone={tone} alt={tone} fallback={tone.charAt(0).toUpperCase()} />
      ))}
    </div>
  ),
};
