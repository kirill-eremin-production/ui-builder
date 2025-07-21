import { CSSProperties, HTMLAttributes, forwardRef } from 'react';

import cn from 'classnames';
import { useAtomValue } from 'jotai';

import styles from './PageCanvas.module.css';

import { useTheme } from '@/shared/state/theme/hooks';
import { PageConfig, getConfigForWidth } from '@/shared/types/PageConfig';

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

    // Получаем конфиг для текущей ширины экрана
    const currentConfig = getConfigForWidth(
        config,
        isRenderMode ? window.innerWidth : width
    );

    // В режиме конструктора используем переданные width и minHeight
    // В режиме рендера используем значения из текущего конфига
    const effectiveWidth = isRenderMode ? currentConfig.width : width;
    const effectiveMinHeight = isRenderMode
        ? currentConfig.minHeight
        : minHeight;

    // Используем хук для вычисления высоты канваса
    const canvasHeight = useCanvasHeight(uiComponents, effectiveMinHeight);

    // Используем хук для обработчиков мыши
    const { onMouseMove, onMouseLeave, onMouseUp } = useMouseHandlers({
        canvasWidth: effectiveWidth,
    });

    const rootStyle: CSSProperties = {
        maxWidth: `${effectiveWidth}px`,
        width: isRenderMode ? '100%' : `${effectiveWidth}px`,
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
                <UiNode isRenderMode={isRenderMode} ui={currentConfig.ui} />
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
                <UiNode ui={currentConfig.ui} />
            </div>
        </div>
    );
});

PageCanvas.displayName = 'PageCanvas';
