import { FC } from 'react';

import { useSetAtom } from 'jotai';

import { widgetTypeToAddOnCanvasAtom } from '@/Constructor/state/selection';

export type ContainerProps = object;

export const Container: FC<ContainerProps> = () => {
    const setWidgetTypeToAddOnCanvas = useSetAtom(widgetTypeToAddOnCanvasAtom);

    return (
        <button
            data-testid="button_addToCanvas__widget_container"
            onMouseDown={() => setWidgetTypeToAddOnCanvas('Container')}
        >
            Container
        </button>
    );
};
