import { describe, it, expect } from 'vitest';
import { filterTodos, searchTodos, sortTodos } from '../features/todos/lib/filter';
import type { Todo } from '../features/todos/types';

function makeTodo(p: Partial<Todo> & Pick<Todo, 'title'>): Todo {
  return {
    id: p.id ?? Math.random().toString(36).slice(2),
    title: p.title,
    description: p.description,
    tags: p.tags ?? [],
    dueDate: p.dueDate,
    completed: p.completed ?? false,
    createdAt: p.createdAt ?? new Date().toISOString(),
    updatedAt: p.updatedAt ?? new Date().toISOString(),
  };
}

describe('filter/search/sort', () => {
  const now = Date.now();
  const past = new Date(now - 24 * 3600 * 1000).toISOString();
  const soon = new Date(now + 12 * 3600 * 1000).toISOString();
  const later = new Date(now + 5 * 24 * 3600 * 1000).toISOString();

  const todos: Todo[] = [
    makeTodo({ title: 'งานเร่งด่วน', dueDate: soon, createdAt: new Date(now - 1000).toISOString() }),
    makeTodo({ title: 'งานที่ผ่านมา', dueDate: past, createdAt: new Date(now - 2000).toISOString() }),
    makeTodo({ title: 'บันทึกโน้ต', tags: ['work'], createdAt: new Date(now - 3000).toISOString() }),
    makeTodo({ title: 'ทำความสะอาด', description: 'ห้องครัว', createdAt: new Date(now - 4000).toISOString(), completed: true }),
    makeTodo({ title: 'เดินออกกำลังกาย', dueDate: later, createdAt: new Date(now - 5000).toISOString() }),
  ];

  it('filters by status', () => {
    expect(filterTodos(todos, 'pending', null).every((t) => !t.completed)).toBe(true);
    expect(filterTodos(todos, 'done', null).every((t) => t.completed)).toBe(true);
  });

  it('filters by tag', () => {
    const list = filterTodos(todos, 'all', 'work');
    expect(list.every((t) => t.tags.includes('work'))).toBe(true);
  });

  it('searches by title/description (Thai substring)', () => {
    expect(searchTodos(todos, 'โน้ต').some((t) => t.title.includes('โน้ต'))).toBe(true);
    expect(searchTodos(todos, 'ครัว').some((t) => (t.description ?? '').includes('ครัว'))).toBe(true);
  });

  it('sorts by createdAt desc by default', () => {
    const list = sortTodos(todos, 'createdAt');
    // first more recent than last
    expect(new Date(list[0].createdAt).getTime()).toBeGreaterThan(new Date(list.at(-1)!.createdAt).getTime());
  });

  it('sorts by dueDate ranking: overdue -> near-due -> others', () => {
    const list = sortTodos(todos, 'dueDate');
    const titles = list.map((t) => t.title);
    const idxPast = titles.indexOf('งานที่ผ่านมา');
    const idxSoon = titles.indexOf('งานเร่งด่วน');
    const idxLater = titles.indexOf('เดินออกกำลังกาย');
    expect(idxPast).toBeLessThan(idxSoon);
    expect(idxSoon).toBeLessThan(idxLater);
  });
});

