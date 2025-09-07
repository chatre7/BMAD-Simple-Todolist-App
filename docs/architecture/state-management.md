# State Management

แนวทางการจัดการสถานะเพื่อรองรับ filter/search/sort และ I/O แยกชั้นชัดเจน

## Store Slices
- todos: ข้อมูลงานและ actions (add/update/toggle/delete)
- filters: คำค้น, สถานะ (all/pending/done), tag ที่เลือก, sort key
- ui: สถานะ UI เช่น modal/inline edit

## Selectors
- visibleTodos: filter + search + sort จาก todos และ filters
- stats: จำนวนทั้งหมด/ค้าง/เสร็จ, สำหรับ badge/summary

## Side Effects
- โหลด/บันทึกผ่าน storage adapter ใน action layer เท่านั้น (ไม่วางใน component)
- debounce การบันทึก (ถ้าจำเป็น) เพื่อลด I/O

## Libraries
- เริ่มด้วย Zustand (เบา/ทดสอบง่าย) หรือ Context + Reducer ตามทีมถนัด

