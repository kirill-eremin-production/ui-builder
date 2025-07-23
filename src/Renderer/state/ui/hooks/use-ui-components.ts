import { useCallback, useMemo } from 'react';

import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { UiComponents } from '@/shared/types/UiComponents';

import {
    activeBreakpointIndexAtom,
    breakpointsAtom,
} from '@/Constructor/state/breakpoints';
import { selectedWidgetIdToEditAtom } from '@/Constructor/state/selection';

import { breakpointUiComponentsAtom, uiComponentsAtom } from '../index';

/**
 * Функция для глубокого сравнения двух UI компонентов
 */
const deepCompareComponents = (comp1: any, comp2: any): boolean => {
    if (comp1 === comp2) return true;
    if (!comp1 || !comp2) return false;
    if (typeof comp1 !== typeof comp2) return false;

    if (typeof comp1 === 'object') {
        const keys1 = Object.keys(comp1);
        const keys2 = Object.keys(comp2);

        if (keys1.length !== keys2.length) return false;

        for (const key of keys1) {
            if (!keys2.includes(key)) return false;
            if (!deepCompareComponents(comp1[key], comp2[key])) return false;
        }

        return true;
    }

    return comp1 === comp2;
};

/**
 * Функция для мержинга UI компонентов с наследованием от больших брейкпоинтов к меньшим
 */
const mergeUiComponents = (
    baseComponents: UiComponents,
    breakpointComponents: Record<number, UiComponents>,
    breakpoints: any[],
    activeBreakpointIndex: number | null
): UiComponents => {
    // Если активный брейкпоинт не выбран, возвращаем базовые компоненты
    if (activeBreakpointIndex === null) {
        return baseComponents;
    }

    // Начинаем с базовых компонентов
    let mergedComponents = { ...baseComponents };

    // Если нет брейкпоинтов или активный брейкпоинт не существует, возвращаем базовые компоненты
    if (!breakpoints || !breakpoints[activeBreakpointIndex]) {
        return mergedComponents;
    }

    // Получаем активный брейкпоинт
    const activeBreakpoint = breakpoints[activeBreakpointIndex];

    // Создаем список брейкпоинтов, которые должны применяться к текущему
    // Это все брейкпоинты с maxWidth >= activeBreakpoint.maxWidth, отсортированные по убыванию maxWidth
    const applicableBreakpoints = breakpoints
        .map((bp, index) => ({ ...bp, originalIndex: index }))
        .filter((bp) => bp.maxWidth >= activeBreakpoint.maxWidth)
        .sort((a, b) => b.maxWidth - a.maxWidth);

    // Применяем брейкпоинты от большего к меньшему, включая активный
    for (const bp of applicableBreakpoints) {
        const breakpointUiComponents = breakpointComponents[bp.originalIndex];
        if (breakpointUiComponents) {
            // Проходим по компонентам брейкпоинта
            Object.keys(breakpointUiComponents).forEach((componentId) => {
                const component = breakpointUiComponents[componentId];

                if (component === null) {
                    // Если компонент помечен как удаленный, удаляем его из результата
                    delete mergedComponents[componentId];
                } else {
                    // Иначе добавляем/перезаписываем компонент
                    mergedComponents[componentId] = component;
                }
            });
        }

        // Если дошли до активного брейкпоинта, останавливаемся
        if (bp.originalIndex === activeBreakpointIndex) {
            break;
        }
    }

    return mergedComponents;
};

/**
 * Функция для получения унаследованных компонентов (без учета текущего брейкпоинта)
 */
const getInheritedComponents = (
    baseComponents: UiComponents,
    breakpointComponents: Record<number, UiComponents>,
    breakpoints: any[],
    currentBreakpointIndex: number
): UiComponents => {
    // Начинаем с базовых компонентов
    let inheritedComponents = { ...baseComponents };

    // Если нет брейкпоинтов или текущий брейкпоинт не существует, возвращаем базовые компоненты
    if (!breakpoints || !breakpoints[currentBreakpointIndex]) {
        return inheritedComponents;
    }

    // Получаем текущий брейкпоинт
    const currentBreakpoint = breakpoints[currentBreakpointIndex];

    // Создаем список брейкпоинтов, которые должны применяться к текущему (исключая сам текущий)
    // Это все брейкпоинты с maxWidth > currentBreakpoint.maxWidth, отсортированные по убыванию maxWidth
    const applicableBreakpoints = breakpoints
        .map((bp, index) => ({ ...bp, originalIndex: index }))
        .filter((bp) => bp.maxWidth > currentBreakpoint.maxWidth)
        .sort((a, b) => b.maxWidth - a.maxWidth);

    // Применяем брейкпоинты от большего к меньшему (но не включая текущий)
    for (const bp of applicableBreakpoints) {
        const breakpointUiComponents = breakpointComponents[bp.originalIndex];
        if (breakpointUiComponents) {
            // Проходим по компонентам брейкпоинта
            Object.keys(breakpointUiComponents).forEach((componentId) => {
                const component = breakpointUiComponents[componentId];

                if (component === null) {
                    // Если компонент помечен как удаленный, удаляем его из результата
                    delete inheritedComponents[componentId];
                } else {
                    // Иначе добавляем/перезаписываем компонент
                    inheritedComponents[componentId] = component;
                }
            });
        }
    }

    return inheritedComponents;
};

let i = 0;

