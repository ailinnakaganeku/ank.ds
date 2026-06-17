import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from './Navbar';
import { Button } from '../Button';
import { SkipLink } from '../SkipLink';

const Brand = () => (
  <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
    ank.ds
  </a>
);

const links = [
  { label: 'Components', href: '#components', active: true },
  { label: 'Foundations', href: '#foundations' },
  { label: 'Patterns', href: '#patterns' },
  { label: 'Changelog', href: '#changelog' },
];

const Page = ({ children }: { children: React.ReactNode }) => (
  <div style={{ background: 'var(--ank-bg)', minHeight: '100vh' }}>{children}</div>
);

const meta = {
  title: 'ank.ds/Components/Navbar',
  component: Navbar,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Page>
      <Navbar brand={<Brand />} links={links} actions={<Button size="sm">Sign in</Button>} />
      <main style={{ padding: 32, fontFamily: 'var(--ank-body)', color: 'var(--ank-ink-soft)' }}>
        <p>
          Page content. On mobile (resize the viewport below 768px), the links collapse into a
          hamburger menu.
        </p>
      </main>
    </Page>
  ),
};

export const Sticky: Story = {
  render: () => (
    <Page>
      <Navbar sticky brand={<Brand />} links={links} actions={<Button size="sm">Sign in</Button>} />
      <main style={{ padding: 32, fontFamily: 'var(--ank-body)', color: 'var(--ank-ink-soft)' }}>
        {Array.from({ length: 18 }).map((_, i) => (
          <p key={i}>
            Section {i + 1}. Scroll the page. The navbar stays pinned and grows a 3px ink border
            across the bottom once the page leaves the top.
          </p>
        ))}
      </main>
    </Page>
  ),
};

export const WithSkipLink: Story = {
  render: () => (
    <Page>
      <SkipLink targetId="main-content" />
      <Navbar sticky brand={<Brand />} links={links} actions={<Button size="sm">Sign in</Button>} />
      <main
        id="main-content"
        tabIndex={-1}
        style={{ padding: 32, fontFamily: 'var(--ank-body)', color: 'var(--ank-ink-soft)' }}
      >
        <p>Press Tab from the top of the page — the skip link appears in the top-left.</p>
      </main>
    </Page>
  ),
};

export const BrandOnly: Story = {
  render: () => (
    <Page>
      <Navbar
        brand={<Brand />}
        actions={
          <Button size="sm" variant="ghost">
            Sign in
          </Button>
        }
      />
    </Page>
  ),
};

export const WithExternalLink: Story = {
  render: () => (
    <Page>
      <Navbar
        brand={<Brand />}
        links={[
          { label: 'Components', href: '#components', active: true },
          { label: 'Foundations', href: '#foundations' },
          { label: 'GitHub', href: 'https://github.com/ailinnakaganeku/ank.ds', external: true },
        ]}
        actions={<Button size="sm">Sign in</Button>}
      />
    </Page>
  ),
};

export const MobileDrawer: Story = {
  parameters: {
    layout: 'fullscreen',
    viewport: { defaultViewport: 'mobile1' },
  },
  render: () => (
    <Page>
      <Navbar brand={<Brand />} links={links} actions={<Button size="sm">Sign in</Button>} />
      <main style={{ padding: 24, fontFamily: 'var(--ank-body)', color: 'var(--ank-ink-soft)' }}>
        <p>
          Tap the hamburger to open the drawer. Tab cycles inside, Escape closes, tapping the
          overlay closes, and tapping a link closes too.
        </p>
      </main>
    </Page>
  ),
};
