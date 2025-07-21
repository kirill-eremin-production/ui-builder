import { useCallback } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { 
    selectedWidgetIdsAtom,
    widgetTypeToAddOnCanvasAtom 
} from '@/Constructor/state/selection';
import { uiComponentsAtom } from '@/Renderer/state/ui';

export const useWidgetAdd = () => {
    const [widgetTypeToAddOnCanvas, setWidgetTypeToAddOnCanvas] = useAtom(widgetTypeToAddOnCanvasAtom);
    const [selectedWidgetIds, setSelectedWidgetIds] = useAtom(selectedWidgetIdsAtom);
    const setUiComponents = useSetAtom(uiComponentsAtom);

    const addNewWidget = useCallback((position?: { x: number; y: number }) => {
        if (!widgetTypeToAddOnCanvas || selectedWidgetIds.length) {
            return null;
        }

        const newWidgetId = String(new Date().getTime());
        
        setSelectedWidgetIds([newWidgetId]);
        setUiComponents((prevState) => ({
            ...prevState,
            [newWidgetId]: {
                id: newWidgetId,
                type: widgetTypeToAddOnCanvas,
                isMoving: true,
                x: position?.x || 0,
                y: position?.y || 0,
                width: 320,
                height: 160,
                params: {},
            },
        }));

        return newWidgetId;
    }, [widgetTypeToAddOnCanvas, selectedWidgetIds, setSelectedWidgetIds, setUiComponents]);

    const removeWidget = useCallback((widgetId: string) => {
        setUiComponents((prevState) => {
            const newState = { ...prevState };
            delete newState[widgetId];
            return newState;
        });
        setSelectedWidgetIds([]);
    }, [setUiComponents, setSelectedWidgetIds]);

    const finalizeWidgetPlacement = useCallback((
        widgetId: string, 
        position?: { x: number; y: number }
    ) => {
        setUiComponents((prevState) => ({
            ...prevState,
            [widgetId]: {
                ...prevState[widgetId],
                isMoving: false,
                x: position?.x || prevState[widgetId].x,
                y: position?.y || prevState[widgetId].y,
            },
        }));
        setSelectedWidgetIds([]);
        setWidgetTypeToAddOnCanvas(null);
    }, [setUiComponents, setSelectedWidgetIds, setWidgetTypeToAddOnCanvas]);

    const clearWidgetToAdd = useCallback(() => {
        setWidgetTypeToAddOnCanvas(null);
    }, [setWidgetTypeToAddOnCanvas]);

    return {
        widgetTypeToAddOnCanvas,
        selectedWidgetIds,
        addNewWidget,
        removeWidget,
        finalizeWidgetPlacement,
        clearWidgetToAdd
    };
};