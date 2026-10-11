import { NativeModule, registerWebModule } from 'expo';

import { RowNotificationModuleEvents } from './RowNotification.types';

class RowNotificationModule extends NativeModule<RowNotificationModuleEvents> {
  update(title: string, body: string) {}
  clear() {}
}

export default registerWebModule(RowNotificationModule, 'RowNotificationModule');
