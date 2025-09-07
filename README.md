# Simple Todolist App

[![CI](https://github.com/chatre7/BMAD-Simple-Todolist-App/actions/workflows/ci.yml/badge.svg)](https://github.com/chatre7/BMAD-Simple-Todolist-App/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/chatre7/BMAD-Simple-Todolist-App/branch/main/graph/badge.svg)](https://codecov.io/gh/chatre7/BMAD-Simple-Todolist-App)

ภาษาไทย: อ่านเอกสาร [readme.th.md](readme.th.md)

Scaffolded with Vite + React + TypeScript + Tailwind + Zustand to implement Stories 1.x from PRD.

## Live Demo

GitHub Pages: https://chatre7.github.io/BMAD-Simple-Todolist-App/

Vercel (recommended for zero-config):
- One-click deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/chatre7/BMAD-Simple-Todolist-App)

- Vercel auto-detects Vite. No config files needed. Build outputs to `dist`.

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


## My Note
@pm สวัสดีครับ ผมต้องการสร้างโปรเจกต์ "Simple Todolist App" ช่วยสร้างเอกสาร PRD ให้หน่อยครับ

@architect ช่วยออกแบบสถาปัตยกรรมสำหรับโปรเจกต์ Todolist โดยอิงจาก PRD ที่เพิ่งสร้างไปครับ

@po ช่วยซอยเอกสาร PRD ให้เป็นไฟล์ Epics และ Stories ย่อยๆ ตามที่ออกแบบไว้หน่อยครับ

@po ต่อไป ช่วยซอยเอกสาร Architecture ให้เป็นไฟล์ย่อยๆ ตามหัวข้อด้วยครับ

@sm ช่วยร่างแผนการทำงานสำหรับ Story จากไฟล์ docs/stories/*.md เรียงตามลำดับ ให้หน่อยครับ โดยอิงจากเอกสาร Architecture ที่มีอยู่

สร้างไฟล์ “แผนงานสตอรี่” สรุปชุดนี้ไว้ที่ docs/prd/plan-stories.md เพื่อใช้เป็น handoff ให้ dev/qa

@qa *risk on the draft for docs/prd/plan-stories.md

@dev ลงมือเขียนโค้ดสำหรับ Story ทั้งหมด ตามแผนที่ SM ร่างไว้เลยครับ

@qa *review the implementation of the all story
