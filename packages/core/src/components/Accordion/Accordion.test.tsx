import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Accordion } from './Accordion';

const Three = () => (
  <Accordion>
    <Accordion.Item>
      <Accordion.Trigger>Question A</Accordion.Trigger>
      <Accordion.Panel>Answer A</Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item defaultOpen>
      <Accordion.Trigger>Question B</Accordion.Trigger>
      <Accordion.Panel>Answer B</Accordion.Panel>
    </Accordion.Item>
    <Accordion.Item>
      <Accordion.Trigger>Question C</Accordion.Trigger>
      <Accordion.Panel>Answer C</Accordion.Panel>
    </Accordion.Item>
  </Accordion>
);

describe('Accordion', () => {
  it('renders each trigger as a button inside a heading', () => {
    render(<Three />);

    expect(screen.getByRole('heading', { level: 3, name: 'Question A' })).toContainElement(
      screen.getByRole('button', { name: 'Question A' }),
    );
  });

  it('uses the heading level it is given', () => {
    render(
      <Accordion>
        <Accordion.Item>
          <Accordion.Trigger level={2}>Question A</Accordion.Trigger>
          <Accordion.Panel>Answer A</Accordion.Panel>
        </Accordion.Item>
      </Accordion>,
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Question A' })).toBeInTheDocument();
  });

  it('starts with only the items marked defaultOpen expanded', () => {
    render(<Three />);

    expect(screen.getByRole('button', { name: 'Question A' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
    expect(screen.getByRole('button', { name: 'Question B' })).toHaveAttribute(
      'aria-expanded',
      'true',
    );
    expect(screen.queryByRole('region', { name: 'Question A' })).not.toBeInTheDocument();
  });

  it('points each trigger at the panel it controls', () => {
    render(<Three />);

    expect(screen.getByRole('button', { name: 'Question B' })).toHaveAttribute(
      'aria-controls',
      screen.getByRole('region', { name: 'Question B' }).id,
    );
  });

  it('opens an item without closing the ones already open', async () => {
    const user = userEvent.setup();
    render(<Three />);

    await user.click(screen.getByRole('button', { name: 'Question A' }));

    expect(screen.getByRole('region', { name: 'Question A' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Question B' })).toBeInTheDocument();
  });

  it('closes an open item when its trigger is activated again', async () => {
    const user = userEvent.setup();
    render(<Three />);

    await user.click(screen.getByRole('button', { name: 'Question B' }));

    expect(screen.queryByRole('region', { name: 'Question B' })).not.toBeInTheDocument();
  });

  it('toggles from the keyboard', async () => {
    const user = userEvent.setup();
    render(<Three />);

    await user.tab();
    await user.keyboard('{Enter}');

    expect(screen.getByRole('region', { name: 'Question A' })).toBeInTheDocument();
  });

  it('has no axe violations', async () => {
    const { container } = render(<Three />);

    expect(await axe(container)).toHaveNoViolations();
  });
});
