import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta = {
  title: 'ank.ds/Patterns/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Footer>
      <Footer.Top>
        <Footer.Brand>
          ank.ds
          <p>
            A neubrutalist design system. Bold borders, refined palette,
            real ARIA.
          </p>
        </Footer.Brand>
        <Footer.Columns>
          <Footer.Column title="Product">
            <Footer.Link href="#components">Components</Footer.Link>
            <Footer.Link href="#foundations">Foundations</Footer.Link>
            <Footer.Link href="#patterns">Patterns</Footer.Link>
            <Footer.Link href="#changelog">Changelog</Footer.Link>
          </Footer.Column>
          <Footer.Column title="Community">
            <Footer.Link href="https://github.com/ailinnakaganeku/ank.ds" external>
              GitHub
            </Footer.Link>
            <Footer.Link href="#discussions">Discussions</Footer.Link>
            <Footer.Link href="#contributors">Contributors</Footer.Link>
          </Footer.Column>
          <Footer.Column title="Legal">
            <Footer.Link href="#license">License</Footer.Link>
            <Footer.Link href="#privacy">Privacy</Footer.Link>
          </Footer.Column>
        </Footer.Columns>
      </Footer.Top>
      <Footer.Bottom>
        <span>© 2026 ank.ds</span>
        <span>v0.0.0 · MIT</span>
      </Footer.Bottom>
    </Footer>
  ),
};

export const Light: Story = {
  render: () => (
    <Footer variant="light">
      <Footer.Top>
        <Footer.Brand>
          ank.ds
          <p>Lighter footer when the page closes on a soft background.</p>
        </Footer.Brand>
        <Footer.Columns>
          <Footer.Column title="Pages">
            <Footer.Link href="#about">About</Footer.Link>
            <Footer.Link href="#work">Work</Footer.Link>
            <Footer.Link href="#contact">Contact</Footer.Link>
          </Footer.Column>
          <Footer.Column title="Connect">
            <Footer.Link href="#x" external>X</Footer.Link>
            <Footer.Link href="#mastodon" external>Mastodon</Footer.Link>
            <Footer.Link href="#email">Email</Footer.Link>
          </Footer.Column>
        </Footer.Columns>
      </Footer.Top>
      <Footer.Bottom>
        <span>© 2026</span>
        <span>v0.0.0</span>
      </Footer.Bottom>
    </Footer>
  ),
};

export const Minimal: Story = {
  render: () => (
    <Footer>
      <Footer.Bottom>
        <span>© 2026 ank.ds</span>
        <span>MIT license</span>
      </Footer.Bottom>
    </Footer>
  ),
};
