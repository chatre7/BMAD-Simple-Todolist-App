# Simple Todolist App – Architecture

## Scope & Goals
- MVP ตาม PRD: จัดการงานแบบออฟไลน์ (เพิ่ม/แก้ไข/ลบ/ทำเสร็จ), กรองสถานะ, ค้นหา, แท็ก, Due Date, เก็บข้อมูลบนเครื่อง
- ปรับขยายเป็น Fullstack ภายหลังได้ (Auth/Sync/Notifications)

## Architectural Overview
- Client‑only Web App (React + TypeScript) บน Vite
- Layering (จากบนลงล่าง):
  1) UI Components (Presentational) + Pages/Routes
  2) Feature Logic (Hooks) + State Store (Zustand/Context)
  3) Storage Adapter (LocalStorage/IndexedDB ผ่าน abstraction เดียว)
  4) Utilities (date, search, filter, validation)

การออกแบบนี้แยก UI ออกจากสถานะและการจัดเก็บข้อมูลอย่างชัดเจน เพื่อให้สามารถสลับ backend ภายหลังได้ โดยไม่กระทบ UI มาก

## Key Decisions
- State: เริ่มด้วย Zustand (เรียบง่าย, testable). สามารถใช้ Context + Reducer หากทีมถนัดกว่า
- Storage: Abstract Storage ผ่าน interface เดียว และให้ implementation เป็น LocalStorage (เริ่มต้น) และ IndexedDB (ผ่าน idb‑keyval) เพื่อรองรับข้อมูลมากขึ้น
- Styling: Tailwind CSS (สนับสนุนการเข้าถึง/คอนทราสต์ง่าย)
- Routing: React Router (หากต้องการหลายมุมมอง เช่น All/Today/By Tag) หรือสถานะ UI ภายในหน้าหลักในช่วง MVP
- Testing: Vitest + React Testing Library
- Deploy: GitHub Pages/Vercel (Static)

## Core Data Model (MVP)
```ts
type TodoId = string;

interface Todo {
  id: TodoId;
  title: string;             // required
  description?: string;      // optional
  tags: string[];            // optional, default []
  dueDate?: string;          // ISO date string
  completed: boolean;        // default false
  createdAt: string;         // ISO timestamp
  updatedAt: string;         // ISO timestamp
}
```

หมายเหตุ: โครงสร้างนี้สอดคล้อง FR1–FR7 และพร้อมขยายสำหรับผู้ใช้/ซิงก์ในอนาคต

## State Management
- Store แยก concerns: `todos`, `filters`, `ui`
- Selectors รองรับ: ค้นหา/กรอง, เรียงลำดับ, มุมมอง (All/Today/By Tag)
- Side‑effects: โหลด/บันทึกผ่าน storage adapter ใน action layer เท่านั้น (ไม่ฝังใน UI)

## Storage Strategy
- `StorageAdapter` interface: `load()`, `save(todos)`, อาจเพิ่ม `backup/export/import`
- Implementations:
  - LocalStorage: เร็ว/ง่าย เหมาะข้อมูลปริมาณน้อย
  - IndexedDB (idb‑keyval): ขยายได้เมื่อรายการมากขึ้น
- Versioning & Migration: เก็บ `schemaVersion` ใน storage เพื่อรองรับการย้ายคีย์/ฟิลด์ภายหลัง

## Build & Deploy
- Vite + TS strict, ESM
- CI (optional): Lint/Type‑check/Test ก่อน deploy
- Deploy targets: Vercel หรือ GitHub Pages (Static)

## Quality & Accessibility
- NFR: Performance (LCP ≤ 2.5s, INP ≤ 200ms), i18n/Thai friendly, WCAG AA baseline
- Testing: unit (selectors/hooks), component (critical flows เพิ่ม/แก้ไข/เสร็จ/ลบ), storage adapter contract

## Sharded Docs
- ดูรายละเอียดเสริม:
  - ./architecture/tech-stack.md
  - ./architecture/source-tree.md
  - ./architecture/coding-standards.md
  - ./architecture/data-model.md
  - ./architecture/state-management.md
  - ./architecture/storage-strategy.md
  - ./architecture/build-deploy.md
  - ./architecture/quality-accessibility.md
