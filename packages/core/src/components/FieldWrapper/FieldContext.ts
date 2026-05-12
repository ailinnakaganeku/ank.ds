import { createContext } from 'react';

export interface FieldContextValue {
  id: string;
  invalid: boolean;
  describedBy?: string;
  disabled?: boolean;
}

export const FieldContext = createContext<FieldContextValue | null>(null);
