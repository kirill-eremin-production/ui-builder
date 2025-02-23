import { SessionOptions } from 'iron-session';

export interface SessionData {
    image: string;
    email: string;
    name: string;
    isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
    image: '',
    email: '',
    name: '',
    isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
    password: process.env.COOKIE_PSWD || 'admin',
    cookieName: 'ui-builder-session',
    ttl: 24 * 60 * 60,
    cookieOptions: {
        // secure only works in `https` environments
        // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
        secure: false,
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
    },
};
