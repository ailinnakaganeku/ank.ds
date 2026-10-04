import { createRef } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { mergeRefs } from './mergeRefs';

describe('mergeRefs', () => {
  it('gives the node to object refs and callback refs alike', () => {
    const objectRef = createRef<HTMLButtonElement>();
    const callbackRef = vi.fn();
    render(
      <button type="button" ref={mergeRefs(objectRef, callbackRef, null)}>
        Save
      </button>,
    );
    const button = screen.getByRole('button', { name: 'Save' });

    expect(objectRef.current).toBe(button);
    expect(callbackRef).toHaveBeenCalledWith(button);
  });
});
