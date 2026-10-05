import { useEffect, useRef, type MouseEvent, type RefObject, type SyntheticEvent } from 'react';
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
  onClose: () => void;
  onBackdropPress: () => void;
  initialFocus?: RefObject<HTMLElement>;
}

export const useModalDialog = ({
  open,
  onClose,
  onBackdropPress,
  initialFocus,
}: UseModalDialogOptions) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const pressStartedOnBackdrop = useRef(false);
  const closesOfOurOwn = useRef(0);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !open) return;

    dialog.showModal();
    initialFocus?.current?.focus();
    lockBodyScroll();

    return () => {
      closesOfOurOwn.current += 1;
      dialog.close();
      unlockBodyScroll();
    };
  }, [open, initialFocus]);

  return {
    dialogRef,
    dialogHandlers: {
      onClose: (event: SyntheticEvent<HTMLDialogElement>) => {
        if (event.target !== event.currentTarget) return;
        if (closesOfOurOwn.current > 0) {
          closesOfOurOwn.current -= 1;
          return;
        }
        onClose();
      },
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
