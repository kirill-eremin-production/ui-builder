import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';
import { btoa } from 'node:buffer';

import { SessionData, sessionOptions } from '@/app/actions/utils/sessions/lib';

export async function GET(req: NextRequest) {
    try {
        const code = req.nextUrl.searchParams.get('code');

        const formData = new URLSearchParams();
        formData.append('grant_type', 'authorization_code');
        formData.append('code', code || '');

        const oauth = await fetch(`https://oauth.yandex.ru/token`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(`${process.env.YANDEX_CLIENT_ID}:${process.env.YANDEX_CLIENT_SECRET}`)}`,
            },
            body: formData.toString(),
        });

        const oAuthToken = (await oauth.json()).access_token;

        const userDataResponse = await fetch(
            'https://login.yandex.ru/info?format=json',
            {
                method: 'GET',
                headers: {
                    Authorization: `OAuth ${oAuthToken}`,
                },
            }
        );

        const userData = await userDataResponse.json();

        if (userData.default_email === process.env.ADMIN_EMAIL) {
            const session = await getIronSession<SessionData>(
                await cookies(),
                sessionOptions
            );

            session.isLoggedIn = true;
            session.name = userData.real_name;
            session.email = userData.default_email;
            session.image = userData.default_avatar_id;
            await session.save();

            return Response.json(session);
            // return Response.redirect(`https://${process.env.host}`);
        }
    } catch (error) {
        console.log(error);
    }

    return Response.json({ ok: false });
}
