import { RequestsAPI } from './RequestsAPI';
import { UiComponents } from './UiComponents';

// Частичная конфигурация для брейкпоинта (может переопределять только часть настроек)
export type PartialBreakpointConfig = {
    width?: number;
    minHeight?: number;
    unitSize?: number;
    ui?: UiComponents;
};

// Полная конфигурация для брейкпоинта
export type BreakpointConfig = {
    width: number;
    minHeight: number;
    unitSize: number;
    ui: UiComponents;
};

// Определение брейкпоинта
export type Breakpoint = {
    // Максимальная ширина экрана для применения этого брейкпоинта
    maxWidth: number;
    // Название брейкпоинта (например: mobile, tablet, desktop)
    name: string;
    // Частичная конфигурация для этого брейкпоинта (наследует от больших разрешений)
    config: PartialBreakpointConfig;
};

export type PageConfig = {
    id?: string;
    name: string;
    
    // Базовая конфигурация (для самого большого разрешения)
    baseConfig: BreakpointConfig;
    
    // Брейкпоинты (опционально)
    // Отсортированы по maxWidth от большего к меньшему
    breakpoints?: Breakpoint[];
    
    // Запросы API общие для всех брейкпоинтов
    requests: RequestsAPI;
};

// Функция для слияния конфигураций (наследование)
function mergeConfigs(
    base: BreakpointConfig,
    partial: PartialBreakpointConfig
): BreakpointConfig {
    return {
        width: partial.width ?? base.width,
        minHeight: partial.minHeight ?? base.minHeight,
        unitSize: partial.unitSize ?? base.unitSize,
        ui: partial.ui ?? base.ui,
    };
}

// Функция для получения конфига под конкретную ширину экрана
export function getConfigForWidth(
    pageConfig: PageConfig,
    screenWidth: number
): BreakpointConfig {
    // Начинаем с базового конфига
    let currentConfig = pageConfig.baseConfig;
    
    // Если нет брейкпоинтов, возвращаем базовый конфиг
    if (!pageConfig.breakpoints || pageConfig.breakpoints.length === 0) {
        return currentConfig;
    }

    // Применяем брейкпоинты от большего к меньшему, накапливая изменения
    const sortedBreakpoints = [...pageConfig.breakpoints].sort(
        (a, b) => b.maxWidth - a.maxWidth
    );

    for (const breakpoint of sortedBreakpoints) {
        // Применяем конфиг брейкпоинта, если ширина экрана меньше или равна maxWidth
        if (screenWidth <= breakpoint.maxWidth) {
            currentConfig = mergeConfigs(currentConfig, breakpoint.config);
        }
    }

    return currentConfig;
}
