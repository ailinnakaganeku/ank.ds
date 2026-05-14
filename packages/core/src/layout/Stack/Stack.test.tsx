import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Stack } from './Stack';

describe('Stack', () => {
  it('renders children', () => {
    render(
      <Stack>
        <span>a</span>
        <span>b</span>
      </Stack>,
    );
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
  });

  it('resolves a token gap', () => {
    const { container } = render(<Stack gap="3">x</Stack>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.getPropertyValue('--ank-stack-gap')).toBe('var(--ank-space-3)');
  });

  it('accepts arbitrary gap values', () => {
    const { container } = render(<Stack gap="2rem">x</Stack>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.getPropertyValue('--ank-stack-gap')).toBe('2rem');
  });

  it('applies the divided class', () => {
    const { container } = render(<Stack divided>x</Stack>);
    expect(container.firstChild).toHaveClass('ank-stack--divided');
  });

  it('reflects the alignment via data-align', () => {
    const { container } = render(<Stack align="center">x</Stack>);
    expect(container.firstChild).toHaveAttribute('data-align', 'center');
  });

  it('has no axe violations', async () => {
    const { container } = render(<Stack><p>hi</p></Stack>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
