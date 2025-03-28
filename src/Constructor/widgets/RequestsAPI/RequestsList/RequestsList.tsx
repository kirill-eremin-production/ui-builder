import { FC } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './RequestsList.module.css';

import { useApiRequests } from '@/Constructor/state/requests/hooks/use-api-requests';

import { text } from './RequestsList.localization';

export type RequestsListProps = {};

export const RequestsList: FC<RequestsListProps> = (props) => {
    const pathname = usePathname();
    const { apiRequests } = useApiRequests();

    return (
        <div>
            RequestsList
            <br />
            <Link href={`${pathname}/requests/add`}>Create new request</Link>
            <hr />
            {Object.entries(apiRequests).map(([id, request]) => {
                return (
                    <Link key={id} href={`${pathname}/requests/${id}`}>
                        {request.name || request.id}
                    </Link>
                );
            })}
        </div>
    );
};
