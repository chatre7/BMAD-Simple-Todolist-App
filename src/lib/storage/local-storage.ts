import type { StorageAdapter } from './index';

export class LocalStorageAdapter<T> implements StorageAdapter<T> {
  constructor(private key: string) {}

  async load(): Promise<T | null> {
    try {
      const ls = (globalThis as any).localStorage as Storage | undefined;
      if (!ls) return null;
      const raw = ls.getItem(this.key);
      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch (e) {
      console.warn('Failed to parse storage payload, resetting', e);
      return null;
    }
  }

  async save(value: T): Promise<void> {
    const ls = (globalThis as any).localStorage as Storage | undefined;
    if (!ls) return;
    ls.setItem(this.key, JSON.stringify(value));
  }
}
