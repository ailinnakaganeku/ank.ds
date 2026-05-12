import type { Meta, StoryObj } from '@storybook/react';
import type { FC, ReactNode } from 'react';

const Swatch: FC<{ name: string; value: string }> = ({ name, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
    <div
      style={{
        width: '100%',
        height: 110,
        background: value,
        border: '2.5px solid var(--ank-ink)',
        boxShadow: '4px 4px 0px var(--ank-shadow-color)',
      }}
    />
    <div>
      <div
        style={{
          fontFamily: 'var(--ank-body)',
          fontSize: 13,
          fontWeight: 700,
          color: 'var(--ank-ink)',
          lineHeight: 1.3,
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: 'var(--ank-mono)',
          fontSize: 11,
          color: 'var(--ank-gray-700)',
          marginTop: 2,
        }}
      >
        {value}
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
      margin: '0 0 20px 0',
    }}
  >
    {children}
  </h3>
);

const Section: FC<{ title: string; children: ReactNode }> = ({ title, children }) => (
  <section style={{ marginBottom: 56 }}>
    <SectionLabel>{title}</SectionLabel>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: 24,
      }}
    >
      {children}
    </div>
  </section>
);

const ColorsView: FC = () => (
  <div style={{ fontFamily: 'var(--ank-body)', padding: 48, maxWidth: 1180 }}>
    <Section title="Primary">
      <Swatch name="primary-dark" value="#0F2535" />
      <Swatch name="primary" value="#1C3D4F" />
      <Swatch name="primary-light" value="#2E5870" />
      <Swatch name="secondary-dark" value="#A05838" />
      <Swatch name="secondary" value="#C4714A" />
      <Swatch name="secondary-light" value="#D68E6A" />
      <Swatch name="accent-dark" value="#345847" />
      <Swatch name="accent" value="#4A7A5C" />
      <Swatch name="accent-light" value="#629E77" />
      <Swatch name="sand-dark" value="#B89B78" />
      <Swatch name="sand" value="#D4B896" />
      <Swatch name="sand-light" value="#E8D5B5" />
    </Section>

    <Section title="Neutrals">
      <Swatch name="ink" value="#0D0F0E" />
      <Swatch name="ink-soft" value="#1A1C1B" />
      <Swatch name="gray-900" value="#2C2E2D" />
      <Swatch name="gray-700" value="#4A4C4B" />
      <Swatch name="gray-500" value="#6E706F" />
      <Swatch name="gray-300" value="#A8AAAA" />
      <Swatch name="gray-100" value="#D8DADA" />
    </Section>

    <Section title="Surfaces">
      <Swatch name="bg" value="#F7F3ED" />
      <Swatch name="surface" value="#EEE9E1" />
      <Swatch name="surface-raised" value="#F2EDE5" />
      <Swatch name="white" value="#FDFAF6" />
    </Section>

    <Section title="Semantic">
      <Swatch name="success" value="#3D6B4A" />
      <Swatch name="success-bg" value="#EBF4EE" />
      <Swatch name="warning" value="#C9973A" />
      <Swatch name="warning-bg" value="#FDF6E8" />
      <Swatch name="error" value="#B85C3A" />
      <Swatch name="error-bg" value="#FDF0EC" />
      <Swatch name="info" value="#1C3D4F" />
      <Swatch name="info-bg" value="#E8EFF3" />
    </Section>
  </div>
);

const meta: Meta = {
  title: 'ank.ds/Foundations/Colors',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Palette: Story = {
  render: () => <ColorsView />,
};
