import { describe, expect, it, vi, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Popover } from './Popover';
import { __resetBodyLockForTests } from '../../hooks/useFocusTrap';

afterEach(() => {
  __resetBodyLockForTests();
});

const Demo = ({
  onOpenChange,
  defaultOpen,
}: {
  onOpenChange?: (open: boolean) => void;
  defaultOpen?: boolean;
}) => (
  <div>
    <p data-testid="outside">outside content</p>
    <Popover defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
      <Popover.Trigger>Open</Popover.Trigger>
      <Popover.Content>
        <button>first</button>
        <button>second</button>
      </Popover.Content>
    </Popover>
  </div>
);

describe('Popover', () => {
  it('renders the trigger with the right ARIA wiring', () => {
    render(<Demo />);
    const trigger = screen.getByRole('button', { name: 'Open' });
    expect(trigger).toHaveAttribute('aria-haspopup', 'dialog');
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(trigger).toHaveAttribute('aria-controls');
  });

  it('opens the dialog on click and flips aria-expanded', async () => {
    const user = userEvent.setup();
    render(<Demo />);
    const trigger = screen.getByRole('button', { name: 'Open' });
    await user.click(trigger);
    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes on Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup();
    render(<Demo />);
    const trigger = screen.getByRole('button', { name: 'Open' });
    await user.click(trigger);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it('closes when clicking outside the dialog and trigger', async () => {
    const user = userEvent.setup();
    render(<Demo />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByTestId('outside'));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('keeps the popover open when clicking inside it', async () => {
    const user = userEvent.setup();
    render(<Demo />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    const dialog = await screen.findByRole('dialog');

    await user.click(screen.getByRole('button', { name: 'first' }));
    expect(dialog).toBeInTheDocument();
  });

  it('fires onOpenChange', async () => {
    const user = userEvent.setup();
    const handle = vi.fn();
    render(<Demo onOpenChange={handle} />);
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(handle).toHaveBeenLastCalledWith(true);
    await user.keyboard('{Escape}');
    expect(handle).toHaveBeenLastCalledWith(false);
  });

  it('has no axe violations when closed and when open', async () => {
    const { container } = render(<Demo />);
    expect(await axe(container)).toHaveNoViolations();
    const user = userEvent.setup();
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(await axe(container)).toHaveNoViolations();
  });
});
