import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { FieldWrapper } from './FieldWrapper';
import { Input } from '../Input';
import { Textarea } from '../Textarea';

describe('FieldWrapper', () => {
  it('connects the label to the input through htmlFor and id', () => {
    render(
      <FieldWrapper label="Email">
        <Input />
      </FieldWrapper>,
    );
    const input = screen.getByLabelText('Email');
    expect(input.tagName).toBe('INPUT');
  });

  it('shows the helper text and wires aria-describedby to it', () => {
    render(
      <FieldWrapper label="Email" helper="We never share it.">
        <Input />
      </FieldWrapper>,
    );
    const helper = screen.getByText('We never share it.');
    const input = screen.getByLabelText('Email');
    expect(input.getAttribute('aria-describedby')).toBe(helper.id);
  });

  it('shows an error message with role="alert" and switches aria-invalid', () => {
    render(
      <FieldWrapper label="Email" error="Required field.">
        <Input />
      </FieldWrapper>,
    );
    const error = screen.getByRole('alert');
    expect(error).toHaveTextContent('Required field.');
    const input = screen.getByLabelText('Email');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(input.getAttribute('aria-describedby')).toBe(error.id);
  });

  it('prefers the error message over the helper when both are present', () => {
    render(
      <FieldWrapper label="Email" helper="Helper" error="Required field.">
        <Input />
      </FieldWrapper>,
    );
    expect(screen.queryByText('Helper')).not.toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Required field.');
  });

  it('renders the required indicator next to the label', () => {
    render(
      <FieldWrapper label="Email" required>
        <Input />
      </FieldWrapper>,
    );
    const indicator = screen.getByText('*');
    expect(indicator).toHaveAttribute('aria-hidden');
  });

  it('propagates the disabled state to the child through context', () => {
    render(
      <FieldWrapper label="Email" disabled>
        <Input />
      </FieldWrapper>,
    );
    expect(screen.getByLabelText('Email')).toBeDisabled();
  });

  it('works the same way with a textarea child', () => {
    render(
      <FieldWrapper label="Message" helper="Keep it short.">
        <Textarea />
      </FieldWrapper>,
    );
    const textarea = screen.getByLabelText('Message');
    expect(textarea.tagName).toBe('TEXTAREA');
    const helper = screen.getByText('Keep it short.');
    expect(textarea.getAttribute('aria-describedby')).toBe(helper.id);
  });

  it('has no axe violations in any state', async () => {
    const { container, rerender } = render(
      <FieldWrapper label="Email">
        <Input />
      </FieldWrapper>,
    );
    expect(await axe(container)).toHaveNoViolations();

    rerender(
      <FieldWrapper label="Email" required helper="We never share it.">
        <Input />
      </FieldWrapper>,
    );
    expect(await axe(container)).toHaveNoViolations();

    rerender(
      <FieldWrapper label="Email" error="Required field.">
        <Input />
      </FieldWrapper>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
