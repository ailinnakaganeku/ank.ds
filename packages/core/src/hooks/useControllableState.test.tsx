import { describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useControllableState } from './useControllableState';

describe('useControllableState', () => {
  it('starts from the default value and updates itself when uncontrolled', () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllableState({ value: undefined, defaultValue: 'a', onChange }),
    );
    expect(result.current[0]).toBe('a');

    act(() => result.current[1]('b'));

    expect(result.current[0]).toBe('b');
    expect(onChange).toHaveBeenCalledWith('b');
  });

  it('follows the value prop and only reports changes when controlled', () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }) => useControllableState({ value, defaultValue: 'a', onChange }),
      { initialProps: { value: 'x' } },
    );

    act(() => result.current[1]('y'));

    expect(result.current[0]).toBe('x');
    expect(onChange).toHaveBeenCalledWith('y');

    rerender({ value: 'y' });

    expect(result.current[0]).toBe('y');
  });
});
