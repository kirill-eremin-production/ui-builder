import { TreeNode } from '../types';

/**
 * Рекурсивно собирает все узлы в плоский массив
 */
export const flattenNodes = (
    nodes: TreeNode[],
    level: number = 0
): Array<TreeNode & { level: number }> => {
    const result: Array<TreeNode & { level: number }> = [];

    for (const node of nodes) {
        result.push({ ...node, level });
        if (node.children) {
            result.push(...flattenNodes(node.children, level + 1));
        }
    }

    return result;
};

/**
 * Получает все развернутые узлы для отображения
 */
export const getVisibleNodes = (
    nodes: TreeNode[],
    expandedIds: Set<string>,
    level: number = 0
): Array<TreeNode & { level: number }> => {
    const result: Array<TreeNode & { level: number }> = [];

    for (const node of nodes) {
        result.push({ ...node, level });

        if (node.children && expandedIds.has(node.id)) {
            result.push(
                ...getVisibleNodes(node.children, expandedIds, level + 1)
            );
        }
    }

    return result;
};
