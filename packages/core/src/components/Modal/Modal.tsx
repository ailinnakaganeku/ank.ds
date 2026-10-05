import { useId, type HTMLAttributes, type ReactNode, type RefObject } from 'react';
import clsx from 'clsx';
import './Modal.css';
import { useModalDialog } from '../../hooks/useModalDialog';
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
  const { dialogRef, dialogHandlers } = useModalDialog({
    open,
    onClose,
    initialFocus,
    onBackdropPress: () => {
      if (closeOnOverlay) onClose();
    },
  });

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
      {...dialogHandlers}
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
