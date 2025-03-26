export const toDateTimeText = (rawDate?: string | Date) => {
    if (!rawDate) {
        return '';
    }

    let date = rawDate;

    if (typeof date === 'string') {
        date = new Date(date);
    }

    return `${date.toLocaleDateString('ru')} ${date.toLocaleTimeString('ru', { hour: '2-digit', minute: '2-digit' })}`;
};
