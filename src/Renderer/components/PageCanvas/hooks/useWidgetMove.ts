import { useCallback, useRef } from 'react';
import { useAtom } from 'jotai';
import { 
    selectedWidgetIdsAtom, 
    widgetDataToMoveAtom 
} from '@/Constructor/state/selection';
import { uiComponentsAtom } from '@/Renderer/state/ui';

interface MoveCalculationParams {
    event: React.MouseEvent<HTMLDivElement>;
    canvasBox: DOMRect;
    canvasScroll: number;
    pageUnitSize: number;
    canvasWidth: number;
    widgetWidth: number;
    widgetHeight: number;
    isNewWidget?: boolean;
}

export const useWidgetMove = () => {
    const [selectedWidgetIds] = useAtom(selectedWidgetIdsAtom);
    const [widgetDataToMove] = useAtom(widgetDataToMoveAtom);
    const [uiComponents, setUiComponents] = useAtom(uiComponentsAtom);
    const newWidgetPosition = useRef<{ x: number; y: number } | undefined>(undefined);

    const calculatePosition = useCallback(({
        event,
        canvasBox,
        canvasScroll,
        pageUnitSize,
        canvasWidth,
        widgetWidth,
        widgetHeight,
        isNewWidget = false
    }: MoveCalculationParams) => {
        let x: number;
        let y: number;

        if (isNewWidget) {
            // Для новых виджетов - центрируем относительно курсора
            x = Math.round(
                (event.clientX - widgetWidth / 2 - canvasBox.left) / pageUnitSize
            ) * pageUnitSize;
            y = Math.round(
                (event.clientY - widgetHeight / 2 - canvasBox.top + canvasScroll) / pageUnitSize
            ) * pageUnitSize;
        } else if (widgetDataToMove) {
            // Для перемещаемых виджетов
            const dx = event.clientX - widgetDataToMove.initialMousePosition.x;
            const dy = event.clientY - widgetDataToMove.initialMousePosition.y;

            x = Math.round((widgetDataToMove.initialX + dx) / pageUnitSize) * pageUnitSize;
            y = Math.round((widgetDataToMove.initialY + dy) / pageUnitSize) * pageUnitSize;
        } else {
            return null;
        }

        // Ограничения по границам канваса
        if (x < 0) x = 0;
        if (y < 0) y = 0;
        if (x + widgetWidth > canvasWidth) {
            x = canvasWidth - widgetWidth;
        }

        return { x, y };
    }, [widgetDataToMove]);

    const handleMove = useCallback((
        event: React.MouseEvent<HTMLDivElement>,
        canvasBox: DOMRect,
        canvasScroll: number,
        pageUnitSize: number,
        canvasWidth: number
    ) => {
        if (!selectedWidgetIds.length) return false;

        const widgetId = selectedWidgetIds[0];
        const widget = uiComponents[widgetId];
        if (!widget) return false;

        const isNewWidget = !widgetDataToMove && widget.isMoving;
        
        const position = calculatePosition({
            event,
            canvasBox,
            canvasScroll,
            pageUnitSize,
            canvasWidth,
            widgetWidth: widget.width,
            widgetHeight: widget.height,
            isNewWidget
        });

        if (!position) return false;

        newWidgetPosition.current = position;

        setUiComponents((prevState) => ({
            ...prevState,
            [widgetId]: {
                ...prevState[widgetId],
                x: position.x,
                y: position.y,
            },
        }));

        return true;
    }, [selectedWidgetIds, uiComponents, widgetDataToMove, calculatePosition, setUiComponents]);

    const getNewWidgetPosition = useCallback(() => {
        return newWidgetPosition.current;
    }, []);

    const clearNewWidgetPosition = useCallback(() => {
        newWidgetPosition.current = undefined;
    }, []);

    return {
        handleMove,
        getNewWidgetPosition,
        clearNewWidgetPosition,
        widgetDataToMove
    };
};