import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Needed for GitHub Pages under /BMAD-Simple-Todolist-App/
  base: '/BMAD-Simple-Todolist-App/',
});
