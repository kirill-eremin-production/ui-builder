import { Phrase } from '@/shared/localization';

const _text = {
    title: {
        en: 'Explorer',
        ru: 'Проводник',
        meta: {
            explanation: 'Заголовок главной страницы',
        },
    },
} as const;

export const text: Record<keyof typeof _text, Phrase> = _text;
