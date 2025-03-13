import { useCallback } from 'react';

import { useAtom, useSetAtom } from 'jotai';

import { selectedWidgetIdToEditAtom } from '@/Constructor/state/selection';

import { uiComponentsAtom } from '../index';

export const useUiComponents = () => {
    const [uiComponents, setUiComponents] = useAtom(uiComponentsAtom);
    const setSelectedWidgetIdToEdit = useSetAtom(selectedWidgetIdToEditAtom);

    const removeUiComponent = useCallback(
        (componentId: string) => {
            setSelectedWidgetIdToEdit(null);
            setUiComponents((prevState) => {
                const newData = { ...prevState };
                delete newData[componentId];
                return newData;
            });
        },
        [setUiComponents, setSelectedWidgetIdToEdit]
    );

    return { uiComponents, setUiComponents, removeUiComponent };
};
