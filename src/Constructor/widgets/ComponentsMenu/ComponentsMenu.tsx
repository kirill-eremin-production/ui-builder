import { FC } from 'react';

import styles from './ComponentsMenu.module.css';

import { Container } from '@/Constructor/dist/components/Container';

export type ComponentsMenuProps = object;

export const ComponentsMenu: FC<ComponentsMenuProps> = () => {
    return (
        <div className={styles.root}>
            ComponentsMenu
            <Container />
        </div>
    );
};
