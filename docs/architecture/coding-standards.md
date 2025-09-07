# Coding Standards

## TypeScript & React
- เปิดใช้ `strict` ใน TS, เลี่ยง `any`
- Functional components + hooks; แยก presentational/logic เท่าที่ทำได้
- ชื่อไฟล์/โฟลเดอร์: kebab-case; Components: PascalCase; hooks: `useXxx`
- หลีกเลี่ยง state ซ้ำซ้อน: ค่าอนุมานจาก store/props/URL ไม่ต้องซ้ำใน local state

## Accessibility
- รองรับคีย์บอร์ด: focus order/outline ชัดเจน, role/aria ถูกต้อง
- คอนทราสต์ระดับ WCAG AA ขึ้นไป, ข้อความภาษาไทยตัดคำอ่านง่าย
- ใช้ semantic HTML ก่อนเสริมด้วย ARIA

## Styling
- Tailwind utility‑first; สร้าง component class สำหรับ pattern ที่ใช้ซ้ำ
- หลีกเลี่ยง CSS ซับซ้อนใน component; ถ้าจำเป็น จัดกลุ่มที่ `styles/`

## Lint & Format
- ESLint: typescript‑eslint, react, react‑hooks
- Prettier: ใช้มาตรฐานทีม, จัด format ก่อน commit
- แนะนำ pre‑commit hook: `lint-staged` (ถ้าเพิ่ม CI ให้รัน lint/typecheck/test)

## Testing
- Vitest + React Testing Library
- ทดสอบ flow หลักตาม Acceptance Criteria: เพิ่ม→แก้ไข→ทำเสร็จ→ลบ, กรอง/ค้นหา
- ทดสอบ selectors/utils แบบ unit, และ storage adapter contract

## Git & Commits
- Commit message แบบ Conventional Commits (feat, fix, refactor, test, docs, chore)
- PR ควรเล็ก โฟกัสเดียว พร้อมรายการตรวจ: lint/test ผ่าน, impacts UI/UX/A11y

