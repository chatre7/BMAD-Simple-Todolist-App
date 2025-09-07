export interface StorageAdapter<T> {
  load(): Promise<T | null>;
  save(value: T): Promise<void>;
}

