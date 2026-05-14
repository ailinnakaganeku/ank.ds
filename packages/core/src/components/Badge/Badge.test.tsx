import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders its content', () => {
    render(<Badge>Live</Badge>);
    expect(screen.getByText('Live')).toBeInTheDocument();
  });

  it('applies the variant class', () => {
    const { container } = render(<Badge variant="success">Active</Badge>);
    expect(container.firstChild).toHaveClass('ank-badge--success');
  });

  it('applies the size class', () => {
    const { container } = render(
      <Badge variant="primary" size="sm">
        v0.1
      </Badge>,
    );
    expect(container.firstChild).toHaveClass('ank-badge--sm');
  });

  it('has no axe violations across all variants', async () => {
    const variants = [
      'primary',
      'secondary',
      'accent',
      'sand',
      'success',
      'warning',
      'error',
      'outline',
      'dark',
    ] as const;
    for (const variant of variants) {
      const { container, unmount } = render(<Badge variant={variant}>{variant}</Badge>);
      expect(await axe(container)).toHaveNoViolations();
      unmount();
    }
  });
});
