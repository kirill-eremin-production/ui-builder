'use server';

import fs from 'node:fs';

import { PageConfig } from '@/shared/types/PageConfig';

export type WritePageParams = {
    page: PageConfig;
    id?: string;
};

export async function writePageServerAction({
    page,
    id,
}: WritePageParams): Promise<{ pageId: string }> {
    const pageId = id ? id : String(new Date().getTime());

    await fs.promises.mkdir('./ui-builder-store/pages', {
        recursive: true,
    });

    await fs.promises.writeFile(
        `./ui-builder-store/pages/${pageId}.json`,
        JSON.stringify({ id: pageId, ...page }, null, 2),
        { encoding: 'utf-8' }
    );

    return {
        pageId,
    };
}
