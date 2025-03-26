import { prepareSessionsCollection } from '@/app/actions/sessions/utils/prepare-sessions-collection';
import { readSessionsCollection } from '@/app/actions/sessions/utils/read-sessions-collection';

import { SESSION_EXPIRATION_DAYS } from '@/shared/constants/session';
import { Time } from '@/shared/constants/time';

const EXPIRATION = SESSION_EXPIRATION_DAYS * Time.DAY;

/**
 * Проверяет, авторизована ли сессия на основе её идентификатора.
 * @param {string} sessionId - Идентификатор сессии для проверки.
 * @returns {boolean} `true`, если сессия действительна и не истекла, иначе `false`.
 */
export function checkAuth(sessionId: string): boolean {
    prepareSessionsCollection();

    const sessionsCollection = readSessionsCollection();

    const session = sessionsCollection?.[sessionId];

    if (!session || !session.createdAt || !session.isActive) {
        return false;
    }

    const dT = Math.abs(Date.now() - new Date(session.createdAt).getTime());

    // Сессия актуальна, если с момента ее создания прошло меньше указанного времени
    return dT < EXPIRATION;
}
