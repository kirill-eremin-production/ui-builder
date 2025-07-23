import { FC, useCallback, useEffect, useState } from 'react';

import { ArrowUpRightFromSquare } from '@gravity-ui/icons';

import { useAtomValue } from 'jotai/index';

import styles from './SavePageButton.module.css';

import { writePageServerAction } from '@/app/actions/pages/save';

import { Button, Icon, Modal, Text } from '@/shared/components';
import { PageConfig } from '@/shared/types/PageConfig';
import { useUpdateSearchParams } from '@/shared/utils/update-query-params';

import { breakpointsAtom } from '@/Constructor/state/breakpoints';
import {
    pageIdAtom,
    pageMinHeightAtom,
    pageNameAtom,
    pageWidthAtom,
} from '@/Constructor/state/page-config';
import { useApiRequests } from '@/Constructor/state/requests/hooks/use-api-requests';
import { pageUnitSizeAtom } from '@/Renderer/state/page';
import {
    breakpointUiComponentsAtom,
    uiComponentsAtom,
} from '@/Renderer/state/ui';

import { text } from './SavePageButton.localization';

export type SavePageButtonProps = Record<string, never>;

export const SavePageButton: FC<SavePageButtonProps> = () => {
    const [isLoading, setIsLoading] = useState(false);
    const updateQueryParams = useUpdateSearchParams();

    const breakpointUiComponents = useAtomValue(breakpointUiComponentsAtom);
    const pageUnitSize = useAtomValue(pageUnitSizeAtom);
    const currentPageId = useAtomValue(pageIdAtom);
    const { apiRequests } = useApiRequests();
    const baseUiComponents = useAtomValue(uiComponentsAtom);

    const pageWidth = useAtomValue(pageWidthAtom);
    const pageMinHeight = useAtomValue(pageMinHeightAtom);
    const pageName = useAtomValue(pageNameAtom);
    const breakpoints = useAtomValue(breakpointsAtom);

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Обновляем брейкпоинты с UI компонентами для каждого
    const breakpointsWithUi = breakpoints?.map((breakpoint, index) => {
        const breakpointUi = breakpointUiComponents[index];
        if (breakpointUi && Object.keys(breakpointUi).length > 0) {
            return {
                ...breakpoint,
                config: {
                    ...breakpoint.config,
                    ui: breakpointUi,
                },
            };
        }
        return breakpoint;
    });

    const pageConfig: PageConfig = {
        name: pageName,
        baseConfig: {
            width: pageWidth,
            minHeight: pageMinHeight,
            unitSize: pageUnitSize,
            ui: baseUiComponents,
        },
        breakpoints: breakpointsWithUi,
        requests: apiRequests,
    };

    const [pageConfigToDiffCheck, setPageConfigToDiffCheck] = useState(
        JSON.stringify(pageConfig)
    );

    const onButtonClick = useCallback(async () => {
        setIsLoading(true);
        console.log(pageConfig);

        const { pageId } = await writePageServerAction({
            page: pageConfig,
            id: currentPageId || undefined,
        });
        updateQueryParams({ pageId });
        setIsLoading(false);
        setPageConfigToDiffCheck(JSON.stringify(pageConfig));
    }, [pageConfig, currentPageId, updateQueryParams]);

    useEffect(() => {
        const onKeyDownHandler = (event: KeyboardEvent) => {
            // Отключаем стандартное браузерное действия для ctrl + s - будем сохранять страницу
            if ((event.metaKey || event.ctrlKey) && event.key === 's') {
                event.preventDefault();
                event.stopPropagation();
                onButtonClick();
            }
        };

        window.addEventListener('keydown', onKeyDownHandler);

        return () => {
            window.removeEventListener('keydown', onKeyDownHandler);
        };
    }, [onButtonClick]);

    const isSaved = pageConfigToDiffCheck === JSON.stringify(pageConfig);

    return (
        <div className={styles.root}>
            {currentPageId && (
                <Button
                    view="default"
                    href={`/r/${currentPageId}`}
                    target="_blank"
                >
                    <Icon size="s">
                        <ArrowUpRightFromSquare />
                    </Icon>
                </Button>
            )}

            <Button
                onClick={() => setIsModalOpen(true)}
                view={isSaved ? 'success' : 'danger'}
            >
                {isSaved ? text.saved.en : text.modified.en}
            </Button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className={styles.modalContent}>
                    <Text variant="body">
                        {JSON.stringify(pageConfig, null, 4)}
                    </Text>
                </div>
            </Modal>

            <Button view="action" disabled={isLoading} onClick={onButtonClick}>
                {text.savePage.en || 'loading...'}
            </Button>
        </div>
    );
};
