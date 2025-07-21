import { CSSProperties, HTMLAttributes, forwardRef } from 'react';

import cn from 'classnames';
import { useAtomValue } from 'jotai';

import styles from './PageCanvas.module.css';

import { useTheme } from '@/shared/state/theme/hooks';
import { PageConfig } from '@/shared/types/PageConfig';

import { UiNode } from '@/Renderer/widgets/UiNode';

import { uiComponentsAtom } from '@/Renderer/state/ui';

import { useCanvasHeight, useMouseHandlers } from './hooks';

export type PageCanvasProps = {
    // Ширина страницы
    width: number;
    // Минимальная ширина страницы
    minHeight: number;

    config: PageConfig;

    isRenderMode?: boolean;
};

export const PageCanvas = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & PageCanvasProps
>(({ width, minHeight, config, isRenderMode }, ref) => {
    const { isDark } = useTheme();
    const uiComponents = useAtomValue(uiComponentsAtom);

    // Используем хук для вычисления высоты канваса
    const canvasHeight = useCanvasHeight(uiComponents, minHeight);

    // Используем хук для обработчиков мыши
    const { onMouseMove, onMouseLeave, onMouseUp } = useMouseHandlers({
        canvasWidth: width,
    });

    const rootStyle: CSSProperties = {
        maxWidth: `${width}px`,
        width: isRenderMode ? '100%' : `${width}px`,
        height: canvasHeight ? `${canvasHeight}px` : undefined,
    };

    if (typeof window === 'undefined') {
        return null;
    }

    if (isRenderMode) {
        return (
            <div
                data-testid="mainPageCanvas"
                className={styles.content}
                style={rootStyle}
            >
                <UiNode isRenderMode={isRenderMode} ui={config.ui} />
            </div>
        );
    }

    return (
        <div
            ref={ref}
            className={cn(styles.root, {
                [styles.theme_dark]: isDark,
            })}
        >
            <div
                data-testid="mainPageCanvas"
                className={styles.content}
                style={rootStyle}
                onMouseUp={onMouseUp}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
            >
                <UiNode ui={config.ui} />
            </div>
        </div>
    );
});

PageCanvas.displayName = 'PageCanvas';
