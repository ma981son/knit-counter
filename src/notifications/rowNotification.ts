import { RowNotificationState } from '@/modules/row-notification/src/RowNotification.types';
import { parsePatternCode } from '@/src/pattern/parse';
import { getRowInfo } from '@/src/pattern/rows';
import { Pattern } from '@/src/store/types';

export function getRowNotificationContent(pattern: Pattern) {
  const parsed = parsePatternCode(pattern.code).pattern;
  const row = pattern.currentRow;
  const total = parsed.totalRows;
  const isFinished = total > 0 && row > total;
  const info = getRowInfo(parsed, row);
  const text = info.instructions.map((instruction) => instruction.text).join(' · ');

  let state: RowNotificationState = 'normal';
  if (isFinished) state = 'finished';
  else if (info.isLastRow) state = 'last';
  else if (info.highlight) state = 'highlight';

  return {
    title: isFinished ? `${pattern.name} · Finished` : `${pattern.name} · Row ${row}`,
    body: isFinished ? `All ${total} rows done` : text || 'No instruction for this row',
    row,
    total,
    state,
  };
}

export type NotificationContent = ReturnType<typeof getRowNotificationContent>;
