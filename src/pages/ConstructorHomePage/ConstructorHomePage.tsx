'use client';

import { FC } from 'react';

import { ThemeProvider } from '@gravity-ui/uikit';

import Link from 'next/link';

import styles from './ConstructorHomePage.module.css';

import { CreatePage } from '@/Constructor/widgets/CreatePage';

import { text } from './ConstructorHomePage.localization';

export type ConstructorHomePageProps = {
    userName: string;
    pages: string[];
};

export const ConstructorHomePage: FC<ConstructorHomePageProps> = ({
    userName,
    pages,
}) => {
    return (
        <ThemeProvider theme="light">
            <div className={styles.page}>
                <div className={styles.row}>
                    Authorized: {userName}
                    <Link
                        target="_blank"
                        prefetch={false}
                        href="/api/auth/yandex/logout"
                    >
                        Logout
                    </Link>
                </div>

                <hr />

                <div className={styles.list}>
                    <CreatePage />

                    {pages.map((page) => (
                        <div key={page} className={styles.row}>
                            <Link target="_blank" href={`/r/${page}`}>
                                {page}
                            </Link>
                            <Link target="_blank" href={`/edit?pageId=${page}`}>
                                Edit
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </ThemeProvider>
    );
};
