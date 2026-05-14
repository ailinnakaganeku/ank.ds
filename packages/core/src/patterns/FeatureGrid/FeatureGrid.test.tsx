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

  it('applies grid-column span on items', () => {
    const { container } = render(
      <FeatureGrid>
        <FeatureGrid.Item span={2}>x</FeatureGrid.Item>
      </FeatureGrid>,
    );
    const item = container.querySelector('.ank-feature-grid__item') as HTMLElement;
    expect(item.style.gridColumn).toBe('span 2');
    expect(item).toHaveAttribute('data-span', '2');
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <FeatureGrid>
        <FeatureGrid.Item>one</FeatureGrid.Item>
        <FeatureGrid.Item>two</FeatureGrid.Item>
      </FeatureGrid>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
