import type { Meta, StoryObj } from '@storybook/react';
import type { FC, ReactNode } from 'react';

const ShadowBox: FC<{
  token: string;
  shadow: string;
  bg?: string;
}> = ({ token, shadow, bg = 'var(--ank-white)' }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
    <div
      style={{
        height: 140,
        background: bg,
        border: '2.5px solid var(--ank-ink)',
        boxShadow: shadow,
      }}
    />
    <div>
      <div
        style={{
          fontFamily: 'var(--ank-mono)',
          fontSize: 12,
          fontWeight: 500,
          color: 'var(--ank-ink)',
        }}
      >
        {token}
      </div>
      <div
        style={{
          fontFamily: 'var(--ank-mono)',
          fontSize: 11,
          color: 'var(--ank-gray-500)',
          marginTop: 4,
        }}
      >
        {shadow}
      </div>
    </div>
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
      margin: '48px 0 24px 0',
    }}
  >
    {children}
  </h3>
);

const Grid: FC<{ children: ReactNode }> = ({ children }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
      gap: 40,
    }}
  >
    {children}
  </div>
);

const ShadowsView: FC = () => (
  <div style={{ fontFamily: 'var(--ank-body)', padding: 48, maxWidth: 1180 }}>
    <SectionLabel>Default</SectionLabel>
    <Grid>
      <ShadowBox token="shadow-sm" shadow="3px 3px 0px var(--ank-shadow-color)" />
      <ShadowBox token="shadow"    shadow="4px 4px 0px var(--ank-shadow-color)" />
      <ShadowBox token="shadow-lg" shadow="6px 6px 0px var(--ank-shadow-color)" />
      <ShadowBox token="shadow-xl" shadow="8px 8px 0px var(--ank-shadow-color)" />
    </Grid>

    <SectionLabel>Color</SectionLabel>
    <Grid>
      <ShadowBox token="shadow-primary"   shadow="4px 4px 0px #1C3D4F" />
      <ShadowBox token="shadow-secondary" shadow="4px 4px 0px #C4714A" />
      <ShadowBox token="shadow-accent"    shadow="4px 4px 0px #4A7A5C" />
    </Grid>

    <SectionLabel>Press</SectionLabel>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: 24,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
        <div
          style={{
            padding: '14px 24px',
            background: 'var(--ank-primary)',
            color: 'var(--ank-white)',
            border: '2.5px solid var(--ank-ink)',
            boxShadow: '4px 4px 0px var(--ank-shadow-color)',
            fontFamily: 'var(--ank-body)',
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          default
        </div>
        <code style={{ fontFamily: 'var(--ank-mono)', fontSize: 11, color: 'var(--ank-gray-500)' }}>
          translate(0, 0) · 4px
        </code>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
        <div
          style={{
            padding: '14px 24px',
            background: 'var(--ank-primary)',
            color: 'var(--ank-white)',
            border: '2.5px solid var(--ank-ink)',
            boxShadow: '2px 2px 0px var(--ank-shadow-color)',
            transform: 'translate(1px, 1px)',
            fontFamily: 'var(--ank-body)',
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          hover
        </div>
        <code style={{ fontFamily: 'var(--ank-mono)', fontSize: 11, color: 'var(--ank-gray-500)' }}>
          translate(1px, 1px) · 2px
        </code>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
        <div
          style={{
            padding: '14px 24px',
            background: 'var(--ank-primary)',
            color: 'var(--ank-white)',
            border: '2.5px solid var(--ank-ink)',
            boxShadow: '0 0 0 var(--ank-shadow-color)',
            transform: 'translate(3px, 3px)',
            fontFamily: 'var(--ank-body)',
            fontWeight: 700,
            fontSize: 15,
          }}
        >
          active
        </div>
        <code style={{ fontFamily: 'var(--ank-mono)', fontSize: 11, color: 'var(--ank-gray-500)' }}>
          translate(3px, 3px) · 0px
        </code>
      </div>
    </div>
  </div>
);

const meta: Meta = {
  title: 'ank.ds/Foundations/Shadows',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Scale: Story = {
  render: () => <ShadowsView />,
};
