import {
    FC,
    FormEventHandler,
    PropsWithChildren,
    useEffect,
    useState,
} from 'react';

import { Plus } from '@gravity-ui/icons';

import styles from './CreatePage.module.css';

import { writePageServerAction } from '@/app/actions/pages/save';

import { Button, Icon, Modal, Text, TextInput } from '@/shared/components';
import { Navigation } from '@/shared/components/Navigation';
import {
    DefaultPageHeight,
    DefaultPageName,
    DefaultPageUnitSize,
    DefaultPageWidth,
} from '@/shared/constants/defaultPageParams';

import { text } from './CreatePage.localization';

export const CreatePage: FC<PropsWithChildren> = ({ children }) => {
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
        <div className={styles.root}>
            <Navigation
                userPicProps={{
                    imgUrl: 'https://storage.yandexcloud.net/k-ai-public/iam.jpg',
                }}
            />
            <div>
                <Button view="action" onClick={() => setIsModalOpen(true)}>
                    <Icon size="s">
                        <Plus />
                    </Icon>
                    {text.page.en}
                </Button>

                {children}

                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                >
                    <form onSubmit={onFormSubmit} className={styles.form}>
                        <Text variant="title">{text.newPageFormTitle.en}</Text>
                        <TextInput
                            value={pageId}
                            onChange={(event) =>
                                setPageId(event.currentTarget.value)
                            }
                            name="pageId"
                            label={text.pageIdLabel.en}
                        />
                        <div className={styles.formControls}>
                            {error && <Text variant="body">{error}</Text>}
                            <Button
                                disabled={isLoading}
                                view="action"
                                type="submit"
                            >
                                {text.submitButtonText.en}
                            </Button>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
};
