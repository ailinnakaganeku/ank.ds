import type { Meta, StoryObj } from '@storybook/react';
import { SkipLink } from './SkipLink';

const meta = {
  title: 'ank.ds/Components/SkipLink',
  component: SkipLink,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SkipLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ position: 'relative', minHeight: 400, padding: 32 }}>
      <SkipLink targetId="main-demo" />
      <p style={{ fontFamily: 'var(--ank-body)', fontSize: 14, color: 'var(--ank-gray-700)', marginTop: 0 }}>
        Press Tab on this story preview to reveal the skip link. Activating it moves
        focus to the element with id="main-demo".
      </p>
      <div style={{ height: 200 }} />
      <main
        id="main-demo"
        tabIndex={-1}
        style={{
          padding: 24,
          border: '2.5px solid var(--ank-ink)',
          background: 'var(--ank-white)',
          fontFamily: 'var(--ank-body)',
          fontSize: 15,
        }}
      >
        This is the main content landing zone.
      </main>
    </div>
  ),
};

export const CustomLabel: Story = {
  render: () => (
    <div style={{ position: 'relative', minHeight: 200, padding: 32 }}>
      <SkipLink targetId="custom-target">Jump to article</SkipLink>
      <p style={{ fontFamily: 'var(--ank-body)', fontSize: 14, color: 'var(--ank-gray-700)' }}>
        Tab to focus the skip link.
      </p>
      <article id="custom-target" tabIndex={-1}>
        <h2 style={{ fontFamily: 'var(--ank-display)', margin: 0 }}>Article heading</h2>
      </article>
    </div>
  ),
};
