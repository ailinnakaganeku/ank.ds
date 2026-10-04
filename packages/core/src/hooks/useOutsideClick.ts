import { useEffect, type RefObject } from 'react';
import { useLatestRef } from './useLatestRef';

export const useOutsideClick = (
  active: boolean,
  insideRefs: ReadonlyArray<RefObject<Element | null>>,
  onOutsideClick: () => void,
) => {
  const latest = useLatestRef({ insideRefs, onOutsideClick });

  useEffect(() => {
    if (!active) return;
    const handleMouseDown = (event: MouseEvent) => {
      const { target } = event;
      if (!(target instanceof Node)) return;
      if (latest.current.insideRefs.some((ref) => ref.current?.contains(target))) return;
      latest.current.onOutsideClick();
    };
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, [active, latest]);
};
