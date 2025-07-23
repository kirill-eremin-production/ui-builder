import { atom } from 'jotai';

import { Breakpoint } from '@/shared/types/PageConfig';

import {
    pageMinHeightAtom,
    pageWidthAtom,
} from '@/Constructor/state/page-config';

// Атом для хранения брейкпоинтов текущей страницы
export const breakpointsAtom = atom<Breakpoint[]>([]);

// Атом для отслеживания активного брейкпоинта (null = базовая конфигурация)
export const activeBreakpointIndexAtom = atom<number | null>(null);

// Производный атом для получения эффективной ширины с учетом активного брейкпоинта
export const effectivePageWidthAtom = atom((get) => {
    const baseWidth = get(pageWidthAtom);
    const breakpoints = get(breakpointsAtom);
    const activeBreakpointIndex = get(activeBreakpointIndexAtom);

    // Если активный брейкпоинт не выбран, возвращаем базовую ширину
    if (activeBreakpointIndex === null || !breakpoints[activeBreakpointIndex]) {
        return baseWidth;
    }

    // Получаем активный брейкпоинт
    const activeBreakpoint = breakpoints[activeBreakpointIndex];

    // Возвращаем ширину из конфига брейкпоинта или базовую ширину
    return activeBreakpoint.maxWidth ?? baseWidth;
});

// Производный атом для получения эффективной минимальной высоты с учетом активного брейкпоинта
export const effectivePageMinHeightAtom = atom((get) => {
    const baseMinHeight = get(pageMinHeightAtom);
    const breakpoints = get(breakpointsAtom);
    const activeBreakpointIndex = get(activeBreakpointIndexAtom);

    // Если активный брейкпоинт не выбран, возвращаем базовую минимальную высоту
    if (activeBreakpointIndex === null || !breakpoints[activeBreakpointIndex]) {
        return baseMinHeight;
    }

    // Получаем активный брейкпоинт
    const activeBreakpoint = breakpoints[activeBreakpointIndex];

    // Возвращаем минимальную высоту из конфига брейкпоинта или базовую минимальную высоту
    return activeBreakpoint.config.minHeight ?? baseMinHeight;
});

// Производный атом для получения ширины экрана, которую нужно передать в getConfigForWidth
// Это позволяет PageCanvas правильно определить активный брейкпоинт в режиме конструктора
export const effectiveScreenWidthAtom = atom((get) => {
    const breakpoints = get(breakpointsAtom);
    const activeBreakpointIndex = get(activeBreakpointIndexAtom);

    // Если активный брейкпоинт не выбран, возвращаем большую ширину (больше всех брейкпоинтов)
    if (activeBreakpointIndex === null) {
        return 9999; // Большое значение, чтобы getConfigForWidth вернул базовый конфиг
    }

    // Если брейкпоинт выбран, возвращаем его maxWidth
    const activeBreakpoint = breakpoints[activeBreakpointIndex];
    return activeBreakpoint ? activeBreakpoint.maxWidth : 9999;
});

// Предустановленные брейкпоинты для быстрого добавления
export const presetBreakpoints = [
    { name: 'Mobile', maxWidth: 480 },
    { name: 'Tablet', maxWidth: 768 },
    { name: 'Desktop', maxWidth: 1024 },
    { name: 'Wide', maxWidth: 1440 },
];
