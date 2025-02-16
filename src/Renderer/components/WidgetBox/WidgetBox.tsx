import {
    CSSProperties,
    FC,
    HTMLAttributes,
    PropsWithChildren,
    forwardRef,
} from 'react';

import styles from './WidgetBox.module.css';

export type WidgetBoxProps = {
    isMoving: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
};

export const WidgetBox: FC<PropsWithChildren<WidgetBoxProps>> = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & WidgetBoxProps
>(({ children, x, y, width, height }, ref) => {
    const css: CSSProperties = {
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
    };

    return (
        <div style={css} ref={ref} className={styles.root}>
            {children}
        </div>
    );
});

WidgetBox.displayName = 'WidgetBox';
