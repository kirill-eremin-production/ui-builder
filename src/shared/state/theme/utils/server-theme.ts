import { cookies } from 'next/headers';

import type { Theme } from '../types';

/**
 * Получает тему из cookies на сервере
 */
export async function getServerTheme(): Promise<Theme> {
    const cookieStore = await cookies();

    const theme = cookieStore.get('ui-builder-theme')?.value as
        | Theme
        | undefined;

    if (theme) {
        return theme;
    }

    return 'system';
}

/**
 * Получает класс темы для серверного рендеринга
 */
export async function getServerThemeClass(): Promise<string> {
    const theme = await getServerTheme();
    return `theme_${theme}`;
}
