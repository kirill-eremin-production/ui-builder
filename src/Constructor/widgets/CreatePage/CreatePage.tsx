import { FC, FormEventHandler, useEffect, useState } from 'react';

import { Plus } from '@gravity-ui/icons';
import { Button, Icon, Modal, Text, TextInput } from '@gravity-ui/uikit';

import styles from './CreatePage.module.css';

import { writePageServerAction } from '@/app/actions/pages/save';

import {
    DefaultPageHeight,
    DefaultPageName,
    DefaultPageUnitSize,
    DefaultPageWidth,
} from '@/shared/constants/defaultPageParams';

import { text } from './CreatePage.localization';

export const CreatePage: FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [pageId, _setPageId] = useState('');
    const [pageRenderUrl, _setPageRenderUrl] = useState('');

    const setPageId = (value: string) => {
        const modifiedValue = value.trim();
        _setPageId(modifiedValue);
        _setPageRenderUrl(`${window.location.origin}/edit/${modifiedValue}`);
    };

    useEffect(() => {
        setPageId('');
    }, []);

    const onFormSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        if (isLoading) return;

        if (!pageId) {
            setError(text.incorrectPageIdErrorMessage.en);
            return;
        }

        setIsLoading(true);

        const createNewPageResponse = await writePageServerAction({
            page: {
                id: pageId,
                name: DefaultPageName,
                width: DefaultPageWidth,
                minHeight: DefaultPageHeight,
                unitSize: DefaultPageUnitSize,
                ui: {},
            },
            id: pageId,
        });

        if (createNewPageResponse.pageId) {
            return window.open(pageRenderUrl, '_self');
        }

        setIsLoading(false);
        setError(text.failedToCreateNewPageErrorMessage.en);
    };

    return (
        <div>
            <Button view="action" onClick={() => setIsModalOpen(true)}>
                <Icon data={Plus} />
                {text.page.en}
            </Button>

            <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
                <form onSubmit={onFormSubmit} className={styles.form}>
                    <Text variant="header-1">{text.newPageFormTitle.en}</Text>
                    <TextInput
                        value={pageId}
                        onUpdate={setPageId}
                        name="pageId"
                        label={text.pageIdLabel.en}
                        note={pageRenderUrl}
                    />
                    <div className={styles.formControls}>
                        {error && (
                            <Text variant="caption-1" color="danger">
                                {error}
                            </Text>
                        )}
                        <Button loading={isLoading} view="action" type="submit">
                            {text.submitButtonText.en}
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};
