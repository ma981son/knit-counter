import { NativeModule, registerWebModule } from 'expo';

import { RowNotificationContent, RowNotificationModuleEvents } from './RowNotification.types';

class RowNotificationModule extends NativeModule<RowNotificationModuleEvents> {
  update(content: RowNotificationContent) {}
  clear() {}
}

export default registerWebModule(RowNotificationModule, 'RowNotificationModule');
