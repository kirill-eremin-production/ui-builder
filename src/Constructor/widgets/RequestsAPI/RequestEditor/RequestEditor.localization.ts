import { Phrase } from '@/shared/localization';

const _text = {
    example: {
        en: 'Example',
        ru: 'Пример',
        meta: {
            explanation: 'Пример',
        },
    },
} as const;

export const text: Record<keyof typeof _text, Phrase> = _text;