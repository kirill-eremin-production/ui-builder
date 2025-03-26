'use server';

import fs from 'node:fs';

import { paths } from '@/app/actions/shared/constants';

export async function getPagesListAction(): Promise<string[]> {
    let pages: string[] = [];
    try {
        pages = await fs.promises.readdir(paths.pages, {
            recursive: true,
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}

    return pages;
}
