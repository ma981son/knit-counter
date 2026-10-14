import type { TFunction } from 'i18next';

import { formatRows } from './rows';
import type { PatternWarning } from './types';

export function warningText(warning: PatternWarning, t: TFunction): string {
  switch (warning.type) {
    case 'skippedLine':
      return t('warnings.skippedLine', { line: warning.line, text: warning.text });
    case 'invalidRows':
      return t('warnings.invalidRows', { line: warning.line, part: warning.part });
    case 'rowsAfterEnd':
      return t('warnings.rowsAfterEnd', {
        endRow: warning.endRow,
        highestRow: warning.highestRow,
      });
    case 'noRows':
      return t('warnings.noRows');
    case 'gaps':
      return t('warnings.gaps', { count: warning.rows.length, rows: formatRows(warning.rows) });
    case 'overlaps':
      return t('warnings.overlaps', { count: warning.rows.length, rows: formatRows(warning.rows) });
    case 'negativeStitches':
      return t('warnings.negativeStitches', { row: warning.row, count: warning.count });
  }
}
