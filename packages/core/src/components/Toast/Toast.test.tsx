import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import { axe } from 'jest-axe';
import { ToastProvider, useToast } from './Toast';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  try {
    vi.runOnlyPendingTimers();
  } catch {}
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
  it('keeps an empty polite live region in the document before any toast', () => {
    renderHarness();

    const region = screen.getByRole('region', { name: 'Notifications' });
    expect(region).toHaveAttribute('aria-live', 'polite');
    expect(region).toBeEmptyDOMElement();
  });

  it('adds a toast inside the live region that was already there', () => {
    renderHarness();
    const region = screen.getByRole('region', { name: 'Notifications' });

    click('show');

    expect(within(region).getByText('Saved')).toBeInTheDocument();
    expect(within(region).getByText('All good')).toBeInTheDocument();
  });

  it('interrupts with role="alert" only for the error variant', () => {
    renderHarness();
    click('show');
    click('error');
    expect(screen.getByRole('alert')).toHaveTextContent('Oops');
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
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
    expect(screen.getByRole('region', { name: 'Notifications' })).toBeEmptyDOMElement();
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
