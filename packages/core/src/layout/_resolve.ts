export type SpaceToken = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10';
export type SpaceValue = SpaceToken | (string & {});

export const resolveSpace = (value?: SpaceValue): string | undefined => {
  if (value === undefined || value === null) return undefined;
  if (/^([1-9]|10)$/.test(value)) return `var(--ank-space-${value})`;
  return value;
};
