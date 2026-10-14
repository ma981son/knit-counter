import { NativeModule, requireNativeModule } from 'expo';

import { RowNotificationContent, RowNotificationModuleEvents } from './RowNotification.types';

declare class RowNotificationModule extends NativeModule<RowNotificationModuleEvents> {
  update(content: RowNotificationContent): void;
  clear(): void;
}

export default requireNativeModule<RowNotificationModule>('RowNotification');
