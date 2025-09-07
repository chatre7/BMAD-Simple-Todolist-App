# แผนงานสตอรี่ (Story Work Plan)

อ้างอิงสถาปัตยกรรม: `docs/architecture.md`, `docs/architecture/source-tree.md`, `docs/architecture/state-management.md`, `docs/architecture/storage-strategy.md`, `docs/architecture/data-model.md`

ลำดับการทำงานตามไฟล์สตอรี่ใน `docs/prd/stories/*.md`

---

## Story 1.1: เพิ่มงานแบบรวดเร็ว
- Files: `docs/prd/stories/1.1-quick-add.md`
- Pre‑req: Source tree และแนวทาง store/selectors
- Deliverables:
  - Component: `TodoInput`, อัปเดต `TodoList` ให้รายการใหม่อยู่บนสุด
  - Store actions: `add(title)` ตั้งค่า `createdAt`, `updatedAt`, `completed=false`, `tags=[]`
- Tasks:
  - Types: ยืนยัน `Todo` ตาม `data-model.md`
  - Store: สร้าง slice `todos` + action `add`
  - UI: `TodoInput` (Enter=save, ป้องกันเพิ่มว่าง), integrate กับ `TodoList`
  - Tests:
    - unit: store.add เพิ่มรายการและอยู่บนสุด
    - component: พิมพ์→Enter→แสดงรายการใหม่บนสุด
  - A11y: label/aria ถูกต้อง, จัดการ focus หลังเพิ่มสำเร็จ
- DoD:
  - Acceptance Criteria ครบ, ไม่มี console error, lint/type/test ผ่าน

---

## Story 1.2: แก้ไข/ลบ/ทำเครื่องหมายเสร็จ
- Files: `docs/prd/stories/1.2-edit-complete-delete.md`
- Pre‑req: Story 1.1
- Deliverables:
  - Inline edit, toggle complete, ยืนยันก่อน delete
  - Store actions: `update(id, patch)`, `toggle(id)`, `remove(id)`
- Tasks:
  - Store: implement `update/toggle/remove` อัปเดต `updatedAt`
  - UI: `TodoItem` รองรับ edit inline (Enter=save / Esc=cancel), แสดงสไตล์ complete แตกต่าง
  - Tests:
    - unit: update/toggle/remove ครอบคลุม edge cases
    - component: แก้ไข→บันทึก, ทำเสร็จ, ลบพร้อมยืนยัน
  - A11y: role/aria-checked สำหรับสถานะ complete, keyboard flows ครบ
- DoD:
  - ทุก AC ผ่านและ behavior สม่ำเสมอในรายการหลายชิ้น

---

## Story 1.3: จัดเก็บข้อมูลโลคอล
- Files: `docs/prd/stories/1.3-local-storage.md`
- Pre‑req: Story 1.1–1.2, `storage-strategy.md`
- Deliverables:
  - `StorageAdapter<Todo[]>` + LocalStorage implementation (คีย์ `todoapp:v1`)
  - Bootstrap/rehydrate store, persist on change (debounce ถ้าจำเป็น)
- Tasks:
  - Lib: นิยาม interface `StorageAdapter` (`load`/`save`)
  - Impl: localStorage + payload มี `schemaVersion`
  - Store: hydrate ตอน init, subscribe persist เมื่อ state เปลี่ยน
  - Tests: adapter contract (load/save), persist‑reload flow ครบ
- DoD:
  - ปิด/เปิดแอป ข้อมูลยังอยู่ครบถ้วนตาม AC

---

## Story 2.1: จัดแท็กงานหลายแท็ก
- Files: `docs/prd/stories/2.1-multi-tagging.md`
- Pre‑req: 1.x, `data-model.md`
- Deliverables:
  - ฟิลด์ `tags: string[]` พร้อม UI เพิ่ม/ลบแท็กใน `TodoItem`
  - Store actions: `addTag(id, tag)`, `removeTag(id, tag)`
- Tasks:
  - Types/Store: ค่าเริ่มต้น `tags=[]`
  - UI: อินพุต/ชิปแท็ก เพิ่ม/ลบ และแสดงผลชัดเจน
  - Persist: storage รองรับ `tags` (โครงสร้างรองรับแล้ว)
  - Tests: unit add/removeTag, component แสดง/ลบ/คลิกแท็ก
