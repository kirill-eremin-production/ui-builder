import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// https://github.com/vvo/iron-session/blob/main/examples/next/src/app/app-router-server-component-and-action/actions.ts

import { SessionData, sessionOptions } from '../utils/sessions/lib';

export async function getSession() {
    return await getIronSession<SessionData>(await cookies(), sessionOptions);
}

export async function checkSessions() {
    const session = await getSession();

    if (!session.isLoggedIn) {
        return redirect('https://local.ui.keremin.ru:3000');
    }

    return session;
}

export async function login() {
    'use server';

    const session = await getSession();

    session.isLoggedIn = true;
    await session.save();
}
