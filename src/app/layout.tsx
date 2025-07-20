import cn from 'classnames';
import { Provider } from 'jotai';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';
import './variables.css';

import '@fontsource/ubuntu';

import { ThemeProvider, getServerThemeClass } from '../shared/state/theme';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Constructor / UI Builder',
    description: 'Home page',
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const themeClass = await getServerThemeClass();

    return (
        <html lang="en">
            <body className={themeClass}>
                <Provider>
                    <ThemeProvider>{children}</ThemeProvider>
                </Provider>
                <div id="modal-root"></div>
            </body>
        </html>
    );
}
