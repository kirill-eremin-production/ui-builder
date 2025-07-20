import { atom } from 'jotai';

import { Theme } from './types';
import { mapSystemTheme } from './utils/map-system-theme';

export const themeAtom = atom<Theme>('system');

// Атом-триггер для принудительного обновления темы
export const __themeId = atom(0);

export const resolvedThemeAtom = atom<Theme>((get) => {
    const theme = get(themeAtom);
    // Подписываемся на триггер для принудительного обновления
    get(__themeId);

    if (theme === 'system') {
        return mapSystemTheme();
    }

    return theme;
});
