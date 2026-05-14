import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta = {
  title: 'ank.ds/Layout/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  argTypes: {
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg', 'xl', 'full'] },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

const Sample = ({ label }: { label: string }) => (
  <div
    style={{
      border: '2.5px solid var(--ank-ink)',
      background: 'var(--ank-surface)',
      padding: 24,
      fontFamily: 'var(--ank-body)',
      fontSize: 14,
    }}
  >
    {label}
  </div>
);

export const Default: Story = {
  render: () => (
    <Container>
      <Sample label="Default container (size=lg, 1280px max)" />
    </Container>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '32px 0' }}>
      {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
        <Container key={size} size={size}>
          <Sample label={`size=${size}`} />
        </Container>
      ))}
    </div>
  ),
};

export const FlushOnMobile: Story = {
  render: () => (
    <Container flush>
      <Sample label="flush — no horizontal padding (useful when child has its own)" />
    </Container>
  ),
};
