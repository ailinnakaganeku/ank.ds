import { describe, expect, it } from 'vitest';
import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Radio } from './Radio';
import { FieldWrapper } from '../FieldWrapper';

const Group = () => {
  const [value, setValue] = useState('pro');
  return (
    <>
      {(['free', 'pro', 'enterprise'] as const).map((option) => (
        <Radio
          key={option}
          name="plan"
          value={option}
          checked={value === option}
          onChange={(e) => setValue(e.target.value)}
        >
          {option}
        </Radio>
      ))}
      <span data-testid="value">{value}</span>
    </>
  );
};

describe('Radio', () => {
  it('renders as a radio with its label as the accessible name', () => {
    render(<Radio name="x">Free</Radio>);
    expect(screen.getByRole('radio', { name: 'Free' })).toBeInTheDocument();
  });

  it('selects a radio in a group when clicked', async () => {
    const user = userEvent.setup();
    render(<Group />);
    await user.click(screen.getByRole('radio', { name: 'enterprise' }));
    expect(screen.getByTestId('value')).toHaveTextContent('enterprise');
    expect(screen.getByRole('radio', { name: 'enterprise' })).toBeChecked();
  });

  it('moves selection with the arrow key inside a native group', async () => {
    const user = userEvent.setup();
    render(<Group />);
    const pro = screen.getByRole('radio', { name: 'pro' });
    pro.focus();
    await user.keyboard('{ArrowDown}');
    expect(screen.getByTestId('value')).toHaveTextContent('enterprise');
  });

  it('inherits disabled from a FieldWrapper context', () => {
    render(
      <FieldWrapper label="Plan" disabled>
        <Radio name="plan" value="free">
          Free
        </Radio>
      </FieldWrapper>,
    );
    expect(screen.getByRole('radio', { name: 'Free' })).toBeDisabled();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <>
        <Radio name="plan" value="free">
          Free
        </Radio>
        <Radio name="plan" value="pro">
          Pro
        </Radio>
      </>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
