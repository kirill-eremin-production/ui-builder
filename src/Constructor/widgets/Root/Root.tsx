'use client';

import { FC, useEffect } from 'react';

import { useAtomValue, useSetAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

import styles from './Root.module.css';

import { PageConfig } from '@/shared/types/PageConfig';

import { ComponentsMenu } from '@/Constructor/widgets/ComponentsMenu';
import { SettingsMenu } from '@/Constructor/widgets/SettingsMenu';

import { Layout } from '@/Constructor/components/Layout';
import {
    pageIdAtom,
    pageMinHeightAtom,
    pageNameAtom,
    pageWidthAtom,
} from '@/Constructor/state/page-config';
import { requestsApiAtom } from '@/Constructor/state/requests';
import { widgetTypeToAddOnCanvasAtom } from '@/Constructor/state/selection';
import { PageCanvas } from '@/Renderer/components/PageCanvas';
import { pageUnitSizeAtom } from '@/Renderer/state/page';
import { uiComponentsAtom } from '@/Renderer/state/ui';

export type RootProps = {
    initialPageConfig?: PageConfig;
};

export const RootComponent: FC<RootProps> = ({ initialPageConfig }) => {
    useHydrateAtoms([
        [pageIdAtom, initialPageConfig?.id || ''],
        [uiComponentsAtom, initialPageConfig?.ui || {}],
        [pageUnitSizeAtom, initialPageConfig?.unitSize || 4],
        [pageWidthAtom, initialPageConfig?.width || 1024],
        [pageMinHeightAtom, initialPageConfig?.minHeight || 1024],
        [pageNameAtom, initialPageConfig?.name || ''],
        [requestsApiAtom, initialPageConfig?.requests || {}],
    ]);

    const setWidgetTypeToAddOnCanvas = useSetAtom(widgetTypeToAddOnCanvasAtom);
    const uiComponents = useAtomValue(uiComponentsAtom);
    const pageUnitSize = useAtomValue(pageUnitSizeAtom);
    const pageWidth = useAtomValue(pageWidthAtom);
    const pageMinHeight = useAtomValue(pageMinHeightAtom);
    const pageName = useAtomValue(pageNameAtom);
    const requestsApi = useAtomValue(requestsApiAtom);

    useEffect(() => {
        const onMouseUpHandler = () => {
            setWidgetTypeToAddOnCanvas(null);
        };

        window.addEventListener('mouseup', onMouseUpHandler);

        return () => {
            window.removeEventListener('mouseup', onMouseUpHandler);
        };
    }, [setWidgetTypeToAddOnCanvas]);

    return (
        <Layout
            firstColumn={<ComponentsMenu />}
            secondColumn={
                <div className={styles.canvas}>
                    <PageCanvas
                        config={{
                            width: pageWidth,
                            minHeight: pageMinHeight,
                            name: pageName,
                            unitSize: pageUnitSize,
                            ui: uiComponents,
                            requests: requestsApi,
                        }}
                        width={pageWidth}
                        minHeight={pageMinHeight}
                    />
                </div>
            }
            thirdColumn={<SettingsMenu />}
        />
    );
};

export const Root: FC<RootProps> = (props) => {
    return <RootComponent {...props} />;
};
