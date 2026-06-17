import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Kbd } from './Kbd';

describe('Kbd', () => {
  it('renders as a <kbd> element with its content', () => {
    render(<Kbd>K</Kbd>);
    const node = screen.getByText('K');
    expect(node.tagName).toBe('KBD');
  });

  it('passes through className', () => {
    const { container } = render(<Kbd className="extra">X</Kbd>);
    expect(container.firstChild).toHaveClass('ank-kbd', 'extra');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <p>
        Press <Kbd>⌘</Kbd>
        <Kbd>K</Kbd> to open.
      </p>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
