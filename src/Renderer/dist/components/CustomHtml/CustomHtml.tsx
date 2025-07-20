import { FC } from 'react';

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
