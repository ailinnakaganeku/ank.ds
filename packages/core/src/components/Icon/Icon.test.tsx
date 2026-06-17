import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { Icon, CloseIcon, CheckIcon } from './';

describe('Icon', () => {
  it('renders a decorative svg with stroke defaults', () => {
    const { container } = render(<Icon viewBox="0 0 14 14" />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('aria-hidden', 'true');
    expect(svg).toHaveAttribute('fill', 'none');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
  });

  it('applies size to width and height', () => {
    const { container } = render(<Icon size={20} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '20');
    expect(svg).toHaveAttribute('height', '20');
  });

  it('forwards className and overrides defaults', () => {
    const { container } = render(<Icon className="custom" stroke="red" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom');
    expect(svg).toHaveAttribute('stroke', 'red');
  });

  it('named icons carry their own viewBox and paths', () => {
    const { container } = render(<CloseIcon />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 14 14');
    expect(container.querySelector('path')).toBeInTheDocument();
  });

  it('named icons accept a size override', () => {
    const { container } = render(<CheckIcon size={32} />);
    expect(container.querySelector('svg')).toHaveAttribute('width', '32');
  });
});
