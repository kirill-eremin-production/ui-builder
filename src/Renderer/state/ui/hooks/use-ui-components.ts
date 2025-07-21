import { useCallback } from 'react';

import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import { UiComponents } from '@/shared/types/UiComponents';

import { activeBreakpointIndexAtom } from '@/Constructor/state/breakpoints';
import { selectedWidgetIdToEditAtom } from '@/Constructor/state/selection';

import { breakpointUiComponentsAtom, uiComponentsAtom } from '../index';

export const useUiComponents = () => {
    const [baseUiComponents, setBaseUiComponents] = useAtom(uiComponentsAtom);
    const [breakpointUiComponents, setBreakpointUiComponents] = useAtom(
        breakpointUiComponentsAtom
    );
    const activeBreakpointIndex = useAtomValue(activeBreakpointIndexAtom);
    const setSelectedWidgetIdToEdit = useSetAtom(selectedWidgetIdToEditAtom);

    // Получаем UI компоненты для текущего активного брейкпоинта
    const uiComponents =
        activeBreakpointIndex === null
            ? baseUiComponents
            : breakpointUiComponents[activeBreakpointIndex] || {};

    // Устанавливаем UI компоненты для текущего активного брейкпоинта
    const setUiComponents = useCallback(
        (newComponents: UiComponents | ((prev: UiComponents) => UiComponents)) => {
            if (activeBreakpointIndex === null) {
                setBaseUiComponents(newComponents);
            } else {
                setBreakpointUiComponents((prev) => ({
                    ...prev,
                    [activeBreakpointIndex]:
                        typeof newComponents === 'function'
                            ? newComponents(prev[activeBreakpointIndex] || {})
                            : newComponents,
                }));
            }
        },
        [activeBreakpointIndex, setBaseUiComponents, setBreakpointUiComponents]
    );

    const removeUiComponent = useCallback(
        (componentId: string) => {
            setSelectedWidgetIdToEdit(null);
            setUiComponents((prevState: UiComponents) => {
                const newData = { ...prevState };
                delete newData[componentId];
                return newData;
            });
        },
        [setUiComponents, setSelectedWidgetIdToEdit]
    );

    return { uiComponents, setUiComponents, removeUiComponent };
};
