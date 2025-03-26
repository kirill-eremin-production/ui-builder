import { preventUnauthorized } from './utils';

export type AuthGuardParams = {
    redirectUnauthorized?: boolean;
};

// Это функция обертка. Тут нормально ожидать любую функцию.
// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function AuthGuard<F extends Function>(
    f: F,
    params: AuthGuardParams = {}
): F {
    // @ts-expect-error Работаем с любой функцией, не хочется усложнять описание типов
    return async function (...args) {
        const result = await preventUnauthorized(params);

        if (result) {
            return result;
        }

        return f(...args);
    };
}
