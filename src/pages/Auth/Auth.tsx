'use client';

import { FC } from 'react';

import { useRouter } from 'next/navigation';

import styles from './Auth.module.css';

import { SessionsCollection } from '@/shared/types/Sessions';

import { SessionsList } from '@/Constructor/widgets/SessionsList';

export type AuthProps = {
    sessionsCollection: SessionsCollection;
};

export const Auth: FC<AuthProps> = ({ sessionsCollection }) => {
    const router = useRouter();

    return (
        <div className={styles.root}>
            <SessionsList
                onGoBack={() => router.push('/')}
                sessionsCollection={sessionsCollection}
            />
        </div>
    );
};
