# Quality & Accessibility

## Performance Targets
- LCP ≤ 2.5s, INP ≤ 200ms, CLS ≤ 0.1 บนอุปกรณ์เป้าหมาย
- Lazy compute สำหรับ filter/search ถ้าจำเป็น, memoization ผ่าน selectors

## Accessibility
- รองรับคีย์บอร์ดเต็มรูปแบบ (focus/aria)
- คอนทราสต์ตาม WCAG AA ขึ้นไป, ภาษาไทยอ่านง่าย

## Testing Strategy
- Unit: selectors/utils, storage adapter
- Component: flows เพิ่ม→แก้ไข→ทำเสร็จ→ลบ, กรอง/ค้นหา
- E2E (ภายหลัง): smoke critical paths

