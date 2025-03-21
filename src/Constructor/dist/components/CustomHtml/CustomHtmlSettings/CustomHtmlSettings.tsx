import { FC } from 'react';

import { TextArea, TextInput } from '@gravity-ui/uikit';

import styles from './CustomHtmlSettings.module.css';

import { CustomHTMLComponent } from '@/shared/types/UiComponents';

import { CustomHtmlProps } from '@/Renderer/dist/components/CustomHtml';

import { text } from './CustomHtmlSettings.localization';

export type CustomHtmlSettingsProps = {
    widgetData: Partial<CustomHTMLComponent>;
    onSectionParamsChange: (data: CustomHtmlProps) => void;
    onCommonParamsChange: (data: Partial<CustomHTMLComponent>) => void;
};

export const CustomHtmlSettings: FC<CustomHtmlSettingsProps> = ({
    onSectionParamsChange,
    onCommonParamsChange,
    widgetData,
}) => {
    return (
        <div className={styles.root}>
            <TextInput
                label={text.sectionName.en}
                onChange={(event) => {
                    onCommonParamsChange({
                        name: event.currentTarget.value || widgetData?.name,
                    });
                }}
                defaultValue={widgetData?.name}
                placeholder="Section name"
            />

            <TextInput
                label={text.rootClassName.en}
                onChange={(event) => {
                    onSectionParamsChange({
                        rootClassName:
                            event.currentTarget.value ||
                            widgetData?.params?.rootClassName,
                    });
                }}
                defaultValue={widgetData?.params?.rootClassName}
                placeholder="class name"
            />

            <TextArea
                onChange={(event) =>
                    onSectionParamsChange({
                        content:
                            event.currentTarget.value ||
                            widgetData?.params?.content,
                    })
                }
                className={styles.content}
                defaultValue={widgetData?.params?.content}
                placeholder="content"
                minRows={20}
                maxRows={35}
                note={text.textAreaNote.en}
            />
        </div>
    );
};
