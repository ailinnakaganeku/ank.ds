import { afterEach, describe, expect, it } from 'vitest';
import { __resetBodyLockForTests, lockBodyScroll, unlockBodyScroll } from './bodyScrollLock';

afterEach(() => {
  __resetBodyLockForTests();
});

describe('body scroll lock', () => {
  it('hides the body overflow while locked', () => {
    lockBodyScroll();

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores the overflow the page had before the lock', () => {
    document.body.style.overflow = 'auto';

    lockBodyScroll();
    unlockBodyScroll();

    expect(document.body.style.overflow).toBe('auto');
  });

  it('stays locked until every lock is released', () => {
    lockBodyScroll();
    lockBodyScroll();

    unlockBodyScroll();
    expect(document.body.style.overflow).toBe('hidden');

    unlockBodyScroll();
    expect(document.body.style.overflow).toBe('');
  });
});
