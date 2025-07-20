import { SearchResult, TreeNode } from '../types';

/**
 * Рекурсивно ищет узел по ID в дереве узлов
 *
 * @param {TreeNode[]} nodes - Массив узлов дерева для поиска
 * @param {string} id - Уникальный идентификатор искомого узла
 * @returns {TreeNode | null} Найденный узел или null, если узел не найден
 *
 * @example
 * ```typescript
 * const nodes = [
 *   { id: '1', name: 'Root', children: [
 *     { id: '2', name: 'Child 1' },
 *     { id: '3', name: 'Child 2' }
 *   ]}
 * ];
 *
 * const foundNode = findNodeById(nodes, '2');
 * console.log(foundNode?.name); // 'Child 1'
 *
 * const notFound = findNodeById(nodes, '999');
 * console.log(notFound); // null
 * ```
 */
export const findNodeById = (
    nodes: TreeNode[],
    id: string
): TreeNode | null => {
    for (const node of nodes) {
        if (node.id === id) {
            return node;
        }

        if (node.children) {
            const found = findNodeById(node.children, id);
            if (found) return found;
        }
    }

    return null;
};

/**
 * Получает путь к узлу в виде массива имен от корня до целевого узла
 *
 * @param {TreeNode[]} nodes - Массив узлов дерева для поиска
 * @param {string} targetId - Идентификатор целевого узла
 * @param {string[]} [currentPath=[]] - Текущий путь (используется для рекурсии)
 * @returns {string[] | null} Массив имен узлов от корня до целевого узла или null, если узел не найден
 *
 * @example
 * ```typescript
 * const nodes = [
 *   { id: '1', name: 'Documents', children: [
 *     { id: '2', name: 'Projects', children: [
 *       { id: '3', name: 'MyApp' }
 *     ]}
 *   ]}
 * ];
 *
 * const path = getNodePath(nodes, '3');
 * console.log(path); // ['Documents', 'Projects', 'MyApp']
 *
 * const notFoundPath = getNodePath(nodes, '999');
 * console.log(notFoundPath); // null
 * ```
 */
export const getNodePath = (
    nodes: TreeNode[],
    targetId: string,
    currentPath: string[] = []
): string[] | null => {
    for (const node of nodes) {
        const newPath = [...currentPath, node.name];

        if (node.id === targetId) {
            return newPath;
        }

        if (node.children) {
            const found = getNodePath(node.children, targetId, newPath);
            if (found) return found;
        }
    }

    return null;
};

/**
 * Фильтрует узлы по поисковому запросу и возвращает результаты с информацией о совпадениях
 *
 * @param {TreeNode[]} nodes - Массив узлов дерева для поиска
 * @param {string} query - Поисковый запрос (регистр не учитывается)
 * @returns {SearchResult[]} Массив результатов поиска, отсортированный по количеству совпадений (убывание)
 *
 * @example
 * ```typescript
 * const nodes = [
 *   { id: '1', name: 'Component', children: [
 *     { id: '2', name: 'ComponentButton' },
 *     { id: '3', name: 'ComponentInput' }
 *   ]},
 *   { id: '4', name: 'Utils' }
 * ];
 *
 * const results = searchNodes(nodes, 'component');
 * console.log(results);
 * // [
 * //   { node: {...}, path: 'Component/ComponentButton', matches: 2 },
 * //   { node: {...}, path: 'Component/ComponentInput', matches: 2 },
 * //   { node: {...}, path: 'Component', matches: 1 }
 * // ]
 *
 * const emptyResults = searchNodes(nodes, 'nonexistent');
 * console.log(emptyResults); // []
 * ```
 */
export const searchNodes = (
    nodes: TreeNode[],
    query: string
): SearchResult[] => {
    const results: SearchResult[] = [];
    const searchTerm = query.toLowerCase();

    const searchRecursive = (nodeList: TreeNode[], path: string[] = []) => {
        for (const node of nodeList) {
            const currentPath = [...path, node.name];
            const nodeName = node.name.toLowerCase();

            if (nodeName.includes(searchTerm)) {
                const matches = (
                    nodeName.match(new RegExp(searchTerm, 'gi')) || []
                ).length;
                results.push({
                    node,
                    path: currentPath.join('/'),
                    matches,
                });
            }

            if (node.children) {
                searchRecursive(node.children, currentPath);
            }
        }
    };

    searchRecursive(nodes);

    return results.sort((a, b) => b.matches - a.matches);
};

/**
 * Выделяет совпадения поискового запроса в тексте с помощью HTML-тегов
 *
 * @param {string} text - Исходный текст для обработки
 * @param {string} query - Поисковый запрос для выделения
 * @returns {string} Текст с выделенными совпадениями в HTML-тегах <mark>
 *
 * @example
 * ```typescript
 * const text = 'MyTestComponent.tsx';
 * const query = 'test';
 *
 * const highlighted = highlightMatches(text, query);
 * console.log(highlighted); // 'My<mark class="nodeNameHighlight">Test</mark>Component.tsx'
 *
 * // Пример без совпадений
 * const noMatch = highlightMatches('file.js', 'python');
 * console.log(noMatch); // 'file.js'
 *
 * // Пример с пустым запросом
 * const empty = highlightMatches('file.js', '');
 * console.log(empty); // 'file.js'
 * ```
 */
export const highlightMatches = (text: string, query: string): string => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(
        regex,
        '<mark style="background-color: var(--color-brand); color: var(--text-color-main); padding: 0.125rem;">$1</mark>'
    );
};

/**
 * Проверяет, является ли один узел предком другого узла в дереве
 *
 * @param {TreeNode[]} nodes - Массив узлов дерева
 * @param {string} ancestorId - Идентификатор потенциального предка
 * @param {string} descendantId - Идентификатор потенциального потомка
 * @returns {boolean} true, если ancestorId является предком descendantId, иначе false
 *
 * @example
 * ```typescript
 * const nodes = [
 *   { id: '1', name: 'Root', children: [
 *     { id: '2', name: 'Parent', children: [
 *       { id: '3', name: 'Child', children: [
 *         { id: '4', name: 'Grandchild' }
 *       ]}
 *     ]}
 *   ]}
 * ];
 *
 * const isParentOfChild = isAncestor(nodes, '2', '3');
 * console.log(isParentOfChild); // true
 *
 * const isRootOfGrandchild = isAncestor(nodes, '1', '4');
 * console.log(isRootOfGrandchild); // true
 *
 * const isChildOfParent = isAncestor(nodes, '3', '2');
 * console.log(isChildOfParent); // false
 *
 * const isSelfAncestor = isAncestor(nodes, '2', '2');
 * console.log(isSelfAncestor); // false
 * ```
 */
export const isAncestor = (
    nodes: TreeNode[],
    ancestorId: string,
    descendantId: string
): boolean => {
    const ancestor = findNodeById(nodes, ancestorId);
    if (!ancestor || !ancestor.children) return false;

    const checkDescendant = (children: TreeNode[]): boolean => {
        for (const child of children) {
            if (child.id === descendantId) return true;
            if (child.children && checkDescendant(child.children)) return true;
        }
        return false;
    };

    return checkDescendant(ancestor.children);
};
