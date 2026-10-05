let bodyLockCount = 0;
let savedBodyOverflow: string | null = null;

export const lockBodyScroll = () => {
  if (bodyLockCount === 0) {
    savedBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }
  bodyLockCount += 1;
};

export const unlockBodyScroll = () => {
  bodyLockCount = Math.max(0, bodyLockCount - 1);
  if (bodyLockCount === 0 && savedBodyOverflow !== null) {
    document.body.style.overflow = savedBodyOverflow;
    savedBodyOverflow = null;
  }
};

export const __resetBodyLockForTests = () => {
  bodyLockCount = 0;
  savedBodyOverflow = null;
  document.body.style.overflow = '';
};
