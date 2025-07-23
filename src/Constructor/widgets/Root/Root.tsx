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
    breakpointsAtom,
    effectivePageMinHeightAtom,
    effectivePageWidthAtom,
    effectiveScreenWidthAtom,
} from '@/Constructor/state/breakpoints';
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
import {
    breakpointUiComponentsAtom,
    uiComponentsAtom,
} from '@/Renderer/state/ui';
import { useUiComponents } from '@/Renderer/state/ui/hooks/use-ui-components';

export type RootProps = {
    initialPageConfig?: PageConfig;
};

export const RootComponent: FC<RootProps> = ({ initialPageConfig }) => {
    // Используем baseConfig для инициализации атомов
    const baseConfig = initialPageConfig?.baseConfig;

    // Извлекаем UI компоненты из брейкпоинтов
    const breakpointUiComponents: Record<number, any> = {};
    initialPageConfig?.breakpoints?.forEach((breakpoint, index) => {
        if (breakpoint.config.ui) {
            breakpointUiComponents[index] = breakpoint.config.ui;
        }
    });

    useHydrateAtoms([
        [pageIdAtom, initialPageConfig?.id || ''],
        [uiComponentsAtom, baseConfig?.ui || {}],
        [breakpointUiComponentsAtom, breakpointUiComponents],
        [pageUnitSizeAtom, baseConfig?.unitSize || 4],
        [pageWidthAtom, baseConfig?.width || 1024],
        [pageMinHeightAtom, baseConfig?.minHeight || 1024],
        [pageNameAtom, initialPageConfig?.name || ''],
        [requestsApiAtom, initialPageConfig?.requests || {}],
        [breakpointsAtom, initialPageConfig?.breakpoints || []],
    ]);

    const setWidgetTypeToAddOnCanvas = useSetAtom(widgetTypeToAddOnCanvasAtom);
    const { uiComponents } = useUiComponents();
    const pageUnitSize = useAtomValue(pageUnitSizeAtom);
    const basePageWidth = useAtomValue(pageWidthAtom);
    const basePageMinHeight = useAtomValue(pageMinHeightAtom);
    const effectivePageWidth = useAtomValue(effectivePageWidthAtom);
    const effectivePageMinHeight = useAtomValue(effectivePageMinHeightAtom);
    const effectiveScreenWidth = useAtomValue(effectiveScreenWidthAtom);
    const pageName = useAtomValue(pageNameAtom);
    const requestsApi = useAtomValue(requestsApiAtom);
    const breakpoints = useAtomValue(breakpointsAtom);

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
                            id: initialPageConfig?.id,
                            name: pageName,
                            baseConfig: {
                                width: basePageWidth,
                                minHeight: basePageMinHeight,
                                unitSize: pageUnitSize,
                                ui: uiComponents,
                            },
                            breakpoints,
                            requests: requestsApi,
                        }}
                        width={effectivePageWidth}
                        minHeight={effectivePageMinHeight}
                        constructorScreenWidth={effectiveScreenWidth}
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
