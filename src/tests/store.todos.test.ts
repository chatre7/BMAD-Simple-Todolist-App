import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { useTodosStore } from '../features/todos/store/todos.store';

function resetStore() {
  useTodosStore.setState({ todos: [] });
  // clear persisted UI/todos
  try {
    localStorage.clear();
  } catch {}
}

describe('Todos store', () => {
  beforeEach(() => {
    resetStore();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('adds todo to the top', () => {
    const { add } = useTodosStore.getState();
    add('A');
    add('B');
    const { todos } = useTodosStore.getState();
    expect(todos.map((t) => t.title)).toEqual(['B', 'A']);
  });

  it('updates title and updatedAt', () => {
    vi.useFakeTimers();
    const start = new Date('2025-01-01T00:00:00Z');
    vi.setSystemTime(start);
    useTodosStore.getState().add('A');
    const first = useTodosStore.getState().todos[0];
    const prevUpdatedAt = first.updatedAt;
    vi.setSystemTime(new Date(start.getTime() + 1000));
    useTodosStore.getState().update(first.id, { title: 'A1' });
    const curr = useTodosStore.getState().todos[0];
    expect(curr.title).toBe('A1');
    expect(curr.updatedAt).not.toBe(prevUpdatedAt);
  });

  it('toggles complete', () => {
    useTodosStore.getState().add('A');
    const id = useTodosStore.getState().todos[0].id;
    useTodosStore.getState().toggle(id);
    expect(useTodosStore.getState().todos[0].completed).toBe(true);
  });

  it('removes todo', () => {
    useTodosStore.getState().add('A');
    const id = useTodosStore.getState().todos[0].id;
    useTodosStore.getState().remove(id);
    expect(useTodosStore.getState().todos).toHaveLength(0);
  });

  it('add/remove tags', () => {
    useTodosStore.getState().add('A');
    const id = useTodosStore.getState().todos[0].id;
    useTodosStore.getState().addTag(id, 'work');
    expect(useTodosStore.getState().todos[0].tags).toEqual(['work']);
    useTodosStore.getState().removeTag(id, 'work');
    expect(useTodosStore.getState().todos[0].tags).toEqual([]);
  });

  it('set/clear due date', () => {
    useTodosStore.getState().add('A');
    const id = useTodosStore.getState().todos[0].id;
    const iso = new Date().toISOString();
    useTodosStore.getState().setDueDate(id, iso);
    expect(useTodosStore.getState().todos[0].dueDate).toBe(iso);
    useTodosStore.getState().clearDueDate(id);
    expect(useTodosStore.getState().todos[0].dueDate).toBeUndefined();
  });
});
