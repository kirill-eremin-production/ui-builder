import type { NextConfig } from 'next';

const cspHeader = `
    frame-ancestors autofill.yandex.ru;
`;

const nextConfig: NextConfig = {
    /* config options here */
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: cspHeader.replace(/\n/g, ''),
                    },
                ],
            },
        ];
    },
    eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
