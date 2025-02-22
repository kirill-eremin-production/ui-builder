'use server';

import Link from 'next/link';

import styles from './page.module.css';

import { getPagesListAction } from '@/app/actions/pages/list';
import { getSession } from '@/app/actions/sessions';

export default async function Home() {
    const session = await getSession();

    if (!session?.isLoggedIn) {
        return <Link href="/api/auth/yandex">Login</Link>;
    }

    const pages = (await getPagesListAction()).map((page) =>
        page.replaceAll('.json', '')
    );

    return (
        <div className={styles.page}>
            <div className={styles.row}>
                Authorized: {session.name}
                <Link href="/api/auth/yandex/logout">Logout</Link>
            </div>

            <hr />

            <div className={styles.list}>
                <Link href="./edit">Edit</Link>

                {pages.map((page) => (
                    <div key={page} className={styles.row}>
                        <Link href={`/r/${page}`}>{page}</Link>
                        <Link href={`/edit?pageId=${page}`}>Edit</Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
