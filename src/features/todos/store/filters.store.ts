import { create } from 'zustand';

export type StatusFilter = 'all' | 'pending' | 'done';
export type SortKey = 'createdAt' | 'dueDate' | 'status';

interface FiltersState {
  status: StatusFilter;
  search: string;
  tag: string | null;
  sortKey: SortKey;
  setStatus: (v: StatusFilter) => void;
  setSearch: (v: string) => void;
  setTag: (v: string | null) => void;
  setSortKey: (v: SortKey) => void;
}

const UI_KEY = 'todoapp:ui';

function loadUi() {
  try {
    const raw = localStorage.getItem(UI_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveUi(data: any) {
  try {
    localStorage.setItem(UI_KEY, JSON.stringify(data));
  } catch {}
}

const initial = (() => {
  const v = loadUi();
  return {
    status: (v?.status as StatusFilter) ?? 'all',
    search: (v?.search as string) ?? '',
    tag: (v?.tag as string | null) ?? null,
    sortKey: (v?.sortKey as SortKey) ?? 'createdAt',
  } satisfies Omit<FiltersState, 'setStatus' | 'setSearch' | 'setTag' | 'setSortKey'>;
})();

export const useFiltersStore = create<FiltersState>((set, get) => ({
  ...initial,
  setStatus: (v) => {
    set({ status: v });
    saveUi({ ...get(), status: v });
  },
  setSearch: (v) => {
    set({ search: v });
    saveUi({ ...get(), search: v });
  },
  setTag: (v) => {
    set({ tag: v });
    saveUi({ ...get(), tag: v });
  },
  setSortKey: (v) => {
    set({ sortKey: v });
    saveUi({ ...get(), sortKey: v });
  },
}));

