import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';

import { parsePatternCode } from '@/src/pattern/parse';
import { getRowInfo } from '@/src/pattern/rows';
import { selectOpenPattern, useStore } from '@/src/store/store';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const CHANNEL_ID = 'row-counter';
const CATEGORY_ID = 'rowcounter';
const NOTIFICATION_ID = 'row-counter';
const TASK_NAME = 'ROW_NOTIFICATION_ACTION';

export async function showRowNotification() {
  const pattern = selectOpenPattern(useStore.getState());
  if (!pattern) return;

  const parsed = parsePatternCode(pattern.code).pattern;
  const info = getRowInfo(parsed, pattern.currentRow);
  const text = info.instructions.map((instruction) => instruction.text).join(' · ');

  await Notifications.scheduleNotificationAsync({
    identifier: NOTIFICATION_ID,
    content: {
      title: `${pattern.name} · Row ${pattern.currentRow}`,
      body: text || 'No instruction for this row',
      categoryIdentifier: CATEGORY_ID,
      sticky: true,
      data: { patternId: pattern.id },
    },
    trigger: { channelId: CHANNEL_ID },
  });
}

export async function hideRowNotification() {
  await Notifications.dismissNotificationAsync(NOTIFICATION_ID);
}

export async function handleRowAction(actionId: string) {
  await useStore.persist.rehydrate();
  const state = useStore.getState();
  const pattern = selectOpenPattern(state);
  if (!pattern) return;

  if (actionId === 'next') state.nextRow(pattern.id);
  if (actionId === 'previous') state.previousRow(pattern.id);

  await showRowNotification();
}

TaskManager.defineTask(TASK_NAME, async ({ data, error }) => {
  console.log('NOTIFICATION TASK', JSON.stringify(data), error);
  const payload = data as { actionIdentifier?: string };
  if (payload?.actionIdentifier) {
    await handleRowAction(payload.actionIdentifier);
  }
});

export async function setupRowNotification() {
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
      name: 'Row counter',
      importance: Notifications.AndroidImportance.LOW,
    });
  }

  const { granted } = await Notifications.requestPermissionsAsync();
  console.log('NOTIFICATION permission', granted);
  if (!granted) return false;

  await Notifications.setNotificationCategoryAsync(CATEGORY_ID, [
    { identifier: 'previous', buttonTitle: '−1', options: { opensAppToForeground: false } },
    { identifier: 'next', buttonTitle: '+1', options: { opensAppToForeground: false } },
  ]);

  await Notifications.registerTaskAsync(TASK_NAME);
  return true;
}
