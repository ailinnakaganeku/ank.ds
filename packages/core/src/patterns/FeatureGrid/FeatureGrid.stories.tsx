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
      <FeatureGrid.Item span={2}>
        <Card variant="dark" style={{ height: '100%' }}>
          <Card.Eyebrow>headline</Card.Eyebrow>
          <Card.Title>Components that test green.</Card.Title>
          <Card.Description>
            29 primitives audited for ARIA, contrast, keyboard. Tested with React
            Testing Library and jest-axe. No surprises in production.
          </Card.Description>
          <Card.Footer>
            <Button size="sm" variant="sand">Explore the library</Button>
          </Card.Footer>
        </Card>
      </FeatureGrid.Item>

      <FeatureGrid.Item>
        <Card variant="secondary" style={{ height: '100%' }}>
          <Card.Eyebrow>tokens</Card.Eyebrow>
          <Card.Title>Refined palette.</Card.Title>
          <Card.Description>
            Tierra, mar y arena en colores que pasan WCAG AA.
          </Card.Description>
        </Card>
      </FeatureGrid.Item>

      <FeatureGrid.Item>
        <Card style={{ height: '100%' }}>
          <Card.Eyebrow>dark mode</Card.Eyebrow>
          <Card.Title>One token flips it.</Card.Title>
          <Card.Description>
            Las sombras cambian a terracota — la firma del modo oscuro.
          </Card.Description>
        </Card>
      </FeatureGrid.Item>

      <FeatureGrid.Item>
        <Card variant="outlined" style={{ height: '100%' }}>
          <Card.Eyebrow>typescript</Card.Eyebrow>
          <Card.Title>Tipos completos.</Card.Title>
          <Card.Description>
            Props discriminadas, no <code>any</code>, autocompletado limpio.
          </Card.Description>
        </Card>
      </FeatureGrid.Item>

      <FeatureGrid.Item span={2}>
        <Card variant="primary" style={{ height: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Card.Eyebrow>open source</Card.Eyebrow>
            <Badge variant="sand" size="sm">MIT</Badge>
          </div>
          <Card.Title>Free to fork.</Card.Title>
          <Card.Description>
            Todo está en GitHub. Las decisiones de diseño viven en los commits, no
            en un Notion privado.
          </Card.Description>
          <Card.Footer>
            <Button size="sm" variant="sand">Ver repo</Button>
          </Card.Footer>
        </Card>
      </FeatureGrid.Item>
    </FeatureGrid>
  ),
};

export const FourColumns: Story = {
  render: () => (
    <FeatureGrid columns={4}>
      {Array.from({ length: 4 }).map((_, i) => (
        <FeatureGrid.Item key={i}>
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
        <FeatureGrid.Item key={i}>
          <Card variant="outlined" style={{ height: '100%' }}>
            <Card.Title>Feature {i + 1}</Card.Title>
            <Card.Description>Body text.</Card.Description>
          </Card>
        </FeatureGrid.Item>
      ))}
    </FeatureGrid>
  ),
};
