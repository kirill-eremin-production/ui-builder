import { FC, ReactNode } from 'react';

import styles from './Layout.module.css';

import { ResizableDiv } from '@/shared/components/ResizableDiv';

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
            <ResizableDiv
                minWidth={15}
                initialWidth={25}
                maxWidth={45}
                className={styles.item}
            >
                {firstColumn}
            </ResizableDiv>
            <div className={styles.secondColumn}>{secondColumn}</div>
            <ResizableDiv
                minWidth={15}
                initialWidth={25}
                maxWidth={45}
                resizerPosition="left"
                className={styles.item}
            >
                {thirdColumn}
            </ResizableDiv>
        </div>
    );
};
