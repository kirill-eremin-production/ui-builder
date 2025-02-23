import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';

import { SessionData, sessionOptions } from '@/app/actions/utils/sessions/lib';

export async function GET() {
    const session = await getIronSession<SessionData>(
        await cookies(),
        sessionOptions
    );
    session.destroy();

    return Response.redirect(`https://${process.env.host}`);
}
