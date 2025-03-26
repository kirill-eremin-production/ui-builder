export type EnvVariables = {
    /** Ключи внешних сервисов */
    // OPENAI_TOKEN: string;
    TELEGRAM_BOT_SECRET: string;
    // YANDEX_CLOUD_FOLDER_ID: string;
    // YANDEX_SEARCH_ENGINE_API_KEY: string;
    // YANDEX_SPEECH_KIT_API_KEY: string;
    // YANDEX_S3_KEY_ID: string;
    // YANDEX_S3_SECRET_KEY: string;
    // YANDEX_S3_URL: string;

    /** Настройки инстанса */
    APP_HOST: string;
    ALLOWED_ORIGINS: string;

    /** Настройки пользователя */
    TELEGRAM_USER_ID: string;
    NEXT_PUBLIC_USER_PIC_URL: string;
};

export const env: EnvVariables = {
    /** Ключи внешних сервисов */
    // OPENAI_TOKEN: process.env.OPENAI_TOKEN || '',
    TELEGRAM_BOT_SECRET: process.env.TELEGRAM_BOT_SECRET || '',
    // YANDEX_CLOUD_FOLDER_ID: process.env.YANDEX_CLOUD_FOLDER_ID || '',
    // YANDEX_SEARCH_ENGINE_API_KEY:
    //     process.env.YANDEX_SEARCH_ENGINE_API_KEY || '',
    // YANDEX_SPEECH_KIT_API_KEY: process.env.YANDEX_SPEECH_KIT_API_KEY || '',
    // YANDEX_S3_KEY_ID: process.env.YANDEX_S3_KEY_ID || '',
    // YANDEX_S3_SECRET_KEY: process.env.YANDEX_S3_SECRET_KEY || '',
    // YANDEX_S3_URL: process.env.YANDEX_S3_URL || '',

    /** Настройки инстанса */
    APP_HOST: process.env.APP_HOST || '',
    ALLOWED_ORIGINS: JSON.parse(
        process.env.ALLOWED_ORIGINS || '["gpt.keremin.ru"]'
    ),

    /** Настройки пользователя */
    TELEGRAM_USER_ID: process.env.TELEGRAM_USER_ID || '',
    NEXT_PUBLIC_USER_PIC_URL: process.env.NEXT_PUBLIC_USER_PIC_URL || '',
};
