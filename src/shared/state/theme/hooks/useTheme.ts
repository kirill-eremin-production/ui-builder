import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import {
    type Theme,
    isDarkThemeAtom,
    resolvedThemeAtom,
    themeAtom,
    toggleThemeAtom,
} from '../theme';

/**
 * Хук для работы с темой приложения
 * Возвращает выбранную пользователем тему и реальную тему
 */
export const useTheme = () => {
    const [theme, setTheme] = useAtom(themeAtom);
    const resolvedTheme = useAtomValue(resolvedThemeAtom);
    const toggleTheme = useSetAtom(toggleThemeAtom);
    const isDark = useAtomValue(isDarkThemeAtom);

    return {
        theme, // выбранная пользователем тема ('light' | 'dark' | 'system')
        resolvedTheme, // реальная тема ('light' | 'dark')
        setTheme,
        toggleTheme,
        isDark,
        isLight: !isDark,
    };
};

/**
 * Хук только для чтения выбранной пользователем темы
 */
export const useThemeValue = (): Theme => {
    return useAtomValue(themeAtom);
};

/**
 * Хук только для чтения реальной темы (с учетом системной)
 */
export const useResolvedTheme = (): 'light' | 'dark' => {
    return useAtomValue(resolvedThemeAtom);
};

/**
 * Хук для проверки, является ли реальная тема темной
 */
export const useIsDarkTheme = (): boolean => {
    return useAtomValue(isDarkThemeAtom);
};

/**
 * Хук для получения функции переключения темы
 */
export const useToggleTheme = () => {
    return useSetAtom(toggleThemeAtom);
};
