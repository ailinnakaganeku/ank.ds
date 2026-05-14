import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Label } from './Label';

describe('Label', () => {
  it('renders its content', () => {
    render(<Label>Email</Label>);
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('connects to an input via htmlFor', () => {
    render(
      <div>
        <Label htmlFor="email">Email</Label>
        <input id="email" />
      </div>,
    );
    expect(screen.getByLabelText('Email')).toBe(screen.getByRole('textbox'));
  });

  it('renders the required indicator when required is true', () => {
    render(<Label required>Email</Label>);
    const indicator = screen.getByText('*');
    expect(indicator).toHaveAttribute('aria-hidden');
  });

  it('applies the disabled class when disabled is true', () => {
    const { container } = render(<Label disabled>Email</Label>);
    expect(container.firstChild).toHaveClass('ank-label--disabled');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <Label htmlFor="email" required>
          Email
        </Label>
        <input id="email" />
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
