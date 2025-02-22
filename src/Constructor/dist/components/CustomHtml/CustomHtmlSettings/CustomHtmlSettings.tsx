import { FC } from 'react';

import styles from './CustomHtmlSettings.module.css';

import { CustomHtmlProps } from '@/Renderer/dist/components/CustomHtml';

import { text } from './CustomHtmlSettings.localization';

export type CustomHtmlSettingsProps = {
    widgetData: { params?: CustomHtmlProps };
    onChange: (data: CustomHtmlProps) => void;
};

export const CustomHtmlSettings: FC<CustomHtmlSettingsProps> = ({
    onChange,
    widgetData,
}) => {
    console.log(widgetData);

    return (
        <div>
            <label>
                Class name
                <input
                    onChange={(event) => {
                        onChange({
                            rootClassName:
                                event.currentTarget.value ||
                                widgetData?.params?.rootClassName,
                        });
                    }}
                    defaultValue={widgetData?.params?.rootClassName}
                    placeholder="class name"
                />
            </label>

            <textarea
                onChange={(event) =>
                    onChange({
                        content:
                            event.currentTarget.value ||
                            widgetData?.params?.content,
                    })
                }
                className={styles.content}
                defaultValue={widgetData?.params?.content}
                placeholder="content"
            />
        </div>
    );
};
