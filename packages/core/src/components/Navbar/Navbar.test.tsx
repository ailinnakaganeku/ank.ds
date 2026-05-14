import { describe, expect, it, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Navbar } from './Navbar';
import { __resetBodyLockForTests } from '../../hooks/useFocusTrap';

afterEach(() => {
  __resetBodyLockForTests();
});

const links = [
  { label: 'Components', href: '#components', active: true },
  { label: 'Foundations', href: '#foundations' },
  { label: 'Patterns', href: '#patterns' },
];

const getHamburger = () =>
  screen.getByRole('button', { name: 'Open menu', hidden: true });

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

  it('renders external links with target and rel set', () => {
    render(
      <Navbar
        links={[
          { label: 'GitHub', href: 'https://github.com/x', external: true },
        ]}
      />,
    );
    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders links without href as buttons', () => {
    render(<Navbar links={[{ label: 'Logout', onClick: () => {} }]} />);
    expect(screen.getByRole('button', { name: 'Logout' })).toBeInTheDocument();
  });

  it('toggles the drawer when the hamburger button is clicked', async () => {
    const user = userEvent.setup();
    render(<Navbar links={links} />);
    const hamburger = getHamburger();
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');

    await user.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    await user.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the drawer when the close button is pressed', async () => {
    const user = userEvent.setup();
    render(<Navbar links={links} />);
    await user.click(getHamburger());

    const drawer = await screen.findByRole('dialog');
    expect(drawer).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close menu' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the drawer when a link inside it is activated', async () => {
    const user = userEvent.setup();
    render(<Navbar links={links} />);
    await user.click(getHamburger());
    const drawer = await screen.findByRole('dialog');
    const linkInDrawer = drawer.querySelector<HTMLAnchorElement>('a[href="#foundations"]');
    expect(linkInDrawer).not.toBeNull();
    await user.click(linkInDrawer!);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes the drawer on Escape', async () => {
    const user = userEvent.setup();
    render(<Navbar links={links} />);
    await user.click(getHamburger());
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('has no axe violations in the resting state', async () => {
    const { container } = render(<Navbar links={links} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
