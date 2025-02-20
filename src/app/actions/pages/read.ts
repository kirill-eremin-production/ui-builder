'use server';

import fs from 'node:fs';

import { PageConfig } from '@/shared/types/PageConfig';

export type ReadPageParams = {
    pageId: string;
};

export async function readPageServerAction({
    pageId,
}: ReadPageParams): Promise<PageConfig> {
    let pageConfig;
    try {
        const page = await fs.promises.readFile(
            `./ui-builder-store/pages/${pageId}.json`,
            { encoding: 'utf-8' }
        );

        pageConfig = JSON.parse(page);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}

    return pageConfig;
}
