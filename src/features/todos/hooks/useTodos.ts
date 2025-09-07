import { useTodosStore } from '../store/todos.store';

export function useTodos() {
  const todos = useTodosStore((s) => s.todos);
  const add = useTodosStore((s) => s.add);
  const update = useTodosStore((s) => s.update);
  const toggle = useTodosStore((s) => s.toggle);
  const remove = useTodosStore((s) => s.remove);
  const addTag = useTodosStore((s) => s.addTag);
  const removeTag = useTodosStore((s) => s.removeTag);
  const setDueDate = useTodosStore((s) => s.setDueDate);
  const clearDueDate = useTodosStore((s) => s.clearDueDate);
  return { todos, add, update, toggle, remove, addTag, removeTag, setDueDate, clearDueDate };
}
