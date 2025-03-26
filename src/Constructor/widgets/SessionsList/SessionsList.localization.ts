import { Phrase } from '@/shared/localization';

const _text = {
    sessionsListTitle: {
        en: 'Sessions',
        ru: 'Сессии',
        meta: {
            explanation: 'Заголовок для списка сессий',
        },
    },
} as const;

export const text: Record<keyof typeof _text, Phrase> = _text;
