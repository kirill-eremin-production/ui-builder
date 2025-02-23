import { Provider } from 'jotai';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

import '@fontsource/ubuntu';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'UI Builder',
    description: 'Home page',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${geistSans.variable} ${geistMono.variable}`}>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
