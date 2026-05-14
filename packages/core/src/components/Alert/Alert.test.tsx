import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders title and description', () => {
    render(
      <Alert variant="success" title="Saved">
        Your changes were saved.
      </Alert>,
    );
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('Your changes were saved.')).toBeInTheDocument();
  });

  it('uses role="alert" for error variant and role="status" otherwise', () => {
    const { rerender } = render(
      <Alert variant="error" title="Boom">
        Something broke.
      </Alert>,
    );
    expect(screen.getByRole('alert')).toBeInTheDocument();

    rerender(
      <Alert variant="info" title="Heads up">
        New release tomorrow.
      </Alert>,
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders an inline close button when onClose is provided', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(
      <Alert variant="info" title="Heads up" onClose={onClose}>
        Body.
      </Alert>,
    );
    const close = screen.getByRole('button', { name: 'Dismiss' });
    await user.click(close);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('omits the close button when onClose is not provided', () => {
    render(
      <Alert variant="info" title="Heads up">
        Body.
      </Alert>,
    );
    expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
  });

  it('accepts a custom close label', () => {
    render(
      <Alert variant="warning" onClose={() => {}} closeLabel="Cerrar">
        Body.
      </Alert>,
    );
    expect(screen.getByRole('button', { name: 'Cerrar' })).toBeInTheDocument();
  });

  it('has no axe violations in any variant', async () => {
    for (const variant of ['success', 'warning', 'error', 'info'] as const) {
      const { container, unmount } = render(
        <Alert variant={variant} title={`${variant} title`} onClose={() => {}}>
          {variant} body
        </Alert>,
      );
      expect(await axe(container)).toHaveNoViolations();
      unmount();
    }
  });
});
