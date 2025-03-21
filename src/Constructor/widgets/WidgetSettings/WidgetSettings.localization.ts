import { Phrase } from '@/shared/localization';

const _text = {
    sectionParamsTitle: {
        en: 'Section params',
        ru: 'Параметры секции',
        meta: {
            explanation: 'Заголовок панели',
        },
    },
} as const;

export const text: Record<keyof typeof _text, Phrase> = _text;
