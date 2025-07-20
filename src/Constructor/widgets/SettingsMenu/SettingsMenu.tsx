import { FC } from 'react';

import styles from './SettingsMenu.module.css';

import { PageSettings } from '@/Constructor/widgets/Settings/PageSettings';
import { WidgetSettings } from '@/Constructor/widgets/WidgetSettings';

export type SettingsMenuProps = object;

export const SettingsMenu: FC<SettingsMenuProps> = () => {
    return (
        <div className={styles.root}>
            <PageSettings />
            <WidgetSettings />
        </div>
    );
};
