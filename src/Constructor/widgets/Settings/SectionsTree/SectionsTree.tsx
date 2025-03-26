import { FC, useEffect } from 'react';

import { TrashBin } from '@gravity-ui/icons';

import { useAtom } from 'jotai';

import styles from './SectionsTree.module.css';

import { Button, Icon, Text } from '@/shared/components';

import { selectedWidgetIdToEditAtom } from '@/Constructor/state/selection';
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
                <Text variant="title">{text.sectionTreeTitle.en}</Text>
            </div>

            <div className={styles.sectionsList}>
                {Object.entries(uiComponents).map(
                    ([sectionId, sectionConfig]) => {
                        return (
                            <div className={styles.element} key={sectionId}>
                                <Button
                                    view="outlined"
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
                                    <Icon size="s">
                                        <TrashBin />
                                    </Icon>
                                </Button>
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
};
