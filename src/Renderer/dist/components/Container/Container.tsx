import { FC, PropsWithChildren } from 'react';

import styles from './Container.module.css';

export type ContainerProps = {
    text?: string;
};

export const Container: FC<PropsWithChildren<ContainerProps>> = ({
    text,
    children,
}) => {
    return (
        <div className={styles.root}>
            {text && <div>{text}</div>}

            {children}
        </div>
    );
};
