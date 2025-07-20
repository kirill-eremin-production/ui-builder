import { TreeNode } from '@/shared/components/Tree/types';

/**
 * Преобразует массив идентификаторов страниц в формат TreeNode для компонента Tree
 * @param pages - массив идентификаторов страниц
 * @returns массив TreeNode
 */
export const pagesToTreeNodes = (pages: string[]): TreeNode[] => {
    return pages.map((pageId) => ({
        id: pageId,
        name: pageId,
        type: 'file' as const,
        path: `/r/${pageId}`,
    }));
};