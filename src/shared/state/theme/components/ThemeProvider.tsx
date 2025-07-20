'use client';

import { useCallback, useEffect } from 'react';

import { useAtomValue, useSetAtom } from 'jotai';

import { __themeId, resolvedThemeAtom, themeAtom } from '../theme';

interface ThemeProviderProps {
    children: React.ReactNode;
}

/**
 * Упрощенный провайдер темы
 * Синхронизирует тему с DOM и cookies
 */
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const theme = useAtomValue(themeAtom);
    const resolvedTheme = useAtomValue(resolvedThemeAtom);
    const __setThemeId = useSetAtom(__themeId);

    const __refreshTheme = useCallback(
        () => __setThemeId((prev) => prev + 1),
        [__setThemeId]
    );

    useEffect(() => {
        if (
            resolvedTheme === 'light' &&
            !document.body.classList.contains('theme_light')
        ) {
            document.body.classList.remove('theme_dark');
            document.body.classList.add(`theme_light`);
        }

        if (
            resolvedTheme === 'dark' &&
            !document.body.classList.contains('theme_dark')
        ) {
            document.body.classList.add('theme_dark');
            document.body.classList.remove('theme_light');
        }
    }, [resolvedTheme]);

    useEffect(() => {
        document.cookie = `ui-builder-theme=${theme}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;

        if (theme === 'system') {
            const mediaQuery = window.matchMedia(
                '(prefers-color-scheme: dark)'
            );

            const handleChange = () => {
                const newSystemTheme = mediaQuery.matches ? 'dark' : 'light';
                document.body.classList.remove('theme_light', 'theme_dark');
                document.body.classList.add(`theme_${newSystemTheme}`);
                __refreshTheme();
            };

            mediaQuery.addEventListener('change', handleChange);
            return () => mediaQuery.removeEventListener('change', handleChange);
        }
    }, [theme, __refreshTheme]);

    return <>{children}</>;
};
