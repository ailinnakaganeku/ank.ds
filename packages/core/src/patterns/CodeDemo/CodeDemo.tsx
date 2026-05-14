import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import clsx from 'clsx';
import './CodeDemo.css';

export type CodeDemoVariant = 'dark' | 'light';

export interface CodeDemoProps extends HTMLAttributes<HTMLDivElement> {
  title?: ReactNode;
  variant?: CodeDemoVariant;
  showDots?: boolean;
  children: ReactNode;
}

const CodeDemoRoot = forwardRef<HTMLDivElement, CodeDemoProps>(function CodeDemo(
  { title, variant = 'dark', showDots = true, className, children, ...rest },
  ref,
) {
  return (
    <div
      ref={ref}
      className={clsx('ank-code-demo', variant === 'light' && 'ank-code-demo--light', className)}
      {...rest}
    >
      {(title || showDots) && (
        <div className="ank-code-demo__bar">
          {showDots && (
            <span className="ank-code-demo__dots" aria-hidden>
              <span />
              <span />
              <span />
            </span>
          )}
          {title && <span className="ank-code-demo__title">{title}</span>}
        </div>
      )}
      <div className="ank-code-demo__body">{children}</div>
    </div>
  );
});

export interface CodeDemoLineProps extends HTMLAttributes<HTMLSpanElement> {
  prompt?: ReactNode;
  output?: boolean;
  caret?: boolean;
  children?: ReactNode;
}

const Line = forwardRef<HTMLSpanElement, CodeDemoLineProps>(function CodeDemoLine(
  { prompt, output, caret, className, children, ...rest },
  ref,
) {
  return (
    <span
      ref={ref}
      className={clsx(
        'ank-code-demo__line',
        output && 'ank-code-demo__line--output',
        className,
      )}
      {...rest}
    >
      {prompt && (
        <span className="ank-code-demo__prompt" aria-hidden>
          {prompt}
        </span>
      )}
      <span>
        {children}
        {caret && <span className="ank-code-demo__caret" aria-hidden />}
      </span>
    </span>
  );
});

export const CodeDemo = Object.assign(CodeDemoRoot, { Line });
