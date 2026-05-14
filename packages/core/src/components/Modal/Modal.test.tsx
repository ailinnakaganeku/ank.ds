import { describe, expect, it, vi, afterEach } from 'vitest';
import { useState } from 'react';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Modal } from './Modal';
import { __resetBodyLockForTests } from '../../hooks/useFocusTrap';

afterEach(() => {
  __resetBodyLockForTests();
});

const Harness = ({
  closeOnOverlay = true,
  closeOnEscape = true,
}: {
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <p data-testid="background">background content</p>
      <button onClick={() => setOpen(true)}>open</button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm action"
        closeOnOverlay={closeOnOverlay}
        closeOnEscape={closeOnEscape}
      >
        <Modal.Body>
          <p>are you sure?</p>
          <input aria-label="Notes" />
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setOpen(false)}>cancel</button>
          <button onClick={() => setOpen(false)}>confirm</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

describe('Modal', () => {
  it('renders nothing in the DOM when closed', () => {
    render(<Harness />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('mounts the dialog with the correct ARIA attributes when open', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    await user.click(screen.getByRole('button', { name: 'open' }));

    const dialog = await screen.findByRole('dialog', { name: 'Confirm action' });
    expect(dialog).toHaveAttribute('aria-modal', 'true');
  });

  it('closes when Escape is pressed', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'open' }));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not close on Escape when closeOnEscape is false', async () => {
    const user = userEvent.setup();
    render(<Harness closeOnEscape={false} />);
    await user.click(screen.getByRole('button', { name: 'open' }));

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });

  it('does not close when the click starts inside the dialog and ends on the overlay', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'open' }));

    const dialog = await screen.findByRole('dialog');
    const overlay = dialog.parentElement as HTMLElement;

    await act(async () => {
      dialog.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      overlay.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });

  it('closes when the click is fully on the overlay', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'open' }));
    const dialog = await screen.findByRole('dialog');
    const overlay = dialog.parentElement as HTMLElement;

    await act(async () => {
      overlay.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      overlay.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('does not close on overlay click when closeOnOverlay is false', async () => {
    const user = userEvent.setup();
    render(<Harness closeOnOverlay={false} />);
    await user.click(screen.getByRole('button', { name: 'open' }));
    const dialog = await screen.findByRole('dialog');
    const overlay = dialog.parentElement as HTMLElement;

    await act(async () => {
      overlay.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
      overlay.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(screen.queryByRole('dialog')).toBeInTheDocument();
  });

  it('marks background siblings as inert while open and clears them on close', async () => {
    const user = userEvent.setup();
    render(<Harness />);

    const root = screen.getByTestId('background').parentElement as HTMLElement;
    const appRoot = root.parentElement as HTMLElement;
    expect(appRoot.hasAttribute('inert')).toBe(false);

    await user.click(screen.getByRole('button', { name: 'open' }));
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(appRoot.hasAttribute('inert')).toBe(true);

    await user.keyboard('{Escape}');
    expect(appRoot.hasAttribute('inert')).toBe(false);
  });

  it('returns focus to the trigger when the dialog closes', async () => {
    const user = userEvent.setup();
    render(<Harness />);
    const trigger = screen.getByRole('button', { name: 'open' });
    trigger.focus();
    await user.click(trigger);
    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(trigger).toHaveFocus();
  });

  it('has no axe violations when open', async () => {
    const user = userEvent.setup();
    const { baseElement } = render(<Harness />);
    await user.click(screen.getByRole('button', { name: 'open' }));
    await screen.findByRole('dialog');
    expect(await axe(baseElement)).toHaveNoViolations();
  });
});
