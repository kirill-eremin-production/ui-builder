'use client';

import { FC } from 'react';

import Link from 'next/link';

import styles from './ConstructorHomePage.module.css';

import { CreatePage } from '@/Constructor/widgets/CreatePage';

export type ConstructorHomePageProps = {
    pages: string[];
};

export const ConstructorHomePage: FC<ConstructorHomePageProps> = ({
    pages,
}) => {
    return (
        <div className={styles.page}>
            <div className={styles.list}>
                <CreatePage>
                    <>
                        <div className={styles.row}>
                            Authorized.
                            <Link prefetch={false} href="/api/auth/logout">
                                Logout
                            </Link>
                        </div>

                        {pages.map((page) => (
                            <div key={page} className={styles.row}>
                                <Link target="_blank" href={`/r/${page}`}>
                                    {page}
                                </Link>
                                <Link
                                    target="_blank"
                                    href={`/edit?pageId=${page}`}
                                >
                                    Edit
                                </Link>
                            </div>
                        ))}
                    </>
                </CreatePage>
            </div>
        </div>
    );
};
