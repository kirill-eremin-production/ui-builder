'use client';

import { FC, useState } from 'react';

import { useRouter } from 'next/navigation';

import { Button, TextArea, TextInput } from '@/shared/components';

import { ApiRequest } from '@/Constructor/state/requests/RequestAPI';
import { useApiRequests } from '@/Constructor/state/requests/hooks/use-api-requests';

export type RequestEditorProps = {
    pageId: string;
    // id редактируемого запроса
    requestId?: string;
};

export const RequestEditor: FC<RequestEditorProps> = ({
    pageId,
    requestId: draftRequestId,
}) => {
    const requestId = draftRequestId !== 'add' ? draftRequestId : undefined;
    const router = useRouter();

    const { apiRequests, saveApiRequest } = useApiRequests();
    const savedApiRequest = !requestId ? undefined : apiRequests[requestId];

    const [requestName, setRequestName] = useState(
        savedApiRequest?.name || requestId || ''
    );
    const [requestMethod, setRequestMethod] = useState(
        savedApiRequest?.settings?.method || 'GET'
    );
    const [requestURL, setRequestURL] = useState(
        savedApiRequest?.settings?.url || 'https://'
    );
    const [requestBody, setRequestBody] = useState(
        savedApiRequest?.settings?.body || '{}'
    );
    const [isRequestRunning, setIsRequestRunning] = useState(false);
    const [requestResponse, setRequestResponse] = useState('');

    const isPOSTMethod = requestMethod === 'POST';

    const onRunButtonClick = async () => {
        setIsRequestRunning(true);
        setRequestResponse('');
        const request = new ApiRequest({
            id: '',
            name: '',
            settings: {
                method: requestMethod as 'GET',
                url: requestURL,
                queryParams: {},
            },
        });

        const response = await request.run();
        setIsRequestRunning(false);
        setRequestResponse(JSON.stringify(response, null, 4));
    };

    const onSaveRequestButtonClick = async () => {
        const newRequestId =
            requestId || String(+new Date()).concat('_API_REQUEST');

        const request = new ApiRequest({
            id: newRequestId,
            name: requestName || newRequestId,
            settings: {
                method: requestMethod as 'GET',
                url: requestURL,
                queryParams: {},
            },
        });

        saveApiRequest(request.serialize());
        router.replace(`/edit/${pageId}/requests/${newRequestId}`);
    };

    return (
        <div>
            <Button view="action" onClick={onSaveRequestButtonClick}>
                Save request
            </Button>

            <TextInput
                label="Name"
                value={requestName}
                onChange={(event) => setRequestName(event.currentTarget.value)}
            />
            <TextInput
                label="Method"
                value={requestMethod}
                onChange={(event) =>
                    setRequestMethod(event.currentTarget.value as 'GET')
                }
            />
            <TextInput
                label="URL"
                value={requestURL}
                onChange={(event) => setRequestURL(event.currentTarget.value)}
            />
            {isPOSTMethod && (
                <TextArea
                    label="Body"
                    value={requestBody}
                    onChange={(event) =>
                        setRequestBody(event.currentTarget.value)
                    }
                />
            )}

            <Button
                disabled={isRequestRunning}
                view="default"
                onClick={onRunButtonClick}
            >
                Run
            </Button>

            <TextArea label="Request response" value={requestResponse} />
        </div>
    );
};
