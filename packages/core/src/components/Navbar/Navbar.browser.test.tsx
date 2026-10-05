import { beforeEach, describe, expect, it } from 'vitest';
import { page, userEvent } from '@vitest/browser/context';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Navbar } from './Navbar';

const links = [
  { label: 'Components', href: '#components', active: true },
  { label: 'Foundations', href: '#foundations' },
];

const click = (element: Element) => act(() => userEvent.click(element, { timeout: 5000 }));

const press = (keys: string) => act(() => userEvent.keyboard(keys));

const BACKDROP = { clientX: 1, clientY: 1 };

const openDrawer = async () => {
  await click(screen.getByRole('button', { name: 'Open menu' }));
  return screen.findByRole('dialog', { name: 'Primary' });
};

beforeEach(async () => {
  await page.viewport(375, 667);
});

describe('Navbar drawer', () => {
  it('is not exposed while closed', () => {
    render(<Navbar links={links} />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens as a modal dialog from the menu button', async () => {
    render(<Navbar links={links} />);

    const drawer = await openDrawer();

    expect(drawer.matches(':modal')).toBe(true);
  });

  it('moves focus into the drawer when it opens', async () => {
    render(<Navbar links={links} />);

    const drawer = await openDrawer();

    expect(drawer.contains(document.activeElement)).toBe(true);
  });

  it('closes from its close button and returns focus to the menu button', async () => {
    render(<Navbar links={links} />);
    const drawer = await openDrawer();

    await click(within(drawer).getByRole('button', { name: 'Close menu' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Open menu' })).toHaveFocus();
  });

  it('closes when a link inside it is activated', async () => {
    render(<Navbar links={links} />);
    const drawer = await openDrawer();

    await click(within(drawer).getByRole('link', { name: 'Foundations' }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes on Escape', async () => {
    render(<Navbar links={links} />);
    await openDrawer();

    await press('{Escape}');

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when the backdrop is pressed', async () => {
    render(<Navbar links={links} />);
    const drawer = await openDrawer();

    fireEvent.mouseDown(drawer, BACKDROP);
    fireEvent.click(drawer, BACKDROP);

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('stops the page behind it from scrolling while open', async () => {
    render(<Navbar links={links} />);
    const drawer = await openDrawer();
    expect(document.body.style.overflow).toBe('hidden');

    await click(within(drawer).getByRole('button', { name: 'Close menu' }));

    expect(document.body.style.overflow).toBe('');
  });

  it('has no axe violations while open', async () => {
    const { container } = render(<Navbar links={links} />);
    await openDrawer();

    expect(await axe(container)).toHaveNoViolations();
  });
});
