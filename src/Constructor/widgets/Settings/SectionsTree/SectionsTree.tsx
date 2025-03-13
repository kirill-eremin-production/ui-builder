import { FC } from 'react';

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
            Sections tree
            <div className={styles.sectionsList}>
                {Object.entries(uiComponents).map(
                    ([sectionId, sectionConfig]) => {
                        return (
                            <div key={sectionId}>
                                <button
                                    disabled={
                                        sectionId === selectedWidgetIdToEdit
                                    }
                                    onClick={() =>
                                        setSelectedWidgetIdToEdit(sectionId)
                                    }
                                >
                                    {sectionConfig.type}
                                </button>
                                <button
                                    onClick={() => removeUiComponent(sectionId)}
                                    key={sectionId}
                                >
                                    Delete
                                </button>
                            </div>
                        );
                    }
                )}
            </div>
        </div>
    );
};
