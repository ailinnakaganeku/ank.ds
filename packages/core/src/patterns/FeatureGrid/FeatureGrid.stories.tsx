import type { Meta, StoryObj } from '@storybook/react';
import { FeatureGrid } from './FeatureGrid';
import { Card } from '../../components/Card';

const Metric = ({
  label,
  value,
  variant = 'default',
}: {
  label: string;
  value: string;
  variant?: 'default' | 'primary' | 'secondary' | 'dark' | 'outlined';
}) => (
  <Card variant={variant} style={{ height: '100%' }}>
    <Card.Eyebrow>{label}</Card.Eyebrow>
    <div
      style={{
        fontFamily: 'var(--ank-display)',
        fontSize: 'clamp(56px, 6vw, 96px)',
        fontWeight: 700,
        lineHeight: 1,
        letterSpacing: '-0.02em',
        color: 'currentColor',
        marginTop: 8,
      }}
    >
      {value}
    </div>
  </Card>
);

const meta = {
  title: 'ank.ds/Patterns/FeatureGrid',
  component: FeatureGrid,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FeatureGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bento: Story = {
  args: { children: null },
  render: () => (
    <FeatureGrid>
      <FeatureGrid.Item size="lg">
        <Metric label="tests" value="241" variant="dark" />
      </FeatureGrid.Item>
      <FeatureGrid.Item size="md">
        <Metric label="components" value="26" variant="secondary" />
      </FeatureGrid.Item>
      <FeatureGrid.Item size="md">
        <Metric label="patterns" value="4" />
      </FeatureGrid.Item>
      <FeatureGrid.Item size="md">
        <Metric label="hooks" value="1" variant="outlined" />
      </FeatureGrid.Item>
      <FeatureGrid.Item size="lg">
        <Metric label="WCAG pairs" value="23/23" variant="primary" />
      </FeatureGrid.Item>
    </FeatureGrid>
  ),
};

export const WithSpotlight: Story = {
  args: { children: null },
  render: () => (
    <FeatureGrid>
      <FeatureGrid.Spotlight>
        <Card variant="dark" style={{ height: '100%' }}>
          <Card.Eyebrow>tests passing</Card.Eyebrow>
          <div
            style={{
              fontFamily: 'var(--ank-display)',
              fontSize: 'clamp(80px, 10vw, 160px)',
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: 'var(--ank-white)',
            }}
          >
            241
          </div>
        </Card>
      </FeatureGrid.Spotlight>

      <FeatureGrid.Item size="md">
        <Metric label="components" value="26" variant="secondary" />
      </FeatureGrid.Item>
      <FeatureGrid.Item size="md">
        <Metric label="patterns" value="4" />
      </FeatureGrid.Item>
      <FeatureGrid.Item size="md">
        <Metric label="contrast" value="23/23" variant="outlined" />
      </FeatureGrid.Item>
    </FeatureGrid>
  ),
};

export const ProjectShowcase: Story = {
  args: { children: null },
  render: () => (
    <FeatureGrid>
      <FeatureGrid.Spotlight>
        <Card interactive style={{ height: '100%' }}>
          <Card.Media>
            <div
              style={{
                height: 200,
                background: 'linear-gradient(135deg, var(--ank-primary), var(--ank-accent))',
              }}
            />
          </Card.Media>
          <Card.Eyebrow>2026 · in progress</Card.Eyebrow>
          <Card.Title>ank.ds</Card.Title>
        </Card>
      </FeatureGrid.Spotlight>

      <FeatureGrid.Item size="md">
        <Card interactive style={{ height: '100%' }}>
          <Card.Eyebrow>2025 · live</Card.Eyebrow>
          <Card.Title>when is my meeting</Card.Title>
        </Card>
      </FeatureGrid.Item>

      <FeatureGrid.Item size="md">
        <Card interactive style={{ height: '100%' }}>
          <Card.Eyebrow>2025 · template</Card.Eyebrow>
          <Card.Title>portfolio template</Card.Title>
        </Card>
      </FeatureGrid.Item>

      <FeatureGrid.Item size="md">
        <Card variant="secondary" style={{ height: '100%' }}>
          <Card.Eyebrow>about</Card.Eyebrow>
          <Card.Title>Frontend engineer</Card.Title>
        </Card>
      </FeatureGrid.Item>
    </FeatureGrid>
  ),
};

export const FourColumns: Story = {
  args: { children: null },
  render: () => (
    <FeatureGrid columns={4}>
      <FeatureGrid.Item>
        <Metric label="speed" value="0.3s" />
      </FeatureGrid.Item>
      <FeatureGrid.Item>
        <Metric label="bundle" value="14kb" variant="secondary" />
      </FeatureGrid.Item>
      <FeatureGrid.Item>
        <Metric label="uptime" value="99.9" variant="primary" />
      </FeatureGrid.Item>
      <FeatureGrid.Item>
        <Metric label="rating" value="4.9" variant="outlined" />
      </FeatureGrid.Item>
    </FeatureGrid>
  ),
};
