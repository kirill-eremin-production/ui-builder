import {
    CSSProperties,
    HTMLAttributes,
    MouseEventHandler,
    forwardRef,
} from 'react';

import { useAtom, useSetAtom } from 'jotai';

import styles from './PageCanvas.module.css';

import { PageConfig } from '@/shared/types/PageConfig';

import { UiNode } from '@/Renderer/widgets/UiNode';

import { widgetTypeToAddOnCanvasAtom } from '@/Constructor/state/selection';
import { uiComponentsAtom } from '@/Renderer/state/ui';

export type PageCanvasProps = {
    // Ширина страницы
    width: number;

    config: PageConfig;
};

export const PageCanvas = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & PageCanvasProps
>(({ width, config }, ref) => {
    const [widgetTypeToAddOnCanvas, setWidgetTypeToAddOnCanvas] = useAtom(
        widgetTypeToAddOnCanvasAtom
    );
    const setUiComponents = useSetAtom(uiComponentsAtom);

    const rootStyle: CSSProperties = {
        width: `${width}px`,
    };

    const onMouseUp: MouseEventHandler<HTMLDivElement> = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!widgetTypeToAddOnCanvas) {
            return;
        }

        const date = new Date().getTime();
        setUiComponents((prevState) => ({
            ...prevState,
            [date]: {
                id: date,
                type: widgetTypeToAddOnCanvas,
                text: 'Container',
            },
        }));

        setWidgetTypeToAddOnCanvas(null);
    };

    return (
        <div ref={ref} className={styles.root}>
            <div
                data-testid="mainPageCanvas"
                className={styles.content}
                style={rootStyle}
                onMouseUp={onMouseUp}
            >
                <UiNode ui={config.ui} />
            </div>
        </div>
    );
});

PageCanvas.displayName = 'PageCanvas';
