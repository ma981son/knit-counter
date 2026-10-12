import { parsePatternCode } from '@/src/pattern/parse';
import { getRowInfo } from '@/src/pattern/rows';
import { Pattern } from '@/src/store/types';

export function getRowNotificationContent(pattern: Pattern) {
  const parsed = parsePatternCode(pattern.code).pattern;
  const info = getRowInfo(parsed, pattern.currentRow);
  const text = info.instructions.map((instruction) => instruction.text).join(' · ');

  return {
    title: `${pattern.name} · Row ${pattern.currentRow}`,
    body: text || 'No instruction for this row',
  };
}
