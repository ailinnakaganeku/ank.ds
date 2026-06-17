import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { FeatureGrid } from './FeatureGrid';

describe('FeatureGrid', () => {
  it('renders its children', () => {
    render(
      <FeatureGrid>
        <FeatureGrid.Item>a</FeatureGrid.Item>
        <FeatureGrid.Item>b</FeatureGrid.Item>
      </FeatureGrid>,
    );
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
  });

  it('exposes the columns count through a CSS variable', () => {
    const { container } = render(
      <FeatureGrid columns={4}>
        <FeatureGrid.Item>x</FeatureGrid.Item>
      </FeatureGrid>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.getPropertyValue('--ank-feature-grid-columns')).toBe('4');
  });

  it('applies grid-column span when span prop is set', () => {
    const { container } = render(
      <FeatureGrid>
        <FeatureGrid.Item span={2}>x</FeatureGrid.Item>
      </FeatureGrid>,
    );
    const item = container.querySelector('.ank-feature-grid__item') as HTMLElement;
    expect(item.style.gridColumn).toBe('span 2');
  });

  it('maps size preset to a span and adds data-size', () => {
    const { container } = render(
      <FeatureGrid>
        <FeatureGrid.Item size="lg">a</FeatureGrid.Item>
        <FeatureGrid.Item size="hero">b</FeatureGrid.Item>
      </FeatureGrid>,
    );
    const items = container.querySelectorAll<HTMLElement>('.ank-feature-grid__item');
    expect(items[0].style.gridColumn).toBe('span 2');
    expect(items[0]).toHaveAttribute('data-size', 'lg');
    expect(items[1].style.gridColumn).toBe('span 3');
    expect(items[1]).toHaveAttribute('data-size', 'hero');
  });

  it('honors an explicit span over the size preset', () => {
    const { container } = render(
      <FeatureGrid>
        <FeatureGrid.Item size="hero" span={2}>
          x
        </FeatureGrid.Item>
      </FeatureGrid>,
    );
    const item = container.querySelector('.ank-feature-grid__item') as HTMLElement;
    expect(item.style.gridColumn).toBe('span 2');
  });

  it('Spotlight renders as a hero-sized item', () => {
    const { container } = render(
      <FeatureGrid>
        <FeatureGrid.Spotlight>x</FeatureGrid.Spotlight>
      </FeatureGrid>,
    );
    const item = container.querySelector('.ank-feature-grid__spotlight') as HTMLElement;
    expect(item).toHaveAttribute('data-size', 'hero');
    expect(item.style.gridColumn).toBe('span 3');
  });

  it('clamps Spotlight span to the available columns count', () => {
    const { container } = render(
      <FeatureGrid columns={2}>
        <FeatureGrid.Spotlight>x</FeatureGrid.Spotlight>
      </FeatureGrid>,
    );
    const item = container.querySelector('.ank-feature-grid__spotlight') as HTMLElement;
    expect(item.style.gridColumn).toBe('span 2');
  });

  it('clamps Item span to the available columns count', () => {
    const { container } = render(
      <FeatureGrid columns={2}>
        <FeatureGrid.Item span={4}>x</FeatureGrid.Item>
      </FeatureGrid>,
    );
    const item = container.querySelector('.ank-feature-grid__item') as HTMLElement;
    expect(item.style.gridColumn).toBe('span 2');
  });

  it('exposes the gap prop through a CSS variable', () => {
    const { container } = render(
      <FeatureGrid gap="6">
        <FeatureGrid.Item>x</FeatureGrid.Item>
      </FeatureGrid>,
    );
    const root = container.firstElementChild as HTMLElement;
    expect(root.style.getPropertyValue('--ank-feature-grid-gap')).toBe('var(--ank-space-6)');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <FeatureGrid>
        <FeatureGrid.Item size="lg">one</FeatureGrid.Item>
        <FeatureGrid.Item size="md">two</FeatureGrid.Item>
      </FeatureGrid>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
