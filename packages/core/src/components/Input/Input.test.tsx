import { describe, expect, it, vi } from 'vitest';
import { createRef, useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Input } from './Input';
import { FieldWrapper } from '../FieldWrapper';

describe('Input', () => {
  it('renders as a text input by default', () => {
    render(<Input aria-label="Email" />);
    const input = screen.getByLabelText('Email');
    expect(input.tagName).toBe('INPUT');
    expect(input).toHaveAttribute('type', 'text');
  });

  it('respects the type prop', () => {
    render(<Input type="email" aria-label="Email" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('type', 'email');
  });

  it('accepts user input and fires onChange', async () => {
    const user = userEvent.setup();
    const Controlled = () => {
      const [value, setValue] = useState('');
      return (
        <Input
          aria-label="Name"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    };
    render(<Controlled />);
    const input = screen.getByLabelText('Name');
    await user.type(input, 'Ada');
    expect(input).toHaveValue('Ada');
  });

  it('sets aria-invalid when state is error', () => {
    render(<Input aria-label="Email" state="error" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
  });

  it('does not set aria-invalid when state is default', () => {
    render(<Input aria-label="Email" />);
    expect(screen.getByLabelText('Email')).not.toHaveAttribute('aria-invalid');
  });

  it('inherits invalid state and aria-describedby from FieldWrapper', () => {
    render(
      <FieldWrapper label="Email" error="Required.">
        <Input />
      </FieldWrapper>,
    );
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    const error = screen.getByRole('alert');
    expect(input.getAttribute('aria-describedby')).toBe(error.id);
  });

  it('forwards ref to the underlying input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="Email" />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('has no axe violations in default and error states', async () => {
    const { container, rerender } = render(<Input aria-label="Email" />);
    expect(await axe(container)).toHaveNoViolations();

    rerender(<Input aria-label="Email" state="error" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
