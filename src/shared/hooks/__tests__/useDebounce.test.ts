import { renderHook, act } from '@testing-library/react';
import { useDebounce } from '../useDebounce';

jest.useFakeTimers();

describe('useDebounce', () => {
  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('debounces value changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) =>
        useDebounce(value, delay),
      {
        initialProps: { value: 'first', delay: 500 },
      }
    );

    expect(result.current).toBe('first');

    rerender({ value: 'second', delay: 500 });

    expect(result.current).toBe('first');

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(result.current).toBe('second');
  });

  it('cancels previous timeout on rapid changes', () => {
    const { result, rerender } = renderHook(
      ({ value, delay }: { value: string; delay: number }) =>
        useDebounce(value, delay),
      {
        initialProps: { value: 'first', delay: 500 },
      }
    );

    rerender({ value: 'second', delay: 500 });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    rerender({ value: 'third', delay: 500 });
    act(() => {
      jest.advanceTimersByTime(200);
    });

    expect(result.current).toBe('first');

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe('third');
  });

  it('handles numeric values', () => {
    const { result, rerender } = renderHook(
      ({ value }: { value: number }) => useDebounce(value, 300),
      {
        initialProps: { value: 0 },
      }
    );

    expect(result.current).toBe(0);

    rerender({ value: 42 });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe(42);
  });
});
