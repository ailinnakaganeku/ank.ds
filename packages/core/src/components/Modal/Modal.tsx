import {
  useEffect,
  useId,
  useRef,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from 'react';
import clsx from 'clsx';
import './Modal.css';
import { lockBodyScroll, unlockBodyScroll } from '../../utils/bodyScrollLock';
import { CloseIcon } from '../Icon';

export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  size?: ModalSize;
  closeOnOverlay?: boolean;
  closeOnEscape?: boolean;
  closeLabel?: string;
  initialFocus?: RefObject<HTMLElement>;
  className?: string;
  children?: ReactNode;
  'aria-label'?: string;
  'aria-describedby'?: string;
}

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

const ModalRoot = ({
  open,
  onClose,
  title,
  size = 'md',
  closeOnOverlay = true,
  closeOnEscape = true,
  closeLabel = 'Close',
  initialFocus,
  className,
  children,
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedBy,
}: ModalProps) => {
  const titleId = useId();
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

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={title ? titleId : undefined}
      aria-label={!title ? ariaLabel : undefined}
      aria-describedby={ariaDescribedBy}
      className={clsx('ank-modal', `ank-modal--${size}`, className)}
      onCancel={(event) => {
        if (event.target !== event.currentTarget) return;
        event.preventDefault();
        if (closeOnEscape) onClose();
      }}
      onClose={(event) => {
        if (event.target === event.currentTarget && open) onClose();
      }}
      onMouseDown={(event) => {
        pressStartedOnBackdrop.current = isOnBackdrop(event);
      }}
      onClick={(event) => {
        const startedOnBackdrop = pressStartedOnBackdrop.current;
        pressStartedOnBackdrop.current = false;
        if (closeOnOverlay && startedOnBackdrop && isOnBackdrop(event)) onClose();
      }}
    >
      {open && (
        <>
          {title && (
            <header className="ank-modal__header">
              <h2 id={titleId} className="ank-modal__title">
                {title}
              </h2>
              <button
                type="button"
                onClick={onClose}
                aria-label={closeLabel}
                className="ank-modal__close"
              >
                <CloseIcon size={14} />
              </button>
            </header>
          )}
          {children}
        </>
      )}
    </dialog>
  );
};

const Body = ({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('ank-modal__body', className)} {...rest}>
    {children}
  </div>
);

const Footer = ({ children, className, ...rest }: HTMLAttributes<HTMLDivElement>) => (
  <div className={clsx('ank-modal__footer', className)} {...rest}>
    {children}
  </div>
);

export const Modal = Object.assign(ModalRoot, { Body, Footer });
