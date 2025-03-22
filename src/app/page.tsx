'use server';

import Link from 'next/link';

import { getPagesListAction } from '@/app/actions/pages/list';
import { getSession } from '@/app/actions/sessions';

import { ConstructorHomePage } from '@/pages/ConstructorHomePage';

export default async function Home() {
    const session = await getSession();

    if (!session?.isLoggedIn) {
        return <Link href="/api/auth/yandex">Login</Link>;
    }

    const pages = (await getPagesListAction()).map((page) =>
        page.replaceAll('.json', '')
    );

    return <ConstructorHomePage userName={session.name} pages={pages} />;
}
