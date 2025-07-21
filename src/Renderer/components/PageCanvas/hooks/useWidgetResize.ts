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
    canvasWidth: number;
}

export const useWidgetResize = () => {
    const [widgetResizeData] = useAtom(widgetResizeDataAtom);
    const [, setUiComponents] = useAtom(uiComponentsAtom);

    const calculateNewDimensions = useCallback(({
        widgetResizeData,
        currentMousePosition,
        pageUnitSize,
        minWidth,
        minHeight,
        canvasWidth
    }: ResizeCalculationParams) => {
        let dx = currentMousePosition.x - widgetResizeData.initialMousePosition.x;
        let dy = currentMousePosition.y - widgetResizeData.initialMousePosition.y;

        dx = Math.round(dx / pageUnitSize) * pageUnitSize;
        dy = Math.round(dy / pageUnitSize) * pageUnitSize;

        // Конвертируем начальные значения из процентов/rem в пиксели
        const initialWidthPx = (widgetResizeData.initialWidth / 100) * canvasWidth;
        const initialXPx = (widgetResizeData.initialX / 100) * canvasWidth;
        const initialHeightPx = widgetResizeData.initialHeight * 16; // rem to px
        const initialYPx = widgetResizeData.initialY * 16; // rem to px

        let newWidgetWidthPx = initialWidthPx;
        let newWidgetXPx = initialXPx;
        let newWidgetHeightPx = initialHeightPx;
        let newWidgetYPx = initialYPx;

        // Минимальные размеры в пикселях
        const minWidthPx = (minWidth / 100) * canvasWidth;
        const minHeightPx = minHeight * 16; // rem to px

        // Обработка изменения размера сверху
        if (
            widgetResizeData.direction === 'top' ||
            widgetResizeData.direction === 'top-right' ||
            widgetResizeData.direction === 'left-top'
        ) {
            newWidgetHeightPx = initialHeightPx - dy;
            newWidgetYPx = initialYPx + dy;
            if (newWidgetHeightPx <= minHeightPx) {
                newWidgetYPx = initialYPx + initialHeightPx - minHeightPx;
            }
        }

        // Обработка изменения размера снизу
        if (
            widgetResizeData.direction === 'bottom' ||
            widgetResizeData.direction === 'bottom-left' ||
            widgetResizeData.direction === 'right-bottom'
        ) {
            newWidgetHeightPx = initialHeightPx + dy;
        }

        // Обработка изменения размера справа
        if (
            widgetResizeData.direction === 'right' ||
            widgetResizeData.direction === 'right-bottom' ||
            widgetResizeData.direction === 'top-right'
        ) {
            newWidgetWidthPx = initialWidthPx + dx;
        }

        // Обработка изменения размера слева
        if (
            widgetResizeData.direction === 'left' ||
            widgetResizeData.direction === 'left-top' ||
            widgetResizeData.direction === 'bottom-left'
        ) {
            newWidgetXPx = initialXPx + dx;
            newWidgetWidthPx = initialWidthPx - dx;
            if (newWidgetWidthPx <= minWidthPx) {
                newWidgetXPx = initialXPx + initialWidthPx - minWidthPx;
            }
        }

        // Конвертируем обратно в проценты и rem
        return {
            width: ((newWidgetWidthPx <= minWidthPx ? minWidthPx : newWidgetWidthPx) / canvasWidth) * 100,
            height: (newWidgetHeightPx <= minHeightPx ? minHeightPx : newWidgetHeightPx) / 16,
            x: (newWidgetXPx < 0 ? 0 : newWidgetXPx) / canvasWidth * 100,
            y: (newWidgetYPx < 0 ? 0 : newWidgetYPx) / 16,
        };
    }, []);

    const handleResize = useCallback((
        event: React.MouseEvent<HTMLDivElement>,
        pageUnitSize: number,
        canvasWidth: number,
        minWidth: number = 5, // 5% минимальная ширина
        minHeight: number = 0.5 // 0.5rem минимальная высота
    ) => {
        if (!widgetResizeData) return false;

        const currentMousePosition = { x: event.clientX, y: event.clientY };
        const newDimensions = calculateNewDimensions({
            widgetResizeData,
            currentMousePosition,
            pageUnitSize,
            minWidth,
            minHeight,
            canvasWidth
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