# Source Tree

โครงสร้างโฟลเดอร์ที่แนะนำสำหรับ Vite + React + TS

```
root/
├─ public/
├─ src/
│  ├─ app/
│  │  ├─ App.tsx
│  │  ├─ routes.tsx            # ถ้าใช้ React Router
│  │  └─ providers.tsx         # Theme/Store Providers
│  ├─ features/
│  │  └─ todos/
│  │     ├─ components/
│  │     │  ├─ TodoInput.tsx
│  │     │  ├─ TodoItem.tsx
│  │     │  └─ TodoList.tsx
│  │     ├─ hooks/
│  │     │  ├─ useTodos.ts
│  │     │  └─ useFilters.ts
│  │     ├─ store/
│  │     │  └─ todos.store.ts  # Zustand/Context
│  │     ├─ lib/
│  │     │  ├─ filter.ts       # filter/search/sort utils
│  │     │  └─ schema.ts       # zod/validators (optional)
│  │     └─ types.ts           # Todo interfaces
│  ├─ lib/
│  │  ├─ storage/
│  │  │  ├─ index.ts           # StorageAdapter interface
│  │  │  ├─ local-storage.ts   # LocalStorage impl
│  │  │  └─ indexeddb.ts       # idb-keyval impl
│  │  ├─ date.ts
│  │  └─ uid.ts
│  ├─ styles/
│  │  └─ index.css             # Tailwind entry
│  ├─ tests/
│  │  └─ todos.spec.tsx
│  └─ main.tsx
├─ index.html
├─ package.json
├─ tsconfig.json
├─ vite.config.ts
└─ README.md
```

แนวทาง
- แยก `features/*` ตามโดเมน (เริ่มที่ `todos`), รักษา isolation
- `lib/storage` เป็น boundary เดียวสำหรับ I/O ชั้น client – ง่ายต่อการสลับ backend ภายหลัง
- Utilities (filter/search/sort) แยกเพื่อทดสอบง่าย
- `tests/` ใกล้โค้ดจริงหรือรวมศูนย์ก็ได้ ตามทีมถนัด

