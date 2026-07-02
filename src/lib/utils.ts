export function dayMonth(date: Date): { day: string; month: string } {
  return {
    day: String(date.getUTCDate()).padStart(2, '0'),
    month: date.toLocaleDateString('en-GB', { month: 'short', timeZone: 'UTC' }).toUpperCase(),
  };
}

export const wingBadge: Record<string, { label: string; cls: string }> = {
  both: { label: 'BOTH · दोनों', cls: 'badge badge-both' },
  english: { label: 'ENGLISH', cls: 'badge badge-english' },
  hindi: { label: 'हिंदी', cls: 'badge badge-hindi' },
};
