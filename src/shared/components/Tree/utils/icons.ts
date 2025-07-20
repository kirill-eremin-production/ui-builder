import { TreeIconType } from '../types';

const iconMap: Record<string, TreeIconType> = {
    // Изображения
    jpg: 'image',
    jpeg: 'image',
    png: 'image',
    gif: 'image',
    svg: 'image',
    webp: 'image',

    // Документы
    pdf: 'document',
    doc: 'document',
    docx: 'document',
    txt: 'text',
    md: 'text',
    rtf: 'document',

    // Код
    js: 'code',
    ts: 'code',
    jsx: 'code',
    tsx: 'code',
    html: 'code',
    css: 'code',
    scss: 'code',
    sass: 'code',
    less: 'code',
    json: 'code',
    xml: 'code',
    yaml: 'code',
    yml: 'code',

    // Архивы
    zip: 'archive',
    rar: 'archive',
    '7z': 'archive',
    tar: 'archive',
    gz: 'archive',

    // Видео
    mp4: 'video',
    avi: 'video',
    mov: 'video',
    wmv: 'video',
    flv: 'video',

    // Аудио
    mp3: 'audio',
    wav: 'audio',
    flac: 'audio',
    aac: 'audio',
    ogg: 'audio',
};

/**
 * Получает тип иконки для файла по расширению
 */
export const getFileIconType = (fileName: string): TreeIconType => {
    const extension = fileName.split('.').pop()?.toLowerCase();

    return iconMap[extension || ''] || 'file';
};
