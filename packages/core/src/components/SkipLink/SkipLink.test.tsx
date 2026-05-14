import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { SkipLink } from './SkipLink';

describe('SkipLink', () => {
  it('renders an anchor pointing to the default main target', () => {
    render(<SkipLink />);
    const link = screen.getByRole('link', { name: 'Skip to content' });
    expect(link).toHaveAttribute('href', '#main');
  });

  it('accepts a custom target id and label', () => {
    render(<SkipLink targetId="content">Jump to content</SkipLink>);
    const link = screen.getByRole('link', { name: 'Jump to content' });
    expect(link).toHaveAttribute('href', '#content');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <div>
        <SkipLink targetId="main" />
        <main id="main" tabIndex={-1}>
          content
        </main>
      </div>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
