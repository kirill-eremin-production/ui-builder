import { CSSProperties, FC } from 'react';

import styles from './PageCanvas.module.css';

export type PageCanvasProps = {
    // Ширина страницы
    width: number;
};

export const PageCanvas: FC<PageCanvasProps> = ({ width }) => {
    const rootStyle: CSSProperties = {
        width: `${width}px`,
    };

    return (
        <div className={styles.root}>
            <div className={styles.content} style={rootStyle}></div>
        </div>
    );
};
