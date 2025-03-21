import { Phrase } from '@/shared/localization';

const _text = {
    savePage: {
        en: 'Save page',
        ru: 'Сохранить страницу',
        meta: {
            explanation: 'Текст на кнопке сохранения страницы',
        },
    },

    saved: {
        en: 'Saved',
        ru: 'Сохранено',
        meta: {
            explanation: 'Текст состояния сохраненность страницы',
        },
    },

    modified: {
        en: 'Modified',
        ru: 'Есть изменения',
        meta: {
            explanation: 'Текст состояния сохраненность страницы',
        },
    },
} as const;

export const text: Record<keyof typeof _text, Phrase> = _text;
