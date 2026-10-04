import { useEffect } from 'react';
import { useLatestRef } from './useLatestRef';

export const useEscapeKey = (active: boolean, onEscape: (event: KeyboardEvent) => void) => {
  const latestOnEscape = useLatestRef(onEscape);

  useEffect(() => {
    if (!active) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') latestOnEscape.current(event);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [active, latestOnEscape]);
};
