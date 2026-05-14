import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Container } from './Container';

describe('Container', () => {
  it('renders children', () => {
    render(<Container>content</Container>);
    expect(screen.getByText('content')).toBeInTheDocument();
  });

  it('applies the requested size class', () => {
    const { container } = render(<Container size="md">x</Container>);
    expect(container.firstChild).toHaveClass('ank-container--md');
  });

  it('applies flush class', () => {
    const { container } = render(<Container flush>x</Container>);
    expect(container.firstChild).toHaveClass('ank-container--flush');
  });

  it('resolves a token padding to a CSS variable reference', () => {
    const { container } = render(<Container padding="6">x</Container>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.getPropertyValue('--ank-container-pad')).toBe('var(--ank-space-6)');
  });

  it('keeps arbitrary padding values as-is', () => {
    const { container } = render(<Container padding="24px">x</Container>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.getPropertyValue('--ank-container-pad')).toBe('24px');
  });

  it('has no axe violations', async () => {
    const { container } = render(<Container>content</Container>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
