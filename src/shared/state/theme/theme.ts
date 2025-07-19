import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

/**
 * Типы тем приложения
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Функция для определения системной темы
 */
const getSystemTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
};

/**
 * Атом для хранения выбранной пользователем темы
 * Использует localStorage для персистентности состояния
 */
export const themeAtom = atomWithStorage<Theme>('ui-builder-theme', 'system');

/**
 * Атом для получения реальной темы (с учетом системной)
 */
export const resolvedThemeAtom = atom<'light' | 'dark'>((get) => {
    const theme = get(themeAtom);
    if (theme === 'system') {
        return getSystemTheme();
    }
    return theme;
});

/**
 * Атом для переключения темы
 */
export const toggleThemeAtom = atom(null, (get, set) => {
    const currentTheme = get(themeAtom);
    const resolvedTheme = get(resolvedThemeAtom);

    // Переключаем между light и dark, игнорируя system
    const newTheme: 'light' | 'dark' =
        resolvedTheme === 'light' ? 'dark' : 'light';
    set(themeAtom, newTheme);
    return newTheme;
});

/**
 * Атом только для чтения, который возвращает true если реальная тема темная
 */
export const isDarkThemeAtom = atom((get) => get(resolvedThemeAtom) === 'dark');
