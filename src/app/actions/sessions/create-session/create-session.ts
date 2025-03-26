'use server';

import { cookies, headers } from 'next/headers';

import {
    createNewSession,
    getAuthMessage,
    prepareSessionsCollection,
    readSessionsCollection,
    writeSessionsCollection,
} from '@/app/actions/sessions/utils';
import { sendTelegramMessage } from '@/app/actions/telegram/utils/send-telegram-message';

import { SESSION_EXPIRATION_DAYS } from '@/shared/constants/session';
import { Time } from '@/shared/constants/time';

export async function createSession() {
    const sessionId = (await cookies()).get('sessionId')?.value;
    const userAgent = (await headers()).get('user-agent') || '';

    prepareSessionsCollection();
    const sessionsCollection = readSessionsCollection();

    // Если есть sessionId, то не создаем новую сессию (только отправляем код)
    if (sessionId) {
        const currentSession = sessionsCollection[sessionId];

        if (currentSession) {
            const authMessage = getAuthMessage({
                userAgent,
                code: currentSession.password,
            });

            await sendTelegramMessage(authMessage);
            return;
        }
    }

    const newSession = createNewSession({ userAgent });

    writeSessionsCollection({
        ...sessionsCollection,
        [newSession.id]: newSession,
    });

    const authMessage = getAuthMessage({
        userAgent,
        code: newSession.password,
    });

    await sendTelegramMessage(authMessage);

    (await cookies()).set({
        name: 'sessionId',
        value: newSession.id,
        httpOnly: true,
        maxAge: Math.round((SESSION_EXPIRATION_DAYS * Time.DAY) / 1000), // seconds
    });
}

export type CreateSession = typeof createSession;
