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

  it('wires aria-labelledby on the section to the title heading', () => {
    const { container } = render(<Hero title="labelled hero" />);
    const section = container.firstElementChild as HTMLElement;
    const heading = screen.getByRole('heading', { level: 1, name: 'labelled hero' });
    expect(section.getAttribute('aria-labelledby')).toBe(heading.id);
    expect(heading.id).not.toBe('');
  });

  it('renders description and actions when provided', () => {
    render(
      <Hero
        title="Title"
        description="some description"
        actions={<button>cta</button>}
      />,
    );
    expect(screen.getByText('some description')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'cta' })).toBeInTheDocument();
  });

  it('adds the bleed class on the title when titleBleed is true', () => {
    const { container } = render(<Hero title="big" titleBleed />);
    expect(container.querySelector('.ank-hero__title--bleed')).not.toBeNull();
  });

  it('switches to split layout when decoration is provided', () => {
    const { container } = render(
      <Hero title="t" decoration={<div data-testid="dec">d</div>} />,
    );
    expect(container.querySelector('.ank-hero--split')).not.toBeNull();
    expect(screen.getByTestId('dec')).toBeInTheDocument();
  });

  it('applies the center alignment class when align="center"', () => {
    const { container } = render(<Hero title="t" align="center" />);
    expect(container.firstElementChild).toHaveClass('ank-hero--center');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Hero
        title="default hero"
        description="body"
        actions={<button>cta</button>}
      />,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
