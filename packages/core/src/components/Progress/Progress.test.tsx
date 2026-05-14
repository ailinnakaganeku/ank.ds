import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Progress } from './Progress';

describe('Progress', () => {
  it('exposes role="progressbar" with the correct aria-value attributes', () => {
    render(<Progress aria-label="Sync" value={42} max={100} />);
    const bar = screen.getByRole('progressbar', { name: 'Sync' });
    expect(bar).toHaveAttribute('aria-valuemin', '0');
    expect(bar).toHaveAttribute('aria-valuemax', '100');
    expect(bar).toHaveAttribute('aria-valuenow', '42');
  });

  it('uses the label as aria-labelledby when provided', () => {
    render(<Progress label="Uploading" value={20} />);
    const bar = screen.getByRole('progressbar');
    const label = screen.getByText('Uploading');
    expect(bar.getAttribute('aria-labelledby')).toBe(label.id);
  });

  it('omits aria-valuenow when indeterminate', () => {
    render(<Progress aria-label="Working" indeterminate />);
    const bar = screen.getByRole('progressbar', { name: 'Working' });
    expect(bar).not.toHaveAttribute('aria-valuenow');
  });

  it('clamps the value between 0 and max', () => {
    const { rerender } = render(<Progress aria-label="x" value={-10} max={100} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0');

    rerender(<Progress aria-label="x" value={200} max={100} />);
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100');
  });

  it('shows the percentage value when showValue is true', () => {
    render(<Progress label="Sync" value={75} showValue />);
    expect(screen.getByText('75%')).toBeInTheDocument();
  });

  it('does not show the percentage when indeterminate', () => {
    render(<Progress label="Sync" indeterminate showValue />);
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  it('applies the size and variant classes', () => {
    const { container } = render(
      <Progress aria-label="x" value={50} size="lg" variant="success" />,
    );
    expect(container.firstChild).toHaveClass('ank-progress--lg', 'ank-progress--success');
  });

  it('has no axe violations across states', async () => {
    const { container, rerender } = render(<Progress aria-label="Sync" value={30} />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Progress label="Uploading" value={60} showValue />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Progress aria-label="Working" indeterminate />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
