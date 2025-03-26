import fs from 'node:fs';

import { prepareSessionsCollection } from '@/app/actions/sessions/utils/prepare-sessions-collection';
import { paths } from '@/app/actions/shared/constants';

import { SessionsCollection } from '@/shared/types/Sessions';

export function readSessionsCollection(): SessionsCollection {
    prepareSessionsCollection();

    return JSON.parse(
        fs.readFileSync(paths.sessionsFile, { encoding: 'utf-8' })
    );
}
