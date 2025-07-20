'use server';

import Link from 'next/link';

import styles from './page.module.css';

import { AuthGuard } from '@/app/actions/shared/guards/auth-guard';

import { RequestEditor } from '@/pages/RequestEditor';

export type RenderPageParams = Promise<{
    pageId?: string | string[];
    requestId?: string;
}>;

async function RequestAddPage({ params }: { params: RenderPageParams }) {
    const { pageId, requestId } = await params;

    if (!pageId || typeof pageId !== 'string' || !requestId) {
        return null;
    }

    return (
        <div className={styles.root}>
            Request add for {pageId}
            <Link href={`/edit/${pageId}`}>Go back</Link>
            <RequestEditor pageId={pageId} requestId={requestId} />
        </div>
    );
}

export default AuthGuard(RequestAddPage, { redirectUnauthorized: true });
