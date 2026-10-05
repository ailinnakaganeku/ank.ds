import { forwardRef, useState, type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import './Avatar.css';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';
export type AvatarTone = 'neutral' | 'primary' | 'secondary' | 'accent' | 'sand';

export interface AvatarProps extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
  src?: string;
  alt: string;
  fallback: ReactNode;
  size?: AvatarSize;
  tone?: AvatarTone;
}

const AvatarFace = ({ src, alt, fallback }: Pick<AvatarProps, 'src' | 'alt' | 'fallback'>) => {
  const [failed, setFailed] = useState(false);
  const showsPicture = Boolean(src) && !failed;
  const fallbackIsTheImage = !showsPicture && alt !== '';

  return (
    <>
      <span
        className="ank-avatar__fallback"
        role={fallbackIsTheImage ? 'img' : undefined}
        aria-label={fallbackIsTheImage ? alt : undefined}
        aria-hidden={fallbackIsTheImage ? undefined : true}
      >
        {fallback}
      </span>
      {showsPicture && (
        <img className="ank-avatar__image" src={src} alt={alt} onError={() => setFailed(true)} />
      )}
    </>
  );
};

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, fallback, size = 'md', tone = 'neutral', className, ...rest },
  ref,
) {
  return (
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
      <AvatarFace key={src} src={src} alt={alt} fallback={fallback} />
    </span>
  );
});
