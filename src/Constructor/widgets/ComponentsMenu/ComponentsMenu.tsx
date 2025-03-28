import { FC } from 'react';

import styles from './ComponentsMenu.module.css';

import { RequestsList } from '@/Constructor/widgets/RequestsAPI/RequestsList';
import { SectionsTree } from '@/Constructor/widgets/Settings/SectionsTree';

import { Container } from '@/Constructor/dist/components/Container';
import { CustomHtml } from '@/Constructor/dist/components/CustomHtml';

import { text } from './ComponentsMenu.localization';

export type ComponentsMenuProps = object;

export const ComponentsMenu: FC<ComponentsMenuProps> = () => {
    return (
        <div className={styles.root}>
            <SectionsTree />

            <h2>{text.widgets.en}</h2>
            <Container />
            <CustomHtml />

            <RequestsList />
        </div>
    );
};
