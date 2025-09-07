# Simple Todolist App

Scaffolded with Vite + React + TypeScript + Tailwind + Zustand to implement Stories 1.x from PRD.

## Requirements
- Node.js 18+
- pnpm/npm/yarn

## Setup
```bash
# using npm
npm install
npm run dev

# using pnpm
pnpm install
pnpm dev
```

## Scripts
- `dev`: start Vite dev server
- `build`: production build
- `preview`: preview production build
- `typecheck`: TypeScript check
- `test`: Vitest (jsdom)

## Tech
- React 18, TypeScript strict, Vite
- TailwindCSS (see `tailwind.config.cjs`, `src/styles/index.css`)
- Zustand store (`src/features/todos/store/todos.store.ts`)

## Structure
See `docs/architecture/source-tree.md` for the recommended layout. This scaffold includes:
- Input + List + Item components for Stories 1.1–1.2
- Basic store actions: add, update, toggle, remove

## Next
- Implement persistence (Story 1.3) using the storage adapter abstraction per `docs/architecture/storage-strategy.md`
- Add tests for store/actions and core UI flows

