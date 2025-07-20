/**
 * Форматирует размер файла в человекочитаемый формат
 *
 * @param bytes - Размер файла в байтах
 * @returns Отформатированная строка с размером файла и единицей измерения
 *
 * @example
 * ```typescript
 * formatFileSize(0) // "0 B"
 * formatFileSize(1024) // "1 KB"
 * formatFileSize(1536) // "1.5 KB"
 * formatFileSize(1048576) // "1 MB"
 * ```
 */
export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';

    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/**
 * Форматирует дату в относительный формат или локализованную дату
 *
 * Возвращает относительное время для недавних дат (сегодня, вчера, дни назад)
 * или локализованную дату для более старых дат
 *
 * @param date - Дата для форматирования
 * @returns Отформатированная строка с датой
 *
 * @example
 * ```typescript
 * const today = new Date();
 * formatDate(today) // "Сегодня"
 *
 * const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
 * formatDate(yesterday) // "Вчера"
 *
 * const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
 * formatDate(threeDaysAgo) // "3 дн. назад"
 *
 * const oldDate = new Date('2023-01-01');
 * formatDate(oldDate) // "01.01.2023" (в зависимости от локали)
 * ```
 */
export const formatDate = (date: Date): string => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
        return 'Сегодня';
    } else if (days === 1) {
        return 'Вчера';
    } else if (days < 7) {
        return `${days} дн. назад`;
    } else {
        return date.toLocaleDateString('ru-RU');
    }
};
