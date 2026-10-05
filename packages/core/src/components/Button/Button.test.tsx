import { describe, expect, it, vi } from 'vitest';
import { createRef } from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Button, buttonVariants } from './Button';

describe('Button', () => {
  it('renders its children as the accessible name', () => {
    render(<Button>Save changes</Button>);
    expect(screen.getByRole('button', { name: 'Save changes' })).toBeInTheDocument();
  });

  it('defaults to type="button"', () => {
    render(<Button>Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
  });

  it('respects an explicit type when provided', () => {
    render(<Button type="submit">Save</Button>);
    expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
  });

  it('fires onClick when activated by mouse', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Save</Button>);

    await user.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('fires onClick when activated by keyboard (Enter)', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Save</Button>);

    screen.getByRole('button').focus();
    await user.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('fires onClick when activated by keyboard (Space)', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Save</Button>);

    screen.getByRole('button').focus();
    await user.keyboard(' ');
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not fire onClick when disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();
    render(
      <Button disabled onClick={handleClick}>
        Save
      </Button>,
    );

    await user.click(screen.getByRole('button'));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('exposes the underlying button via ref', () => {
    const ref = createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Save</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('renders left and right icons in order', () => {
    render(
      <Button
        iconLeft={<svg role="img" aria-label="left" />}
        iconRight={<svg role="img" aria-label="right" />}
      >
        With icons
      </Button>,
    );
    const left = screen.getByRole('img', { name: 'left' });
    const right = screen.getByRole('img', { name: 'right' });
    expect(left.compareDocumentPosition(right) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });

  it('treats children-less icon button as icon-only and requires aria-label', () => {
    render(<Button iconLeft={<svg role="img" aria-label="plus" />} aria-label="Add" />);
    const button = screen.getByRole('button', { name: 'Add' });
    expect(button).toBeInTheDocument();
    expect(within(button).getByRole('img', { name: 'plus' })).toBeInTheDocument();
  });

  it('applies the requested variant class', () => {
    render(<Button variant="danger">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('ank-button--danger');
  });

  it('has no axe violations in its default state', async () => {
    const { container } = render(<Button>Save</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('does not compile as icon-only without an accessible name', () => {
    // @ts-expect-error a button without children needs aria-label or aria-labelledby
    const button = <Button iconLeft={<svg aria-hidden />} />;
    expect(button).toBeDefined();
  });

  it('has no axe violations when icon-only with aria-label', async () => {
    const { container } = render(<Button iconLeft={<svg aria-hidden />} aria-label="Add item" />);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no axe violations when disabled', async () => {
    const { container } = render(<Button disabled>Save</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });

  it('styles a link with buttonVariants', () => {
    render(
      <a href="/docs" className={buttonVariants({ variant: 'secondary', size: 'sm' })}>
        Docs
      </a>,
    );
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveClass(
      'ank-button',
      'ank-button--secondary',
      'ank-button--sm',
    );
  });
});
