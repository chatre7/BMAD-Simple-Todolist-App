# Data Model

โครงสร้างข้อมูล Todo รองรับความต้องการ FR1–FR7 และพร้อมขยายภายหลัง

```ts
type TodoId = string;

export interface Todo {
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

แนวทาง
- ใช้ ISO string (UTC) เพื่อความง่ายในการ serialize/compare และข้ามโซนเวลา
- ขยายฟิลด์ภายหลังได้ (เช่น priority, reminders) ผ่าน migration ของ storage

## Date/Time Rules
- การเก็บ `dueDate`: เก็บเป็น ISO 8601 UTC (เช่น `2025-09-07T00:00:00Z`). ถ้า UI เป็น date-only ให้แปลง start-of-day ตามเวลาท้องถิ่นแล้วแปลงเป็น UTC ก่อนบันทึก
- การแสดงผล: แปลง UTC เป็นเวลาท้องถิ่นของผู้ใช้เมื่อแสดงบน UI
- Near-due rule: งานที่ไม่เสร็จและ `dueDate` อยู่ในช่วง 48 ชั่วโมงถัดไปจาก "ตอนนี้" ถือว่าใกล้ครบกำหนด
- Overdue rule: งานที่ไม่เสร็จและ `dueDate` ก่อน "ตอนนี้" ถือว่าเกินกำหนด

## Sorting Comparator (Guideline)
- ควรกำหนด comparator กลางสำหรับการเรียง เพื่อความสม่ำเสมอและทดสอบง่าย
- ตัวอย่างลำดับความสำคัญ: overdue ก่อน → near‑due → อื่น ๆ; tie-breaker โดย `createdAt` (ใหม่ก่อน)
