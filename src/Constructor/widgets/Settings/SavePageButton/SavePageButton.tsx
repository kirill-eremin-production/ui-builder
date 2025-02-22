import { FC, useState } from 'react';

import { useAtom, useAtomValue } from 'jotai/index';

import styles from './SavePageButton.module.css';

import { writePageServerAction } from '@/app/actions/pages/save';

import { PageConfig } from '@/shared/types/PageConfig';
import { useUpdateSearchParams } from '@/shared/utils/update-query-params';

import {
    pageIdAtom,
    pageMinHeightAtom,
    pageNameAtom,
    pageWidthAtom,
} from '@/Constructor/state/page-config';
import { pageUnitSizeAtom } from '@/Renderer/state/page';
import { uiComponentsAtom } from '@/Renderer/state/ui';

import { text } from './SavePageButton.localization';

export type SavePageButtonProps = {};

export const SavePageButton: FC<SavePageButtonProps> = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const updateQueryParams = useUpdateSearchParams();

    const uiComponents = useAtomValue(uiComponentsAtom);
    const pageUnitSize = useAtomValue(pageUnitSizeAtom);
    const currentPageId = useAtomValue(pageIdAtom);

    const pageWidth = useAtomValue(pageWidthAtom);
    const pageMinHeight = useAtomValue(pageMinHeightAtom);
    const pageName = useAtomValue(pageNameAtom);

    const pageConfig: PageConfig = {
        width: pageWidth,
        minHeight: pageMinHeight,
        name: pageName,
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
        <div>
            {isLoading ? (
                'Loading...'
            ) : (
                <button onClick={onButtonClick}>{text.savePage.en}</button>
            )}
        </div>
    );
};
