import type { Meta, StoryObj } from '@storybook/react';
import type { FC, ReactNode } from 'react';

const scale = [
  { token: 'space-1', px: 4 },
  { token: 'space-2', px: 8 },
  { token: 'space-3', px: 12 },
  { token: 'space-4', px: 16 },
  { token: 'space-5', px: 24 },
  { token: 'space-6', px: 32 },
  { token: 'space-7', px: 48 },
  { token: 'space-8', px: 64 },
  { token: 'space-9', px: 96 },
  { token: 'space-10', px: 128 },
] as const;

const Row: FC<{ token: string; px: number }> = ({ token, px }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '140px 80px 1fr',
      gap: 24,
      alignItems: 'center',
      padding: '12px 0',
      borderBottom: '1.5px solid var(--ank-gray-100)',
    }}
  >
    <div
      style={{
        fontFamily: 'var(--ank-mono)',
        fontSize: 12,
        fontWeight: 500,
        color: 'var(--ank-ink)',
      }}
    >
      --ank-{token}
    </div>
    <div
      style={{
        fontFamily: 'var(--ank-mono)',
        fontSize: 12,
        color: 'var(--ank-gray-700)',
        textAlign: 'right',
      }}
    >
      {px}px
    </div>
    <div
      style={{
        height: 18,
        width: px,
        background: 'var(--ank-secondary)',
        border: '1.5px solid var(--ank-ink)',
        boxShadow: '2px 2px 0px var(--ank-shadow-color)',
      }}
    />
  </div>
);

const SectionLabel: FC<{ children: ReactNode }> = ({ children }) => (
  <h3
    style={{
      fontFamily: 'var(--ank-body)',
      fontSize: 11,
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--ank-ink)',
      margin: '48px 0 16px 0',
    }}
  >
    {children}
  </h3>
);

const ApplicationCard: FC<{ padding: number; gap: number; pxLabel: string }> = ({
  padding,
  gap,
  pxLabel,
}) => (
  <div>
    <div
      style={{
        fontFamily: 'var(--ank-mono)',
        fontSize: 11,
        color: 'var(--ank-gray-500)',
        marginBottom: 10,
      }}
    >
      {pxLabel}
    </div>
    <div
      style={{
        background: 'var(--ank-white)',
        border: '2.5px solid var(--ank-ink)',
        boxShadow: '4px 4px 0px var(--ank-shadow-color)',
        padding,
        display: 'flex',
        flexDirection: 'column',
        gap,
      }}
    >
      <div
        style={{
          fontFamily: 'var(--ank-body)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--ank-gray-500)',
        }}
      >
        Label
      </div>
      <div style={{ fontFamily: 'var(--ank-display)', fontSize: 22, fontWeight: 600 }}>
        Card title
      </div>
      <div style={{ fontFamily: 'var(--ank-body)', fontSize: 14, color: 'var(--ank-gray-700)' }}>
        The quick brown fox jumps over the lazy dog.
      </div>
    </div>
  </div>
);

const SpacingView: FC = () => (
  <div style={{ fontFamily: 'var(--ank-body)', padding: 48, maxWidth: 1180 }}>
    <SectionLabel>Scale</SectionLabel>
    <div>
      {scale.map(({ token, px }) => (
        <Row key={token} token={token} px={px} />
      ))}
    </div>

    <SectionLabel>Application</SectionLabel>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 24,
      }}
    >
      <ApplicationCard padding={16} gap={8} pxLabel="space-4" />
      <ApplicationCard padding={24} gap={12} pxLabel="space-5" />
      <ApplicationCard padding={32} gap={16} pxLabel="space-6" />
    </div>
  </div>
);

const meta: Meta = {
  title: 'ank.ds/Foundations/Spacing',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Scale: Story = {
  render: () => <SpacingView />,
};
