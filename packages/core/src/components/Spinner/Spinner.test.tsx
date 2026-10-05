import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('has role="status" and announces the label politely', () => {
    render(<Spinner label="Saving" />);
    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status).toHaveTextContent('Saving');
  });

  it('keeps the label for screen readers when it is not shown', () => {
    render(<Spinner label="Loading" />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading');
  });

  it('renders the label visually when showLabel is true', () => {
    render(<Spinner label="Saving" showLabel />);
    expect(screen.getByText('Saving')).toBeVisible();
  });

  it('marks the dot group as decorative', () => {
    const { container } = render(<Spinner />);
    expect(container.querySelector('.ank-spinner__dots')).toHaveAttribute('aria-hidden');
  });

  it('applies the size and variant classes', () => {
    const { container } = render(<Spinner size="lg" variant="primary" />);
    expect(container.firstChild).toHaveClass('ank-spinner--lg', 'ank-spinner--primary');
  });

  it('has no axe violations', async () => {
    const { container } = render(<Spinner label="Loading" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
