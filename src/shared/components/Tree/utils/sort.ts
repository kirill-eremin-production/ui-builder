import { TreeNode } from '../types';

/**
 * Сортирует узлы (папки сначала, затем файлы по алфавиту)
 */
export const sortNodes = (nodes: TreeNode[]): TreeNode[] => {
    return [...nodes].sort((a, b) => {
        // Папки всегда идут первыми
        if (a.type === 'folder' && b.type === 'file') return -1;
        if (a.type === 'file' && b.type === 'folder') return 1;

        // Внутри одного типа сортируем по алфавиту
        return a.name.localeCompare(b.name, 'ru', { numeric: true });
    });
};
