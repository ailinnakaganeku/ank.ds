import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Card } from './Card';

describe('Card', () => {
  it('renders compound subcomponents in order', () => {
    render(
      <Card>
        <Card.Eyebrow>New</Card.Eyebrow>
        <Card.Title>Card title</Card.Title>
        <Card.Description>Body text</Card.Description>
        <Card.Footer>
          <button>Action</button>
        </Card.Footer>
      </Card>,
    );
    expect(screen.getByText('New')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Card title' })).toBeInTheDocument();
    expect(screen.getByText('Body text')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });

  it('keeps its heading and its link when interactive', () => {
    render(
      <Card interactive>
        <Card.Title>
          <a href="/guide">Guide</a>
        </Card.Title>
        <Card.Footer>
          <button>Save</button>
        </Card.Footer>
      </Card>,
    );

    expect(screen.getByRole('heading', { name: 'Guide' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Guide' })).toHaveAttribute('href', '/guide');
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('Title renders as an h3 by default', () => {
    render(
      <Card>
        <Card.Title>A title</Card.Title>
      </Card>,
    );
    const heading = screen.getByRole('heading', { name: 'A title' });
    expect(heading.tagName).toBe('H3');
  });

  it('has no axe violations as a non-interactive card', async () => {
    const { container } = render(
      <Card>
        <Card.Title>Card</Card.Title>
        <Card.Description>Some body text</Card.Description>
      </Card>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });

  it('has no axe violations as an interactive card', async () => {
    const { container } = render(
      <Card interactive>
        <Card.Title>
          <a href="/guide">Card</a>
        </Card.Title>
        <Card.Description>Some body text</Card.Description>
        <Card.Footer>
          <button>Save</button>
        </Card.Footer>
      </Card>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
