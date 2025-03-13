import { FC, useState } from 'react';

import { useAtomValue } from 'jotai';

import styles from './SettingsMenu.module.css';

import { writePageServerAction } from '@/app/actions/pages/save';

import { PageConfig } from '@/shared/types/PageConfig';
import { useUpdateSearchParams } from '@/shared/utils/update-query-params';

import { PageSettings } from '@/Constructor/widgets/Settings/PageSettings';
import { SectionsTree } from '@/Constructor/widgets/Settings/SectionsTree';
import { WidgetSettings } from '@/Constructor/widgets/WidgetSettings';

import { pageIdAtom } from '@/Constructor/state/page-config';
import { pageUnitSizeAtom } from '@/Renderer/state/page';
import { uiComponentsAtom } from '@/Renderer/state/ui';

export type SettingsMenuProps = object;

export const SettingsMenu: FC<SettingsMenuProps> = () => {
    return (
        <div className={styles.root}>
            <SectionsTree />
            <PageSettings />
            <WidgetSettings />
        </div>
    );
};
