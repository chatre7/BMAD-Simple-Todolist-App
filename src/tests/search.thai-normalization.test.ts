import { describe, it, expect } from 'vitest';
import { searchTodos } from '../features/todos/lib/filter';
import type { Todo } from '../features/todos/types';

function t(title: string): Todo {
  const now = new Date().toISOString();
  return { id: Math.random().toString(36).slice(2), title, tags: [], completed: false, createdAt: now, updatedAt: now };
}

describe('Search normalization (Thai/combining marks)', () => {
  it('matches decomposed vs precomposed accent (Latin simulation)', () => {
    const list = [t('café')]; // precomposed é
    const decomposed = 'cafe\u0301';
    const res = searchTodos(list, decomposed);
    expect(res.length).toBe(1);
  });

  it('matches Thai with tone marks', () => {
    const list = [t('ค่า')]; // includes tone mark U+0E49
    const query = 'ค่า';
    const res = searchTodos(list, query);
    expect(res.length).toBe(1);
  });
});

