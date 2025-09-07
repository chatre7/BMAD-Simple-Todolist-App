import type { Todo } from '../types';
import type { SortKey, StatusFilter } from '../store/filters.store';
import { isNearDue, isOverdue } from '../../../lib/date';

function normalize(s: string) {
  return s.normalize('NFC').toLowerCase();
}

export function filterTodos(todos: Todo[], status: StatusFilter, tag: string | null): Todo[] {
  return todos.filter((t) => {
    if (status === 'pending' && t.completed) return false;
    if (status === 'done' && !t.completed) return false;
    if (tag && !t.tags.includes(tag)) return false;
    return true;
  });
}

export function searchTodos(todos: Todo[], query: string): Todo[] {
  if (!query.trim()) return todos;
  const q = normalize(query);
  return todos.filter((t) => normalize(t.title).includes(q) || normalize(t.description ?? '').includes(q));
}

export function sortTodos(todos: Todo[], key: SortKey): Todo[] {
  const copy = [...todos];
  copy.sort((a, b) => compare(a, b, key));
  return copy;
}

function compare(a: Todo, b: Todo, key: SortKey) {
  if (key === 'status') {
    // incomplete first
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return compare(a, b, 'createdAt');
  }
  if (key === 'dueDate') {
    // overdue -> near‑due -> others; then by createdAt desc
    const rank = (t: Todo) => (isOverdue(t.dueDate) ? 0 : isNearDue(t.dueDate) ? 1 : 2);
    const ar = rank(a);
    const br = rank(b);
    if (ar !== br) return ar - br;
    return compare(a, b, 'createdAt');
  }
  // createdAt desc
  return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
}

// Memoized visible list selector factory to avoid redundant recomputation
export function makeVisibleSelector() {
  let lastTodos: Todo[] | null = null;
  let lastStatus: StatusFilter | null = null;
  let lastSearch = '';
  let lastTag: string | null = null;
  let lastSortKey: SortKey = 'createdAt';
  let lastResult: Todo[] = [];

  return function select(
    todos: Todo[],
    status: StatusFilter,
    search: string,
    tag: string | null,
    sortKey: SortKey
  ): Todo[] {
    if (
      lastTodos === todos &&
      lastStatus === status &&
      lastSearch === search &&
      lastTag === tag &&
      lastSortKey === sortKey
    ) {
      return lastResult;
    }
    const filtered = filterTodos(todos, status, tag);
    const searched = searchTodos(filtered, search);
    const sorted = sortTodos(searched, sortKey);
    lastTodos = todos;
    lastStatus = status;
    lastSearch = search;
    lastTag = tag;
    lastSortKey = sortKey;
    lastResult = sorted;
    return sorted;
  };
}
