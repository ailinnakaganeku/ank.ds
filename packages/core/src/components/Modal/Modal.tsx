import {
  useEffect,
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import './Modal.css';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const mouseDownTargetRef = useRef<EventTarget | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useFocusTrap({
    active: open,
    containerRef,
    initialFocus,
    onEscape: closeOnEscape ? onClose : undefined,
    lockScroll: true,
  });

  useEffect(() => {
    if (!open) return;
    const overlay = overlayRef.current;
    if (!overlay) return;
    const inerted: Element[] = [];
    Array.from(document.body.children).forEach((child) => {
      if (child !== overlay && !child.hasAttribute('inert')) {
        child.setAttribute('inert', '');
        inerted.push(child);
      }
    });
    return () => {
      inerted.forEach((node) => node.removeAttribute('inert'));
    };
  }, [open]);

  if (!mounted || !open) return null;

  const handleOverlayMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    mouseDownTargetRef.current = event.target;
  };

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!closeOnOverlay) {
      mouseDownTargetRef.current = null;
      return;
    }
    const clickedOverlay = event.target === event.currentTarget;
    const startedOnOverlay = mouseDownTargetRef.current === event.currentTarget;
    mouseDownTargetRef.current = null;
    if (clickedOverlay && startedOnOverlay) {
      onClose();
    }
  };

  return createPortal(
    <div
      ref={overlayRef}
      className="ank-modal-overlay"
      onMouseDown={handleOverlayMouseDown}
      onClick={handleOverlayClick}
    >
      <div
        ref={containerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-label={!title ? ariaLabel : undefined}
        aria-describedby={ariaDescribedBy}
        tabIndex={-1}
        className={clsx('ank-modal', `ank-modal--${size}`, className)}
      >
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
      </div>
    </div>,
    document.body,
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
