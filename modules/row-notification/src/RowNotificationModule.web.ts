import { registerWebModule, NativeModule } from 'expo';

import { RowNotificationModuleEvents } from './RowNotification.types';

class RowNotificationModule extends NativeModule<RowNotificationModuleEvents> {
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(RowNotificationModule, 'RowNotificationModule');
