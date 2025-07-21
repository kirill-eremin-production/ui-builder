import { atom } from 'jotai';

import { Breakpoint } from '@/shared/types/PageConfig';

// Атом для хранения брейкпоинтов текущей страницы
export const breakpointsAtom = atom<Breakpoint[]>([]);

// Атом для отслеживания активного брейкпоинта (null = базовая конфигурация)
export const activeBreakpointIndexAtom = atom<number | null>(null);

// Предустановленные брейкпоинты для быстрого добавления
export const presetBreakpoints = [
    { name: 'Mobile', maxWidth: 480 },
    { name: 'Tablet', maxWidth: 768 },
    { name: 'Desktop', maxWidth: 1024 },
    { name: 'Wide', maxWidth: 1440 },
];