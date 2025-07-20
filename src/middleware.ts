import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const response = NextResponse.next();

    // Проверяем, есть ли cookie с темой
    const themeCookie = request.cookies.get('ui-builder-theme');

    // Если cookie темы нет, устанавливаем значение по умолчанию
    if (!themeCookie) {
        response.cookies.set('ui-builder-theme', 'system', {
            path: '/',
            maxAge: 60 * 60 * 24 * 365, // 1 год
            sameSite: 'lax',
        });
    }

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
