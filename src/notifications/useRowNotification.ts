import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

import RowNotification from '@/modules/row-notification/src/RowNotificationModule';
import { selectOpenPattern, useStore } from '@/src/store/store';
import { getRowNotificationContent } from './rowNotification';

export function useRowNotification() {
  useEffect(() => {
    if (Platform.OS !== 'android') return;

    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

    const sync = () => {
      const pattern = selectOpenPattern(useStore.getState());
      if (!pattern) {
        RowNotification.clear();
        return;
      }
      const { title, body, row, total, state } = getRowNotificationContent(pattern);
      RowNotification.update(title, body, row, total, state);
    };

    sync();
    const unsubscribe = useStore.subscribe(sync);

    const actionSubscription = RowNotification.addListener('onAction', ({ action }) => {
      const state = useStore.getState();
      const pattern = selectOpenPattern(state);
      if (!pattern) return;
      if (action === 'next') state.nextRow(pattern.id);
      if (action === 'previous') state.previousRow(pattern.id);
    });

    return () => {
      unsubscribe();
      actionSubscription.remove();
    };
  }, []);
}
