import { describe, expect, it } from 'vitest';
import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Select } from './Select';
import { FieldWrapper } from '../FieldWrapper';

describe('Select', () => {
  it('renders the provided options', () => {
    render(
      <Select aria-label="Plan" defaultValue="pro">
        <option value="free">Free</option>
        <option value="pro">Pro</option>
      </Select>,
    );
    const combobox = screen.getByRole('combobox', { name: 'Plan' });
    expect(combobox).toHaveValue('pro');
  });

  it('fires onChange when the value changes', async () => {
    const user = userEvent.setup();
    const Controlled = () => {
      const [value, setValue] = useState('free');
      return (
        <>
          <Select aria-label="Plan" value={value} onChange={(e) => setValue(e.target.value)}>
            <option value="free">Free</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </Select>
          <span data-testid="value">{value}</span>
        </>
      );
    };
    render(<Controlled />);
    await user.selectOptions(screen.getByRole('combobox', { name: 'Plan' }), 'pro');
    expect(screen.getByTestId('value')).toHaveTextContent('pro');
  });

  it('inherits invalid and aria-describedby from FieldWrapper', () => {
    render(
      <FieldWrapper label="Plan" error="Pick one.">
        <Select>
          <option value="">--</option>
          <option value="free">Free</option>
        </Select>
      </FieldWrapper>,
    );
    const combobox = screen.getByLabelText('Plan');
    expect(combobox).toHaveAttribute('aria-invalid', 'true');
    const error = screen.getByRole('alert');
    expect(combobox.getAttribute('aria-describedby')).toBe(error.id);
  });

  it('inherits disabled from FieldWrapper', () => {
    render(
      <FieldWrapper label="Plan" disabled>
        <Select>
          <option value="free">Free</option>
        </Select>
      </FieldWrapper>,
    );
    expect(screen.getByLabelText('Plan')).toBeDisabled();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Select aria-label="Plan">
        <option value="free">Free</option>
        <option value="pro">Pro</option>
      </Select>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
