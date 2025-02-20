'use server';

import styles from './page.module.css';

import { readPageServerAction } from '@/app/actions/pages/read';

import { PageConfig } from '@/shared/types/PageConfig';

import { Constructor } from '@/Constructor';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function Edit(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams;

    let initialPageConfig: PageConfig | undefined;
    if (searchParams.pageId && typeof searchParams.pageId === 'string') {
        initialPageConfig = await readPageServerAction({
            pageId: searchParams.pageId,
        });
    }

    return (
        <div className={styles.root}>
            <Constructor initialPageConfig={initialPageConfig} />
        </div>
    );
}
