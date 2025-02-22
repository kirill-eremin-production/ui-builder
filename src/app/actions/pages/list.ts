'use server';

import fs from 'node:fs';

export async function getPagesListAction(): Promise<string[]> {
    let pages: string[] = [];
    try {
        pages = await fs.promises.readdir('./ui-builder-store/pages/', {
            recursive: true,
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {}

    return pages;
}
