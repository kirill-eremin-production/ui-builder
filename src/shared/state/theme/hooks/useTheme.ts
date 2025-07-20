'use client';

import { useMemo } from 'react';

import { useAtom, useAtomValue } from 'jotai';

import { resolvedThemeAtom, themeAtom } from '../theme';

/**
 * Единственный хук для работы с темой приложения
 * Включает в себя всю необходимую логику и синхронизацию
 */
export const useTheme = () => {
    const [theme, setTheme] = useAtom(themeAtom);
    const resolvedTheme = useAtomValue(resolvedThemeAtom);

    const isLight = resolvedTheme === 'light';
    const isDark = resolvedTheme === 'dark';
    const isSystem = theme === 'system';

    return useMemo(
        () => ({ isLight, isDark, isSystem, setTheme }),
        [isLight, isDark, isSystem, setTheme]
    );
};
