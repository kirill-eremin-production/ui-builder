// Это функция обертка. Тут нормально ожидать любую функцию.
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function withErrorHandling<F extends Function>(
    fn: F,
    customErrorMessage: string
): F {
    // @ts-expect-error Работаем с любой функцией, не хочется усложнять описание типов
    return (...args) => {
        try {
            return fn(...args);
        } catch (error) {
            const errorMessage =
                error instanceof Error ? error.message : 'unknown error';

            throw new Error(`${customErrorMessage} >>> ${errorMessage}`);
        }
    };
}
