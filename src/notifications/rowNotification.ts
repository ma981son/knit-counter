import { RowNotificationState } from '@/modules/row-notification/src/RowNotification.types';
import i18n from '@/src/i18n';
import { parsePatternCode } from '@/src/pattern/parse';
import { getRowInfo } from '@/src/pattern/rows';
import { Pattern } from '@/src/store/types';

export function getRowNotificationContent(pattern: Pattern) {
  const { t } = i18n;
  const parsed = parsePatternCode(pattern.code).pattern;
  const row = pattern.currentRow;
  const total = parsed.totalRows;
  const isFinished = total > 0 && row > total;
  const info = getRowInfo(parsed, row);
  const joined = info.instructions.map((instruction) => instruction.text).join(' · ');
  const text = joined || (info.isLastRow ? t('counter.lastRow') : t('counter.noInstruction'));

  let state: RowNotificationState = 'normal';
  if (isFinished) state = 'finished';
  else if (info.isLastRow) state = 'last';
  else if (info.highlight) state = 'highlight';

  return {
    title: isFinished
      ? t('notification.finishedTitle', { name: pattern.name })
      : t('notification.title', { row, name: pattern.name }),
    body: isFinished ? t('notification.allDone', { count: total }) : text,
    row,
    total,
    state,
    progressLabel: isFinished
      ? t('counter.finished', { count: total })
      : t('project.progressRowOf', { row, total }),
  };
}
