import { useEffect, useRef, type MouseEvent, type RefObject } from 'react';
import { lockBodyScroll, unlockBodyScroll } from '../utils/bodyScrollLock';

const isOnBackdrop = (event: MouseEvent<HTMLDialogElement>) => {
  if (event.target !== event.currentTarget) return false;
  const box = event.currentTarget.getBoundingClientRect();
  return (
    event.clientX < box.left ||
    event.clientX > box.right ||
    event.clientY < box.top ||
    event.clientY > box.bottom
  );
};

export interface UseModalDialogOptions {
  open: boolean;
  onBackdropPress: () => void;
  initialFocus?: RefObject<HTMLElement>;
}

export const useModalDialog = ({ open, onBackdropPress, initialFocus }: UseModalDialogOptions) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pressStartedOnBackdrop = useRef(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;

    dialog.showModal();
    initialFocus?.current?.focus();
    lockBodyScroll();

    return () => {
      dialog.close();
      unlockBodyScroll();
    };
  }, [open, initialFocus]);

  return {
    dialogRef,
    backdropHandlers: {
      onMouseDown: (event: MouseEvent<HTMLDialogElement>) => {
        pressStartedOnBackdrop.current = isOnBackdrop(event);
      },
      onClick: (event: MouseEvent<HTMLDialogElement>) => {
        const startedOnBackdrop = pressStartedOnBackdrop.current;
        pressStartedOnBackdrop.current = false;
        if (startedOnBackdrop && isOnBackdrop(event)) onBackdropPress();
      },
    },
  };
};
