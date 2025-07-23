import { FC } from 'react';

import styles from './SettingsMenu.module.css';

import { Tab, Tabs } from '@/shared/components/Tabs';

import { BreakpointsSettings } from '@/Constructor/widgets/Settings/BreakpointsSettings';
import { PageSettings } from '@/Constructor/widgets/Settings/PageSettings';
import { WidgetSettings } from '@/Constructor/widgets/WidgetSettings';

export type SettingsMenuProps = object;

export const SettingsMenu: FC<SettingsMenuProps> = () => {
    return (
        <div className={styles.root}>
            <Tabs defaultValue="base-settings" fullWidth>
                <Tab label="Base" value="base-settings">
                    <PageSettings />
                </Tab>
                <Tab label="Breakpoints" value="breakpoints-settings">
                    <BreakpointsSettings />
                </Tab>
                <Tab label="Widget" value="widget-settings">
                    <WidgetSettings />
                </Tab>
            </Tabs>
        </div>
    );
};
