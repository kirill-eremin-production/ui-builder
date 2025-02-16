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

import { widgetTypeToAddOnCanvasAtom } from '@/Constructor/state/selection';
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

    const newWidgetId = useRef<string>('');
    const newWidgetPosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    const rootStyle: CSSProperties = {
        width: `${width}px`,
    };

    const onMouseMove: MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const canvasBox = event.currentTarget.getBoundingClientRect();

        if (newWidgetId.current) {
            const newWidget = uiComponents[newWidgetId.current];
            const newWidgetWidth = newWidget.width;
            const newWidgetHeight = newWidget.height;

            const x =
                Math.round(
                    (event.clientX - newWidgetWidth / 2 - canvasBox.left) /
                        pageUnitSize
                ) * pageUnitSize;
            const y =
                Math.round(
                    (event.clientY - newWidgetHeight / 2 - canvasBox.top) /
                        pageUnitSize
                ) * pageUnitSize;
            newWidgetPosition.current = { x, y };

            setUiComponents((prevState) => ({
                ...prevState,
                [newWidgetId.current]: {
                    ...prevState[newWidgetId.current],
                    x: newWidgetPosition.current.x,
                    y: newWidgetPosition.current.y,
                },
            }));
        }

        if (!widgetTypeToAddOnCanvas || newWidgetId.current) {
            return;
        }

        newWidgetId.current = String(new Date().getTime());
        setUiComponents((prevState) => ({
            ...prevState,
            [newWidgetId.current]: {
                id: newWidgetId.current,
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

        if (!newWidgetId.current) {
            return;
        }

        setUiComponents((prevState) => {
            const newState = { ...prevState };
            delete newState[newWidgetId.current];

            return newState;
        });

        newWidgetId.current = '';
    };

    const onMouseUp: MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!widgetTypeToAddOnCanvas || !newWidgetId.current) {
            return;
        }

        setUiComponents((prevState) => ({
            ...prevState,
            [newWidgetId.current]: {
                id: newWidgetId.current,
                type: widgetTypeToAddOnCanvas,
                text: 'Container',
                isMoving: false,
                x: newWidgetPosition.current.x,
                y: newWidgetPosition.current.y,
                width: 320,
                height: 160,
            },
        }));

        newWidgetId.current = '';
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
