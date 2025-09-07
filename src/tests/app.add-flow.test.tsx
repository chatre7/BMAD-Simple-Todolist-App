import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../app/App';
import { useTodosStore } from '../features/todos/store/todos.store';

describe('Add → Edit → Complete → Delete basic flow', () => {
  beforeEach(() => {
    useTodosStore.setState({ todos: [] });
    try { localStorage.clear(); } catch {}
  });

  it('adds a todo with Enter and shows on top', async () => {
    render(<App />);
    const input = screen.getByLabelText('เพิ่มงานใหม่');
    await userEvent.type(input, 'ทดสอบการเพิ่มงาน{enter}');
    expect(screen.getByText('ทดสอบการเพิ่มงาน')).toBeTruthy();
  });

  it('toggles complete and deletes with confirm', async () => {
    render(<App />);
    const input = screen.getByLabelText('เพิ่มงานใหม่');
    await userEvent.type(input, 'จะถูกลบ{enter}');
    const checkbox = screen.getAllByRole('checkbox')[0] as HTMLInputElement;
    await userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);

    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const deleteBtn = screen.getAllByRole('button', { name: 'ลบ' })[0];
    await userEvent.click(deleteBtn);
    expect(screen.queryByText('จะถูกลบ')).toBeNull();
  });
});
