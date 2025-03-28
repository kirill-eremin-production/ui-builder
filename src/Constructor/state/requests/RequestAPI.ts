import { RequestAPI } from '@/shared/types/RequestsAPI';

export class ApiRequest implements RequestAPI {
    id: string;
    name: string;
    description?: string;
    settings: {
        method: 'GET' | 'POST' | 'PUT' | 'DELETE';
        url: string;
        queryParams: Record<string, string>;
        headers?: Record<string, string>;
        body?: string;
        retryCount?: number;
        isServerAction?: boolean;
        runOnPageLoad?: boolean;
        jsBefore?: string;
        jsFinally?: string;
        jsOnError?: string;
        jsOnSuccess?: string;
    };
    state: {
        isSuccess: boolean;
        isLoading: boolean;
        isError: boolean;
        error?: Error;
        response?: object;
    };

    constructor(request: {
        id: string;
        name: string;
        description?: string;
        settings: RequestAPI['settings'];
    }) {
        this.id = request.id;
        this.name = request.name;
        this.description = request.description;
        this.settings = request.settings;
        this.state = {
            isSuccess: false,
            isLoading: false,
            isError: false,
            error: undefined,
            response: undefined,
        };
    }

    // Метод для очистки состояния запроса
    clear() {
        this.state = {
            isSuccess: false,
            isLoading: false,
            isError: false,
            error: undefined,
            response: undefined,
        };
    }

    // Метод для выполнения запроса
    async run() {
        this.state.isLoading = true;
        this.clearError();

        // Выполнение JS логики перед запросом
        if (this.settings.jsBefore) {
            eval(this.settings.jsBefore);
        }

        try {
            this.state.response = await this.executeRequest();
            this.state.isSuccess = true;

            // Выполнение JS логики на успех
            if (this.settings.jsOnSuccess) {
                eval(this.settings.jsOnSuccess);
            }
        } catch (error) {
            this.state.isError = true;
            this.state.error = error as Error;

            // Выполнение JS логики на ошибку
            if (this.settings.jsOnError) {
                eval(this.settings.jsOnError);
            }
        } finally {
            this.state.isLoading = false;

            // Выполнение JS логики в конце
            if (this.settings.jsFinally) {
                eval(this.settings.jsFinally);
            }
        }

        return this.state.response;
    }

    // Метод для выполнения HTTP-запроса
    private async executeRequest() {
        const { method, url, queryParams, headers, body } = this.settings;

        // Формирование URL с queryParams
        const queryString = new URLSearchParams(queryParams).toString();
        const fullUrl = queryString ? `${url}?${queryString}` : url;

        const response = await fetch(fullUrl, {
            method,
            headers: {
                'Content-Type': 'application/json',
                ...headers,
            },
            body: method !== 'GET' ? body : undefined,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    // Метод для очистки ошибки
    private clearError() {
        this.state.isError = false;
        this.state.error = undefined;
    }

    // Метод для сериализации объекта ApiRequest
    serialize() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            settings: {
                method: this.settings.method,
                url: this.settings.url,
                queryParams: this.settings.queryParams,
                headers: this.settings.headers,
                body: this.settings.body,
                retryCount: this.settings.retryCount,
                isServerAction: this.settings.isServerAction,
                runOnPageLoad: this.settings.runOnPageLoad,
                jsBefore: this.settings.jsBefore,
                jsFinally: this.settings.jsFinally,
                jsOnError: this.settings.jsOnError,
                jsOnSuccess: this.settings.jsOnSuccess,
            },
        };
    }
}
