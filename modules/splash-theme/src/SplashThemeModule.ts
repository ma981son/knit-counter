import { NativeModule, requireOptionalNativeModule } from 'expo';

declare class SplashThemeModule extends NativeModule {
  setTheme(name: string | null): boolean;
}

export default requireOptionalNativeModule<SplashThemeModule>('SplashTheme');
