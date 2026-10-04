import { useCallback, useState } from 'react';

interface ControllableStateOptions<T> {
  value: T | undefined;
  defaultValue: T | (() => T);
  onChange?: (next: T) => void;
}

export const useControllableState = <T>({
  value,
  defaultValue,
  onChange,
}: ControllableStateOptions<T>): [T, (next: T) => void] => {
  const [internal, setInternal] = useState(defaultValue);
  const isControlled = value !== undefined;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [isControlled ? value : internal, setValue];
};
