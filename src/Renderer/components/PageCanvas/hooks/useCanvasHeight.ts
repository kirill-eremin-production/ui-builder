import { useMemo } from 'react';
import { UiComponent } from '@/shared/types/UiComponents';

export const useCanvasHeight = (
    uiComponents: Record<string, UiComponent>,
    minHeight: number
): number => {
    const canvasHeight = useMemo(() => {
        const widgetYEndPositions = Object.entries(uiComponents).map(
            ([, widget]) => {
                return widget.y + widget.height;
            }
        );

        return Math.max(...widgetYEndPositions, minHeight);
    }, [uiComponents, minHeight]);

    return canvasHeight;
};