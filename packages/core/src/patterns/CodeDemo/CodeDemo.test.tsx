import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { CodeDemo } from './CodeDemo';

describe('CodeDemo', () => {
  it('renders title and child lines', () => {
    render(
      <CodeDemo title="terminal">
        <CodeDemo.Line prompt="$">echo hi</CodeDemo.Line>
        <CodeDemo.Line output>hi</CodeDemo.Line>
      </CodeDemo>,
    );
    expect(screen.getByText('terminal')).toBeInTheDocument();
    expect(screen.getByText('echo hi')).toBeInTheDocument();
    expect(screen.getByText('hi')).toBeInTheDocument();
  });

  it('exposes the prompt as decorative (aria-hidden)', () => {
    const { container } = render(
      <CodeDemo>
        <CodeDemo.Line prompt="$">cmd</CodeDemo.Line>
      </CodeDemo>,
    );
    const prompt = container.querySelector('.ank-code-demo__prompt');
    expect(prompt).toHaveAttribute('aria-hidden');
  });

  it('applies the light variant class', () => {
    const { container } = render(
      <CodeDemo variant="light"><CodeDemo.Line>x</CodeDemo.Line></CodeDemo>,
    );
    expect(container.firstElementChild).toHaveClass('ank-code-demo--light');
  });

  it('hides the dots when showDots is false', () => {
    const { container } = render(
      <CodeDemo showDots={false}><CodeDemo.Line>x</CodeDemo.Line></CodeDemo>,
    );
    expect(container.querySelector('.ank-code-demo__dots')).toBeNull();
  });

  it('marks an output line with the output class', () => {
    const { container } = render(
      <CodeDemo><CodeDemo.Line output>done</CodeDemo.Line></CodeDemo>,
    );
    expect(container.querySelector('.ank-code-demo__line--output')).not.toBeNull();
  });

  it('has no axe violations', async () => {
    const { container } = render(
      <CodeDemo title="terminal">
        <CodeDemo.Line prompt="$">npm install</CodeDemo.Line>
        <CodeDemo.Line output>ok</CodeDemo.Line>
      </CodeDemo>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