export const useUiComponents = () => {
    const [baseUiComponents, setBaseUiComponents] = useAtom(uiComponentsAtom);
    const [breakpointUiComponents, setBreakpointUiComponents] = useAtom(
        breakpointUiComponentsAtom
    );
    const activeBreakpointIndex = useAtomValue(activeBreakpointIndexAtom);
    const breakpoints = useAtomValue(breakpointsAtom);
    const setSelectedWidgetIdToEdit = useSetAtom(selectedWidgetIdToEditAtom);

    // Получаем UI компоненты с правильным мержингом
    const uiComponents = useMemo(
        () =>
            mergeUiComponents(
                baseUiComponents,
                breakpointUiComponents,
                breakpoints,
                activeBreakpointIndex
            ),
        [
            baseUiComponents,
            breakpointUiComponents,
            breakpoints,
            activeBreakpointIndex,
        ]
    );

    // Устанавливаем UI компоненты для текущего активного брейкпоинта
    const setUiComponents = useCallback(
        (
            newComponents: UiComponents | ((prev: UiComponents) => UiComponents)
        ) => {
            if (activeBreakpointIndex === null) {
                // Если активный брейкпоинт не выбран, изменяем базовые компоненты
                setBaseUiComponents(newComponents);
            } else {
                // Если активный брейкпоинт выбран, изменяем только компоненты этого брейкпоинта
                setBreakpointUiComponents((prev) => {
                    i = i + 1;

                    if (i > 10) {
                        // debugger;
                    }

                    const currentMergedComponents = mergeUiComponents(
                        baseUiComponents,
                        prev,
                        breakpoints,
                        activeBreakpointIndex
                    );

                    const updatedComponents =
                        typeof newComponents === 'function'
                            ? newComponents(currentMergedComponents)
                            : newComponents;

                    // Определяем унаследованные компоненты (без учета текущего брейкпоинта)
                    const inheritedComponents = getInheritedComponents(
                        baseUiComponents,
                        prev,
                        breakpoints,
                        activeBreakpointIndex
                    );

                    const breakpointSpecificComponents: UiComponents = {};

                    // Получаем все уникальные ID компонентов из обновленных и унаследованных
                    const allComponentIds = new Set([
                        ...Object.keys(updatedComponents),
                        ...Object.keys(inheritedComponents),
                    ]);

                    // Проходим по всем компонентам
                    allComponentIds.forEach((componentId) => {
                        const updatedComponent = updatedComponents[componentId];
                        const inheritedComponent =
                            inheritedComponents[componentId];

                        if (!updatedComponent) {
                            // Если компонент был удален из updatedComponents, но есть в унаследованных,
                            // добавляем маркер удаления
                            if (inheritedComponent) {
                                breakpointSpecificComponents[componentId] =
                                    null as any;
                            }
                        } else if (!inheritedComponent) {
                            // Если компонент новый (нет в унаследованных), сохраняем его
                            breakpointSpecificComponents[componentId] =
                                updatedComponent;
                        } else {
                            // Если компонент есть и в обновленных, и в унаследованных,
                            // сравниваем их и сохраняем только если они отличаются
                            if (
                                !deepCompareComponents(
                                    updatedComponent,
                                    inheritedComponent
                                )
                            ) {
                                breakpointSpecificComponents[componentId] =
                                    updatedComponent;
                            }
                            // Если компоненты идентичны, не сохраняем в брейкпоинте
                            // (будет использоваться унаследованный)
                        }
                    });

                    console.log(prev);

                    return {
                        ...prev,
                        [activeBreakpointIndex]: breakpointSpecificComponents,
                    };
                });
            }
        },
        [
            activeBreakpointIndex,
            setBaseUiComponents,
            setBreakpointUiComponents,
            baseUiComponents,
            breakpoints,
        ]
    );

    const removeUiComponent = useCallback(
        (componentId: string) => {
            setSelectedWidgetIdToEdit(null);

            if (activeBreakpointIndex === null) {
                // Удаляем из базовых компонентов
                setBaseUiComponents((prevState: UiComponents) => {
                    const newData = { ...prevState };
                    delete newData[componentId];
                    return newData;
                });
            } else {
                // Для брейкпоинта нужно проверить, есть ли компонент в унаследованных
                const inheritedComponents = getInheritedComponents(
                    baseUiComponents,
                    breakpointUiComponents,
                    breakpoints,
                    activeBreakpointIndex
                );

                if (inheritedComponents[componentId]) {
                    // Если компонент унаследован, добавляем запись об его удалении в текущий брейкпоинт
                    // Используем специальное значение null для обозначения удаленного компонента
                    setBreakpointUiComponents((prev) => ({
                        ...prev,
                        [activeBreakpointIndex]: {
                            ...prev[activeBreakpointIndex],
                            [componentId]: null as any, // Маркер удаления
                        },
                    }));
                } else {
                    // Если компонент не унаследован, просто удаляем его из текущего брейкпоинта
                    setBreakpointUiComponents((prev) => {
                        const currentBreakpointComponents = {
                            ...prev[activeBreakpointIndex],
                        };
                        delete currentBreakpointComponents[componentId];
                        return {
                            ...prev,
                            [activeBreakpointIndex]:
                                currentBreakpointComponents,
                        };
                    });
                }
            }
        },
        [
            activeBreakpointIndex,
            setSelectedWidgetIdToEdit,
            setBaseUiComponents,
            setBreakpointUiComponents,
            baseUiComponents,
            breakpointUiComponents,
            breakpoints,
        ]
    );

    return { uiComponents, setUiComponents, removeUiComponent };
};
