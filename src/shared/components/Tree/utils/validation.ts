import { TreeNode } from '../types';

import { isAncestor } from './search';

/**
 * Проверяет, можно ли перетащить узел в целевой узел
 */
export const canDropNode = (
    dragNode: TreeNode,
    targetNode: TreeNode,
    allNodes: TreeNode[]
): boolean => {
    // Нельзя перетащить узел в самого себя
    if (dragNode.id === targetNode.id) return false;

    // Нельзя перетащить узел в свой дочерний элемент
    if (isAncestor(allNodes, dragNode.id, targetNode.id)) return false;

    // Можно перетащить только в папку
    return targetNode.type === 'folder';
};
