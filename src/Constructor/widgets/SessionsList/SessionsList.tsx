import { FC, useState } from 'react';

import { CircleChevronLeft } from '@gravity-ui/icons';

import styles from './SessionsList.module.css';

import removeSessionServerAction from '@/app/actions/sessions/remove-session';

import { Button, Icon, Text } from '@/shared/components';
import { SolidLoader } from '@/shared/components/SolidLoader';
import { SessionData, SessionsCollection } from '@/shared/types/Sessions';

import { text } from './SessionsList.localization';
import { Session } from './ui/Session';

export type SessionsListProps = {
    onGoBack: () => void;
    sessionsCollection: SessionsCollection;
};

const sortSessionCollection = (
    sessionA: SessionData,
    sessionB: SessionData
) => {
    // Сначала проверяем, является ли sessionA текущей сессией
    if (sessionA.isCurrentSession && !sessionB.isCurrentSession) {
        return -1; // sessionA должна быть первой
    }
    if (!sessionA.isCurrentSession && sessionB.isCurrentSession) {
        return 1; // sessionB должна быть первой
    }
    // Если оба или ни один из них не является текущей сессией, сортируем по createdAt
    return (
        new Date(sessionB.createdAt).getTime() -
        new Date(sessionA.createdAt).getTime()
    );
};

export const SessionsList: FC<SessionsListProps> = ({
    onGoBack,
    sessionsCollection,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const onRemove = async (sessionId: string) => {
        setIsLoading(true);
        const result = await removeSessionServerAction(sessionId);
        setIsLoading(false);

        if (result.code === 'OK') {
            window.location.reload();
        } else {
            alert(result.message);
        }
    };

    return (
        <SolidLoader isLoading={isLoading}>
            <div className={styles.root}>
                <div className={styles.title}>
                    <Button view="flat-action" isIcon onClick={onGoBack}>
                        <Icon size="m">
                            <CircleChevronLeft />
                        </Icon>
                    </Button>

                    <Text variant="title">{text.sessionsListTitle.en}</Text>
                </div>

                {Object.entries(sessionsCollection)
                    .sort(([, sessionA], [, sessionB]) =>
                        sortSessionCollection(sessionA, sessionB)
                    )
                    .map(([, session]) => {
                        return (
                            <Session
                                onRemove={onRemove}
                                key={session.id}
                                session={session}
                            />
                        );
                    })}
            </div>
        </SolidLoader>
    );
};
