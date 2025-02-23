import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// https://github.com/vvo/iron-session/blob/main/examples/next/src/app/app-router-server-component-and-action/actions.ts

import { SessionData, sessionOptions } from '../utils/sessions/lib';

export async function getSession() {
    'use server';

    const session = await getIronSession<SessionData>(
        await cookies(),
        sessionOptions
    );

    const isLoggedIn = session.isLoggedIn;
    const name = session.name;

    await session.save();

    return { isLoggedIn, name };
}

export async function checkSessions() {
    'use server';

    const session = await getSession();

    if (!session.isLoggedIn) {
        return redirect(`https://${process.env.host}`);
    }

    return session;
}
