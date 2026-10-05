import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Navbar } from './Navbar';

const links = [
  { label: 'Components', href: '#components', active: true },
  { label: 'Foundations', href: '#foundations' },
  { label: 'Patterns', href: '#patterns' },
];

describe('Navbar', () => {
  it('renders a navigation landmark with the given aria-label', () => {
    render(<Navbar aria-label="Primary" links={links} />);
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
  });

  it('marks the active link with aria-current="page"', () => {
    render(<Navbar links={links} />);
    const active = screen.getByRole('link', { name: 'Components' });
    expect(active).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Foundations' })).not.toHaveAttribute('aria-current');
  });

  it('opens external links in a new tab and says so in their name', () => {
    render(<Navbar links={[{ label: 'GitHub', href: 'https://github.com/x', external: true }]} />);
    const link = screen.getByRole('link', { name: 'GitHub (opens in a new tab)' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('announces external links with the given label', () => {
    render(
      <Navbar
        externalLabel="se abre en una pestaña nueva"
        links={[{ label: 'GitHub', href: 'https://github.com/x', external: true }]}
      />,
    );
    expect(
      screen.getByRole('link', { name: 'GitHub (se abre en una pestaña nueva)' }),
    ).toBeInTheDocument();
  });

  it('does not compile a link with neither href nor onClick', () => {
    // @ts-expect-error a link needs somewhere to go or something to do
    const navbar = <Navbar links={[{ label: 'Home' }]} />;
    expect(navbar).toBeDefined();
  });

  it('renders links without href as buttons', () => {
    render(<Navbar links={[{ label: 'Logout', onClick: () => {} }]} />);
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
  });

  it('has no axe violations in the resting state', async () => {
    const { container } = render(<Navbar links={links} />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('marks a sticky navbar as scrolled once the page scrolls', () => {
    render(<Navbar sticky brand="ank.ds" />);
    const nav = screen.getByRole('navigation', { name: 'Primary' });
    expect(nav).not.toHaveClass('ank-navbar--scrolled');

    fireEvent.scroll(window, { target: { scrollY: 120 } });

    expect(nav).toHaveClass('ank-navbar--scrolled');
    fireEvent.scroll(window, { target: { scrollY: 0 } });
  });
});
