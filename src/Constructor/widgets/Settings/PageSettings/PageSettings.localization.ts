import { Phrase } from '@/shared/localization';

const _text = {
    pageId: {
        en: 'Page id',
        ru: 'Id страницы',
        meta: {
            explanation: 'Label для поля ввода id страницы',
        },
    },

    pageName: {
        en: 'Page name',
        ru: 'Название страницы',
        meta: {
            explanation: 'Label для поля ввода названия страницы',
        },
    },

    pageSettingsTitle: {
        en: 'Page settings',
        ru: 'Настройки страницы',
        meta: {
            explanation: 'Заголовок для панели настроек страницы',
        },
    },

    pageWidth: {
        en: 'Page width',
        ru: 'Ширина страницы',
        meta: {
            explanation: 'Label для поля ввода ширины страницы',
        },
    },

    minPageHeight: {
        en: 'Minimal page height',
        ru: 'Минимальная высота страницы',
        meta: {
            explanation: 'Label для поля ввода минимальной высоты страницы',
        },
    },
} as const;

export const text: Record<keyof typeof _text, Phrase> = _text;
