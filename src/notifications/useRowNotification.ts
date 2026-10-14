import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';

import RowNotification from '@/modules/row-notification/src/RowNotificationModule';
import i18n from '@/src/i18n';
import { selectOpenPattern, useStore } from '@/src/store/store';
import { getNotificationColors, getRowNotificationContent } from './rowNotification';

export function useRowNotification() {
  useEffect(() => {
    if (Platform.OS !== 'android') return;

    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

    const sync = () => {
      const store = useStore.getState();
      const pattern = selectOpenPattern(store);
      if (!pattern || !store.settings.notification) {
        RowNotification.clear();
        return;
      }
      const content = getRowNotificationContent(pattern);
      RowNotification.update({
        ...content,
        vibrate: store.settings.vibration,
        sound: store.settings.notificationSound,
        colors: getNotificationColors(store.settings.palette, content.state),
      });
    };

    sync();
    const unsubscribe = useStore.subscribe(sync);
    i18n.on('languageChanged', sync);

    const actionSubscription = RowNotification.addListener('onAction', ({ action }) => {
      const state = useStore.getState();
      const pattern = selectOpenPattern(state);
      if (!pattern) return;
      if (action === 'next') state.nextRow(pattern.id);
      if (action === 'previous') state.previousRow(pattern.id);
    });

    return () => {
      unsubscribe();
      i18n.off('languageChanged', sync);
      actionSubscription.remove();
    };
  }, []);
}
