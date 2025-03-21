import { Phrase } from '@/shared/localization';

const _text = {
    widgets: {
        en: 'Widgets',
        ru: 'Виджета',
        meta: {
            explanation: 'Заголовок для панели добавления виджетов',
        },
    },
} as const;

export const text: Record<keyof typeof _text, Phrase> = _text;
