import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('shows the fallback as an image named by alt when there is no src', () => {
    render(<Avatar alt="Ada Lovelace" fallback="AL" />);

    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveTextContent('AL');
  });

  it('exposes the picture, and only the picture, when there is a src', () => {
    render(<Avatar src="/ada.jpg" alt="Ada Lovelace" fallback="AL" />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(1);
    expect(images[0]).toHaveAttribute('src', '/ada.jpg');
    expect(images[0]).toHaveAccessibleName('Ada Lovelace');
  });

  it('does not render the fallback while the picture shows', () => {
    render(<Avatar src="/ada.jpg" alt="Ada Lovelace" fallback="AL" />);

    expect(screen.queryByText('AL')).not.toBeInTheDocument();
  });

  it('falls back when the picture fails to load', () => {
    render(<Avatar src="/bad.jpg" alt="Ada Lovelace" fallback="AL" />);

    fireEvent.error(screen.getByRole('img', { name: 'Ada Lovelace' }));

    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveTextContent('AL');
  });

  it('tries a new src after the previous picture failed', () => {
    const { rerender } = render(<Avatar src="/bad.jpg" alt="Ada Lovelace" fallback="AL" />);
    fireEvent.error(screen.getByRole('img', { name: 'Ada Lovelace' }));

    rerender(<Avatar src="/ada.jpg" alt="Ada Lovelace" fallback="AL" />);

    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveAttribute('src', '/ada.jpg');
  });

  it('goes back to the fallback when the src is removed', () => {
    const { rerender } = render(<Avatar src="/ada.jpg" alt="Ada Lovelace" fallback="AL" />);

    rerender(<Avatar alt="Ada Lovelace" fallback="AL" />);

    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveTextContent('AL');
  });

  it('is hidden from assistive technology when alt is empty', () => {
    render(<Avatar alt="" fallback="AL" />);

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('AL')).toBeInTheDocument();
  });

  it.each([
    ['with a picture', <Avatar key="a" src="/ada.jpg" alt="Ada Lovelace" fallback="AL" />],
    ['with the fallback', <Avatar key="b" alt="Ada Lovelace" fallback="AL" />],
  ])('has no axe violations %s', async (_name, avatar) => {
    const { container } = render(avatar);

    expect(await axe(container)).toHaveNoViolations();
  });
});
