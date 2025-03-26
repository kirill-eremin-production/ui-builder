'use server';

import { cookies } from 'next/headers';

import {
    prepareSessionsCollection,
    readSessionsCollection,
} from '@/app/actions/sessions/utils';

import { SessionsCollection } from '@/shared/types/Sessions';

export type GetSessionsListResponse =
    | { code: 'ERROR'; message: string }
    | { code: 'OK'; sessionsCollection: SessionsCollection };

export async function getSessionsList(): Promise<GetSessionsListResponse> {
    const sessionId = (await cookies()).get('sessionId')?.value;

    if (!sessionId) {
        return {
            code: 'ERROR',
            message: `Unauthorized. No sessionId`,
        };
    }

    try {
        prepareSessionsCollection();

        const sessionsCollection = readSessionsCollection();
        sessionsCollection[sessionId].isCurrentSession = true;

        return { code: 'OK', sessionsCollection };
    } catch (error) {
        return {
            code: 'ERROR',
            message: `${error}`,
        };
    }
}

export type GetSessionsList = typeof getSessionsList;
