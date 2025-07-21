import { useCallback } from 'react';
import { useAtom } from 'jotai';
import { widgetResizeDataAtom } from '@/Constructor/state/selection';
import { uiComponentsAtom } from '@/Renderer/state/ui';
import { Direction } from '@/shared/types/Direction';

type WidgetResizeData = {
    widgetId: string;
    direction: Direction;
    initialMousePosition: { x: number; y: number };
    initialWidth: number;
    initialHeight: number;
    initialX: number;
    initialY: number;
};

interface ResizeCalculationParams {
    widgetResizeData: WidgetResizeData;
    currentMousePosition: { x: number; y: number };
    pageUnitSize: number;
    minWidth: number;
    minHeight: number;
}

export const useWidgetResize = () => {
    const [widgetResizeData] = useAtom(widgetResizeDataAtom);
    const [, setUiComponents] = useAtom(uiComponentsAtom);

    const calculateNewDimensions = useCallback(({
        widgetResizeData,
        currentMousePosition,
        pageUnitSize,
        minWidth,
        minHeight
    }: ResizeCalculationParams) => {
        let dx = currentMousePosition.x - widgetResizeData.initialMousePosition.x;
        let dy = currentMousePosition.y - widgetResizeData.initialMousePosition.y;

        dx = Math.round(dx / pageUnitSize) * pageUnitSize;
        dy = Math.round(dy / pageUnitSize) * pageUnitSize;

        let newWidgetWidth = widgetResizeData.initialWidth;
        let newWidgetX = widgetResizeData.initialX;
        let newWidgetHeight = widgetResizeData.initialHeight;
        let newWidgetY = widgetResizeData.initialY;

        // Обработка изменения размера сверху
        if (
            widgetResizeData.direction === 'top' ||
            widgetResizeData.direction === 'top-right' ||
            widgetResizeData.direction === 'left-top'
        ) {
            newWidgetHeight = newWidgetHeight - dy;
            newWidgetY = newWidgetY + dy;
            if (newWidgetHeight <= minHeight) {
                newWidgetY = widgetResizeData.initialY + widgetResizeData.initialHeight - minHeight;
            }
        }

        // Обработка изменения размера снизу
        if (
            widgetResizeData.direction === 'bottom' ||
            widgetResizeData.direction === 'bottom-left' ||
            widgetResizeData.direction === 'right-bottom'
        ) {
            newWidgetHeight = newWidgetHeight + dy;
        }

        // Обработка изменения размера справа
        if (
            widgetResizeData.direction === 'right' ||
            widgetResizeData.direction === 'right-bottom' ||
            widgetResizeData.direction === 'top-right'
        ) {
            newWidgetWidth = newWidgetWidth + dx;
        }

        // Обработка изменения размера слева
        if (
            widgetResizeData.direction === 'left' ||
            widgetResizeData.direction === 'left-top' ||
            widgetResizeData.direction === 'bottom-left'
        ) {
            newWidgetX = newWidgetX + dx;
            newWidgetWidth = newWidgetWidth - dx;
            if (newWidgetWidth <= minWidth) {
                newWidgetX = widgetResizeData.initialX + widgetResizeData.initialWidth - minWidth;
            }
        }

        return {
            width: newWidgetWidth <= minWidth ? minWidth : newWidgetWidth,
            height: newWidgetHeight <= minHeight ? minHeight : newWidgetHeight,
            x: newWidgetX < 0 ? 0 : newWidgetX,
            y: newWidgetY < 0 ? 0 : newWidgetY,
        };
    }, []);

    const handleResize = useCallback((
        event: React.MouseEvent<HTMLDivElement>,
        pageUnitSize: number,
        minWidth: number = 8,
        minHeight: number = 8
    ) => {
        if (!widgetResizeData) return false;

        const currentMousePosition = { x: event.clientX, y: event.clientY };
        const newDimensions = calculateNewDimensions({
            widgetResizeData,
            currentMousePosition,
            pageUnitSize,
            minWidth,
            minHeight
        });

        setUiComponents((prevState) => ({
            ...prevState,
            [widgetResizeData.widgetId]: {
                ...prevState[widgetResizeData.widgetId],
                ...newDimensions
            },
        }));

        return true;
    }, [widgetResizeData, calculateNewDimensions, setUiComponents]);

    return {
        widgetResizeData,
        handleResize
    };
};