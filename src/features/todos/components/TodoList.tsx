import { useVisibleTodos } from '../hooks/useVisibleTodos';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const todos = useVisibleTodos();
  return (
    <ul className="space-y-2">
      {todos.map((t) => (
        <TodoItem key={t.id} todo={t} />
      ))}
      {todos.length === 0 && (
        <li className="text-sm text-gray-500">ยังไม่มีงาน เพิ่มงานแรกของคุณด้านบน</li>
      )}
    </ul>
  );
}
