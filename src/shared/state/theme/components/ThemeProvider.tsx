'use client';

import { useEffect } from 'react';

import { useAtomValue } from 'jotai';

import { resolvedThemeAtom, themeAtom } from '../theme';

interface ThemeProviderProps {
    children: React.ReactNode;
}

/**
 * Компонент для применения темы к body элементу
 * Должен использоваться внутри Jotai Provider
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const theme = useAtomValue(themeAtom);
    const resolvedTheme = useAtomValue(resolvedThemeAtom);

    useEffect(() => {
        // Удаляем все классы тем
        document.body.classList.remove('theme_light', 'theme_dark');
        // Добавляем класс реальной темы
        document.body.classList.add(`theme_${resolvedTheme}`);
    }, [resolvedTheme]);

    useEffect(() => {
        // Если выбрана системная тема, отслеживаем изменения системных настроек
        if (theme === 'system') {
            const mediaQuery = window.matchMedia(
                '(prefers-color-scheme: dark)'
            );

            const handleChange = () => {
                // Принудительно обновляем resolvedTheme при изменении системной темы
                const newSystemTheme = mediaQuery.matches ? 'dark' : 'light';
                document.body.classList.remove('theme_light', 'theme_dark');
                document.body.classList.add(`theme_${newSystemTheme}`);
            };

            // Добавляем слушатель изменений
            mediaQuery.addEventListener('change', handleChange);

            // Очищаем слушатель при размонтировании или изменении темы
            return () => {
                mediaQuery.removeEventListener('change', handleChange);
            };
        }
    }, [theme]);

    return <>{children}</>;
};
