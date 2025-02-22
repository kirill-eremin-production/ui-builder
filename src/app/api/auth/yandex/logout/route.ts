import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { type NextRequest } from 'next/server';
import { btoa } from 'node:buffer';

import { getSession } from '@/app/actions/sessions';

export async function GET() {
    const session = await getSession();
    session.destroy();

    return Response.redirect('https://local.ui.keremin.ru:3000');
}
