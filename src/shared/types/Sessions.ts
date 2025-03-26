/** Сессии */

// Данные сессии
export type SessionData = {
    id: string;
    isActive: boolean;
    password: string;
    createdAt: string;
    userAgent?: string;
    isCurrentSession?: boolean;
};

// Коллекция сессий
export type SessionsCollection = Record<string, SessionData>;
