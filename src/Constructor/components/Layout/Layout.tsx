import { FC, ReactNode } from 'react';

import styles from './Layout.module.css';

export type LayoutProps = {
    firstColumn: ReactNode;
    secondColumn: ReactNode;
    thirdColumn: ReactNode;
};

export const Layout: FC<LayoutProps> = ({
    firstColumn,
    secondColumn,
    thirdColumn,
}) => {
    return (
        <div className={styles.root}>
            <div className={styles.item}>{firstColumn}</div>
            <div className={styles.item}>{secondColumn}</div>
            <div className={styles.item}>{thirdColumn}</div>
        </div>
    );
};
