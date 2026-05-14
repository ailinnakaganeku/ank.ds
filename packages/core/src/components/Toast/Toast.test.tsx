import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ToastProvider, useToast } from './Toast';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  try { vi.runOnlyPendingTimers(); } catch {}
  vi.useRealTimers();
});

const Harness = () => {
  const toast = useToast();
  return (
    <div>
      <button onClick={() => toast.success('Saved', { description: 'All good' })}>show</button>
      <button onClick={() => toast.error('Oops')}>error</button>
      <button onClick={() => toast.show({ title: 'Persist', duration: 0 })}>persist</button>
      <button onClick={() => toast.dismissAll()}>dismiss all</button>
    </div>
  );
};

const renderHarness = () => {
  const utils = render(
    <ToastProvider defaultDuration={3000}>
      <Harness />
    </ToastProvider>,
  );
  act(() => {
    vi.runOnlyPendingTimers();
  });
  return utils;
};

const click = (name: string) => {
  act(() => {
    fireEvent.click(screen.getByRole('button', { name }));
  });
};

describe('Toast', () => {
  it('renders the notification region only when a toast is active', () => {
    renderHarness();
    expect(screen.queryByRole('region', { name: 'Notifications' })).not.toBeInTheDocument();

    click('show');

    const region = screen.getByRole('region', { name: 'Notifications' });
    expect(region).toHaveAttribute('aria-live', 'polite');
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByText('All good')).toBeInTheDocument();
  });

  it('uses role="alert" for the error variant and role="status" for the rest', () => {
    renderHarness();
    click('show');
    click('error');
    expect(screen.getByRole('status')).toHaveTextContent('Saved');
    expect(screen.getByRole('alert')).toHaveTextContent('Oops');
  });

  it('auto-dismisses after the default duration', () => {
    renderHarness();
    click('show');
    expect(screen.getByText('Saved')).toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
  });

  it('keeps a toast persistent when duration is 0', () => {
    renderHarness();
    click('persist');

    act(() => {
      vi.advanceTimersByTime(10000);
    });

    expect(screen.getByText('Persist')).toBeInTheDocument();
  });

  it('dismisses an individual toast via its close button', () => {
    renderHarness();
    click('show');
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    });
    expect(screen.queryByText('Saved')).not.toBeInTheDocument();
  });

  it('clears every active toast on dismissAll', () => {
    renderHarness();
    click('show');
    click('error');
    click('dismiss all');
    expect(screen.queryByRole('region', { name: 'Notifications' })).not.toBeInTheDocument();
  });

  it('throws when useToast is used outside ToastProvider', () => {
    const Bare = () => {
      useToast();
      return null;
    };
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => render(<Bare />)).toThrow(/inside <ToastProvider>/);
    spy.mockRestore();
  });

  it('has no axe violations when a toast is visible', async () => {
    const { baseElement } = renderHarness();
    click('show');
    expect(screen.getByRole('region', { name: 'Notifications' })).toBeInTheDocument();
    vi.useRealTimers();
    expect(await axe(baseElement)).toHaveNoViolations();
  });
});
