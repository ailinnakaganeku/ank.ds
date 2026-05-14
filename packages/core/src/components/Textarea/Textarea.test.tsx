import { describe, expect, it } from 'vitest';
import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Textarea } from './Textarea';
import { FieldWrapper } from '../FieldWrapper';

describe('Textarea', () => {
  it('renders as a textarea', () => {
    render(<Textarea aria-label="Message" />);
    const textarea = screen.getByLabelText('Message');
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('accepts typed input', async () => {
    const user = userEvent.setup();
    const Controlled = () => {
      const [value, setValue] = useState('');
      return (
        <Textarea
          aria-label="Message"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    };
    render(<Controlled />);
    const textarea = screen.getByLabelText('Message');
    await user.type(textarea, 'Hello');
    expect(textarea).toHaveValue('Hello');
  });

  it('marks aria-invalid when state is error', () => {
    render(<Textarea aria-label="Message" state="error" />);
    expect(screen.getByLabelText('Message')).toHaveAttribute('aria-invalid', 'true');
  });

  it('inherits invalid and aria-describedby from FieldWrapper', () => {
    render(
      <FieldWrapper label="Message" error="Required.">
        <Textarea />
      </FieldWrapper>,
    );
    const textarea = screen.getByLabelText('Message');
    expect(textarea).toHaveAttribute('aria-invalid', 'true');
    const error = screen.getByRole('alert');
    expect(textarea.getAttribute('aria-describedby')).toBe(error.id);
  });

  it('has no axe violations', async () => {
    const { container } = render(<Textarea aria-label="Message" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
