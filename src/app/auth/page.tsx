'use server';

import getSessionsListServerAction from '@/app/actions/sessions/get-sessions-list';

import { PasswordForm } from '@/Constructor/widgets/PasswordForm';

import { Auth as AuthPage } from '@/pages/Auth';

export type AuthPageProps = { searchParams: Promise<{ code?: string }> };

export default async function Auth({ searchParams }: AuthPageProps) {
    const getSessionsListResponse = await getSessionsListServerAction();
    const sessionsCollection =
        getSessionsListResponse.code === 'OK'
            ? getSessionsListResponse.sessionsCollection
            : {};
    const isAuthorized = getSessionsListResponse.code === 'OK';

    const { code } = await searchParams;

    return (
        <>
            {isAuthorized ? (
                <AuthPage sessionsCollection={sessionsCollection} />
            ) : (
                <PasswordForm defaultCode={code} />
            )}
        </>
    );
}
