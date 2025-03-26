'use server';

import Link from 'next/link';

import { getPagesListAction } from '@/app/actions/pages/list';
import { preventUnauthorized } from '@/app/actions/shared/guards/auth-guard/utils';

import { ConstructorHomePage } from '@/pages/ConstructorHomePage';

export default async function Home() {
    const authorizationCheck = await preventUnauthorized({
        redirectUnauthorized: false,
    });

    if (authorizationCheck?.code) {
        return <Link href="/auth">Login</Link>;
    }

    const pages = (await getPagesListAction()).map((page) =>
        page.replaceAll('.json', '')
    );

    return <ConstructorHomePage pages={pages} />;
}
