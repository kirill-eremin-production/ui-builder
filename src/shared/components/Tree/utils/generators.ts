/**
 * Создает уникальный ID для узла дерева на основе его пути
 *
 * Функция принимает строковый путь к узлу и преобразует его в уникальный
 * идентификатор с помощью base64 кодирования. Это обеспечивает создание
 * стабильных и предсказуемых ID для узлов дерева, которые можно использовать
 * в качестве ключей React или для других целей идентификации.
 *
 * @param path - Строковый путь к узлу (например, "folder/subfolder/file.txt")
 * @returns Уникальный ID узла в формате base64
 *
 * @example
 * ```typescript
 * const nodeId = generateNodeId("src/components/Button");
 * console.log(nodeId); // "c3JjL2NvbXBvbmVudHMvQnV0dG9u"
 * ```
 */
export const generateNodeId = (path: string): string => {
    return btoa(path);
};
