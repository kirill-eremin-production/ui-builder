import fs from 'node:fs';

import { paths } from '@/app/actions/shared/constants';

import { SESSION_EXPIRATION_DAYS } from '@/shared/constants/session';
import { Time } from '@/shared/constants/time';
import { SessionsCollection } from '@/shared/types/Sessions';

const removeExpiredSessions = () => {
    const sessionsCollection: SessionsCollection = JSON.parse(
        fs.readFileSync(paths.sessionsFile, { encoding: 'utf-8' })
    );

    const newSessionsCollection: SessionsCollection = {};

    Object.entries(sessionsCollection).forEach(([sessionId, sessionData]) => {
        const dT = Math.abs(
            Date.now() - new Date(sessionData.createdAt).getTime()
        );

        if (dT < Time.DAY * SESSION_EXPIRATION_DAYS) {
            newSessionsCollection[sessionId] = sessionData;
        }
    });

    fs.writeFileSync(
        paths.sessionsFile,
        JSON.stringify(newSessionsCollection, null, 4),
        'utf-8'
    );
};

export function prepareSessionsCollection() {
    const isSessionsCollectionExists = fs.existsSync(paths.sessionsFile);

    if (isSessionsCollectionExists) {
        removeExpiredSessions();
        return;
    }

    fs.mkdirSync(paths.sessions, { recursive: true });

    fs.writeFileSync(paths.sessionsFile, '{}', 'utf-8');
}
