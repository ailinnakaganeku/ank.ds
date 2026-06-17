import { describe, expect, it } from 'vitest';
import { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Tabs } from './Tabs';

const Basic = ({
  defaultValue,
  activationMode,
}: {
  defaultValue?: string;
  activationMode?: 'automatic' | 'manual';
}) => (
  <Tabs defaultValue={defaultValue} activationMode={activationMode}>
    <Tabs.List aria-label="Sections">
      <Tabs.Tab value="overview">Overview</Tabs.Tab>
      <Tabs.Tab value="billing">Billing</Tabs.Tab>
      <Tabs.Tab value="team">Team</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="overview">Overview panel</Tabs.Panel>
    <Tabs.Panel value="billing">Billing panel</Tabs.Panel>
    <Tabs.Panel value="team">Team panel</Tabs.Panel>
  </Tabs>
);

describe('Tabs', () => {
  it('renders all tabs and shows the panel for the selected one', () => {
    render(<Basic defaultValue="billing" />);
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tab', { name: 'Billing' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: 'Billing' })).toBeInTheDocument();
    expect(screen.queryByText('Overview panel')).not.toBeInTheDocument();
  });

  it('auto-selects the first non-disabled tab when uncontrolled with no defaultValue', async () => {
    render(
      <Tabs>
        <Tabs.List aria-label="No default">
          <Tabs.Tab value="a" disabled>
            Alpha
          </Tabs.Tab>
          <Tabs.Tab value="b">Beta</Tabs.Tab>
          <Tabs.Tab value="c">Gamma</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="a">A</Tabs.Panel>
        <Tabs.Panel value="b">B</Tabs.Panel>
        <Tabs.Panel value="c">C</Tabs.Panel>
      </Tabs>,
    );

    expect(await screen.findByRole('tab', { name: 'Beta', selected: true })).toBeInTheDocument();
    expect(screen.getByRole('tabpanel', { name: 'Beta' })).toBeInTheDocument();
  });

  it('applies roving tabindex so Tab key exits the tablist after the active tab', () => {
    render(<Basic defaultValue="billing" />);
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('tab', { name: 'Billing' })).toHaveAttribute('tabindex', '0');
    expect(screen.getByRole('tab', { name: 'Team' })).toHaveAttribute('tabindex', '-1');
  });

  it('activates the next tab on ArrowRight in automatic mode', async () => {
    const user = userEvent.setup();
    render(<Basic defaultValue="overview" />);

    const overview = screen.getByRole('tab', { name: 'Overview' });
    overview.focus();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: 'Billing' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Billing' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel', { name: 'Billing' })).toBeInTheDocument();
  });

  it('wraps from last to first on ArrowRight', async () => {
    const user = userEvent.setup();
    render(<Basic defaultValue="team" />);
    screen.getByRole('tab', { name: 'Team' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveFocus();
  });

  it('jumps to first and last with Home and End', async () => {
    const user = userEvent.setup();
    render(<Basic defaultValue="billing" />);
    screen.getByRole('tab', { name: 'Billing' }).focus();

    await user.keyboard('{Home}');
    expect(screen.getByRole('tab', { name: 'Overview' })).toHaveFocus();

    await user.keyboard('{End}');
    expect(screen.getByRole('tab', { name: 'Team' })).toHaveFocus();
  });

  it('moves focus but does not activate in manual mode', async () => {
    const user = userEvent.setup();
    render(<Basic defaultValue="overview" activationMode="manual" />);

    screen.getByRole('tab', { name: 'Overview' }).focus();
    await user.keyboard('{ArrowRight}');

    expect(screen.getByRole('tab', { name: 'Billing' })).toHaveFocus();
    expect(screen.getByRole('tab', { name: 'Billing' })).toHaveAttribute('aria-selected', 'false');
    expect(screen.getByRole('tabpanel', { name: 'Overview' })).toBeInTheDocument();

    await user.keyboard('{Enter}');
    expect(screen.getByRole('tab', { name: 'Billing' })).toHaveAttribute('aria-selected', 'true');
  });

  it('skips disabled tabs in keyboard navigation', async () => {
    const user = userEvent.setup();
    render(
      <Tabs defaultValue="a">
        <Tabs.List aria-label="With disabled">
          <Tabs.Tab value="a">Alpha</Tabs.Tab>
          <Tabs.Tab value="b" disabled>
            Beta
          </Tabs.Tab>
          <Tabs.Tab value="c">Gamma</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="a">A</Tabs.Panel>
        <Tabs.Panel value="b">B</Tabs.Panel>
        <Tabs.Panel value="c">C</Tabs.Panel>
      </Tabs>,
    );

    screen.getByRole('tab', { name: 'Alpha' }).focus();
    await user.keyboard('{ArrowRight}');
    expect(screen.getByRole('tab', { name: 'Gamma' })).toHaveFocus();
  });

  it('exposes onChange and respects controlled value', async () => {
    const user = userEvent.setup();
    const Wrapper = () => {
      const [value, setValue] = useState('overview');
      return (
        <>
          <span data-testid="state">{value}</span>
          <Tabs value={value} onChange={setValue}>
            <Tabs.List aria-label="Controlled">
              <Tabs.Tab value="overview">Overview</Tabs.Tab>
              <Tabs.Tab value="billing">Billing</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="overview">Overview</Tabs.Panel>
            <Tabs.Panel value="billing">Billing</Tabs.Panel>
          </Tabs>
        </>
      );
    };
    render(<Wrapper />);
    await user.click(screen.getByRole('tab', { name: 'Billing' }));
    expect(screen.getByTestId('state')).toHaveTextContent('billing');
  });

  it('wires aria-controls and aria-labelledby bidirectionally', () => {
    render(<Basic defaultValue="overview" />);
    const tab = screen.getByRole('tab', { name: 'Overview' });
    const panel = screen.getByRole('tabpanel', { name: 'Overview' });
    expect(tab.getAttribute('aria-controls')).toBe(panel.id);
    expect(panel.getAttribute('aria-labelledby')).toBe(tab.id);
  });

  it('has no axe violations', async () => {
    const { container } = render(<Basic defaultValue="overview" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
