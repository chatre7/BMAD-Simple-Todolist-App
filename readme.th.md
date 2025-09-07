# Simple Todolist App (เอกสารภาษาไทย)

[![CI](https://github.com/chatre7/BMAD-Simple-Todolist-App/actions/workflows/ci.yml/badge.svg)](https://github.com/chatre7/BMAD-Simple-Todolist-App/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/chatre7/BMAD-Simple-Todolist-App/branch/main/graph/badge.svg)](https://codecov.io/gh/chatre7/BMAD-Simple-Todolist-App)

ลิงก์เอกสารภาษาอังกฤษ: [README.md](README.md)

## ภาพรวมโปรเจกต์
แอป Todo แบบเรียบง่าย เน้นใช้งานเร็ว รองรับเพิ่ม/แก้ไข/ทำเสร็จ/ลบ แท็ก ค้นหา กรอง วันครบกำหนด และบันทึกข้อมูลบนเครื่องผู้ใช้ (MVP แบบไม่มีแบ็กเอนด์) พัฒนาด้วย React + TypeScript + Vite + Tailwind + Zustand

- PRD: `docs/prd.md`
- สถาปัตยกรรม: `docs/architecture.md` (มีเอกสารแยกหัวข้อย่อยใน `docs/architecture/`)
- Epics/Stories: `docs/prd/` และ `docs/prd/stories/`
- แผนงานสตอรี่: `docs/prd/plan-stories.md`

## การติดตั้งและเริ่มต้นใช้งาน
ต้องมี Node.js 18+ (หรือ 20+)

```bash
# ติดตั้งแพ็กเกจ
npm install
# เริ่ม dev server
npm run dev
# เปิด http://localhost:5173
```

## คำสั่งที่ใช้บ่อย
- `npm run dev` เริ่มเซิร์ฟเวอร์พัฒนา (Vite)
- `npm run build` สร้างไฟล์สำหรับโปรดักชัน
- `npm run preview` พรีวิวไฟล์โปรดักชัน
- `npm run typecheck` ตรวจ TypeScript แบบไม่คอมไพล์
- `npm test` รันทดสอบ (โหมด non-watch)
- `npm run test:watch` รันทดสอบแบบเฝ้าดูไฟล์
- `npm run coverage` รันทดสอบพร้อมรายงานความครอบคลุมโค้ด (coverage)

## เทคโนโลยีที่ใช้
- React 18 + TypeScript + Vite
- Tailwind CSS
- Zustand สำหรับ state management
- Vitest + Testing Library สำหรับการทดสอบ

## โครงสร้างสำคัญของซอร์สโค้ด
- `src/app/App.tsx` โครงหลักของหน้าแอป
- `src/features/todos/` โค้ดโดเมน Todo (components/store/hooks/lib/types)
- `src/lib/` ยูทิลิตี้ทั่วไป (วันที่, debounce, storage)
- `src/styles/index.css` จุดเริ่มต้น Tailwind

รายละเอียดเพิ่มเติม: ดู `docs/architecture/source-tree.md`

## ฟีเจอร์หลัก (MVP)
- เพิ่ม/แก้ไข/ทำเสร็จ/ลบ รายการงาน
- จัดแท็ก ค้นหา กรองตามสถานะ
- กำหนดวันครบกำหนด พร้อมแสดงใกล้ครบกำหนด/เกินกำหนด
- บันทึกข้อมูลโลคอล (LocalStorage)

## การทดสอบและ Coverage
- ทดสอบยูนิตและคอมโพเนนต์อยู่ที่ `src/tests/`
- ตั้งค่า Vitest ที่ `vitest.config.ts` (environment: jsdom, รายงาน coverage lcov/html/text และตั้ง threshold)
- CI จะแสดงสรุป Coverage ใน Job Summary และอัปโหลดไปยัง Codecov อัตโนมัติ

## CI/CD
- GitHub Actions (`.github/workflows/ci.yml`) รันบน Node 18/20: install → typecheck → tests + coverage → build → สรุปผลและอัปโหลดรายงาน
- ตราบใดที่ PR/commit ผ่าน workflow แสดงว่าโปรเจกต์ยังมีคุณภาพตามเกณฑ์ขั้นต่ำ

## ขั้นตอนถัดไป (ข้อเสนอแนะ)
- เพิ่มชุดทดสอบ a11y/edge cases เพิ่มเติม
- ปรับ UX รายละเอียด (โฟกัส, ช็อตคัต, การแจ้งเตือน)
- ขยายจาก LocalStorage ไป IndexedDB หรือเชื่อมต่อแบ็กเอนด์/ซิงก์ผู้ใช้ ในอนาคต

