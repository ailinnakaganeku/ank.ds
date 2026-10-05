import type { ReactNode } from 'react';
import './VisuallyHidden.css';

export const VisuallyHidden = ({ children }: { children: ReactNode }) => (
  <span className="ank-visually-hidden">{children}</span>
);
