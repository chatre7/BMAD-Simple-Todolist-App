export function toIsoUtc(date: Date): string {
  return date.toISOString();
}

export function dateOnlyToUtcIso(dateOnly: string): string {
  // dateOnly format: YYYY-MM-DD (from <input type="date">)
  const [y, m, d] = dateOnly.split('-').map((v) => parseInt(v, 10));
  const local = new Date(y, (m || 1) - 1, d || 1, 0, 0, 0);
  return local.toISOString();
}

export function isOverdue(iso?: string): boolean {
  if (!iso) return false;
  const due = new Date(iso).getTime();
  const now = Date.now();
  return due < now;
}

export function isNearDue(iso?: string, windowMs = 48 * 3600 * 1000): boolean {
  if (!iso) return false;
  const due = new Date(iso).getTime();
  const now = Date.now();
  return due >= now && due - now <= windowMs;
}

