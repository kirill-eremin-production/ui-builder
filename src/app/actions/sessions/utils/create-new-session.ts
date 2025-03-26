import crypto from 'node:crypto';

import { generateConfirmationCode } from '@/app/actions/shared/utils';

import { SessionData } from '@/shared/types/Sessions';

export type CreateNewSessionParams = {
    userAgent?: string;
};

export function createNewSession({
    userAgent,
}: CreateNewSessionParams): SessionData {
    const createdAt = new Date().toISOString();
    const password = String(generateConfirmationCode());
    const id = crypto
        .createHash('md5')
        .update(
            JSON.stringify({
                createdAt,
                password,
            })
        )
        .digest('hex');

    return {
        id,
        isActive: false,
        createdAt,
        password,
        userAgent,
    };
}
