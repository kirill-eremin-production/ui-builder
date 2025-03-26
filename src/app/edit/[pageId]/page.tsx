'use server';

import styles from './page.module.css';

import { readPageServerAction } from '@/app/actions/pages/read';
import { AuthGuard } from '@/app/actions/shared/guards/auth-guard';

import { Constructor } from '@/Constructor';

export type RenderPageParams = Promise<{ pageId?: string | string[] }>;

async function Edit({ params }: { params: RenderPageParams }) {
    const { pageId } = await params;

    if (!pageId || typeof pageId !== 'string') {
        return null;
    }

    const initialPageConfig = await readPageServerAction({
        pageId,
    });

    return (
        <div className={styles.root}>
            <Constructor initialPageConfig={initialPageConfig} />
        </div>
    );
}

export default AuthGuard(Edit, { redirectUnauthorized: true });
