import { useCallback, useRef } from 'react';

import { useAtom } from 'jotai';

import {
    selectedWidgetIdsAtom,
    widgetDataToMoveAtom,
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

interface PositionInUnits {
    x: number; // процент
    y: number; // rem
}

export const useWidgetMove = () => {
    const [selectedWidgetIds] = useAtom(selectedWidgetIdsAtom);
    const [widgetDataToMove] = useAtom(widgetDataToMoveAtom);
    const [uiComponents, setUiComponents] = useAtom(uiComponentsAtom);
    const newWidgetPosition = useRef<{ x: number; y: number } | undefined>(
        undefined
    );

    const calculatePosition = useCallback(
        ({
            event,
            canvasBox,
            canvasScroll,
            pageUnitSize,
            canvasWidth,
            widgetWidth,
            widgetHeight,
            isNewWidget = false,
        }: MoveCalculationParams): PositionInUnits | null => {
            let xPx: number;
            let yPx: number;

            // Конвертируем процентную ширину виджета в пиксели для расчетов
            const widgetWidthPx = (widgetWidth / 100) * canvasWidth;
            const widgetHeightPx = widgetHeight * 16; // rem to px

            if (isNewWidget) {
                // Для новых виджетов - центрируем относительно курсора
                xPx =
                    Math.round(
                        (event.clientX - widgetWidthPx / 2 - canvasBox.left) /
                            pageUnitSize
                    ) * pageUnitSize;
                yPx =
                    Math.round(
                        (event.clientY -
                            widgetHeightPx / 2 -
                            canvasBox.top +
                            canvasScroll) /
                            pageUnitSize
                    ) * pageUnitSize;
            } else if (widgetDataToMove) {
                // Для перемещаемых виджетов
                const dx =
                    event.clientX - widgetDataToMove.initialMousePosition.x;
                const dy =
                    event.clientY - widgetDataToMove.initialMousePosition.y;

                // Конвертируем начальные проценты/rem в пиксели
                const initialXPx =
                    (widgetDataToMove.initialX / 100) * canvasWidth;
                const initialYPx = widgetDataToMove.initialY * 16;

                xPx =
                    Math.round((initialXPx + dx) / pageUnitSize) * pageUnitSize;
                yPx =
                    Math.round((initialYPx + dy) / pageUnitSize) * pageUnitSize;
            } else {
                return null;
            }

            // Ограничения по границам канваса
            if (xPx < 0) xPx = 0;
            if (yPx < 0) yPx = 0;
            if (xPx + widgetWidthPx > canvasWidth) {
                xPx = canvasWidth - widgetWidthPx;
            }

            // Конвертируем обратно в проценты и rem
            const xPercent = (xPx / canvasWidth) * 100;
            const yRem = yPx / 16;

            return { x: xPercent, y: yRem };
        },
        [widgetDataToMove]
    );

    const handleMove = useCallback(
        (
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
                isNewWidget,
            });

            if (!position) return false;

            // Сохраняем позицию в пикселях для дальнейшего использования
            newWidgetPosition.current = {
                x: (position.x / 100) * canvasWidth,
                y: position.y * 16,
            };

            setUiComponents((prevState) => ({
                ...prevState,
                [widgetId]: {
                    ...prevState[widgetId],
                    x: position.x,
                    y: position.y,
                },
            }));

            return true;
        },
        [
            selectedWidgetIds,
            uiComponents,
            widgetDataToMove,
            calculatePosition,
            setUiComponents,
        ]
    );

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
        widgetDataToMove,
    };
};
