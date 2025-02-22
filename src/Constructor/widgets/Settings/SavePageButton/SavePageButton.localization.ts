import { Phrase } from '@/shared/localization';

const _text = {
    savePage: {
        en: 'Save page',
        ru: 'Сохранить страницу',
        meta: {
            explanation: 'Текст на кнопке сохранения страницы',
        },
    },
} as const;

export const text: Record<keyof typeof _text, Phrase> = _text;
