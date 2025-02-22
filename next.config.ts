import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    distDir: 'build',
    experimental: {
        serverActions: {
            allowedOrigins: JSON.parse(
                process.env.ALLOWED_ORIGINS || '["ui.keremin.ru"]'
            ),
            bodySizeLimit: '1PB',
        },
    },
    eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
