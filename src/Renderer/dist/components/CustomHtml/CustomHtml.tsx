import { FC } from 'react';

import { useSetAtom } from 'jotai/index';

import styles from './CustomHtml.module.css';

import { widgetTypeToAddOnCanvasAtom } from '@/Constructor/state/selection';

import { text } from './CustomHtml.localization';

export type CustomHtmlProps = {
    rootClassName?: string;
    content?: string;
};

export const CustomHtml: FC<CustomHtmlProps> = ({
    content = '',
    rootClassName = '',
}) => {
    return (
        <div
            className={rootClassName}
            data-testid="pageCanvas__widget_CustomHTML"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};
