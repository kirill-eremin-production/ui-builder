import { FC, useEffect } from 'react';

import { TrashBin } from '@gravity-ui/icons';
import { Button, Icon, Text } from '@gravity-ui/uikit';

import { useAtom } from 'jotai';

import styles from './SectionsTree.module.css';

import { selectedWidgetIdToEditAtom } from '@/Constructor/state/selection';
import { uiComponentsAtom } from '@/Renderer/state/ui';
import { useUiComponents } from '@/Renderer/state/ui/hooks/use-ui-components';

import { text } from './SectionsTree.localization';

export type SectionsTreeProps = {};

export const SectionsTree: FC<SectionsTreeProps> = (props) => {
    const { uiComponents, removeUiComponent } = useUiComponents();
    const [selectedWidgetIdToEdit, setSelectedWidgetIdToEdit] = useAtom(
        selectedWidgetIdToEditAtom
    );

    return (
        <div>
            <div className={styles.header}>
                <Text variant="header-1">{text.sectionTreeTitle.en}</Text>
            </div>

            <div className={styles.sectionsList}>
                {Object.entries(uiComponents).map(
                    ([sectionId, sectionConfig]) => {
                        return (
                            <div className={styles.element} key={sectionId}>
                                <Button
                                    view="outlined"
                                    width="max"
                                    disabled={
                                        sectionId === selectedWidgetIdToEdit
                                    }
                                    onClick={() =>
                                        setSelectedWidgetIdToEdit(sectionId)
                                    }
                                >
                                    {sectionConfig.name || sectionConfig.type}
                                </Button>
                                <Button
                                    view="outlined-danger"
                                    onClick={() => removeUiComponent(sectionId)}
                                    key={sectionId}
                                >
                                    <Icon data={TrashBin} />
                                </Button>
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
};
