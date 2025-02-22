import {
    CSSProperties,
    FC,
    HTMLAttributes,
    MouseEventHandler,
    PropsWithChildren,
    forwardRef,
} from 'react';

import cn from 'classnames';
import { useAtom, useSetAtom } from 'jotai';

import styles from './WidgetBox.module.css';

import { Direction } from '@/shared/types/Direction';

import {
    isCanvasWidgetEditingAtom,
    selectedWidgetIdToEditAtom,
    selectedWidgetIdsAtom,
    widgetDataToMoveAtom,
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
    isRenderMode?: boolean;
};

export const WidgetBox: FC<PropsWithChildren<WidgetBoxProps>> = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & WidgetBoxProps
>(({ id, children, x, y, width, height, isRenderMode }, ref) => {
    const css: CSSProperties = {
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
    };
    const setSelectedWidgetIds = useSetAtom(selectedWidgetIdsAtom);
    const setWidgetIdToResize = useSetAtom(widgetResizeDataAtom);
    const setWidgetDataToMove = useSetAtom(widgetDataToMoveAtom);
    const [widgetIdToEdit, setWidgetIdToEdit] = useAtom(
        selectedWidgetIdToEditAtom
    );
    const [isCanvasWidgetEditing, setIsCanvasWidgetEditing] = useAtom(
        isCanvasWidgetEditingAtom
    );

    const onMouseDown: MouseEventHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();

        setWidgetDataToMove({
            initialMousePosition: { x: event.clientX, y: event.clientY },
            initialX: x,
            initialY: y,
        });

        setIsCanvasWidgetEditing(true);
        setSelectedWidgetIds([id]);
        setWidgetIdToEdit(id);
    };

    const getOnResizeButtonMouseDown =
        (direction: Direction): MouseEventHandler<HTMLButtonElement> =>
        (event) => {
            event.preventDefault();
            event.stopPropagation();
            setIsCanvasWidgetEditing(true);
            setSelectedWidgetIds([id]);
            setWidgetIdToEdit(id);
            setWidgetIdToResize({
                widgetId: id,
                direction,
                initialMousePosition: { x: event.clientX, y: event.clientY },
                initialWidth: width,
                initialHeight: height,
                initialX: x,
                initialY: y,
            });
        };

    if (isRenderMode) {
        return (
            <div style={css} ref={ref} className={cn(styles.renderModeRoot)}>
                <div className={styles.widgetContent}>{children}</div>
            </div>
        );
    }

    return (
        <div
            onMouseDown={onMouseDown}
            style={css}
            ref={ref}
            className={cn(styles.root, {
                [styles.selected]: widgetIdToEdit === id,
                [styles.disableHoverStyles]: isCanvasWidgetEditing,
            })}
        >
            <div className={styles.background} />
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

            <div className={styles.widgetContent}>{children}</div>
        </div>
    );
});

WidgetBox.displayName = 'WidgetBox';
