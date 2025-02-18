import {
    CSSProperties,
    FC,
    HTMLAttributes,
    MouseEventHandler,
    PropsWithChildren,
    forwardRef,
} from 'react';

import { useSetAtom } from 'jotai';

import styles from './WidgetBox.module.css';

import { Direction } from '@/shared/types/Direction';

import {
    selectedWidgetIdsAtom,
    widgetResizeDataAtom,
} from '@/Constructor/state/selection';
import { ResizeButton } from '@/Renderer/components/ResizeButton';

export type WidgetBoxProps = {
    id: string;
    isMoving: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
};

export const WidgetBox: FC<PropsWithChildren<WidgetBoxProps>> = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & WidgetBoxProps
>(({ id, children, x, y, width, height }, ref) => {
    const css: CSSProperties = {
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
    };
    const setSelectedWidgetIds = useSetAtom(selectedWidgetIdsAtom);
    const setWidgetIdToResize = useSetAtom(widgetResizeDataAtom);

    const onMouseDown: MouseEventHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();

        setSelectedWidgetIds([id]);
    };

    const getOnResizeButtonMouseDown =
        (direction: Direction): MouseEventHandler<HTMLButtonElement> =>
        (event) => {
            event.preventDefault();
            event.stopPropagation();
            setWidgetIdToResize({
                widgetId: id,
                direction,
                initialMousePosition: { x: event.screenX, y: event.screenY },
                initialWidth: width,
                initialHeight: height,
                initialX: x,
                initialY: y,
            });
        };

    return (
        <div
            onMouseDown={onMouseDown}
            style={css}
            ref={ref}
            className={styles.root}
        >
            <div className={styles.resizeButtons}>
                <ResizeButton
                    onMouseDown={getOnResizeButtonMouseDown('top')}
                    widgetId={id}
                    direction="top"
                />
                <ResizeButton
                    onMouseDown={getOnResizeButtonMouseDown('top-right')}
                    widgetId={id}
                    direction="top-right"
                />
                <ResizeButton
                    onMouseDown={getOnResizeButtonMouseDown('right')}
                    widgetId={id}
                    direction="right"
                />
                <ResizeButton
                    onMouseDown={getOnResizeButtonMouseDown('right-bottom')}
                    widgetId={id}
                    direction="right-bottom"
                />
                <ResizeButton
                    onMouseDown={getOnResizeButtonMouseDown('bottom')}
                    widgetId={id}
                    direction="bottom"
                />
                <ResizeButton
                    onMouseDown={getOnResizeButtonMouseDown('bottom-left')}
                    widgetId={id}
                    direction="bottom-left"
                />
                <ResizeButton
                    onMouseDown={getOnResizeButtonMouseDown('left')}
                    widgetId={id}
                    direction="left"
                />
                <ResizeButton
                    onMouseDown={getOnResizeButtonMouseDown('left-top')}
                    widgetId={id}
                    direction="left-top"
                />
            </div>
            {children}
        </div>
    );
});

WidgetBox.displayName = 'WidgetBox';
