import { describe, it, expect, vi, afterEach } from 'vitest';
import { isNearDue, isOverdue } from '../lib/date';

afterEach(() => {
  vi.useRealTimers();
});

describe('Date edge cases (near-due/overdue)', () => {
  it('overdue is strictly less than now; equal is not overdue', () => {
    vi.useFakeTimers();
    const now = new Date('2025-01-01T00:00:00Z');
    vi.setSystemTime(now);
    expect(isOverdue('2024-12-31T23:59:59Z')).toBe(true);
    expect(isOverdue('2025-01-01T00:00:00Z')).toBe(false);
  });

  it('near-due within 48h inclusive of boundary', () => {
    vi.useFakeTimers();
    const now = new Date('2025-01-01T00:00:00Z');
    vi.setSystemTime(now);
    // 48h ahead is near-due (<= window)
    expect(isNearDue('2025-01-03T00:00:00Z')).toBe(true);
    // beyond 48h is not
    expect(isNearDue('2025-01-03T00:00:01Z')).toBe(false);
  });
});

