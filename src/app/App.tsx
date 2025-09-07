import { TodoInput } from '../features/todos/components/TodoInput';
import { TodoList } from '../features/todos/components/TodoList';
import { FilterBar } from '../features/todos/components/FilterBar';

export function App() {
  return (
    <div className="mx-auto max-w-2xl p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Simple Todolist App</h1>
        <p className="text-sm text-gray-600">เพิ่มงานได้รวดเร็ว แก้ไขอินไลน์ ทำเสร็จ/ลบได้จากรายการ</p>
      </header>
      <main>
        <TodoInput />
        <FilterBar />
        <TodoList />
      </main>
    </div>
  );
}
