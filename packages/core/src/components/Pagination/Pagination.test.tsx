import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders a nav landmark labelled "Pagination" by default', () => {
    render(<Pagination page={1} pageCount={3} onPageChange={() => {}} />);
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
  });

  it('marks the current page with aria-current="page"', () => {
    render(<Pagination page={2} pageCount={5} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('button', { name: 'Page 1' })).not.toHaveAttribute('aria-current');
  });

  it('disables Previous on the first page and Next on the last', () => {
    const { rerender } = render(<Pagination page={1} pageCount={5} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next page' })).not.toBeDisabled();

    rerender(<Pagination page={5} pageCount={5} onPageChange={() => {}} />);
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Previous page' })).not.toBeDisabled();
  });

  it('fires onPageChange when a page is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination page={2} pageCount={5} onPageChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Page 4' }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('fires onPageChange with page+1 for Next and page-1 for Previous', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination page={3} pageCount={5} onPageChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Next page' }));
    expect(onChange).toHaveBeenCalledWith(4);

    onChange.mockClear();
    await user.click(screen.getByRole('button', { name: 'Previous page' }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('does not fire onPageChange when the same page is clicked', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<Pagination page={2} pageCount={5} onPageChange={onChange} />);
    await user.click(screen.getByRole('button', { name: 'Page 2' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders ellipsis when there are gaps', () => {
    render(<Pagination page={10} pageCount={20} onPageChange={() => {}} />);
    const ellipses = screen.getAllByText('…');
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it('has no axe violations', async () => {
    const { container } = render(<Pagination page={3} pageCount={10} onPageChange={() => {}} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
