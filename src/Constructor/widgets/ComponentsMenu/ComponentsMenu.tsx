import { FC } from 'react';

import styles from './ComponentsMenu.module.css';

import { Tab, Tabs } from '@/shared/components/Tabs';

import { RequestsList } from '@/Constructor/widgets/RequestsAPI/RequestsList';
import { SectionsTree } from '@/Constructor/widgets/Settings/SectionsTree';

import { Container } from '@/Constructor/dist/components/Container';
import { CustomHtml } from '@/Constructor/dist/components/CustomHtml';

import { text } from './ComponentsMenu.localization';

export type ComponentsMenuProps = object;

export const ComponentsMenu: FC<ComponentsMenuProps> = () => {
    return (
        <div className={styles.root}>
            <Tabs defaultValue="sections-list" fullWidth>
                <Tab label="Sections" value="sections-list">
                    <SectionsTree />
                </Tab>
                <Tab label="Widgets" value="widgets-list">
                    <h2>{text.widgets.en}</h2>
                    <Container />
                    <CustomHtml />
                </Tab>
                <Tab label="Requests" value="requests-list">
                    <RequestsList />
                </Tab>
            </Tabs>
        </div>
    );
};
