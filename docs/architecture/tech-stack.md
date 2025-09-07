# Tech Stack

## Languages & Frameworks
- TypeScript (strict mode)
- React 18 (Vite)
- React Router (ถ้าต้องการหลายมุมมอง)

## State & Data
- Zustand (หรือ Context + Reducer หากทีมถนัด)
- Storage Abstraction + Implementations:
  - LocalStorage (เริ่มต้น)
  - IndexedDB ผ่าน `idb-keyval` (ขยายปริมาณข้อมูล)

## Styling & UI
- Tailwind CSS (Mobile‑first, WCAG AA baseline)
- Headless UI/ARIA patterns ตามความเหมาะสม

## Tooling
- Bundler/Dev Server: Vite
- Linting: ESLint (+ typescript-eslint, react plugins)
- Formatting: Prettier
- Testing: Vitest + React Testing Library

## Build & Deploy
- Target: Static Export (Vercel หรือ GitHub Pages)
- CI (optional): Lint + Type‑check + Test ก่อน deploy

## Rationale
- เร็ว เบา เหมาะ MVP ตาม PRD, พร้อมทางขยายสู่ Fullstack/Backend ภายหลัง โดยไม่เปลี่ยน UI มาก เนื่องจากมี storage adapter เป็น boundary ชัดเจน

