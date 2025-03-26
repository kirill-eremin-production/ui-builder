import { FC } from 'react';

import {
    ArrowDownFromLine,
    ArrowUpFromLine,
    TrashBin,
} from '@gravity-ui/icons';

import cn from 'classnames';
import { UAParser } from 'ua-parser-js';

import styles from './Session.module.css';

import { Button, Text } from '@/shared/components';
import { SESSION_EXPIRATION_DAYS } from '@/shared/constants/session';
import { Time } from '@/shared/constants/time';
import { toDateTimeText } from '@/shared/time';
import { SessionData } from '@/shared/types/Sessions';

export type SessionProps = {
    session: SessionData;
    onRemove: (sessionId: string) => void;
};

export const Session: FC<SessionProps> = ({ onRemove, session }) => {
    const sessionStartTime = toDateTimeText(session.createdAt);
    const sessionEndTime = toDateTimeText(
        new Date(
            new Date(session.createdAt).getTime() +
                Time.DAY * SESSION_EXPIRATION_DAYS
        )
    );
    const ua = session.userAgent ? UAParser(session.userAgent) : undefined;

    return (
        <div
            className={cn(styles.root, {
                [styles.currentSession]: session.isCurrentSession,
            })}
            key={session.id}
        >
            <div className={styles.time}>
                <ArrowDownFromLine className={styles.timeIcon} />
                <Text variant="secondary">{sessionStartTime}</Text>
            </div>

            {ua ? (
                <div className={styles.info}>
                    <Button
                        onClick={() => onRemove(session.id)}
                        view="danger"
                        isIcon
                    >
                        <TrashBin />
                    </Button>
                    <Text>
                        {ua.device.vendor} {ua.os.name} {ua.os.version}{' '}
                        {ua.browser.name} {ua.browser.version}{' '}
                        {ua.cpu.architecture}
                    </Text>
                </div>
            ) : null}

            <div className={styles.time}>
                <ArrowUpFromLine className={styles.timeIcon} />
                <Text variant="secondary">{sessionEndTime}</Text>
            </div>
        </div>
    );
};
