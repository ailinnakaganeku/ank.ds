import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Footer } from './Footer';

const Sample = ({ variant }: { variant?: 'dark' | 'light' }) => (
  <Footer variant={variant}>
    <Footer.Top>
      <Footer.Brand>ank.ds</Footer.Brand>
      <Footer.Columns>
        <Footer.Column title="Product">
          <Footer.Link href="/components">Components</Footer.Link>
          <Footer.Link href="/foundations">Foundations</Footer.Link>
        </Footer.Column>
        <Footer.Column title="Community">
          <Footer.Link href="https://example.com" external>
            GitHub
          </Footer.Link>
        </Footer.Column>
      </Footer.Columns>
    </Footer.Top>
    <Footer.Bottom>
      <span>© 2026</span>
    </Footer.Bottom>
  </Footer>
);

describe('Footer', () => {
  it('renders as a contentinfo landmark', () => {
    render(<Sample />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('groups column links in an unordered list', () => {
    const { container } = render(<Sample />);
    const lists = container.querySelectorAll('ul.ank-footer__column-links');
    expect(lists.length).toBe(2);
    expect(lists[0].querySelectorAll('li').length).toBe(2);
  });

  it('marks external links with target and rel', () => {
    render(<Sample />);
    const github = screen.getByRole('link', { name: 'GitHub' });
    expect(github).toHaveAttribute('target', '_blank');
    expect(github).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('applies the light variant class', () => {
    const { container } = render(<Sample variant="light" />);
    expect(container.firstElementChild).toHaveClass('ank-footer--light');
  });

  it('has no axe violations', async () => {
    const { container } = render(<Sample />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
