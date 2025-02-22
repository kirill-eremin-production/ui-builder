import { FC } from 'react';

import { useSetAtom } from 'jotai/index';

import styles from './CustomHtml.module.css';

import { widgetTypeToAddOnCanvasAtom } from '@/Constructor/state/selection';

import { text } from './CustomHtml.localization';

export type CustomHtmlProps = {};

export const CustomHtml: FC<CustomHtmlProps> = (props) => {
    const setWidgetTypeToAddOnCanvas = useSetAtom(widgetTypeToAddOnCanvasAtom);

    return (
        <button
            data-testid="button_addToCanvas__widget_CustomHTML"
            onMouseDown={() => setWidgetTypeToAddOnCanvas('CustomHTML')}
        >
            {text.customHTML.en}
        </button>
    );
};
