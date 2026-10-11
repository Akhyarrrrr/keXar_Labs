import { useSyncExternalStore } from 'react';
import type { Theme } from '@/lib/theme';
const subscribe = (listener: () => void) => {
  window.addEventListener('kexar:theme', listener);
  return () => window.removeEventListener('kexar:theme', listener);
};
export function useStudioTheme(): Theme {
  return useSyncExternalStore(
    subscribe,
    () => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'),
    () => 'light',
  );
}
