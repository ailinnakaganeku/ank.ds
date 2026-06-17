import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  it('renders a nav landmark labelled "Breadcrumb"', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item current>Now</Breadcrumb.Item>
      </Breadcrumb>,
    );
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('accepts a custom aria-label', () => {
    render(
      <Breadcrumb aria-label="Site path">
        <Breadcrumb.Item current>Now</Breadcrumb.Item>
      </Breadcrumb>,
    );
    expect(screen.getByRole('navigation', { name: 'Site path' })).toBeInTheDocument();
  });

  it('renders linked items as <a> and the current item as a span with aria-current="page"', () => {
    render(
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/components">Components</Breadcrumb.Item>
        <Breadcrumb.Item current>Tooltip</Breadcrumb.Item>
      </Breadcrumb>,
    );
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Components' })).toHaveAttribute('href', '/components');

    const nav = screen.getByRole('navigation');
    const current = within(nav).getByText('Tooltip');
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(current.tagName).toBe('SPAN');
  });

  it('exposes items as an ordered list', () => {
    const { container } = render(
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item current>Now</Breadcrumb.Item>
      </Breadcrumb>,
    );
    expect(container.querySelector('ol')).toBeInTheDocument();
    expect(container.querySelectorAll('li')).toHaveLength(2);
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="/docs">Docs</Breadcrumb.Item>
        <Breadcrumb.Item current>Page</Breadcrumb.Item>
      </Breadcrumb>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
