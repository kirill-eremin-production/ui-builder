import { Phrase } from '@/shared/localization';

const _text = {
    sectionTreeTitle: {
        en: 'Sections',
        ru: 'Секции',
        meta: {
            explanation: 'Заголовок для панели',
        },
    },
} as const;

export const text: Record<keyof typeof _text, Phrase> = _text;
