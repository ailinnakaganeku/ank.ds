import type { Meta, StoryObj } from '@storybook/react';
import type { FC, ReactNode } from 'react';

const Row: FC<{ token: string; size: string; font: string; weight: number; sample: ReactNode }> = ({
  token,
  size,
  font,
  weight,
  sample,
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '180px 1fr',
      gap: 32,
      alignItems: 'baseline',
      padding: '20px 0',
      borderBottom: '1.5px solid var(--ank-gray-100)',
    }}
  >
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
        {size} · {weight} · {font}
      </div>
    </div>
    <div>{sample}</div>
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

const FamilyCard: FC<{
  name: string;
  family: string;
  weights: string;
  sample: string;
}> = ({ name, family, weights, sample }) => (
  <article
    style={{
      background: 'var(--ank-white)',
      border: '2.5px solid var(--ank-ink)',
      boxShadow: '4px 4px 0px var(--ank-shadow-color)',
      padding: 24,
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
      {name}
    </div>
    <div
      style={{
        fontFamily: family,
        fontSize: 42,
        fontWeight: 700,
        marginTop: 12,
        color: 'var(--ank-ink)',
        lineHeight: 1.1,
      }}
    >
      {sample}
    </div>
    <div
      style={{
        fontFamily: 'var(--ank-mono)',
        fontSize: 11,
        color: 'var(--ank-gray-500)',
        marginTop: 16,
        paddingTop: 16,
        borderTop: '1.5px solid var(--ank-gray-100)',
      }}
    >
      {weights}
    </div>
  </article>
);

const TypographyView: FC = () => (
  <div style={{ fontFamily: 'var(--ank-body)', padding: 48, maxWidth: 1180 }}>
    <SectionLabel>Families</SectionLabel>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 24,
      }}
    >
      <FamilyCard
        name="display"
        family="'Cormorant Garamond', Georgia, serif"
        weights="400 · 600 · 700 · 400 italic"
        sample="Aa Bb"
      />
      <FamilyCard
        name="body"
        family="'Space Grotesk', system-ui, sans-serif"
        weights="400 · 500 · 700"
        sample="Aa Bb"
      />
      <FamilyCard
        name="mono"
        family="'JetBrains Mono', monospace"
        weights="400 · 500"
        sample="Aa Bb"
      />
    </div>

    <SectionLabel>Scale</SectionLabel>
    <div>
      <Row
        token="text-hero"
        size="84px"
        weight={700}
        font="display"
        sample={
          <span style={{ fontFamily: 'var(--ank-display)', fontSize: 84, fontWeight: 700, lineHeight: 1 }}>
            Aa
          </span>
        }
      />
      <Row
        token="text-4xl"
        size="60px"
        weight={700}
        font="display"
        sample={
          <span style={{ fontFamily: 'var(--ank-display)', fontSize: 60, fontWeight: 700, lineHeight: 1.05 }}>
            The quick brown fox
          </span>
        }
      />
      <Row
        token="text-3xl"
        size="42px"
        weight={700}
        font="display"
        sample={
          <span style={{ fontFamily: 'var(--ank-display)', fontSize: 42, fontWeight: 700, lineHeight: 1.1 }}>
            The quick brown fox
          </span>
        }
      />
      <Row
        token="text-2xl"
        size="30px"
        weight={700}
        font="display"
        sample={
          <span style={{ fontFamily: 'var(--ank-display)', fontSize: 30, fontWeight: 700, lineHeight: 1.2 }}>
            The quick brown fox jumps
          </span>
        }
      />
      <Row
        token="text-xl"
        size="22px"
        weight={600}
        font="display"
        sample={
          <span style={{ fontFamily: 'var(--ank-display)', fontSize: 22, fontWeight: 600, lineHeight: 1.4 }}>
            The quick brown fox jumps over the lazy dog
          </span>
        }
      />
      <Row
        token="text-lg"
        size="18px"
        weight={500}
        font="body"
        sample={
          <span style={{ fontFamily: 'var(--ank-body)', fontSize: 18, fontWeight: 500, lineHeight: 1.5 }}>
            The quick brown fox jumps over the lazy dog
          </span>
        }
      />
      <Row
        token="text-base"
        size="15px"
        weight={400}
        font="body"
        sample={
          <span style={{ fontFamily: 'var(--ank-body)', fontSize: 15, fontWeight: 400, lineHeight: 1.6 }}>
            The quick brown fox jumps over the lazy dog
          </span>
        }
      />
      <Row
        token="text-sm"
        size="13px"
        weight={400}
        font="body"
        sample={
          <span style={{ fontFamily: 'var(--ank-body)', fontSize: 13, fontWeight: 400, lineHeight: 1.5 }}>
            The quick brown fox jumps over the lazy dog
          </span>
        }
      />
      <Row
        token="text-xs"
        size="11px"
        weight={700}
        font="body uppercase"
        sample={
          <span
            style={{
              fontFamily: 'var(--ank-body)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              lineHeight: 1.4,
            }}
          >
            Label · Tag · Eyebrow
          </span>
        }
      />
    </div>

    <SectionLabel>Italic display</SectionLabel>
    <blockquote
      style={{
        fontFamily: 'var(--ank-display)',
        fontStyle: 'italic',
        fontSize: 30,
        fontWeight: 400,
        lineHeight: 1.4,
        color: 'var(--ank-ink)',
        margin: '8px 0 0 0',
        padding: 0,
        maxWidth: 720,
      }}
    >
      The quick brown fox jumps over the lazy dog.
    </blockquote>

    <SectionLabel>Mono block</SectionLabel>
    <pre
      style={{
        fontFamily: 'var(--ank-mono)',
        fontSize: 13,
        color: 'var(--ank-ink)',
        background: 'var(--ank-surface)',
        border: '2px solid var(--ank-ink)',
        padding: 16,
        margin: '8px 0 0 0',
        lineHeight: 1.6,
        maxWidth: 480,
      }}
    >{`--ank-primary:   #1C3D4F;
--ank-secondary: #C4714A;
--ank-accent:    #4A7A5C;`}</pre>
  </div>
);

const meta: Meta = {
  title: 'ank.ds/Foundations/Typography',
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj;

export const Scale: Story = {
  render: () => <TypographyView />,
};
