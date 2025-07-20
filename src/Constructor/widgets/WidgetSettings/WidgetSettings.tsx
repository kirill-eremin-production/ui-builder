import { FC } from 'react';

import { useAtom } from 'jotai';

import styles from './WidgetSettings.module.css';

import { Text } from '@/shared/components';

import { CustomHtmlSettings } from '@/Constructor/dist/components/CustomHtml/CustomHtmlSettings';
import { selectedWidgetIdToEditAtom } from '@/Constructor/state/selection';
import { WidgetType } from '@/Renderer/dist/components/widgetType';
import { uiComponentsAtom } from '@/Renderer/state/ui';

import { text } from './WidgetSettings.localization';

export type WidgetSettingsProps = Record<string, never>;

export const mapWidgetTypeToSettingsComponent: Record<
    WidgetType,
    React.ComponentType<{
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        widgetData: any;
        onSectionParamsChange: (params: Record<string, unknown>) => void;
        onCommonParamsChange: (params: Record<string, unknown>) => void;
    }> | null
> = {
    Container: null,
    CustomHTML: CustomHtmlSettings,
};

export const WidgetSettings: FC<WidgetSettingsProps> = () => {
    const [selectedWidgetIdToEdit] = useAtom(selectedWidgetIdToEditAtom);
    const [uiComponents, setUiComponents] = useAtom(uiComponentsAtom);

    if (!selectedWidgetIdToEdit) {
        return null;
    }

    const selectedWidgetToEdit = uiComponents[selectedWidgetIdToEdit];

    const onSectionParamsChange = (params: Record<string, unknown>) => {
        setUiComponents((prevState) => {
            return {
                ...prevState,
                [selectedWidgetIdToEdit]: {
                    ...prevState[selectedWidgetIdToEdit],
                    params: {
                        // @ts-expect-error - params structure may not match exactly but is handled at runtime
                        ...prevState[selectedWidgetIdToEdit].params,
                        ...params,
                    },
                },
            };
        });
    };

    const onCommonParamsChange = (params: Record<string, unknown>) => {
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
            <Text variant="title">{text.sectionParamsTitle.en}</Text>
            {(() => {
                const SettingsComponent =
                    mapWidgetTypeToSettingsComponent[selectedWidgetToEdit.type];
                return SettingsComponent ? (
                    <SettingsComponent
                        widgetData={selectedWidgetToEdit}
                        onSectionParamsChange={onSectionParamsChange}
                        onCommonParamsChange={onCommonParamsChange}
                    />
                ) : null;
            })()}
        </div>
    );
};
