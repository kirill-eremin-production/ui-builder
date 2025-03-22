import { Phrase } from '@/shared/localization';

const _text = {
    page: {
        en: 'Page',
        ru: 'Страницу',
        meta: {
            explanation:
                'Текст на кнопке открытия модалки с формой создания новой страницы',
        },
    },

    newPageFormTitle: {
        en: 'Create new page',
        ru: 'Создать новую страницу',
        meta: {
            explanation: 'Заголовок формы создания новой страницы',
        },
    },

    pageIdLabel: {
        en: 'Page Id',
        ru: 'Id страницы',
        meta: {
            explanation: 'Label поля ввода id страницы',
        },
    },

    submitButtonText: {
        en: 'Create',
        ru: 'Создать',
        meta: {
            explanation: 'Текст на кнопке создания новой страницы',
        },
    },

    incorrectPageIdErrorMessage: {
        en: 'Incorrect page id. Please, try again.',
        ru: 'Неправильный идентификатор страницы. Пожалуйста, попробуйте еще раз.',
        meta: {
            explanation: 'Сообщение об ошибке',
        },
    },

    failedToCreateNewPageErrorMessage: {
        en: 'Failed to create new page. Please, try again.',
        ru: 'Не удалось создать новую страницу. Пожалуйста, попробуйте еще раз.',
        meta: {
            explanation: 'Сообщение об ошибке',
        },
    },
} as const;

export const text: Record<keyof typeof _text, Phrase> = _text;
