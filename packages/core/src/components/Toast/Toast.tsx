import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import './Toast.css';

export type ToastVariant = 'default' | 'success' | 'warning' | 'error' | 'info';

export type ToastPlacement =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface ToastOptions {
  title?: ReactNode;
  description?: ReactNode;
  variant?: ToastVariant;
  duration?: number;
  action?: ToastAction;
  dismissLabel?: string;
}

export interface ToastData extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  toasts: ToastData[];
  show: (options: ToastOptions) => string;
  success: (title: ReactNode, options?: Omit<ToastOptions, 'variant' | 'title'>) => string;
  warning: (title: ReactNode, options?: Omit<ToastOptions, 'variant' | 'title'>) => string;
  error:   (title: ReactNode, options?: Omit<ToastOptions, 'variant' | 'title'>) => string;
  info:    (title: ReactNode, options?: Omit<ToastOptions, 'variant' | 'title'>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast() must be called inside <ToastProvider>');
  }
  return ctx;
};

let toastCounter = 0;
const nextId = () => {
  toastCounter += 1;
  return `ank-toast-${toastCounter}-${Date.now()}`;
};

export interface ToastProviderProps {
  children: ReactNode;
  placement?: ToastPlacement;
  defaultDuration?: number;
  viewportLabel?: string;
}

const SuccessIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M4 10l4 4 8-8" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
);
const WarningIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M10 4v8" strokeLinecap="square" />
    <circle cx="10" cy="15.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
const ErrorIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M5 5l10 10M15 5L5 15" strokeLinecap="square" />
  </svg>
);
const InfoIcon = () => (
  <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M10 9v6" strokeLinecap="square" />
    <circle cx="10" cy="5.5" r="1.2" fill="currentColor" stroke="none" />
  </svg>
);
const CloseIcon = () => (
  <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
    <path d="M3 3l8 8M11 3l-8 8" strokeLinecap="square" />
  </svg>
);

const icons: Record<ToastVariant, ReactNode> = {
  default: null,
  success: <SuccessIcon />,
  warning: <WarningIcon />,
  error:   <ErrorIcon />,
  info:    <InfoIcon />,
};

const ToastItem = ({ toast, onDismiss }: { toast: ToastData; onDismiss: () => void }) => {
  const variant = toast.variant ?? 'default';
  const icon = icons[variant];

  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={clsx('ank-toast', `ank-toast--${variant}`)}
    >
      {icon && (
        <span className="ank-toast__icon" aria-hidden>
          {icon}
        </span>
      )}
      <div className="ank-toast__body">
        {toast.title && <div className="ank-toast__title">{toast.title}</div>}
        {toast.description && (
          <div className="ank-toast__description">{toast.description}</div>
        )}
        {toast.action && (
          <button
            type="button"
            className="ank-toast__action"
            onClick={() => {
              toast.action?.onClick();
              onDismiss();
            }}
          >
            {toast.action.label}
          </button>
        )}
      </div>
      <button
        type="button"
        aria-label={toast.dismissLabel ?? 'Dismiss'}
        onClick={onDismiss}
        className="ank-toast__close"
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export const ToastProvider = ({
  children,
  placement = 'bottom-right',
  defaultDuration = 5000,
  viewportLabel = 'Notifications',
}: ToastProviderProps) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const [mounted, setMounted] = useState(false);
  const timers = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const map = timers.current;
    return () => {
      map.forEach((id) => window.clearTimeout(id));
      map.clear();
    };
  }, []);

  const dismiss = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer !== undefined) {
      window.clearTimeout(timer);
      timers.current.delete(id);
    }
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const show = useCallback(
    (options: ToastOptions): string => {
      const id = nextId();
      const duration = options.duration ?? defaultDuration;
      setToasts((prev) => [...prev, { ...options, id }]);

      if (duration > 0) {
        const timer = window.setTimeout(() => dismiss(id), duration);
        timers.current.set(id, timer);
      }
      return id;
    },
    [defaultDuration, dismiss],
  );

  const dismissAll = useCallback(() => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current.clear();
    setToasts([]);
  }, []);

  const variantHelper = useCallback(
    (variant: ToastVariant) =>
      (title: ReactNode, options: Omit<ToastOptions, 'variant' | 'title'> = {}) =>
        show({ ...options, title, variant }),
    [show],
  );

  const value = useMemo<ToastContextValue>(
    () => ({
      toasts,
      show,
      success: variantHelper('success'),
      warning: variantHelper('warning'),
      error: variantHelper('error'),
      info: variantHelper('info'),
      dismiss,
      dismissAll,
    }),
    [toasts, show, variantHelper, dismiss, dismissAll],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      {mounted &&
        toasts.length > 0 &&
        createPortal(
          <div
            role="region"
            aria-label={viewportLabel}
            aria-live="polite"
            data-placement={placement}
            className="ank-toast-viewport"
          >
            {toasts.map((toast) => (
              <ToastItem key={toast.id} toast={toast} onDismiss={() => dismiss(toast.id)} />
            ))}
          </div>,
          document.body,
        )}
    </ToastContext.Provider>
  );
};
