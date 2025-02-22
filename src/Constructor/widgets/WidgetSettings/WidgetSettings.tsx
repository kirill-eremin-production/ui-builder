import { FC, ReactNode } from 'react';

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

    const onSettingsChange = (params: any) => {
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

    return (
        <div key={selectedWidgetIdToEdit}>
            {mapWidgetTypeToSettingsComponent[selectedWidgetToEdit.type]
                ? mapWidgetTypeToSettingsComponent[selectedWidgetToEdit.type]({
                      widgetData: selectedWidgetToEdit,
                      onChange: onSettingsChange,
                  })
                : null}
        </div>
    );
};
