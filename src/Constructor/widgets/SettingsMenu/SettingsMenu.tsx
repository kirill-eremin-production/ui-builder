import { FC } from 'react';

import styles from './SettingsMenu.module.css';

export type SettingsMenuProps = object;

export const SettingsMenu: FC<SettingsMenuProps> = () => {
    return <div className={styles.root}>SettingsMenu</div>;
};
