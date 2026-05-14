import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Accordion } from './Accordion';

const Three = ({
  type = 'single',
  collapsible,
  defaultValue,
}: {
  type?: 'single' | 'multiple';
  collapsible?: boolean;
  defaultValue?: string | string[];
}) => (
  <Accordion type={type} collapsible={collapsible} defaultValue={defaultValue}>
    <Accordion.Item value="a">
      <Accordion.Trigger>Question A</Accordion.Trigger>
      <Accordion.Panel>Answer A</Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item value="b">
      <Accordion.Trigger>Question B</Accordion.Trigger>
      <Accordion.Panel>Answer B</Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item value="c">
      <Accordion.Trigger>Question C</Accordion.Trigger>
      <Accordion.Panel>Answer C</Accordion.Panel>
    </Accordion.Item>
  </Accordion>
);

describe('Accordion', () => {
  it('renders each trigger as a button inside a heading', () => {
    render(<Three />);
    const trigger = screen.getByRole('button', { name: 'Question A' });
    expect(trigger.parentElement?.tagName).toBe('H3');
  });

  it('wires aria-expanded and aria-controls on each trigger', () => {
    render(<Three defaultValue="b" />);
    const a = screen.getByRole('button', { name: 'Question A' });
    const b = screen.getByRole('button', { name: 'Question B' });
    expect(a).toHaveAttribute('aria-expanded', 'false');
    expect(b).toHaveAttribute('aria-expanded', 'true');
    expect(b.getAttribute('aria-controls')).toBe(
      screen.getByRole('region', { name: 'Question B' }).id,
    );
  });

  it('opens an item when its trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<Three />);
    await user.click(screen.getByRole('button', { name: 'Question A' }));
    expect(screen.getByRole('region', { name: 'Question A' })).toBeInTheDocument();
  });

  it('closes the previously open item when type is single', async () => {
    const user = userEvent.setup();
    render(<Three defaultValue="a" />);
    expect(screen.getByRole('region', { name: 'Question A' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Question B' }));
    expect(screen.queryByRole('region', { name: 'Question A' })).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Question B' })).toBeInTheDocument();
  });

  it('keeps multiple items open when type is multiple', async () => {
    const user = userEvent.setup();
    render(<Three type="multiple" />);

    await user.click(screen.getByRole('button', { name: 'Question A' }));
    await user.click(screen.getByRole('button', { name: 'Question C' }));

    expect(screen.getByRole('region', { name: 'Question A' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Question C' })).toBeInTheDocument();
  });

  it('allows the current single item to collapse when collapsible is true', async () => {
    const user = userEvent.setup();
    render(<Three defaultValue="a" collapsible />);
    await user.click(screen.getByRole('button', { name: 'Question A' }));
    expect(screen.queryByRole('region', { name: 'Question A' })).not.toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<Three defaultValue="a" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
