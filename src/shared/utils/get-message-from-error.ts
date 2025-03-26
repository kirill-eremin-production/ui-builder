export const getMessageFromError = (error: unknown) => {
    if (error instanceof Error) {
        return error.message;
    }

    if (typeof error === 'string') {
        return error;
    }

    return `Unknown error >>> typeof error = ${typeof error} >>> String(error) = ${String(error)}`;
};
