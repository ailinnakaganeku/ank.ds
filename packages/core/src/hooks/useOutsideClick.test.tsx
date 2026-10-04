import { useRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useOutsideClick } from './useOutsideClick';

const Panel = ({ active, onOutsideClick }: { active: boolean; onOutsideClick: () => void }) => {
  const panelRef = useRef<HTMLDivElement>(null);
  useOutsideClick(active, [panelRef], onOutsideClick);
  return (
    <>
      <div ref={panelRef}>
        <button type="button">inside</button>
      </div>
      <button type="button">outside</button>
    </>
  );
};

describe('useOutsideClick', () => {
  it('reports a click outside the given elements', async () => {
    const user = userEvent.setup();
    const onOutsideClick = vi.fn();
    render(<Panel active onOutsideClick={onOutsideClick} />);

    await user.click(screen.getByRole('button', { name: 'outside' }));

    expect(onOutsideClick).toHaveBeenCalledTimes(1);
  });

  it('ignores clicks inside the given elements', async () => {
    const user = userEvent.setup();
    const onOutsideClick = vi.fn();
    render(<Panel active onOutsideClick={onOutsideClick} />);

    await user.click(screen.getByRole('button', { name: 'inside' }));

    expect(onOutsideClick).not.toHaveBeenCalled();
  });

  it('ignores every click while inactive', async () => {
    const user = userEvent.setup();
    const onOutsideClick = vi.fn();
    render(<Panel active={false} onOutsideClick={onOutsideClick} />);

    await user.click(screen.getByRole('button', { name: 'outside' }));

    expect(onOutsideClick).not.toHaveBeenCalled();
  });
});
