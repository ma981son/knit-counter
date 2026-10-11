import { useEffect } from 'react';
import { AppState } from 'react-native';
import { hideRowNotification, setupRowNotification, showRowNotification } from './rowNotification';

export function useRowNotification() {
  useEffect(() => {
    let ready = false;
    setupRowNotification().then((granted) => {
      ready = granted;
    });

    const subscription = AppState.addEventListener('change', (state) => {
      if (!ready) return;
      if (state === 'background') showRowNotification();
      if (state === 'active') hideRowNotification();
    });

    return () => subscription.remove();
  }, []);
}
