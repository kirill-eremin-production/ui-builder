'use client';

import { FC, useEffect } from 'react';

import { useAtomValue, useSetAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';

import styles from './Root.module.css';

import { PageConfig } from '@/shared/types/PageConfig';

import { ComponentsMenu } from '@/Constructor/widgets/ComponentsMenu';
import { SettingsMenu } from '@/Constructor/widgets/SettingsMenu';

import { Layout } from '@/Constructor/components/Layout';
import { pageIdAtom } from '@/Constructor/state/page-config';
import { widgetTypeToAddOnCanvasAtom } from '@/Constructor/state/selection';
import { PageCanvas } from '@/Renderer/components/PageCanvas';
import { pageUnitSizeAtom } from '@/Renderer/state/page';
import { uiComponentsAtom } from '@/Renderer/state/ui';

export type RootProps = {
    initialPageConfig?: PageConfig;
};

export const RootComponent: FC<RootProps> = ({ initialPageConfig }) => {
    useHydrateAtoms([
        [pageIdAtom, initialPageConfig?.id || null],
        [uiComponentsAtom, initialPageConfig?.ui || {}],
        [pageUnitSizeAtom, initialPageConfig?.unitSize || 4],
    ]);

    const setWidgetTypeToAddOnCanvas = useSetAtom(widgetTypeToAddOnCanvasAtom);
    const uiComponents = useAtomValue(uiComponentsAtom);
    const pageUnitSize = useAtomValue(pageUnitSizeAtom);

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
                            unitSize: pageUnitSize,
                            ui: uiComponents,
                        }}
                        width={1024}
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
