import { useState } from 'react';
import { useTodos } from '../hooks/useTodos';

export function TodoInput() {
  const { add } = useTodos();
  const [title, setTitle] = useState('');

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const value = title.trim();
      if (value) {
        add(value);
        setTitle('');
      }
    }
  }

  return (
    <div className="mb-4">
      <label htmlFor="todo-input" className="sr-only">เพิ่มงานใหม่</label>
      <input
        id="todo-input"
        type="text"
        placeholder="พิมพ์แล้วกด Enter เพื่อเพิ่มงาน"
        className="w-full rounded border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

