import { FC } from 'react';

import { Text, TextInput } from '@gravity-ui/uikit';

import { useAtom } from 'jotai';

import styles from './PageSettings.module.css';

import { SavePageButton } from '@/Constructor/widgets/Settings/SavePageButton';

import {
    pageIdAtom,
    pageMinHeightAtom,
    pageNameAtom,
    pageWidthAtom,
} from '@/Constructor/state/page-config';

import { text } from './PageSettings.localization';

export type PageSettingsProps = {};

export const PageSettings: FC<PageSettingsProps> = (props) => {
    const [pageWidth, setPageWidth] = useAtom(pageWidthAtom);
    const [pageMinHeight, setPageMinHeight] = useAtom(pageMinHeightAtom);
    const [pageName, setPageName] = useAtom(pageNameAtom);
    const [pageId, setPageId] = useAtom(pageIdAtom);

    return (
        <div className={styles.root}>
            <SavePageButton />

            <Text variant="header-1">{text.pageSettingsTitle.en}</Text>

            <TextInput
                label={text.pageId.en}
                type="text"
                value={pageId}
                onChange={(event) => setPageId(event.currentTarget.value)}
            />

            <TextInput
                label={text.pageName.en}
                type="text"
                value={pageName}
                onChange={(event) => setPageName(event.currentTarget.value)}
            />

            <TextInput
                label={text.pageWidth.en}
                type="number"
                value={String(pageWidth) || ''}
                onChange={(event) =>
                    setPageWidth(Number(event.currentTarget.value) || 0)
                }
            />

            <TextInput
                label={text.minPageHeight.en}
                type="text"
                value={pageMinHeight === 0 ? '100%' : String(pageMinHeight)}
                onChange={(event) =>
                    setPageMinHeight(Number(event.currentTarget.value) || 0)
                }
            />
        </div>
    );
};
