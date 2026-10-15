import { NativeModule, requireOptionalNativeModule } from 'expo';

export type AppIconName = 'Rosadito' | 'RosaditoLight' | 'Jarrito' | 'JarritoLight';

declare class AppIconModule extends NativeModule {
  getIcon(): AppIconName | null;
  setIcon(icon: AppIconName): void;
}

export default requireOptionalNativeModule<AppIconModule>('AppIcon');
