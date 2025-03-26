'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { checkAuth } from '@/app/actions/sessions/utils';

export type PreventUnauthorizedParams = {
    redirectUnauthorized?: boolean;
};

export async function preventUnauthorized(
    params: PreventUnauthorizedParams = {}
) {
    const sessionId = (await cookies()).get('sessionId')?.value;

    const callback = params.redirectUnauthorized
        ? () => redirect('/auth')
        : () => ({ code: 401 });

    if (!sessionId) {
        return callback();
    }

    const isAuthorized = checkAuth(sessionId);

    if (!isAuthorized) return callback();
}
