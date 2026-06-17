import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Separator } from './Separator';

describe('Separator', () => {
  it('renders with role="none" by default (decorative)', () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).toHaveAttribute('role', 'none');
  });

  it('renders with role="separator" when decorative is false', () => {
    const { container } = render(<Separator decorative={false} />);
    expect(container.firstChild).toHaveAttribute('role', 'separator');
  });

  it('sets aria-orientation when role is separator', () => {
    const { container, rerender } = render(<Separator decorative={false} />);
    expect(container.firstChild).toHaveAttribute('aria-orientation', 'horizontal');

    rerender(<Separator decorative={false} orientation="vertical" />);
    expect(container.firstChild).toHaveAttribute('aria-orientation', 'vertical');
  });

  it('does not set aria-orientation when decorative', () => {
    const { container } = render(<Separator />);
    expect(container.firstChild).not.toHaveAttribute('aria-orientation');
  });

  it('adds the vertical class', () => {
    const { container } = render(<Separator orientation="vertical" />);
    expect(container.firstChild).toHaveClass('ank-separator--vertical');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <p>a</p>
        <Separator decorative={false} aria-label="break" />
        <p>b</p>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
