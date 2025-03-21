'use server';

import styles from './page.module.css';

import { readPageServerAction } from '@/app/actions/pages/read';

import { Renderer } from '@/Renderer';

export type RenderPageParams = Promise<{ pageId?: string | string[] }>;

export async function generateMetadata({
    params,
}: {
    params: RenderPageParams;
}) {
    const { pageId } = await params;

    if (!pageId || typeof pageId !== 'string') {
        return null;
    }

    const pageConfig = await readPageServerAction({
        pageId,
    });

    return {
        title: pageConfig.name || pageConfig.id,
    };
}

export default async function RenderPage({
    params,
}: {
    params: RenderPageParams;
}) {
    const { pageId } = await params;

    if (!pageId || typeof pageId !== 'string') {
        return null;
    }

    const pageConfig = await readPageServerAction({
        pageId,
    });

    return (
        <div className={styles.root}>
            <Renderer config={pageConfig} />
        </div>
    );
}
