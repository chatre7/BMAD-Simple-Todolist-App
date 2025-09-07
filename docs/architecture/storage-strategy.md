# Storage Strategy

## Adapter Interface
สร้าง abstraction เดียวสำหรับการจัดเก็บ เพื่อสลับ implementation ได้ง่าย

```ts
export interface StorageAdapter<T> {
  load(): Promise<T | null>;
  save(value: T): Promise<void>;
}
```

## Implementations
- LocalStorage: เริ่มต้น เหมาะข้อมูลน้อย ตั้งคีย์เช่น `todoapp:v1`
- IndexedDB (`idb-keyval`): รองรับข้อมูลมากขึ้น/สเกลในอนาคต

## Versioning & Migration
- เก็บ `schemaVersion` ภายใน payload เพื่อตรวจจับและย้ายโครงสร้างฟิลด์เมื่อเปลี่ยนแปลง
- เพิ่มเส้นทาง export/import เพื่อสำรองข้อมูลของผู้ใช้ในอนาคต

## Concrete Parameters (MVP)
- STORAGE_KEY: `todoapp:v1`
- schemaVersion: `1`
- Payload shape: `{ schemaVersion: 1, todos: Todo[] }`
- Persist policy: debounce 250–500ms หลัง action เปลี่ยนแปลง เพื่อหลีกเลี่ยง I/O ถี่เกินไป
- Hydration: โหลดข้อมูลก่อน mount UI หลักเพื่อลด flash ของสถานะว่าง

## Error Handling & Recovery
- Corrupted payload: try/catch ระหว่าง `load()` — ถ้าพังให้รีเซ็ตเป็นสถานะว่างและแสดง banner แจ้งผู้ใช้ (และเสนอตัวเลือก import ถ้ามีในอนาคต)
- Quota exceeded: แสดงข้อความเตือนและชี้แนะการลบรายการ/แท็ก/รายละเอียดที่ไม่จำเป็น
- Migration failure: เก็บสำเนา payload เดิมภายใต้คีย์ `todoapp:backup` หนึ่งครั้งก่อนพยายามย้าย schema
