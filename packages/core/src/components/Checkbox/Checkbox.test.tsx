import { describe, expect, it, vi } from 'vitest';
import { useState } from 'react';
import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Checkbox } from './Checkbox';
import { FieldWrapper } from '../FieldWrapper';

describe('Checkbox', () => {
  it('renders as a checkbox with its label as the accessible name', () => {
    render(<Checkbox>Accept terms</Checkbox>);
    expect(screen.getByRole('checkbox', { name: 'Accept terms' })).toBeInTheDocument();
  });

  it('toggles checked state on click', async () => {
    const user = userEvent.setup();
    const Controlled = () => {
      const [checked, setChecked] = useState(false);
      return (
        <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>
          Accept
        </Checkbox>
      );
    };
    render(<Controlled />);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    await user.click(checkbox);
    expect(checkbox).toBeChecked();
    await user.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('toggles when the label text is clicked', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange}>Accept</Checkbox>);
    await user.click(screen.getByText('Accept'));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('toggles when Space is pressed while focused', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Checkbox onChange={handleChange}>Accept</Checkbox>);
    const checkbox = screen.getByRole('checkbox');
    checkbox.focus();
    await user.keyboard(' ');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('does not fire onChange when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Checkbox disabled onChange={handleChange}>
        Accept
      </Checkbox>,
    );
    await user.click(screen.getByRole('checkbox'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('sets indeterminate on the underlying input when indeterminate is true', () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <Checkbox ref={ref} indeterminate defaultChecked>
        Some
      </Checkbox>,
    );
    expect(ref.current?.indeterminate).toBe(true);
  });

  it('inherits disabled from a FieldWrapper context', () => {
    render(
      <FieldWrapper label="Permissions" disabled>
        <Checkbox>Read</Checkbox>
      </FieldWrapper>,
    );
    expect(screen.getByRole('checkbox', { name: 'Read' })).toBeDisabled();
  });

  it('has no axe violations', async () => {
    const { container } = render(<Checkbox>Accept terms</Checkbox>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no axe violations when disabled', async () => {
    const { container } = render(<Checkbox disabled>Accept terms</Checkbox>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
