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

    const addNewWidget = useCallback((position?: { x: number; y: number }, canvasWidth?: number) => {
        if (!widgetTypeToAddOnCanvas || selectedWidgetIds.length) {
            return null;
        }

        const newWidgetId = String(new Date().getTime());
        
        // Конвертируем пиксели в проценты для x и width
        const xPercent = canvasWidth && position?.x ? (position.x / canvasWidth) * 100 : 0;
        // Конвертируем пиксели в rem для y и height (1rem = 16px по умолчанию)
        const yRem = position?.y ? position.y / 16 : 0;
        const widthPercent = canvasWidth ? (320 / canvasWidth) * 100 : 40; // 40% по умолчанию
        const heightRem = 160 / 16; // 10rem
        
        setSelectedWidgetIds([newWidgetId]);
        setUiComponents((prevState) => ({
            ...prevState,
            [newWidgetId]: {
                id: newWidgetId,
                type: widgetTypeToAddOnCanvas,
                isMoving: true,
                x: xPercent,
                y: yRem,
                width: widthPercent,
                height: heightRem,
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
        position?: { x: number; y: number },
        canvasWidth?: number
    ) => {
        setUiComponents((prevState) => {
            const widget = prevState[widgetId];
            if (!widget) return prevState;
            
            // Конвертируем пиксели в проценты/rem если передана позиция
            const xPercent = canvasWidth && position?.x !== undefined
                ? (position.x / canvasWidth) * 100
                : widget.x;
            const yRem = position?.y !== undefined
                ? position.y / 16
                : widget.y;
            
            return {
                ...prevState,
                [widgetId]: {
                    ...widget,
                    isMoving: false,
                    x: xPercent,
                    y: yRem,
                },
            };
        });
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