import { create } from 'zustand';
import type { Todo, TodoId } from '../types';
import { uid } from '../../../lib/uid';
import { LocalStorageAdapter } from '../../../lib/storage/local-storage';
import { debounce } from '../../../lib/debounce';

function nowIso() {
  return new Date().toISOString();
}

export interface TodosState {
  todos: Todo[];
  add: (title: string) => void;
  update: (id: TodoId, patch: Partial<Omit<Todo, 'id' | 'createdAt'>>) => void;
  toggle: (id: TodoId) => void;
  remove: (id: TodoId) => void;
  addTag: (id: TodoId, tag: string) => void;
  removeTag: (id: TodoId, tag: string) => void;
  setDueDate: (id: TodoId, isoUtc: string) => void;
  clearDueDate: (id: TodoId) => void;
}

export const useTodosStore = create<TodosState>((set) => ({
  todos: [],
  add: (title) =>
    set((state) => {
      const trimmed = title.trim();
      if (!trimmed) return state;
      const todo: Todo = {
        id: uid(),
        title: trimmed,
        description: undefined,
        tags: [],
        dueDate: undefined,
        completed: false,
        createdAt: nowIso(),
        updatedAt: nowIso(),
      };
      return { todos: [todo, ...state.todos] };
    }),
  update: (id, patch) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id
          ? { ...t, ...patch, updatedAt: nowIso() }
          : t
      ),
    })),
  toggle: (id) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id
          ? { ...t, completed: !t.completed, updatedAt: nowIso() }
          : t
      ),
    })),
  remove: (id) => set((state) => ({ todos: state.todos.filter((t) => t.id !== id) })),
  addTag: (id, tag) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id && tag.trim() && !t.tags.includes(tag)
          ? { ...t, tags: [...t.tags, tag.trim()], updatedAt: nowIso() }
          : t
      ),
    })),
  removeTag: (id, tag) =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === id
          ? { ...t, tags: t.tags.filter((x) => x !== tag), updatedAt: nowIso() }
          : t
      ),
    })),
  setDueDate: (id, isoUtc) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === id ? { ...t, dueDate: isoUtc, updatedAt: nowIso() } : t)),
    })),
  clearDueDate: (id) =>
    set((state) => ({
      todos: state.todos.map((t) => (t.id === id ? { ...t, dueDate: undefined, updatedAt: nowIso() } : t)),
    })),
}));

// Persistence (Story 1.3)
interface PersistPayloadV1 {
  schemaVersion: 1;
  todos: Todo[];
}

const STORAGE_KEY = 'todoapp:v1';
const hasLocalStorage = typeof (globalThis as any).localStorage !== 'undefined';
if (hasLocalStorage) {
  const adapter = new LocalStorageAdapter<PersistPayloadV1>(STORAGE_KEY);

  (async () => {
    const payload = await adapter.load();
    if (payload && payload.schemaVersion === 1 && Array.isArray(payload.todos)) {
      useTodosStore.setState({ todos: payload.todos });
    }
  })();

  const save = debounce(async () => {
    const todos = useTodosStore.getState().todos;
    const payload: PersistPayloadV1 = { schemaVersion: 1, todos };
    await adapter.save(payload);
  }, 350);

  useTodosStore.subscribe((state, prev) => {
    if (state.todos !== prev.todos) {
      void save();
    }
  });
}
