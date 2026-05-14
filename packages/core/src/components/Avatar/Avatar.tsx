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

type ImageStatus = 'idle' | 'loaded' | 'error';

interface AvatarContextValue {
  imageStatus: ImageStatus;
  setImageStatus: (next: ImageStatus) => void;
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
  const [imageStatus, setImageStatus] = useState<ImageStatus>('idle');
  const value = useMemo<AvatarContextValue>(
    () => ({ imageStatus, setImageStatus }),
    [imageStatus],
  );

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
  const ctx = useAvatarContext('<Avatar.Image>');

  useEffect(() => {
    if (!src) ctx.setImageStatus('error');
  }, [src, ctx]);

  if (!src || ctx.imageStatus === 'error') return null;

  const handleLoad: ReactEventHandler<HTMLImageElement> = (event) => {
    onLoad?.(event);
    ctx.setImageStatus('loaded');
  };

  const handleError: ReactEventHandler<HTMLImageElement> = (event) => {
    onError?.(event);
    ctx.setImageStatus('error');
  };

  const isHidden = ctx.imageStatus !== 'loaded';

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

  if (ctx.imageStatus === 'loaded') return null;
  if (!show) return null;

  return (
    <span ref={ref} className={clsx('ank-avatar__fallback', className)} {...rest}>
      {children}
    </span>
  );
});

export const Avatar = Object.assign(AvatarRoot, { Image, Fallback });
