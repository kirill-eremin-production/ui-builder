import { FC } from 'react';

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
            <h2>{text.pageSettingsTitle.en}</h2>

            <label>
                {text.pageId.en}
                <input
                    type="text"
                    value={pageId}
                    onChange={(event) => setPageId(event.currentTarget.value)}
                />
            </label>

            <label>
                {text.pageName.en}
                <input
                    type="text"
                    value={pageName}
                    onChange={(event) => setPageName(event.currentTarget.value)}
                />
            </label>

            <label>
                {text.pageWidth.en}
                <input
                    type="number"
                    value={pageWidth || ''}
                    onChange={(event) =>
                        setPageWidth(Number(event.currentTarget.value) || 0)
                    }
                />
            </label>

            <label>
                {text.minPageHeight.en}
                <input
                    type="string"
                    value={pageMinHeight === 0 ? '100%' : pageMinHeight}
                    onChange={(event) =>
                        setPageMinHeight(Number(event.currentTarget.value) || 0)
                    }
                />
            </label>

            <SavePageButton />
        </div>
    );
};
