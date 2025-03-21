import { FC, ReactNode } from 'react';

import { Text } from '@gravity-ui/uikit';

import { useAtom } from 'jotai';

import styles from './WidgetSettings.module.css';

import { CustomHtmlSettings } from '@/Constructor/dist/components/CustomHtml/CustomHtmlSettings';
import { selectedWidgetIdToEditAtom } from '@/Constructor/state/selection';
import { WidgetType } from '@/Renderer/dist/components/widgetType';
import { uiComponentsAtom } from '@/Renderer/state/ui';

import { text } from './WidgetSettings.localization';

export type WidgetSettingsProps = {};

export const mapWidgetTypeToSettingsComponent: Record<WidgetType, any> = {
    Container: null,
    CustomHTML: CustomHtmlSettings,
};

export const WidgetSettings: FC<WidgetSettingsProps> = (props) => {
    const [selectedWidgetIdToEdit] = useAtom(selectedWidgetIdToEditAtom);
    const [uiComponents, setUiComponents] = useAtom(uiComponentsAtom);

    if (!selectedWidgetIdToEdit) {
        return null;
    }

    const selectedWidgetToEdit = uiComponents[selectedWidgetIdToEdit];

    const onSectionParamsChange = (params: any) => {
        setUiComponents((prevState) => {
            return {
                ...prevState,
                [selectedWidgetIdToEdit]: {
                    ...prevState[selectedWidgetIdToEdit],
                    params: {
                        // @ts-expect-error
                        ...prevState[selectedWidgetIdToEdit].params,
                        ...params,
                    },
                },
            };
        });
    };

    const onCommonParamsChange = (params: any) => {
        setUiComponents((prevState) => {
            return {
                ...prevState,
                [selectedWidgetIdToEdit]: {
                    ...prevState[selectedWidgetIdToEdit],
                    ...params,
                },
            };
        });
    };

    return (
        <div className={styles.root} key={selectedWidgetIdToEdit}>
            <Text variant="header-1">{text.sectionParamsTitle.en}</Text>
            {mapWidgetTypeToSettingsComponent[selectedWidgetToEdit.type]
                ? mapWidgetTypeToSettingsComponent[selectedWidgetToEdit.type]({
                      widgetData: selectedWidgetToEdit,
                      onSectionParamsChange,
                      onCommonParamsChange,
                  })
                : null}
        </div>
    );
};
