import { expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { VisuallyHidden } from './VisuallyHidden';

it('keeps its text in the accessible name while taking no visible space', () => {
  render(
    <a href="https://example.com">
      Docs<VisuallyHidden> (opens in a new tab)</VisuallyHidden>
    </a>,
  );

  const link = screen.getByRole('link', { name: 'Docs (opens in a new tab)' });
  const hidden = screen.getByText('(opens in a new tab)').getBoundingClientRect();

  expect(link).toBeVisible();
  expect(hidden.width).toBeLessThanOrEqual(1);
  expect(hidden.height).toBeLessThanOrEqual(1);
});
