import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders the fallback immediately when no image is provided', () => {
    render(
      <Avatar>
        <Avatar.Fallback>AL</Avatar.Fallback>
      </Avatar>,
    );
    expect(screen.getByText('AL')).toBeInTheDocument();
  });

  it('shows the image after it loads and hides the fallback', async () => {
    render(
      <Avatar>
        <Avatar.Image src="/ada.jpg" alt="Ada Lovelace" />
        <Avatar.Fallback>AL</Avatar.Fallback>
      </Avatar>,
    );

    expect(screen.getByText('AL')).toBeInTheDocument();

    const img = screen.getByAltText('Ada Lovelace');
    fireEvent.load(img);

    await waitFor(() => {
      expect(screen.queryByText('AL')).not.toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toBeInTheDocument();
    });
  });

  it('keeps the fallback when the image fails to load', async () => {
    render(
      <Avatar>
        <Avatar.Image src="/bad.jpg" alt="Ada Lovelace" />
        <Avatar.Fallback>AL</Avatar.Fallback>
      </Avatar>,
    );

    const img = screen.getByAltText('Ada Lovelace');
    fireEvent.error(img);

    await waitFor(() => {
      expect(screen.getByText('AL')).toBeInTheDocument();
      expect(screen.queryByAltText('Ada Lovelace')).not.toBeInTheDocument();
    });
  });

  it('hides the image from the accessibility tree while it is loading', () => {
    render(
      <Avatar>
        <Avatar.Image src="/ada.jpg" alt="Ada Lovelace" />
        <Avatar.Fallback>AL</Avatar.Fallback>
      </Avatar>,
    );
    const img = screen.getByAltText('Ada Lovelace');
    expect(img).toHaveAttribute('aria-hidden', 'true');
  });

  it('applies the size class', () => {
    const { container } = render(
      <Avatar size="lg">
        <Avatar.Fallback>X</Avatar.Fallback>
      </Avatar>,
    );
    expect(container.firstChild).toHaveClass('ank-avatar--lg');
  });

  it('applies the tone class for non-neutral tones', () => {
    const { container } = render(
      <Avatar tone="primary">
        <Avatar.Fallback>X</Avatar.Fallback>
      </Avatar>,
    );
    expect(container.firstChild).toHaveClass('ank-avatar--primary');
  });

  it('throws when subcomponents are used outside Avatar', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Avatar.Fallback>X</Avatar.Fallback>)).toThrow(/inside <Avatar>/);
    spy.mockRestore();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Avatar>
        <Avatar.Fallback>AL</Avatar.Fallback>
      </Avatar>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
