import { FC } from 'react';

import styles from './SettingsMenu.module.css';

import { BreakpointsSettings } from '@/Constructor/widgets/Settings/BreakpointsSettings';
import { PageSettings } from '@/Constructor/widgets/Settings/PageSettings';
import { WidgetSettings } from '@/Constructor/widgets/WidgetSettings';

export type SettingsMenuProps = object;

export const SettingsMenu: FC<SettingsMenuProps> = () => {
    return (
        <div className={styles.root}>
            <PageSettings />
            <BreakpointsSettings />
            <WidgetSettings />
        </div>
    );
};
