import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Card } from './Card';

const renderCard = () =>
  render(
    <Card interactive>
      <Card.Title>
        <a href="#guide">Guide</a>
      </Card.Title>
      <Card.Description>Setting up the monorepo</Card.Description>
      <Card.Footer>
        <button>Save</button>
      </Card.Footer>
    </Card>,
  );

const elementAtCentreOf = (element: Element) => {
  const box = element.getBoundingClientRect();
  return document.elementFromPoint(box.left + box.width / 2, box.top + box.height / 2);
};

describe('interactive Card', () => {
  it('sends a press on its text to the link in the title', () => {
    renderCard();

    expect(elementAtCentreOf(screen.getByText('Setting up the monorepo'))).toBe(
      screen.getByRole('link', { name: 'Guide' }),
    );
  });

  it('leaves a press on a footer action to that action', () => {
    renderCard();
    const save = screen.getByRole('button', { name: 'Save' });

    expect(elementAtCentreOf(save)).toBe(save);
  });
});
