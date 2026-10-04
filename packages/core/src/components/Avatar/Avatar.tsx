import {
  createContext,
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useState,
  type HTMLAttributes,
  type ImgHTMLAttributes,
  type ReactEventHandler,
  type ReactNode,
} from 'react';
import clsx from 'clsx';
import './Avatar.css';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarTone = 'neutral' | 'primary' | 'secondary' | 'accent' | 'sand';

interface SettledImage {
  src: string;
  status: 'loaded' | 'error';
}

interface AvatarContextValue {
  settled: SettledImage | null;
  settle: (next: SettledImage | null) => void;
}

const AvatarContext = createContext<AvatarContextValue | null>(null);

const useAvatarContext = (component: string) => {
  const ctx = useContext(AvatarContext);
  if (!ctx) {
    throw new Error(`${component} must be rendered inside <Avatar>`);
  }
  return ctx;
};

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  size?: AvatarSize;
  tone?: AvatarTone;
  children: ReactNode;
}

const AvatarRoot = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { size = 'md', tone = 'neutral', className, children, ...rest },
  ref,
) {
  const [settled, settle] = useState<SettledImage | null>(null);
  const value = useMemo<AvatarContextValue>(() => ({ settled, settle }), [settled]);

  return (
    <AvatarContext.Provider value={value}>
      <span
        ref={ref}
        className={clsx(
          'ank-avatar',
          `ank-avatar--${size}`,
          tone !== 'neutral' && `ank-avatar--${tone}`,
          className,
        )}
        {...rest}
      >
        {children}
      </span>
    </AvatarContext.Provider>
  );
});

export interface AvatarImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

const Image = forwardRef<HTMLImageElement, AvatarImageProps>(function AvatarImage(
  { src, alt, className, onLoad, onError, style, ...rest },
  ref,
) {
  const { settled, settle } = useAvatarContext('<Avatar.Image>');
  const status = settled?.src === src ? settled.status : undefined;

  useEffect(() => () => settle(null), [src, settle]);

  if (!src || status === 'error') return null;

  const handleLoad: ReactEventHandler<HTMLImageElement> = (event) => {
    onLoad?.(event);
    settle({ src, status: 'loaded' });
  };

  const handleError: ReactEventHandler<HTMLImageElement> = (event) => {
    onError?.(event);
    settle({ src, status: 'error' });
  };

  const isHidden = status !== 'loaded';

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={clsx('ank-avatar__image', className)}
      onLoad={handleLoad}
      onError={handleError}
      aria-hidden={isHidden || undefined}
      style={isHidden ? { position: 'absolute', width: 0, height: 0, opacity: 0 } : style}
      {...rest}
    />
  );
});

export interface AvatarFallbackProps extends HTMLAttributes<HTMLSpanElement> {
  delayMs?: number;
  children: ReactNode;
}

const Fallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(function AvatarFallback(
  { className, children, delayMs = 0, ...rest },
  ref,
) {
  const ctx = useAvatarContext('<Avatar.Fallback>');
  const [show, setShow] = useState(delayMs === 0);

  useEffect(() => {
    if (delayMs === 0) return;
    const timer = window.setTimeout(() => setShow(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  if (ctx.settled?.status === 'loaded') return null;
  if (!show) return null;

  return (
    <span ref={ref} className={clsx('ank-avatar__fallback', className)} {...rest}>
      {children}
    </span>
  );
});

export const Avatar = Object.assign(AvatarRoot, { Image, Fallback });
