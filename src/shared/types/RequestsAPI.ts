// Список запросов к API
export type RequestsAPI = Record<string, RequestAPI>;

// Описание свойств запроса к API
export type RequestAPI = {
    // Уникальный идентификатор запроса
    id: string;
    // Название запроса, чтобы его можно было отличать
    name: string;
    // Более подроное опциональное описание запроса
    description?: string;

    settings: {
        method: 'GET' | 'POST' | 'PUT' | 'DELETE';
        url: string;
        queryParams: Record<string, string>;
        headers?: Record<string, string>;
        body?: string;
        // Количество ретраев
        retryCount?: number;

        // Должен ли выполняться запрос на сервере
        isServerAction?: boolean;
        // Должен ли выполняться запрос сразу при открытии страницы
        runOnPageLoad?: boolean;

        // JS логика перед выполнением запроса
        jsBefore?: string;
        // JS логика
        jsFinally?: string;
        // JS логика на ошибку
        jsOnError?: string;
        // JS логика на успех
        jsOnSuccess?: string;
    };

    state: {
        isSuccess: boolean;
        isLoading: boolean;
        isError: boolean;
        error?: Error;
        response?: object;
    };

    // Очистить данные запроса
    clear: () => void;
    // Выполнить запрос
    run: () => void;
};
