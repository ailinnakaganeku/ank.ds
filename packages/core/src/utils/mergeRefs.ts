import type { ForwardedRef, MutableRefObject, RefCallback } from 'react';

type AssignableRef<T> = ForwardedRef<T> | MutableRefObject<T | null>;

export const mergeRefs =
  <T>(...refs: AssignableRef<T>[]): RefCallback<T> =>
  (node) => {
    for (const ref of refs) {
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    }
  };
