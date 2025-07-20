import { FC } from 'react';

import { useAtom } from 'jotai';

import styles from './PageSettings.module.css';

import { Text, TextInput } from '@/shared/components';

import { SavePageButton } from '@/Constructor/widgets/Settings/SavePageButton';

import {
    pageIdAtom,
    pageMinHeightAtom,
    pageNameAtom,
    pageWidthAtom,
} from '@/Constructor/state/page-config';

import { text } from './PageSettings.localization';

export type PageSettingsProps = Record<string, never>;

export const PageSettings: FC<PageSettingsProps> = () => {
    const [pageWidth, setPageWidth] = useAtom(pageWidthAtom);
    const [pageMinHeight, setPageMinHeight] = useAtom(pageMinHeightAtom);
    const [pageName, setPageName] = useAtom(pageNameAtom);
    const [pageId, setPageId] = useAtom(pageIdAtom);

    return (
        <div className={styles.root}>
            <SavePageButton />

            <Text variant="title">{text.pageSettingsTitle.en}</Text>

            <TextInput
                label={text.pageId.en}
                value={pageId}
                onChange={(event) => setPageId(event.currentTarget.value)}
            />

            <TextInput
                label={text.pageName.en}
                value={pageName}
                onChange={(event) => setPageName(event.currentTarget.value)}
            />

            <TextInput
                label={text.pageWidth.en}
                value={String(pageWidth) || ''}
                onChange={(event) =>
                    setPageWidth(Number(event.currentTarget.value) || 0)
                }
            />

            <TextInput
                label={text.minPageHeight.en}
                value={pageMinHeight === 0 ? '100%' : String(pageMinHeight)}
                onChange={(event) =>
                    setPageMinHeight(Number(event.currentTarget.value) || 0)
                }
            />
        </div>
    );
};
