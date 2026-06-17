import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { useRef } from 'react';
import { act, render } from '@testing-library/react';
import { useFocusTrap, getFocusableElements, __resetBodyLockForTests } from './useFocusTrap';

const Trapped = ({
  active,
  onEscape,
  lockScroll = true,
}: {
  active: boolean;
  onEscape?: () => void;
  lockScroll?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap({ active, containerRef: ref, onEscape, lockScroll });
  return (
    <div ref={ref} data-testid="container">
      <button>one</button>
      <button>two</button>
    </div>
  );
};

beforeEach(() => {
  __resetBodyLockForTests();
});

afterEach(() => {
  __resetBodyLockForTests();
});

describe('useFocusTrap', () => {
  it('locks the body overflow when active', () => {
    document.body.style.overflow = '';
    render(<Trapped active />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores the body overflow when the trap releases', () => {
    document.body.style.overflow = 'auto';
    const { unmount } = render(<Trapped active />);
    expect(document.body.style.overflow).toBe('hidden');
    unmount();
    expect(document.body.style.overflow).toBe('auto');
  });

  it('keeps the body locked while another trap is still active (refcount)', () => {
    document.body.style.overflow = '';
    const first = render(<Trapped active />);
    const second = render(<Trapped active />);
    expect(document.body.style.overflow).toBe('hidden');

    first.unmount();
    expect(document.body.style.overflow).toBe('hidden');

    second.unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('does not lock the body when lockScroll is false', () => {
    document.body.style.overflow = '';
    render(<Trapped active lockScroll={false} />);
    expect(document.body.style.overflow).toBe('');
  });

  it('calls onEscape when Escape is pressed', () => {
    let called = 0;
    render(<Trapped active onEscape={() => (called += 1)} />);
    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(called).toBe(1);
  });

  it('ignores Escape when no onEscape handler is provided', () => {
    render(<Trapped active />);
    act(() => {
      document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    });
    expect(document.body.style.overflow).toBe('hidden');
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
