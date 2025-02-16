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
            <div>{firstColumn}</div>
            <div>{secondColumn}</div>
            <div>{thirdColumn}</div>
        </div>
    );
};
