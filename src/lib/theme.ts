export type ThemePreference = 'system' | 'light' | 'dark';
export type Theme = 'light' | 'dark';
export const themeKey = 'kexar-theme';
export function readThemePreference(storage: Pick<Storage, 'getItem'>): ThemePreference {
  try {
    const value = storage.getItem(themeKey);
    return value === 'light' || value === 'dark' ? value : 'system';
  } catch {
    return 'system';
  }
}
export const resolveTheme = (preference: ThemePreference, dark: boolean): Theme =>
  preference === 'system' ? (dark ? 'dark' : 'light') : preference;
