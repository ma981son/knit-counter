import { NativeModule, requireNativeModule } from 'expo';

import { RowNotificationModuleEvents } from './RowNotification.types';

declare class RowNotificationModule extends NativeModule<RowNotificationModuleEvents> {
  update(title: string, body: string, row: number, total: number): void;
  clear(): void;
}

export default requireNativeModule<RowNotificationModule>('RowNotification');