- DoD:
  - เพิ่ม/ลบแท็กหลายแท็กได้ตาม AC

---

## Story 2.2: การกรองและการค้นหา
- Files: `docs/prd/stories/2.2-filter-search.md`
- Pre‑req: 2.1, `state-management.md`
- Deliverables:
  - Slice `filters` (status/search/tag), selector `visibleTodos`
  - UI controls: status filter, search box, คลิกแท็ก→กรอง
- Tasks:
  - Store: เพิ่ม `filters` state + actions
  - Selectors: รวม filter + search พร้อม memoization
  - UI: controls และ binding กับ store/selectors
  - Tests: unit (selectors), component (กรอง/ค้นหาแบบทันที)
- DoD:
  - กรองสถานะ + ค้นหา client‑side ได้ถูกต้องและเร็ว

---

## Story 3.1: วันครบกำหนดของงาน
- Files: `docs/prd/stories/3.1-due-date.md`
- Pre‑req: 2.x, `data-model.md`
- Deliverables:
  - ฟิลด์ `dueDate?: string` + UI set/edit/remove
  - แสดง near‑due ด้วยสไตล์แตกต่าง
- Tasks:
  - Store: actions `setDueDate/clearDueDate`, อัปเดต `updatedAt`
  - UI: date picker หรืออินพุตวันที่แบบง่าย, แสดงสถานะใกล้ครบกำหนด
  - Tests: unit set/clear, component ตั้ง/แก้/ลบ และแสดง near‑due
- DoD:
  - ตั้ง/แก้/ลบ due date ได้ตาม AC และให้ feedback ชัดเจน

---

## Story 3.2: การเรียงลำดับ
- Files: `docs/prd/stories/3.2-sorting.md`
- Pre‑req: 3.1, `state-management.md`
- Deliverables:
  - ตัวเลือก sort อย่างน้อย 1 แบบ (เช่น createdAt/dueDate/status)
  - จดจำค่าที่เลือก (โลคอล)
- Tasks:
  - Store: `filters.sortKey` และ comparator/selector สำหรับการเรียง
  - UI: control เลือก sort, persist ค่าที่เลือก
  - Tests: unit comparator/selector, component เปลี่ยน sort แล้วสะท้อนผล
- DoD:
  - เรียงได้ถูกต้องและรักษาการตั้งค่าไว้เมื่อกลับมาใช้งานอีกครั้ง

---

## แนวทางทั่วไป (Dev/QA Handoff)
- Boundary: UI → hooks/selectors → store → storage adapter (ห้าม I/O ใน component)
- A11y: รองรับคีย์บอร์ดและ aria ที่จำเป็น, คอนทราสต์ระดับ AA
- Performance: ใช้ memoized selectors, debounce persist เมื่อเหมาะสม
- CI (แนะนำ): lint + typecheck + test ก่อน merge/deploy
- Definition of Done รวม: AC ผ่านทั้งหมด + ไม่มี console error + lint/type/test ผ่าน

---

## QA Test Checklist (ขั้นต่ำแนะนำ)
- Storage Adapter:
  - load/save ปกติ, corrupted payload → reset ว่างพร้อมแจ้งเตือน, quota exceeded → แจ้งผู้ใช้
  - Migration stub: ตรวจ `schemaVersion=1` และสำรอง payload ก่อนย้าย (mock)
- Store/Actions:
  - add/update/toggle/remove อัปเดต `updatedAt` และลำดับรายการใหม่อยู่บนสุด
  - persist debounce เรียกบันทึกไม่ถี่เกิน (สามารถ spy/debounce ใน unit)
- Selectors:
  - Matrix สถานะ×แท็ก×ค้นหา×เรียง ครอบคลุม edge cases และมี memoization
- Search (ภาษาไทย):
  - ค้นหา substring ที่มีสระ/วรรณยุกต์ และ normalize ตัวอักษร
- Due Date:
  - แปลง date-only → UTC ถูกต้อง; near‑due (ภายใน 48 ชม.), overdue (< now) พฤติกรรมตรงตามกติกา
- UI/A11y:
  - Inline edit: Enter save, Esc cancel, Tab traversal, focus กลับตำแหน่งเดิม
  - aria-checked และ role ของรายการสำเร็จ
- Delete Safety:
  - ยืนยันลบ: ยืนยัน/ยกเลิก/คีย์บอร์ด; ไม่มีการลบรายการผิดตัว
