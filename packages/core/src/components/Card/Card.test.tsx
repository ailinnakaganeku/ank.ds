import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Card } from './Card';

describe('Card', () => {
  it('renders compound subcomponents in order', () => {
    render(
      <Card>
        <Card.Eyebrow>New</Card.Eyebrow>
        <Card.Title>Card title</Card.Title>
        <Card.Description>Body text</Card.Description>
        <Card.Footer>
          <button>Action</button>
        </Card.Footer>
      </Card>,
    );
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Card title' })).toBeInTheDocument();
    expect(screen.getByText('Body text')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('renders as a non-interactive container by default (no role, no tabindex)', () => {
    const { container } = render(
      <Card>
        <Card.Title>Static card</Card.Title>
      </Card>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root).not.toHaveAttribute('role');
    expect(root).not.toHaveAttribute('tabindex');
  });

  it('exposes role="button" and tabindex=0 when interactive', () => {
    const { container } = render(
      <Card interactive>
        <Card.Title>Interactive card</Card.Title>
      </Card>,
    );
    const root = container.firstChild as HTMLElement;
    expect(root).toHaveAttribute('role', 'button');
    expect(root).toHaveAttribute('tabindex', '0');
  });

  it('fires onClick when an interactive card is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Card interactive onClick={handleClick}>
        <Card.Title>Card</Card.Title>
      </Card>,
    );
    await user.click(screen.getByRole('button', { name: 'Card' }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('fires onClick when Enter is pressed on an interactive card', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Card interactive onClick={handleClick}>
        <Card.Title>Card</Card.Title>
      </Card>,
    );
    screen.getByRole('button', { name: 'Card' }).focus();
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('fires onClick when Space is pressed on an interactive card', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Card interactive onClick={handleClick}>
        <Card.Title>Card</Card.Title>
      </Card>,
    );
    screen.getByRole('button', { name: 'Card' }).focus();
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not respond to Enter/Space when not interactive', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    const { container } = render(
      <Card onClick={handleClick}>
        <Card.Title>Static</Card.Title>
      </Card>,
    );
    (container.firstChild as HTMLElement).focus();
    await user.keyboard('{Enter}');
    await user.keyboard(' ');
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('Title renders as an h3 by default', () => {
    render(
      <Card>
        <Card.Title>A title</Card.Title>
      </Card>,
    );
    const heading = screen.getByRole('heading', { name: 'A title' });
    expect(heading.tagName).toBe('H3');
  });

  it('has no axe violations as a non-interactive card', async () => {
    const { container } = render(
      <Card>
        <Card.Title>Card</Card.Title>
        <Card.Description>Some body text</Card.Description>
      </Card>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no axe violations as an interactive card', async () => {
    const { container } = render(
      <Card interactive onClick={() => {}}>
        <Card.Title>Card</Card.Title>
        <Card.Description>Some body text</Card.Description>
      </Card>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
