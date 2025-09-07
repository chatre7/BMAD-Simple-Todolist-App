import { useState, useRef, useEffect } from 'react';
import type { Todo } from '../types';
import { useTodos } from '../hooks/useTodos';
import { useFiltersStore } from '../store/filters.store';
import { dateOnlyToUtcIso, isNearDue, isOverdue } from '../../../lib/date';

interface Props {
  todo: Todo;
}

export function TodoItem({ todo }: Props) {
  const { update, toggle, remove, addTag, removeTag, setDueDate, clearDueDate } = useTodos();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(todo.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const [tagDraft, setTagDraft] = useState('');
  const setTagFilter = useFiltersStore((s) => s.setTag);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const value = draft.trim();
      if (value && value !== todo.title) update(todo.id, { title: value });
      setEditing(false);
    } else if (e.key === 'Escape') {
      setDraft(todo.title);
      setEditing(false);
    }
  }

  function onDelete() {
    // simple confirm for safety
    if (confirm('ยืนยันการลบรายการนี้หรือไม่?')) {
      remove(todo.id);
    }
  }

  function onAddTag(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      const val = tagDraft.trim();
      if (val) {
        addTag(todo.id, val);
        setTagDraft('');
      }
    }
  }

  function onSetDue(e: React.ChangeEvent<HTMLInputElement>) {
    const v = e.target.value; // YYYY-MM-DD
    if (v) setDueDate(todo.id, dateOnlyToUtcIso(v));
  }

  const dueClass = todo.completed
    ? ''
    : isOverdue(todo.dueDate)
      ? 'border-red-300 bg-red-50'
      : isNearDue(todo.dueDate)
        ? 'border-amber-300 bg-amber-50'
        : '';

  return (
    <li className={`flex items-center gap-3 rounded border border-gray-200 ${dueClass} bg-white px-3 py-2`}> 
      <input
        type="checkbox"
        aria-checked={todo.completed}
        checked={todo.completed}
        onChange={() => toggle(todo.id)}
        className="h-4 w-4 accent-blue-600"
      />
      {editing ? (
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          onBlur={() => setEditing(false)}
          className="flex-1 rounded border border-gray-300 px-2 py-1 focus:border-blue-500 focus:outline-none"
        />
      ) : (
        <button
          className={`flex-1 text-left ${todo.completed ? 'line-through text-gray-400' : ''}`}
          onClick={() => setEditing(true)}
          aria-label="แก้ไขชื่อเรื่อง"
        >
          {todo.title}
        </button>
      )}
      {/* Tags */}
      <div className="flex flex-wrap items-center gap-1">
        {todo.tags.map((tg) => (
          <button
            key={tg}
            onClick={() => setTagFilter(tg)}
            className="group inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-700"
            aria-label={`แท็ก ${tg}`}
          >
            {tg}
            <span
              className="cursor-pointer text-blue-500 group-hover:text-blue-700"
              onClick={(e) => {
                e.stopPropagation();
                removeTag(todo.id, tg);
              }}
              aria-label={`ลบแท็ก ${tg}`}
            >×</span>
          </button>
        ))}
        <input
          value={tagDraft}
          onChange={(e) => setTagDraft(e.target.value)}
          onKeyDown={onAddTag}
          placeholder="เพิ่มแท็ก"
          className="w-24 rounded border border-gray-200 px-1 py-0.5 text-xs"
          aria-label="เพิ่มแท็ก"
        />
      </div>
      {/* Due Date */}
      <div className="ml-auto flex items-center gap-2">
        <input
          type="date"
          onChange={onSetDue}
          className="rounded border border-gray-300 px-1 py-0.5 text-sm"
          aria-label="กำหนดวันครบกำหนด"
        />
        {todo.dueDate && !todo.completed && (
          <span className={`rounded px-2 py-0.5 text-xs ${isOverdue(todo.dueDate) ? 'bg-red-100 text-red-700' : isNearDue(todo.dueDate) ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-700'}`}>
            ครบกำหนด: {new Date(todo.dueDate).toLocaleDateString()}
          </span>
        )}
        {todo.dueDate && (
          <button onClick={() => clearDueDate(todo.id)} className="text-xs text-gray-600 underline" aria-label="ลบวันครบกำหนด">ล้างวัน</button>
        )}
      </div>
      <button
        onClick={onDelete}
        className="rounded bg-red-50 px-2 py-1 text-sm text-red-700 hover:bg-red-100"
      >
        ลบ
      </button>
    </li>
  );
}
