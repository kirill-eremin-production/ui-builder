import { useCallback } from 'react';

import { useAtom } from 'jotai';

import { ApiRequest } from '@/Constructor/state/requests/RequestAPI';

import { requestsApiAtom } from '../index';

export const useApiRequests = () => {
    const [apiRequests, setApiRequests] = useAtom(requestsApiAtom);

    const saveApiRequest = useCallback(
        (apiRequest: { id: string } & Partial<ApiRequest>) => {
            // @ts-expect-error - setApiRequests expects specific type structure
            setApiRequests((prevValue) => {
                return {
                    ...prevValue,
                    [apiRequest.id]: apiRequest,
                };
            });
        },
        [setApiRequests]
    );

    return { apiRequests, setApiRequests, saveApiRequest };
};
