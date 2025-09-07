import { useFiltersStore } from '../store/filters.store';

export function FilterBar() {
  const status = useFiltersStore((s) => s.status);
  const setStatus = useFiltersStore((s) => s.setStatus);
  const search = useFiltersStore((s) => s.search);
  const setSearch = useFiltersStore((s) => s.setSearch);
  const tag = useFiltersStore((s) => s.tag);
  const setTag = useFiltersStore((s) => s.setTag);
  const sortKey = useFiltersStore((s) => s.sortKey);
  const setSortKey = useFiltersStore((s) => s.setSortKey);

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <select
        aria-label="กรองสถานะ"
        value={status}
        onChange={(e) => setStatus(e.target.value as any)}
        className="rounded border border-gray-300 bg-white px-2 py-1"
      >
        <option value="all">ทั้งหมด</option>
        <option value="pending">ที่ค้าง</option>
        <option value="done">เสร็จแล้ว</option>
      </select>

      <input
        aria-label="ค้นหา"
        className="flex-1 min-w-[160px] rounded border border-gray-300 bg-white px-2 py-1"
        placeholder="ค้นหาชื่อ/รายละเอียด"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        aria-label="การเรียงลำดับ"
        value={sortKey}
        onChange={(e) => setSortKey(e.target.value as any)}
        className="rounded border border-gray-300 bg-white px-2 py-1"
      >
        <option value="createdAt">ล่าสุดก่อน</option>
        <option value="dueDate">ครบกำหนด</option>
        <option value="status">สถานะ</option>
      </select>

      {tag && (
        <span className="inline-flex items-center gap-2 rounded bg-blue-50 px-2 py-1 text-sm text-blue-700">
          แท็ก: {tag}
          <button className="text-blue-700 underline" onClick={() => setTag(null)} aria-label="ล้างแท็ก">ล้าง</button>
        </span>
      )}
    </div>
  );
}

