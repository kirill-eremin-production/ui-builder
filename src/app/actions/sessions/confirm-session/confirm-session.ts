'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
    prepareSessionsCollection,
    readSessionsCollection,
    writeSessionsCollection,
} from '@/app/actions/sessions/utils';

export type ConfirmSessionParams = {
    password: string;
    retPath?: string;
};

export type ConfirmSessionResponse =
    | { code: 'ERROR'; message: string }
    | { code: 'OK' };

export async function confirmSession({
    password,
    retPath,
}: ConfirmSessionParams): Promise<ConfirmSessionResponse> {
    const sessionId = (await cookies()).get('sessionId')?.value;

    if (!sessionId) {
        return {
            code: 'ERROR',
            message: 'No session',
        };
    }

    prepareSessionsCollection();
    const sessionsCollection = readSessionsCollection();

    const currentSession = sessionsCollection[sessionId];

    if (currentSession.password !== password) {
        return {
            code: 'ERROR',
            message: 'Incorrect password',
        };
    }

    writeSessionsCollection({
        ...sessionsCollection,
        [currentSession.id]: {
            ...currentSession,
            isActive: true,
        },
    });

    redirect(retPath || '/');
}

export type ConfirmSession = typeof confirmSession;
