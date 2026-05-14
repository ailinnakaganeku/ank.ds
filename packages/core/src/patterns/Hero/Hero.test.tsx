import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Hero } from './Hero';

describe('Hero', () => {
  it('renders an h1 with the title and a section landmark', () => {
    const { container } = render(<Hero title="Build with us" />);
    expect(screen.getByRole('heading', { level: 1, name: 'Build with us' })).toBeInTheDocument();
    expect(container.firstElementChild?.tagName).toBe('SECTION');
  });

  it('renders eyebrow, description, and actions when provided', () => {
    render(
      <Hero
        title="Title"
        eyebrow={<span>eyebrow</span>}
        description="some description"
        actions={<button>cta</button>}
      />,
    );
    expect(screen.getByText('eyebrow')).toBeInTheDocument();
    expect(screen.getByText('some description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'cta' })).toBeInTheDocument();
  });

  it('renders the announcement when provided', () => {
    render(<Hero title="t" announcement={<span>v1.0 is out</span>} />);
    expect(screen.getByText('v1.0 is out')).toBeInTheDocument();
  });

  it('adds the bleed class on the title when titleBleed is true', () => {
    const { container } = render(<Hero title="big" titleBleed />);
    expect(container.querySelector('.ank-hero__title--bleed')).not.toBeNull();
  });

  it('renders the demo frame with a label when demo is provided', () => {
    const { container } = render(
      <Hero
        title="t"
        demo={<div>demo content</div>}
        demoLabel="preview"
      />,
    );
    expect(container.querySelector('.ank-hero__demo-frame')).not.toBeNull();
    expect(screen.getByText('preview')).toBeInTheDocument();
    expect(screen.getByText('demo content')).toBeInTheDocument();
  });

  it('switches to split layout when decoration is provided', () => {
    const { container } = render(
      <Hero title="t" decoration={<div data-testid="dec">d</div>} />,
    );
    expect(container.querySelector('.ank-hero--split')).not.toBeNull();
    expect(screen.getByTestId('dec')).toBeInTheDocument();
  });

  it('renders the caret marker when caret is true', () => {
    const { container } = render(<Hero title="prompt" caret />);
    expect(container.querySelector('.ank-hero__caret')).not.toBeNull();
  });

  it('applies the requested variant', () => {
    const { container } = render(<Hero title="t" variant="terminal" />);
    expect(container.firstElementChild).toHaveClass('ank-hero--terminal');
  });

  it('has no axe violations across variants', async () => {
    for (const variant of ['default', 'surface', 'primary', 'ink', 'terminal'] as const) {
      const { container, unmount } = render(
        <Hero
          title={`${variant} hero`}
          description="body"
          variant={variant}
          actions={<button>cta</button>}
        />,
      );
      expect(await axe(container)).toHaveNoViolations();
      unmount();
    }
  });
});
