import { describe, expect, it, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useEscapeKey } from './useEscapeKey';

describe('useEscapeKey', () => {
  it('calls the handler when Escape is pressed while active', async () => {
    const user = userEvent.setup();
    const onEscape = vi.fn();
    renderHook(() => useEscapeKey(true, onEscape));

    await user.keyboard('{Escape}');

    expect(onEscape).toHaveBeenCalledTimes(1);
  });

  it('ignores Escape while inactive', async () => {
    const user = userEvent.setup();
    const onEscape = vi.fn();
    renderHook(() => useEscapeKey(false, onEscape));

    await user.keyboard('{Escape}');

    expect(onEscape).not.toHaveBeenCalled();
  });

  it('calls the latest handler without re-subscribing', async () => {
    const user = userEvent.setup();
    const first = vi.fn();
    const latest = vi.fn();
    const { rerender } = renderHook(({ handler }) => useEscapeKey(true, handler), {
      initialProps: { handler: first },
    });

    rerender({ handler: latest });
    await user.keyboard('{Escape}');

    expect(first).not.toHaveBeenCalled();
    expect(latest).toHaveBeenCalledTimes(1);
  });
});
