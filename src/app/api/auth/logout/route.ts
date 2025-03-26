import { cookies } from 'next/headers';

import { env } from '@/app/actions/shared/constants';

export async function GET() {
    (await cookies()).set({
        name: 'sessionId',
        value: '',
        httpOnly: true,
    });

    return Response.redirect(`https://${env.APP_HOST}`);
}
