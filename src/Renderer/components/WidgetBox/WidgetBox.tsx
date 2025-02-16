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

import { selectedWidgetIdsAtom } from '@/Constructor/state/selection';

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

    const onMouseDown: MouseEventHandler = (event) => {
        event.stopPropagation();
        event.preventDefault();

        setSelectedWidgetIds([id]);
    };

    return (
        <div
            onMouseDown={onMouseDown}
            style={css}
            ref={ref}
            className={styles.root}
        >
            {children}
        </div>
    );
});

WidgetBox.displayName = 'WidgetBox';
