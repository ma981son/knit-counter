import { NativeModule, requireNativeModule } from 'expo';

import { RowNotificationModuleEvents, RowNotificationState } from './RowNotification.types';

declare class RowNotificationModule extends NativeModule<RowNotificationModuleEvents> {
  update(
    title: string,
    body: string,
    row: number,
    total: number,
    state: RowNotificationState,
    progressLabel: string,
  ): void;
  clear(): void;
}

export default requireNativeModule<RowNotificationModule>('RowNotification');
