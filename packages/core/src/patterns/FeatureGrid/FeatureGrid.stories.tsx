import type { Meta, StoryObj } from '@storybook/react';
import { FeatureGrid } from './FeatureGrid';
import { Card } from '../../components/Card';
import { Badge } from '../../components/Badge';
import { Button } from '../../components/Button';

const meta = {
  title: 'ank.ds/Patterns/FeatureGrid',
  component: FeatureGrid,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof FeatureGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bento: Story = {
  render: () => (
    <FeatureGrid>
      <FeatureGrid.Item size="lg">
        <Card variant="dark" style={{ height: '100%' }}>
          <Card.Eyebrow>headline</Card.Eyebrow>
          <Card.Title>Components that test green.</Card.Title>
          <Card.Description>
            30 primitives audited for ARIA, contrast, keyboard. Tested with React
            Testing Library and jest-axe.
          </Card.Description>
          <Card.Footer>
            <Button size="sm" variant="sand">Explore the library</Button>
          </Card.Footer>
        </Card>
      </FeatureGrid.Item>

      <FeatureGrid.Item size="md">
        <Card variant="secondary" style={{ height: '100%' }}>
          <Card.Eyebrow>tokens</Card.Eyebrow>
          <Card.Title>Refined palette.</Card.Title>
          <Card.Description>Tierra, mar y arena. WCAG AA verified.</Card.Description>
        </Card>
      </FeatureGrid.Item>

      <FeatureGrid.Item size="md">
        <Card style={{ height: '100%' }}>
          <Card.Eyebrow>dark mode</Card.Eyebrow>
          <Card.Title>One token flips it.</Card.Title>
          <Card.Description>
            Shadows turn terracotta — the signature of the dark mode.
          </Card.Description>
        </Card>
      </FeatureGrid.Item>

      <FeatureGrid.Item size="md">
        <Card variant="outlined" style={{ height: '100%' }}>
          <Card.Eyebrow>typescript</Card.Eyebrow>
          <Card.Title>Full types.</Card.Title>
          <Card.Description>
            Discriminated props. No <code>any</code>. Clean autocompletion.
          </Card.Description>
        </Card>
      </FeatureGrid.Item>

      <FeatureGrid.Item size="lg">
        <Card variant="primary" style={{ height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Card.Eyebrow>open source</Card.Eyebrow>
            <Badge variant="sand" size="sm">MIT</Badge>
          </div>
          <Card.Title>Free to fork.</Card.Title>
          <Card.Description>
            Everything is on GitHub. Decisions live in the commits, not in a
            private Notion.
          </Card.Description>
          <Card.Footer>
            <Button size="sm" variant="sand">See the repo</Button>
          </Card.Footer>
        </Card>
      </FeatureGrid.Item>
    </FeatureGrid>
  ),
};

export const WithSpotlight: Story = {
  render: () => (
    <FeatureGrid>
      <FeatureGrid.Spotlight>
        <Card variant="dark" style={{ height: '100%' }}>
          <Card.Eyebrow>spotlight</Card.Eyebrow>
          <Card.Title>Built for keyboards first.</Card.Title>
          <Card.Description>
            Every interactive surface clears WAI-ARIA APG: focus traps in modals,
            roving tabindex in tabs, escape-to-trigger in popovers. Tested by
            users, not by hover.
          </Card.Description>
          <Card.Footer>
            <Button size="sm" variant="sand">Read the a11y bar</Button>
          </Card.Footer>
        </Card>
      </FeatureGrid.Spotlight>

      <FeatureGrid.Item size="md">
        <Card style={{ height: '100%' }}>
          <Card.Title>Compound APIs</Card.Title>
          <Card.Description>Object.assign on a forwardRef root.</Card.Description>
        </Card>
      </FeatureGrid.Item>
      <FeatureGrid.Item size="md">
        <Card variant="secondary" style={{ height: '100%' }}>
          <Card.Title>Real CSS</Card.Title>
          <Card.Description>Plain stylesheets, no styling engine.</Card.Description>
        </Card>
      </FeatureGrid.Item>
      <FeatureGrid.Item size="md">
        <Card variant="outlined" style={{ height: '100%' }}>
          <Card.Title>Tree-shakeable</Card.Title>
          <Card.Description>Import only what you use.</Card.Description>
        </Card>
      </FeatureGrid.Item>
    </FeatureGrid>
  ),
};

export const ProjectShowcase: Story = {
  render: () => (
    <FeatureGrid>
      <FeatureGrid.Spotlight>
        <Card interactive style={{ height: '100%' }}>
          <Card.Media>
            <div style={{
              height: 240,
              background: 'linear-gradient(135deg, var(--ank-primary), var(--ank-accent))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--ank-white)',
              fontFamily: 'var(--ank-display)',
              fontSize: 64, fontWeight: 700,
            }}>
              ank.ds
            </div>
          </Card.Media>
          <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
            <Badge variant="dark" size="sm">React</Badge>
            <Badge variant="dark" size="sm">TypeScript</Badge>
            <Badge variant="dark" size="sm">Storybook</Badge>
          </div>
          <Card.Title>ank.ds — neubrutalist design system</Card.Title>
          <Card.Description>
            A component library with 30 primitives and 4 patterns. WCAG AA across
            the board.
          </Card.Description>
        </Card>
      </FeatureGrid.Spotlight>

      <FeatureGrid.Item size="md">
        <Card interactive style={{ height: '100%' }}>
          <Card.Eyebrow>tool · 2025</Card.Eyebrow>
          <Card.Title>when is my meeting</Card.Title>
          <Card.Description>Timezone helper for distributed teams.</Card.Description>
        </Card>
      </FeatureGrid.Item>

      <FeatureGrid.Item size="md">
        <Card interactive style={{ height: '100%' }}>
          <Card.Eyebrow>template · 2025</Card.Eyebrow>
          <Card.Title>frontend portfolio</Card.Title>
          <Card.Description>Minimalist Astro template, MIT.</Card.Description>
        </Card>
      </FeatureGrid.Item>

      <FeatureGrid.Item size="md">
        <Card variant="secondary" style={{ height: '100%' }}>
          <Card.Eyebrow>about</Card.Eyebrow>
          <Card.Title>Frontend engineer</Card.Title>
          <Card.Description>
            React + TypeScript. Based in Buenos Aires.
          </Card.Description>
        </Card>
      </FeatureGrid.Item>
    </FeatureGrid>
  ),
};

export const FourColumns: Story = {
  render: () => (
    <FeatureGrid columns={4}>
      {Array.from({ length: 4 }).map((_, i) => (
        <FeatureGrid.Item key={i} size="md">
          <Card>
            <Card.Eyebrow>feature {i + 1}</Card.Eyebrow>
            <Card.Title>Short headline</Card.Title>
            <Card.Description>A few words describing the feature.</Card.Description>
          </Card>
        </FeatureGrid.Item>
      ))}
    </FeatureGrid>
  ),
};

export const Inverted: Story = {
  render: () => (
    <FeatureGrid inverted>
      {Array.from({ length: 3 }).map((_, i) => (
        <FeatureGrid.Item key={i} size="md">
          <Card variant="outlined" style={{ height: '100%' }}>
            <Card.Title>Feature {i + 1}</Card.Title>
            <Card.Description>Body text.</Card.Description>
          </Card>
        </FeatureGrid.Item>
      ))}
    </FeatureGrid>
  ),
};
