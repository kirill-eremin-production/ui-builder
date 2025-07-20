import { Phrase } from '@/shared/localization';

const _text = {
    title: {
        en: 'UI Builder',
        ru: 'Конструктор админок',
        meta: {
            explanation: 'Заголовок главной страницы',
        },
    },
    subtitle: {
        en: 'Create beautiful admin panels without code',
        ru: 'Создавайте красивые админки без кода',
        meta: {
            explanation: 'Подзаголовок главной страницы',
        },
    },
    description: {
        en: 'Build powerful admin interfaces with our intuitive drag-and-drop constructor. No programming skills required.',
        ru: 'Создавайте мощные административные интерфейсы с помощью нашего интуитивного конструктора. Навыки программирования не требуются.',
        meta: {
            explanation: 'Описание возможностей приложения',
        },
    },
    getStarted: {
        en: 'Get Started',
        ru: 'Начать работу',
        meta: {
            explanation: 'Кнопка начала работы',
        },
    },
    learnMore: {
        en: 'Learn More',
        ru: 'Узнать больше',
        meta: {
            explanation: 'Кнопка узнать больше',
        },
    },
    features: {
        en: 'Features',
        ru: 'Возможности',
        meta: {
            explanation: 'Заголовок секции возможностей',
        },
    },
    dragAndDrop: {
        en: 'Drag & Drop',
        ru: 'Перетаскивание',
        meta: {
            explanation: 'Название функции перетаскивания',
        },
    },
    dragAndDropDesc: {
        en: 'Intuitive interface builder with drag and drop functionality',
        ru: 'Интуитивный конструктор интерфейсов с функцией перетаскивания',
        meta: {
            explanation: 'Описание функции перетаскивания',
        },
    },
    responsive: {
        en: 'Responsive Design',
        ru: 'Адаптивный дизайн',
        meta: {
            explanation: 'Название функции адаптивности',
        },
    },
    responsiveDesc: {
        en: 'Your admin panels will look great on any device',
        ru: 'Ваши админки будут отлично выглядеть на любом устройстве',
        meta: {
            explanation: 'Описание адаптивности',
        },
    },
    customizable: {
        en: 'Fully Customizable',
        ru: 'Полная настройка',
        meta: {
            explanation: 'Название функции настройки',
        },
    },
    customizableDesc: {
        en: 'Customize every aspect of your admin panel to match your brand',
        ru: 'Настройте каждый аспект вашей админки под ваш бренд',
        meta: {
            explanation: 'Описание возможностей настройки',
        },
    },
} as const;

export const text: Record<keyof typeof _text, Phrase> = _text;
