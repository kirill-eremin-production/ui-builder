import { CSSProperties, HTMLAttributes, forwardRef, useMemo } from 'react';

import cn from 'classnames';

import styles from './PageCanvas.module.css';

import { useTheme } from '@/shared/state/theme/hooks';
import { PageConfig, getConfigForWidth } from '@/shared/types/PageConfig';

import { UiNode } from '@/Renderer/widgets/UiNode';

import { useUiComponents } from '@/Renderer/state/ui/hooks/use-ui-components';

import { useCanvasHeight, useMouseHandlers, useWindowSize } from './hooks';

export type PageCanvasProps = {
    // Ширина страницы
    width: number;
    // Минимальная ширина страницы
    minHeight: number;

    config: PageConfig;

    isRenderMode?: boolean;

    // Эффективная ширина экрана для режима конструктора (для getConfigForWidth)
    constructorScreenWidth?: number;
};

export const PageCanvas = forwardRef<
    HTMLDivElement,
    HTMLAttributes<HTMLDivElement> & PageCanvasProps
>(({ width, minHeight, config, isRenderMode, constructorScreenWidth }, ref) => {
    const { isDark } = useTheme();
    const { uiComponents } = useUiComponents();
    const { width: windowWidth } = useWindowSize();

    // Получаем конфиг для текущей ширины экрана
    // В режиме конструктора используем переданную ширину экрана для определения активного брейкпоинта
    // В режиме рендера используем реальную ширину окна браузера (отслеживаем изменения через хук)
    const currentConfig = useMemo(() => {
        const screenWidth = isRenderMode
            ? windowWidth
            : (constructorScreenWidth ?? width);
        return getConfigForWidth(config, screenWidth);
    }, [
        config,
        isRenderMode,
        windowWidth,
        constructorScreenWidth,
        width,
        uiComponents,
    ]);

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
                <UiNode ui={uiComponents} />
            </div>
        </div>
    );
});

PageCanvas.displayName = 'PageCanvas';
