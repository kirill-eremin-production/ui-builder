import { useCallback } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export const useUpdateSearchParams = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return useCallback(
        (queryParams: Record<string, string>) => {
            const newQueryParams = new URLSearchParams(searchParams?.toString() || '');

            Object.entries(queryParams).forEach(([key, value]) => {
                if (!value) {
                    return newQueryParams.delete(key);
                }

                newQueryParams.set(key, value);
            });

            router.push(`${pathname}?${newQueryParams.toString()}`);

            return {
                pathname,
                queryParams: newQueryParams.toString(),
            };
        },
        [router, pathname, searchParams]
    );
};
