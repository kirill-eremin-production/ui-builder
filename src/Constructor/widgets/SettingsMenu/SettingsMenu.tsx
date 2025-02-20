import { FC, useState } from 'react';

import { useAtomValue } from 'jotai';

import styles from './SettingsMenu.module.css';

import { writePageServerAction } from '@/app/actions/pages/save';

import { PageConfig } from '@/shared/types/PageConfig';
import { useUpdateSearchParams } from '@/shared/utils/update-query-params';

import { pageIdAtom } from '@/Constructor/state/page-config';
import { pageUnitSizeAtom } from '@/Renderer/state/page';
import { uiComponentsAtom } from '@/Renderer/state/ui';

export type SettingsMenuProps = object;

export const SettingsMenu: FC<SettingsMenuProps> = () => {
    const [isLoading, setIsLoading] = useState(false);
    const updateQueryParams = useUpdateSearchParams();

    const uiComponents = useAtomValue(uiComponentsAtom);
    const pageUnitSize = useAtomValue(pageUnitSizeAtom);
    const currentPageId = useAtomValue(pageIdAtom);

    const pageConfig: PageConfig = {
        ui: uiComponents,
        unitSize: pageUnitSize,
    };

    const onButtonClick = async () => {
        setIsLoading(true);
        const { pageId } = await writePageServerAction({
            page: pageConfig,
            id: currentPageId || undefined,
        });
        updateQueryParams({ pageId });
        setIsLoading(false);
    };

    return (
        <div className={styles.root}>
            {isLoading ? (
                'Loading...'
            ) : (
                <button onClick={onButtonClick}>Save</button>
            )}
        </div>
    );
};
