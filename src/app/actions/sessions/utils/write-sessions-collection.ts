import fs from 'node:fs';

import { prepareSessionsCollection } from '@/app/actions/sessions/utils/prepare-sessions-collection';
import { paths } from '@/app/actions/shared/constants';

import { SessionsCollection } from '@/shared/types/Sessions';

export function writeSessionsCollection(
    sessionsCollection: SessionsCollection
) {
    prepareSessionsCollection();

    fs.writeFileSync(
        paths.sessionsFile,
        JSON.stringify(sessionsCollection, null, 4),
        'utf-8'
    );
}
