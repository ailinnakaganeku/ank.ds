import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Button } from '../Button';
import { Badge } from '../Badge';

const Grid = ({ children, cols = 3 }: { children: React.ReactNode; cols?: number }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      gap: 24,
      padding: 32,
    }}
  >
    {children}
  </div>
);

const meta = {
  title: 'ank.ds/Components/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  args: {
    variant: 'default',
    interactive: false,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'dark', 'outlined'],
    },
  },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
  render: (args) => (
    <Card {...args}>
      <Card.Eyebrow>New</Card.Eyebrow>
      <Card.Title>Card title</Card.Title>
      <Card.Description>
        A short summary of what this card is about. Keep it to a sentence or two.
      </Card.Description>
      <Card.Footer>
        <Button size="sm">Read more</Button>
      </Card.Footer>
    </Card>
  ),
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Dark: Story = { args: { variant: 'dark' } };
export const Outlined: Story = { args: { variant: 'outlined' } };
export const Interactive: Story = { args: { interactive: true } };

export const WithMedia: Story = {
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
  render: () => (
    <Card>
      <Card.Media>
        <div style={{
          height: 180,
          background: 'linear-gradient(135deg, var(--ank-primary) 0%, var(--ank-secondary) 100%)',
        }} />
      </Card.Media>
      <Card.Eyebrow>Article</Card.Eyebrow>
      <Card.Title>Five ideas worth borrowing</Card.Title>
      <Card.Description>
        A short summary of the article. Designed to fit two lines on most screens.
      </Card.Description>
      <Card.Footer>
        <Button size="sm">Read more</Button>
        <Button size="sm" variant="ghost">Save</Button>
      </Card.Footer>
    </Card>
  ),
};

export const AllVariants: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <Story />],
  render: () => (
    <Grid cols={3}>
      {(['default', 'primary', 'secondary', 'dark', 'outlined'] as const).map((variant) => (
        <Card key={variant} variant={variant}>
          <Card.Eyebrow>{variant}</Card.Eyebrow>
          <Card.Title>Card title</Card.Title>
          <Card.Description>
            A short summary of what this card is about.
          </Card.Description>
          <Card.Footer>
            <Button size="sm" variant={variant === 'dark' || variant === 'primary' ? 'sand' : 'primary'}>
              Action
            </Button>
          </Card.Footer>
        </Card>
      ))}
    </Grid>
  ),
};

export const InteractiveGrid: Story = {
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <Story />],
  render: () => (
    <Grid cols={3}>
      {[
        { eyebrow: 'Guide', title: 'Setting up the monorepo' },
        { eyebrow: 'Reference', title: 'Design tokens overview' },
        { eyebrow: 'Tutorial', title: 'Building your first component' },
      ].map(({ eyebrow, title }) => (
        <Card key={title} interactive onClick={() => alert(`${title}`)}>
          <Card.Eyebrow>{eyebrow}</Card.Eyebrow>
          <Card.Title>{title}</Card.Title>
          <Card.Description>
            Hover the card to see it lift. Click it to confirm the action.
          </Card.Description>
        </Card>
      ))}
    </Grid>
  ),
};

export const ProductCard: Story = {
  decorators: [(Story) => <div style={{ width: 340 }}><Story /></div>],
  render: () => (
    <Card interactive>
      <Card.Media>
        <div style={{
          height: 220,
          background: 'var(--ank-sand)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--ank-ink)',
          fontFamily: 'var(--ank-display)',
          fontSize: 60,
          fontWeight: 700,
        }}>
          Aa
        </div>
      </Card.Media>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Card.Eyebrow>Featured</Card.Eyebrow>
        <Badge variant="success" size="sm">In stock</Badge>
      </div>
      <Card.Title>Cormorant Garamond</Card.Title>
      <Card.Description>
        A display typeface with a calligraphic edge. Free under the SIL Open Font License.
      </Card.Description>
      <Card.Footer>
        <Button size="sm">Get the font</Button>
        <Button size="sm" variant="ghost">Preview</Button>
      </Card.Footer>
    </Card>
  ),
};
