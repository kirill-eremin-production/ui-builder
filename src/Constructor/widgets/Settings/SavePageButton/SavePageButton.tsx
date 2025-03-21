import { FC, useState } from 'react';

import { ArrowUpRightFromSquare } from '@gravity-ui/icons';
import { Button, Icon, Label } from '@gravity-ui/uikit';

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

    const [pageConfigToDiffCheck, setPageConfigToDiffCheck] = useState(
        JSON.stringify(pageConfig)
    );

    const onButtonClick = async () => {
        setIsLoading(true);
        const { pageId } = await writePageServerAction({
            page: pageConfig,
            id: currentPageId || undefined,
        });
        updateQueryParams({ pageId });
        setIsLoading(false);
        setPageConfigToDiffCheck(JSON.stringify(pageConfig));
    };

    const isSaved = pageConfigToDiffCheck === JSON.stringify(pageConfig);

    return (
        <div className={styles.root}>
            {currentPageId && (
                <Button
                    view="normal"
                    href={`/r/${currentPageId}`}
                    target="_blank"
                >
                    <Icon data={ArrowUpRightFromSquare} />
                </Button>
            )}

            <Label theme={isSaved ? 'success' : 'danger'} size="m">
                {isSaved ? text.saved.en : text.modified.en}
            </Label>

            <Button
                loading={isLoading}
                view="action"
                disabled={isSaved}
                onClick={onButtonClick}
            >
                {text.savePage.en}
            </Button>
        </div>
    );
};
