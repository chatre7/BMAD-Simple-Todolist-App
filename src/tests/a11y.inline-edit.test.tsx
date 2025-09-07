import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../app/App';
import { useTodosStore } from '../features/todos/store/todos.store';

describe('A11y/Keyboard - Inline edit flows', () => {
  beforeEach(() => {
    useTodosStore.setState({ todos: [] });
    try { localStorage.clear(); } catch {}
  });

  it('Enter saves edit, Esc cancels', async () => {
    render(<App />);
    const input = screen.getByLabelText('เพิ่มงานใหม่');
    await userEvent.type(input, 'Edit me{enter}');
    await userEvent.type(input, 'Cancel me{enter}');

    // Start editing the item with text 'Edit me'
    await userEvent.click(screen.getByText('Edit me'));
    const editor = screen.getByDisplayValue('Edit me');
    await userEvent.type(editor, ' updated{enter}');
    expect(screen.getByText('Edit me updated')).toBeTruthy();

    // Start editing second item, then cancel
    await userEvent.click(screen.getByText('Cancel me'));
    const editor2 = screen.getByDisplayValue('Cancel me');
    await userEvent.type(editor2, ' changed{Escape}');
    expect(screen.getByText('Cancel me')).toBeTruthy();
  });

  it('Checkbox exposes aria-checked and can be toggled', async () => {
    render(<App />);
    const input = screen.getByLabelText('เพิ่มงานใหม่');
    await userEvent.type(input, 'Check me{enter}');
    const cb = screen.getAllByRole('checkbox')[0] as HTMLInputElement;
    expect(cb.getAttribute('aria-checked')).toBe('false');
    await userEvent.click(cb);
    expect(cb.checked).toBe(true);
    expect(cb.getAttribute('aria-checked')).toBe('true');
  });
});
