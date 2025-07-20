// Основные типы и атомы
export {
    themeAtom,
    resolvedThemeAtom,
    type Theme,
} from './theme';

// Единственный хук для работы с темой
export { useTheme } from './hooks/useTheme';

// Компонент провайдера
export { ThemeProvider } from './components/ThemeProvider';

// Серверные утилиты
export { getServerTheme, getServerThemeClass } from './utils/server-theme';
