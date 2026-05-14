import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Tooltip } from './Tooltip';

const TriggerButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button type="button" {...props} />
);

describe('Tooltip', () => {
  it('shows on hover and hides on mouse leave', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Copy to clipboard" delayMs={0}>
        <TriggerButton>Copy</TriggerButton>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button', { name: 'Copy' });
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();

    await user.hover(trigger);
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Copy to clipboard');

    await user.unhover(trigger);
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows on focus and hides on blur', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Help" delayMs={0}>
        <TriggerButton>x</TriggerButton>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button', { name: 'x' });
    await user.tab();
    expect(trigger).toHaveFocus();
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    await user.tab();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('wires aria-describedby on the trigger while open', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tip" delayMs={0}>
        <TriggerButton>x</TriggerButton>
      </Tooltip>,
    );
    const trigger = screen.getByRole('button', { name: 'x' });
    await user.hover(trigger);
    const tip = await screen.findByRole('tooltip');
    expect(trigger.getAttribute('aria-describedby')).toBe(tip.id);
  });

  it('closes on Escape', async () => {
    const user = userEvent.setup();
    render(
      <Tooltip content="Tip" delayMs={0}>
        <TriggerButton>x</TriggerButton>
      </Tooltip>,
    );
    await user.hover(screen.getByRole('button', { name: 'x' }));
    expect(await screen.findByRole('tooltip')).toBeInTheDocument();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('has no axe violations when open', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <Tooltip content="Tip" delayMs={0}>
        <TriggerButton>x</TriggerButton>
      </Tooltip>,
    );
    await user.hover(screen.getByRole('button', { name: 'x' }));
    await screen.findByRole('tooltip');
    expect(await axe(container)).toHaveNoViolations();
  });
});
