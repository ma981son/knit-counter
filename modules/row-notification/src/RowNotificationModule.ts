import { NativeModule, requireNativeModule } from 'expo';

import { RowNotificationModuleEvents } from './RowNotification.types';

declare class RowNotificationModule extends NativeModule<RowNotificationModuleEvents> {
  hello(): string;
}

export default requireNativeModule<RowNotificationModule>('RowNotification');
