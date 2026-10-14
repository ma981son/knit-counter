import { NativeModule, registerWebModule } from 'expo';

import { RowNotificationModuleEvents, RowNotificationState } from './RowNotification.types';

class RowNotificationModule extends NativeModule<RowNotificationModuleEvents> {
  update(
    title: string,
    body: string,
    row: number,
    total: number,
    state: RowNotificationState,
    progressLabel: string,
    vibrate: boolean,
    sound: boolean,
  ) {}
  clear() {}
}

export default registerWebModule(RowNotificationModule, 'RowNotificationModule');
