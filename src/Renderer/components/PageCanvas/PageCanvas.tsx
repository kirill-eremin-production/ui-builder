import {
    CSSProperties,
    HTMLAttributes,
    MouseEventHandler,
    forwardRef,
    useRef,
} from 'react';

import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import styles from './PageCanvas.module.css';

import { PageConfig } from '@/shared/types/PageConfig';

import { UiNode } from '@/Renderer/widgets/UiNode';

import {
    isCanvasWidgetEditingAtom,
    selectedWidgetIdToEditAtom,
    selectedWidgetIdsAtom,
    widgetDataToMoveAtom,
    widgetResizeDataAtom,
    widgetTypeToAddOnCanvasAtom,
} from '@/Constructor/state/selection';
import { pageUnitSizeAtom } from '@/Renderer/state/page';
import { uiComponentsAtom } from '@/Renderer/state/ui';

export type PageCanvasProps = {
    // Ширина страницы
    width: number;
    // Минимальная ширина страницы
    minHeight: number;

    config: PageConfig;

    isRenderMode?: boolean;
};

export const PageCanvas = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & PageCanvasProps
>(({ width, minHeight, config, isRenderMode }, ref) => {
    const [widgetTypeToAddOnCanvas, setWidgetTypeToAddOnCanvas] = useAtom(
        widgetTypeToAddOnCanvasAtom
    );
    const [uiComponents, setUiComponents] = useAtom(uiComponentsAtom);
    const pageUnitSize = useAtomValue(pageUnitSizeAtom);
    const [selectedWidgetIds, setSelectedWidgetIds] = useAtom(
        selectedWidgetIdsAtom
    );
    const setSelectedWidgetIdToEdit = useSetAtom(selectedWidgetIdToEditAtom);
    const setIsCanvasWidgetEditing = useSetAtom(isCanvasWidgetEditingAtom);
    const [widgetResizeData, setWidgetResizeData] =
        useAtom(widgetResizeDataAtom);
    const [widgetDataToMove, setWidgetDataToMove] =
        useAtom(widgetDataToMoveAtom);

    const newWidgetPosition = useRef<{ x: number; y: number } | undefined>(
        undefined
    );

    const widgetYEndPositions = Object.entries(uiComponents).map(
        ([key, widget]) => {
            return widget.y + widget.height;
        }
    );

    const heightValue = Math.max(...widgetYEndPositions, minHeight);

    const rootStyle: CSSProperties = {
        minWidth: `${width}px`,
        width: `${width}px`,
        height: heightValue ? `${heightValue}px` : undefined,
    };

    const onMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const canvasBox = event.currentTarget.getBoundingClientRect();
        const canvasScroll = event.currentTarget.scrollTop;

        const minWidth = 8;
        const minHeight = 8;

        if (widgetResizeData) {
            const currentMousePosition = { x: event.clientX, y: event.clientY };
            let dx =
                currentMousePosition.x -
                widgetResizeData.initialMousePosition.x;
            let dy =
                currentMousePosition.y -
                widgetResizeData.initialMousePosition.y;

            dx = Math.round(dx / pageUnitSize) * pageUnitSize;
            dy = Math.round(dy / pageUnitSize) * pageUnitSize;

            let newWidgetWidth = widgetResizeData.initialWidth;
            let newWidgetX = widgetResizeData.initialX;

            let newWidgetHeight = widgetResizeData.initialHeight;
            let newWidgetY = widgetResizeData.initialY;

            if (
                widgetResizeData.direction === 'top' ||
                widgetResizeData.direction === 'top-right' ||
                widgetResizeData.direction === 'left-top'
            ) {
                newWidgetHeight = newWidgetHeight - dy;
                newWidgetY = newWidgetY + dy;
                if (newWidgetHeight <= minHeight) {
                    newWidgetY =
                        widgetResizeData.initialY +
                        widgetResizeData.initialHeight -
                        minHeight;
                }
            }
            if (
                widgetResizeData.direction === 'bottom' ||
                widgetResizeData.direction === 'bottom-left' ||
                widgetResizeData.direction === 'right-bottom'
            ) {
                newWidgetHeight = newWidgetHeight + dy;
            }

            if (
                widgetResizeData.direction === 'right' ||
                widgetResizeData.direction === 'right-bottom' ||
                widgetResizeData.direction === 'top-right'
            ) {
                newWidgetWidth = newWidgetWidth + dx;
            }
            if (
                widgetResizeData.direction === 'left' ||
                widgetResizeData.direction === 'left-top' ||
                widgetResizeData.direction === 'bottom-left'
            ) {
                newWidgetX = newWidgetX + dx;
                newWidgetWidth = newWidgetWidth - dx;
                if (newWidgetWidth <= minWidth) {
                    newWidgetX =
                        widgetResizeData.initialX +
                        widgetResizeData.initialWidth -
                        minWidth;
                }
            }

            setUiComponents((prevState) => ({
                ...prevState,
                [widgetResizeData.widgetId]: {
                    ...prevState[widgetResizeData.widgetId],
                    width: newWidgetWidth <= 8 ? 8 : newWidgetWidth,
                    height: newWidgetHeight <= 8 ? 8 : newWidgetHeight,
                    x: newWidgetX < 0 ? 0 : newWidgetX,
                    y: newWidgetY < 0 ? 0 : newWidgetY,
                },
            }));

            return;
        }

        // Логика положения для новых виджетов
        if (selectedWidgetIds.length && !widgetDataToMove) {
            const newWidget = uiComponents[selectedWidgetIds[0]];
            const newWidgetWidth = newWidget.width;
            const newWidgetHeight = newWidget.height;

            let x =
                Math.round(
                    (event.clientX - newWidgetWidth / 2 - canvasBox.left) /
                        pageUnitSize
                ) * pageUnitSize;
            let y =
                Math.round(
                    (event.clientY -
                        newWidgetHeight / 2 -
                        canvasBox.top +
                        canvasScroll) /
                        pageUnitSize
                ) * pageUnitSize;

            if (x < 0) {
                x = 0;
            }

            if (y < 0) {
                y = 0;
            }

            if (x + newWidgetWidth > width) {
                x = width - newWidgetWidth;
            }

            newWidgetPosition.current = { x, y };

            setUiComponents((prevState) => ({
                ...prevState,
                [selectedWidgetIds[0]]: {
                    ...prevState[selectedWidgetIds[0]],
                    x: x,
                    y: y,
                },
            }));
        }

        if (selectedWidgetIds.length && widgetDataToMove) {
            const widget = uiComponents[selectedWidgetIds[0]];

            const dx = event.clientX - widgetDataToMove.initialMousePosition.x;
            const dy = event.clientY - widgetDataToMove.initialMousePosition.y;

            let x =
                Math.round((widgetDataToMove.initialX + dx) / pageUnitSize) *
                pageUnitSize;
            let y =
                Math.round((widgetDataToMove.initialY + dy) / pageUnitSize) *
                pageUnitSize;

            if (x < 0) {
                x = 0;
            }

            if (y < 0) {
                y = 0;
            }

            if (x + widget.width > width) {
                x = width - widget.width;
            }

            newWidgetPosition.current = { x, y };

            setUiComponents((prevState) => ({
                ...prevState,
                [selectedWidgetIds[0]]: {
                    ...prevState[selectedWidgetIds[0]],
                    x: x,
                    y: y,
                },
            }));
        }

        if (!widgetTypeToAddOnCanvas || selectedWidgetIds.length) {
            return;
        }

        const newWidgetId = String(new Date().getTime());
        setSelectedWidgetIds([newWidgetId]);
        setUiComponents((prevState) => ({
            ...prevState,
            [newWidgetId]: {
                id: newWidgetId,
                type: widgetTypeToAddOnCanvas,
                isMoving: true,
                x: newWidgetPosition?.current?.x || 0,
                y: newWidgetPosition?.current?.y || 0,
                width: 320,
                height: 160,
                params: {},
            },
        }));
    };

    const onMouseLeave: MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!selectedWidgetIds.length) {
            return;
        }

        if (!widgetTypeToAddOnCanvas && selectedWidgetIds.length) {
            setSelectedWidgetIds([]);
            return;
        }

        setUiComponents((prevState) => {
            const newState = { ...prevState };
            delete newState[selectedWidgetIds[0]];

            return newState;
        });

        setSelectedWidgetIds([]);
    };

    const onMouseUp: MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setWidgetResizeData(null);
        setIsCanvasWidgetEditing(false);
        setWidgetDataToMove(null);

        if (event.currentTarget === event.target) {
            setSelectedWidgetIdToEdit(null);
        }

        if (!selectedWidgetIds.length) {
            newWidgetPosition.current = undefined;
            return;
        }

        setUiComponents((prevState) => ({
            ...prevState,
            [selectedWidgetIds[0]]: {
                ...prevState[selectedWidgetIds[0]],
                id: selectedWidgetIds[0],
                isMoving: false,
                x:
                    newWidgetPosition?.current?.x ||
                    prevState[selectedWidgetIds[0]].x,
                y:
                    newWidgetPosition?.current?.y ||
                    prevState[selectedWidgetIds[0]].y,
                width: prevState[selectedWidgetIds[0]].width,
                height: prevState[selectedWidgetIds[0]].height,
            },
        }));

        newWidgetPosition.current = undefined;
        setSelectedWidgetIds([]);
        setWidgetTypeToAddOnCanvas(null);
    };

    if (isRenderMode) {
        return (
            <div
                data-testid="mainPageCanvas"
                className={styles.content}
                style={rootStyle}
            >
                <UiNode isRenderMode={isRenderMode} ui={config.ui} />
            </div>
        );
    }

    return (
        <div ref={ref} className={styles.root}>
            <div
                data-testid="mainPageCanvas"
                className={styles.content}
                style={rootStyle}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
            >
                <UiNode ui={config.ui} />
            </div>
        </div>
    );
});

PageCanvas.displayName = 'PageCanvas';
