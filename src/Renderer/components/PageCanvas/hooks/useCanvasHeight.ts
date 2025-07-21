import { useMemo } from 'react';
import { UiComponent } from '@/shared/types/UiComponents';

export const useCanvasHeight = (
    uiComponents: Record<string, UiComponent>,
    minHeight: number // в пикселях
): number => {
    const canvasHeight = useMemo(() => {
        // Конвертируем минимальную высоту из пикселей в rem
        const minHeightRem = minHeight / 16;
        
        const widgetYEndPositions = Object.entries(uiComponents).map(
            ([, widget]) => {
                // widget.y и widget.height уже в rem
                return widget.y + widget.height;
            }
        );

        // Находим максимальную высоту в rem
        const maxHeightRem = Math.max(...widgetYEndPositions, minHeightRem);
        
        // Конвертируем обратно в пиксели для установки высоты канваса
        return maxHeightRem * 16;
    }, [uiComponents, minHeight]);

    return canvasHeight;
};