import { FC } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useApiRequests } from '@/Constructor/state/requests/hooks/use-api-requests';

export type RequestsListProps = Record<string, never>;

export const RequestsList: FC<RequestsListProps> = () => {
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
