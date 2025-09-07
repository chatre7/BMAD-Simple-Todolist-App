export type TodoId = string;

export interface Todo {
  id: TodoId;
  title: string;
  description?: string;
  tags: string[];
  dueDate?: string; // ISO UTC string
  completed: boolean;
  createdAt: string; // ISO UTC timestamp
  updatedAt: string; // ISO UTC timestamp
}

