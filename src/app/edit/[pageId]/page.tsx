'use server';

import styles from './page.module.css';

import { readPageServerAction } from '@/app/actions/pages/read';
import { checkSessions } from '@/app/actions/sessions';

import { Constructor } from '@/Constructor';

export type RenderPageParams = Promise<{ pageId?: string | string[] }>;

export default async function Edit({ params }: { params: RenderPageParams }) {
    const { pageId } = await params;

    if (!pageId || typeof pageId !== 'string') {
        return null;
    }

    await checkSessions();
    const initialPageConfig = await readPageServerAction({
        pageId,
    });

    return (
        <div className={styles.root}>
            <Constructor initialPageConfig={initialPageConfig} />
        </div>
    );
}
