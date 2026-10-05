import { describe, expect, it } from 'vitest';
import { useRef } from 'react';
import { act, render, screen } from '@testing-library/react';
import { useFocusTrap, getFocusableElements } from './useFocusTrap';

const Trapped = ({ active, onEscape }: { active: boolean; onEscape?: () => void }) => {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap({ active, containerRef: ref, onEscape });
  return (
    <div ref={ref}>
      <button>one</button>
      <button>two</button>
    </div>
  );
};

describe('useFocusTrap', () => {
  it('returns focus to the SVG element that had it before the trap', async () => {
    const Chart = ({ active }: { active: boolean }) => (
      <>
        <svg>
          <a href="#series" aria-label="Open series" />
        </svg>
        <Trapped active={active} />
      </>
    );
    const { rerender } = render(<Chart active={false} />);
    const link = screen.getByRole('link', { name: 'Open series' });
    act(() => link.focus());

    rerender(<Chart active />);
    await act(() => new Promise((resolve) => requestAnimationFrame(resolve)));
    expect(screen.getByRole('button', { name: 'one' })).toHaveFocus();

    rerender(<Chart active={false} />);
    expect(link).toHaveFocus();
  });

  it('calls onEscape when Escape is pressed', () => {
    let called = 0;
    render(<Trapped active onEscape={() => (called += 1)} />);
    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(called).toBe(1);
  });

  it('leaves Escape alone when no onEscape handler is provided', () => {
    render(<Trapped active />);
    const escape = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });

    act(() => {
      document.dispatchEvent(escape);
    });

    expect(escape.defaultPrevented).toBe(false);
  });
});

describe('getFocusableElements', () => {
  it('returns enabled focusable descendants', () => {
    document.body.innerHTML = `
      <div id="root">
        <button>one</button>
        <button disabled>nope</button>
        <a href="#x">two</a>
        <input />
      </div>
    `;
    const root = document.getElementById('root')!;
    const focusable = getFocusableElements(root);
    expect(focusable).toHaveLength(3);
  });

  it('skips elements marked aria-hidden', () => {
    document.body.innerHTML = `
      <div id="root">
        <button>one</button>
        <button aria-hidden="true">hidden</button>
      </div>
    `;
    const root = document.getElementById('root')!;
    expect(getFocusableElements(root)).toHaveLength(1);
  });

  it('skips elements with the hidden attribute', () => {
    document.body.innerHTML = `
      <div id="root">
        <button>one</button>
        <button hidden>hidden</button>
      </div>
    `;
    const root = document.getElementById('root')!;
    expect(getFocusableElements(root)).toHaveLength(1);
  });
});
