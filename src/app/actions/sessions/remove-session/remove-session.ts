'use server';

import {
    prepareSessionsCollection,
    readSessionsCollection,
    writeSessionsCollection,
} from '@/app/actions/sessions/utils';

import { SessionsCollection } from '@/shared/types/Sessions';

export type RemoveSessionResponse =
    | { code: 'ERROR'; message: string }
    | { code: 'OK'; sessionsCollection: SessionsCollection };

export async function removeSession(
    sessionId: string
): Promise<RemoveSessionResponse> {
    try {
        prepareSessionsCollection();
        const sessionsCollection = readSessionsCollection();

        delete sessionsCollection[sessionId];

        writeSessionsCollection(sessionsCollection);

        return {
            code: 'OK',
            sessionsCollection,
        };
    } catch (error) {
        return {
            code: 'ERROR',
            message: String(error),
        };
    }
}

export type RemoveSession = typeof removeSession;
