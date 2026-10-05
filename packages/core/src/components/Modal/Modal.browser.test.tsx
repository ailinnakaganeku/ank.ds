import { describe, expect, it } from 'vitest';
import { useRef, useState } from 'react';
import { userEvent } from '@vitest/browser/context';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Modal } from './Modal';

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
      <button>background action</button>
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

const click = (element: Element) => act(() => userEvent.click(element));

const press = (keys: string) => act(() => userEvent.keyboard(keys));

const openDialog = async () => {
  await click(screen.getByRole('button', { name: 'open' }));
  return screen.findByRole('dialog', { name: 'Confirm action' });
};

const centreOf = (element: Element) => {
  const box = element.getBoundingClientRect();
  return { clientX: box.left + box.width / 2, clientY: box.top + box.height / 2 };
};

const BACKDROP = { clientX: 1, clientY: 1 };

describe('Modal', () => {
  it('is not exposed while closed', () => {
    render(<Harness />);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('opens as a modal dialog named by its title', async () => {
    render(<Harness />);

    const dialog = await openDialog();

    expect(dialog.matches(':modal')).toBe(true);
  });

  it('moves focus into the dialog when it opens', async () => {
    render(<Harness />);

    const dialog = await openDialog();

    expect(dialog).toContainElement(document.activeElement as HTMLElement);
  });

  it('focuses the element it is told to focus first', async () => {
    const Form = () => {
      const email = useRef<HTMLInputElement>(null);
      return (
        <Modal open onClose={() => {}} title="Invite" initialFocus={email}>
          <input aria-label="Name" />
          <input aria-label="Email" ref={email} />
        </Modal>
      );
    };
    render(<Form />);

    await waitFor(() => expect(screen.getByLabelText('Email')).toHaveFocus());
  });

  it('closes when Escape is pressed', async () => {
    render(<Harness />);
    await openDialog();

    await press('{Escape}');

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('stays open on Escape when closeOnEscape is false', async () => {
    render(<Harness closeOnEscape={false} />);
    await openDialog();

    await press('{Escape}');

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('closes when the backdrop is clicked', async () => {
    render(<Harness />);
    const dialog = await openDialog();

    fireEvent.mouseDown(dialog, BACKDROP);
    fireEvent.click(dialog, BACKDROP);

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  });

  it('stays open when a press starts inside and ends on the backdrop', async () => {
    render(<Harness />);
    const dialog = await openDialog();

    fireEvent.mouseDown(dialog, centreOf(dialog));
    fireEvent.click(dialog, BACKDROP);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('stays open on a backdrop click when closeOnOverlay is false', async () => {
    render(<Harness closeOnOverlay={false} />);
    const dialog = await openDialog();

    fireEvent.mouseDown(dialog, BACKDROP);
    fireEvent.click(dialog, BACKDROP);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('makes the page behind it inert while open', async () => {
    render(<Harness />);
    await openDialog();
    const behind = screen.getByRole('button', { name: 'background action', hidden: true });

    behind.focus();

    expect(behind).not.toHaveFocus();
  });

  it('stops the page from scrolling while open', async () => {
    render(<Harness />);
    await openDialog();
    expect(getComputedStyle(document.documentElement).overflow).toBe('hidden');

    await press('{Escape}');

    await waitFor(() =>
      expect(getComputedStyle(document.documentElement).overflow).not.toBe('hidden'),
    );
  });

  it('returns focus to the trigger when it closes', async () => {
    render(<Harness />);
    await openDialog();

    await press('{Escape}');

    await waitFor(() => expect(screen.getByRole('button', { name: 'open' })).toHaveFocus());
  });

  it('keeps focus in the field being typed in when the parent re-renders', async () => {
    const Form = () => {
      const [email, setEmail] = useState('');
      return (
        <Modal open onClose={() => {}} title="Invite">
          <input aria-label="Name" />
          <input
            aria-label="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </Modal>
      );
    };
    render(<Form />);
    const email = await screen.findByLabelText('Email');

    await click(email);
    await press('ada');

    expect(email).toHaveValue('ada');
    expect(email).toHaveFocus();
  });

  it('has no axe violations when open', async () => {
    const { baseElement } = render(<Harness />);
    await openDialog();

    expect(await axe(baseElement)).toHaveNoViolations();
  });
});
