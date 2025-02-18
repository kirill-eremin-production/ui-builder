import {
    CSSProperties,
    HTMLAttributes,
    MouseEventHandler,
    forwardRef,
    useRef,
} from 'react';

import { useAtom, useAtomValue } from 'jotai';

import styles from './PageCanvas.module.css';

import { PageConfig } from '@/shared/types/PageConfig';

import { UiNode } from '@/Renderer/widgets/UiNode';

import {
    selectedWidgetIdsAtom,
    widgetResizeDataAtom,
    widgetTypeToAddOnCanvasAtom,
} from '@/Constructor/state/selection';
import { pageUnitSizeAtom } from '@/Renderer/state/page';
import { uiComponentsAtom } from '@/Renderer/state/ui';

export type PageCanvasProps = {
    // Ширина страницы
    width: number;

    config: PageConfig;
};

export const PageCanvas = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & PageCanvasProps
>(({ width, config }, ref) => {
    const [widgetTypeToAddOnCanvas, setWidgetTypeToAddOnCanvas] = useAtom(
        widgetTypeToAddOnCanvasAtom
    );
    const [uiComponents, setUiComponents] = useAtom(uiComponentsAtom);
    const pageUnitSize = useAtomValue(pageUnitSizeAtom);
    const [selectedWidgetIds, setSelectedWidgetIds] = useAtom(
        selectedWidgetIdsAtom
    );
    const [widgetResizeData, setWidgetResizeData] =
        useAtom(widgetResizeDataAtom);

    const newWidgetPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const rootStyle: CSSProperties = {
        width: `${width}px`,
    };

    const onMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const canvasBox = event.currentTarget.getBoundingClientRect();
        const canvasScroll = event.currentTarget.scrollTop;

        const minWidth = 8;
        const minHeight = 8;

        if (widgetResizeData) {
            const currentMousePosition = { x: event.screenX, y: event.screenY };
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

        if (selectedWidgetIds.length) {
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
                    x: newWidgetPosition.current.x,
                    y: newWidgetPosition.current.y,
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
                text: 'Container',
                isMoving: true,
                x: newWidgetPosition.current.x,
                y: newWidgetPosition.current.y,
                width: 320,
                height: 160,
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

        if (!selectedWidgetIds.length) {
            return;
        }

        setUiComponents((prevState) => ({
            ...prevState,
            [selectedWidgetIds[0]]: {
                id: selectedWidgetIds[0],
                type: prevState[selectedWidgetIds[0]].type,
                text: 'Container',
                isMoving: false,
                x: newWidgetPosition.current.x,
                y: newWidgetPosition.current.y,
                width: prevState[selectedWidgetIds[0]].width,
                height: prevState[selectedWidgetIds[0]].height,
            },
        }));

        setSelectedWidgetIds([]);
        setWidgetTypeToAddOnCanvas(null);
    };

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
