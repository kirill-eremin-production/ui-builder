import { Theme } from '../types';
import { getServerTheme } from '../utils/server-theme';

/**
 * Серверный хук для получения темы из cookies
 * Используется для предотвращения ошибок гидратации
 */
export async function useServerTheme(): Promise<{
  isDark: boolean;
  isLight: boolean;
  theme: Theme;
}> {
  const theme = await getServerTheme();
  
  // Если тема system, то на сервере всегда используем light
  // чтобы избежать ошибок гидратации
  const resolvedTheme = theme === 'system' ? 'light' : theme;
  
  return {
    isDark: resolvedTheme === 'dark',
    isLight: resolvedTheme === 'light',
    theme: resolvedTheme,
  };
}