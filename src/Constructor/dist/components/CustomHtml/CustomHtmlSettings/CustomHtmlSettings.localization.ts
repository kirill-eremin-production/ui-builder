import { Phrase } from '@/shared/localization';

const _text = {
    sectionName: {
        en: 'Section name',
        ru: 'Название секции',
        meta: {
            explanation: 'Label для поля ввода названия секции',
        },
    },

    rootClassName: {
        en: 'className',
        ru: 'className',
        meta: {
            explanation: 'Label для поля ввода класса',
        },
    },

    textAreaNote: {
        en: 'Valid html',
        ru: 'Валидный html',
        meta: {
            explanation: 'Заметка для поля ввода html',
        },
    },
} as const;

export const text: Record<keyof typeof _text, Phrase> = _text;
