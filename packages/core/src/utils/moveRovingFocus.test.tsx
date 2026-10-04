import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { moveRovingFocus, type Orientation } from './moveRovingFocus';

const Toolbar = ({ orientation }: { orientation: Orientation }) => (
  <div
    role="toolbar"
    aria-label="Formatting"
    onKeyDown={(event) => {
      const buttons = Array.from(event.currentTarget.querySelectorAll('button'));
      moveRovingFocus(event, buttons, orientation);
    }}
  >
    <button type="button">Bold</button>
    <button type="button">Italic</button>
    <button type="button">Underline</button>
  </div>
);

const focused = () => document.activeElement?.textContent;

describe('moveRovingFocus', () => {
  it.each([
    ['horizontal', '{ArrowRight}', '{ArrowLeft}'],
    ['vertical', '{ArrowDown}', '{ArrowUp}'],
  ] as const)(
    'moves to the next and previous item when %s',
    async (orientation, next, previous) => {
      const user = userEvent.setup();
      render(<Toolbar orientation={orientation} />);
      screen.getByRole('button', { name: 'Bold' }).focus();

      await user.keyboard(next);
      expect(focused()).toBe('Italic');

      await user.keyboard(previous);
      expect(focused()).toBe('Bold');
    },
  );

  it('wraps from the last item to the first and back', async () => {
    const user = userEvent.setup();
    render(<Toolbar orientation="horizontal" />);
    screen.getByRole('button', { name: 'Underline' }).focus();

    await user.keyboard('{ArrowRight}');
    expect(focused()).toBe('Bold');

    await user.keyboard('{ArrowLeft}');
    expect(focused()).toBe('Underline');
  });

  it('jumps to the first and last item with Home and End', async () => {
    const user = userEvent.setup();
    render(<Toolbar orientation="horizontal" />);
    screen.getByRole('button', { name: 'Italic' }).focus();

    await user.keyboard('{End}');
    expect(focused()).toBe('Underline');

    await user.keyboard('{Home}');
    expect(focused()).toBe('Bold');
  });

  it('ignores the arrows of the other axis', async () => {
    const user = userEvent.setup();
    render(<Toolbar orientation="horizontal" />);
    screen.getByRole('button', { name: 'Bold' }).focus();

    await user.keyboard('{ArrowDown}');

    expect(focused()).toBe('Bold');
  });
});
