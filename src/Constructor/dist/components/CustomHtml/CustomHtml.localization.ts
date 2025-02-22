import { Phrase } from '@/shared/localization';

const _text = {
    customHTML: {
        en: 'Custom HTML',
        ru: 'Кастомный HTML',
        meta: {
            explanation: 'Название виджета',
        },
    },
} as const;

export const text: Record<keyof typeof _text, Phrase> = _text;
