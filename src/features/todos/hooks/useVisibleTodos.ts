import { useRef } from 'react';
import { useTodosStore } from '../store/todos.store';
import { useFiltersStore } from '../store/filters.store';
import { makeVisibleSelector } from '../lib/filter';

export function useVisibleTodos() {
  const selectorRef = useRef<ReturnType<typeof makeVisibleSelector> | null>(null);
  if (!selectorRef.current) selectorRef.current = makeVisibleSelector();
  const todos = useTodosStore((s) => s.todos);
  const status = useFiltersStore((s) => s.status);
  const search = useFiltersStore((s) => s.search);
  const tag = useFiltersStore((s) => s.tag);
  const sortKey = useFiltersStore((s) => s.sortKey);

  return selectorRef.current(todos, status, search, tag, sortKey);
}
