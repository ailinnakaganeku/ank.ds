import { expect, it } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { SkipLink } from './SkipLink';

it('stays off screen until it receives focus', async () => {
  render(<SkipLink>Skip to content</SkipLink>);
  const link = screen.getByRole('link', { name: 'Skip to content' });
  expect(link.getBoundingClientRect().bottom).toBeLessThan(0);

  link.focus();

  await waitFor(() => expect(link.getBoundingClientRect().top).toBeGreaterThanOrEqual(0));
});
