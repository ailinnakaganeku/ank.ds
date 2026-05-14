import { describe, expect, it, vi } from 'vitest';
import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Toggle } from './Toggle';
import { FieldWrapper } from '../FieldWrapper';

describe('Toggle', () => {
  it('exposes role="switch" with the label as the accessible name', () => {
    render(<Toggle>Notifications</Toggle>);
    expect(screen.getByRole('switch', { name: 'Notifications' })).toBeInTheDocument();
  });

  it('toggles state on click', async () => {
    const user = userEvent.setup();
    const Controlled = () => {
      const [on, setOn] = useState(false);
      return (
        <Toggle checked={on} onChange={(e) => setOn(e.target.checked)}>
          Notifications
        </Toggle>
      );
    };
    render(<Controlled />);
    const toggle = screen.getByRole('switch');
    expect(toggle).not.toBeChecked();
    await user.click(toggle);
    expect(toggle).toBeChecked();
  });

  it('toggles on Space when focused', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Toggle onChange={handleChange}>Notifications</Toggle>);
    const toggle = screen.getByRole('switch');
    toggle.focus();
    await user.keyboard(' ');
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('does not toggle when disabled', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(
      <Toggle disabled onChange={handleChange}>
        Notifications
      </Toggle>,
    );
    await user.click(screen.getByRole('switch'));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it('inherits disabled from a FieldWrapper context', () => {
    render(
      <FieldWrapper label="Preferences" disabled>
        <Toggle>Beta features</Toggle>
      </FieldWrapper>,
    );
    expect(screen.getByRole('switch', { name: 'Beta features' })).toBeDisabled();
  });

  it('has no axe violations', async () => {
    const { container } = render(<Toggle defaultChecked>Notifications</Toggle>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no axe violations when disabled', async () => {
    const { container } = render(<Toggle disabled>Notifications</Toggle>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
