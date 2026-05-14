import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Dropdown } from './Dropdown';

const Demo = ({ onSelect }: { onSelect?: (value: string) => void }) => (
  <Dropdown>
    <Dropdown.Trigger>Actions</Dropdown.Trigger>
    <Dropdown.Menu>
      <Dropdown.Item onSelect={() => onSelect?.('edit')}>Edit</Dropdown.Item>
      <Dropdown.Item onSelect={() => onSelect?.('duplicate')}>Duplicate</Dropdown.Item>
      <Dropdown.Item disabled>Archive</Dropdown.Item>
      <Dropdown.Separator />
      <Dropdown.Item destructive onSelect={() => onSelect?.('delete')}>
        Delete
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

describe('Dropdown', () => {
  it('renders the trigger with the right ARIA wiring', () => {
    render(<Demo />);
    const trigger = screen.getByRole('button', { name: 'Actions' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-controls');
  });

  it('opens the menu on click and shows menuitems', async () => {
    const user = userEvent.setup();
    render(<Demo />);
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
    expect(screen.getAllByRole('menuitem').length).toBe(4);
  });

  it('opens on ArrowDown from the trigger', async () => {
    const user = userEvent.setup();
    render(<Demo />);
    const trigger = screen.getByRole('button', { name: 'Actions' });
    trigger.focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('moves focus between items with ArrowDown/ArrowUp and skips disabled items', async () => {
    const user = userEvent.setup();
    render(<Demo />);
    await user.click(screen.getByRole('button', { name: 'Actions' }));

    expect(screen.getByRole('menuitem', { name: 'Edit' })).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Duplicate' })).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus();

    await user.keyboard('{ArrowUp}');
    expect(screen.getByRole('menuitem', { name: 'Duplicate' })).toHaveFocus();
  });

  it('selects on Enter and closes the menu, returning focus to the trigger', async () => {
    const user = userEvent.setup();
    const handle = vi.fn();
    render(<Demo onSelect={handle} />);
    const trigger = screen.getByRole('button', { name: 'Actions' });
    await user.click(trigger);

    await user.keyboard('{ArrowDown}');
    await user.keyboard('{Enter}');

    expect(handle).toHaveBeenCalledWith('duplicate');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('closes on Tab and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    render(<Demo />);
    const trigger = screen.getByRole('button', { name: 'Actions' });
    await user.click(trigger);

    await user.keyboard('{Tab}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('exposes the menu with aria-orientation="vertical"', async () => {
    const user = userEvent.setup();
    render(<Demo />);
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    expect(screen.getByRole('menu')).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('closes on Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    render(<Demo />);
    const trigger = screen.getByRole('button', { name: 'Actions' });
    await user.click(trigger);

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('marks disabled items with aria-disabled and does not call onSelect on them', async () => {
    const user = userEvent.setup();
    const handle = vi.fn();
    render(<Demo onSelect={handle} />);
    await user.click(screen.getByRole('button', { name: 'Actions' }));

    const archive = screen.getByRole('menuitem', { name: 'Archive' });
    expect(archive).toHaveAttribute('aria-disabled', 'true');

    await user.click(archive);
    expect(handle).not.toHaveBeenCalled();
  });

  it('has no axe violations when open', async () => {
    const user = userEvent.setup();
    const { container } = render(<Demo />);
    await user.click(screen.getByRole('button', { name: 'Actions' }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
