import { Phrase } from '@/shared/localization';

const _text = {
    authorization: {
        en: 'Authorization',
        ru: 'Авторизация',
        meta: {
            explanation: 'Заголовок формы авторизации',
        },
    },

    submit: {
        en: 'Submit',
        ru: 'Подтвердить',
        meta: {
            explanation: 'Текст кнопки отправки данных формы',
        },
    },

    getAuthCodeButtonText: {
        en: 'Get auth code',
        ru: 'Получить код',
        meta: {
            explanation: 'Текст на кнопке получения кода для авторизации',
        },
    },
} as const;

export const text: Record<keyof typeof _text, Phrase> = _text;
