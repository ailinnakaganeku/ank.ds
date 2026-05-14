import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import { AutoGrid } from './AutoGrid';

describe('AutoGrid', () => {
  it('exposes the minimum column width through a CSS variable', () => {
    const { container } = render(<AutoGrid min="300px">x</AutoGrid>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.getPropertyValue('--ank-autogrid-min')).toBe('300px');
  });

  it('exposes a token gap as a CSS variable reference', () => {
    const { container } = render(<AutoGrid gap="6">x</AutoGrid>);
    const el = container.firstChild as HTMLElement;
    expect(el.style.getPropertyValue('--ank-autogrid-gap')).toBe('var(--ank-space-6)');
  });

  it('switches to auto-fill class for flow="fill"', () => {
    const { container } = render(<AutoGrid flow="fill">x</AutoGrid>);
    expect(container.firstChild).toHaveClass('ank-autogrid--fill');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <AutoGrid>
        <div>one</div>
        <div>two</div>
      </AutoGrid>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
